import { ref, readonly } from 'vue'
import type { Realm, ResourcePoint, EnhancementItem, LimitationItem } from '~/types/realm'
import { useRateLimit } from './useRateLimit'

interface DbRealm {
  id: string
  user_id: string
  name: string
  data: Realm
  created_at?: string
  updated_at?: string
}

// Global state - shared across all composable instances
const realms = ref<Realm[]>([])
const loading = ref(false)
const error = ref<string | null>(null)
const WRITE_COOLDOWN_MS = 1200
const BACKOFF_BASE_MS = 2000
const BACKOFF_MAX_MS = 60000

const lastRealmWriteAt = new Map<string, number>()
const backoffUntilByRealm = new Map<string, number>()
const backoffMsByRealm = new Map<string, number>()

const isRetryableError = (e: any): boolean => {
  const status = e?.status
  const message = String(e?.message || '')
  return status === 429 || status === 503 || /network|fetch/i.test(message)
}

const applyBackoff = (realmId: string) => {
  const prev = backoffMsByRealm.get(realmId) ?? 0
  const next = Math.min(prev ? prev * 2 : BACKOFF_BASE_MS, BACKOFF_MAX_MS)
  backoffMsByRealm.set(realmId, next)
  backoffUntilByRealm.set(realmId, Date.now() + next)
}

const clearBackoff = (realmId: string) => {
  backoffMsByRealm.delete(realmId)
  backoffUntilByRealm.delete(realmId)
}

const enforceRealmWriteCooldown = (realmId: string) => {
  const now = Date.now()
  const backoffUntil = backoffUntilByRealm.get(realmId)
  if (backoffUntil && now < backoffUntil) {
    const seconds = Math.ceil((backoffUntil - now) / 1000)
    throw new Error(`Please wait ${seconds}s before saving again.`)
  }

  const lastWriteAt = lastRealmWriteAt.get(realmId) ?? 0
  if (now - lastWriteAt < WRITE_COOLDOWN_MS) {
    throw new Error('Please wait a moment before saving again.')
  }
  lastRealmWriteAt.set(realmId, now)
}

export const useRealms = () => {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()

  const getUserId = async (): Promise<string> => {
    if (user.value?.id) return user.value.id

    const { data, error: userError } = await supabase.auth.getUser()
    if (userError) throw userError
    if (!data.user?.id) throw new Error('You must be logged in to access realms')
    return data.user.id
  }

  /**
   * Load all realms for the current user from Supabase
   */
  const loadRealms = async () => {
    let userId: string
    try {
      userId = await getUserId()
    } catch (e) {
      console.log('No user logged in, skipping realm load')
      realms.value = []
      return
    }

    loading.value = true
    error.value = null

    try {
      const { data, error: fetchError } = await supabase
        .from('realms')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

      if (fetchError) throw fetchError

      // Transform database records to Realm objects
      realms.value = (data || []).map((dbRealm: DbRealm) => ({
        ...dbRealm.data,
        id: dbRealm.id,
      }))

      console.log('Loaded realms:', realms.value.length, 'realms')
    } catch (e: any) {
      error.value = e.message
      console.error('Failed to load realms:', e)
    } finally {
      loading.value = false
    }
  }

  /**
   * Save a realm to Supabase (create or update)
   */
  const saveRealm = async (realm: Realm): Promise<Realm> => {
    enforceRealmWriteCooldown(realm.id)
    
    // Check rate limit before allowing save
    const { checkLimit, formatResetTime } = useRateLimit()
    const isAllowed = await checkLimit('realm-save')
    if (!isAllowed) {
      const { status } = useRateLimit().getStatus()
      throw new Error(`Rate limit exceeded. Please wait ${formatResetTime(status.value.resetIn)} before saving again.`)
    }
    
    const userId = await getUserId()

    loading.value = true
    error.value = null

    try {
      // Ensure all data including nested arrays are properly set
      const realmToSave: Realm = {
        ...realm,
        resources: {
          ...realm.resources,
          resourcePoints: realm.resources.resourcePoints || []
        },
        enhancements: realm.enhancements || [],
        limitations: realm.limitations || [],
        fundsAndPeople: {
          ...realm.fundsAndPeople,
          independentIncomes: realm.fundsAndPeople.independentIncomes || [],
          debts: realm.fundsAndPeople.debts || []
        }
      }

      // Check if realm exists
      const existing = realms.value.findIndex(r => r.id === realmToSave.id)
      
      if (existing >= 0) {
        // Update existing realm
        const { error: updateError } = await supabase
          .from('realms')
          .update({
            name: realmToSave.name,
            data: realmToSave,
            updated_at: new Date().toISOString()
          })
          .eq('id', realmToSave.id)
          .eq('user_id', userId)

        if (updateError) throw updateError
        
        realms.value[existing] = realmToSave
        console.log('Updated existing realm:', realmToSave.name)
      } else {
        // Create new realm
        const { data, error: insertError } = await supabase
          .from('realms')
          .insert({
            id: realmToSave.id,
            user_id: userId,
            name: realmToSave.name,
            data: realmToSave
          })
          .select()
          .single()

        if (insertError) throw insertError
        
        realms.value.unshift(realmToSave)
        console.log('Created new realm:', realmToSave.name)
      }

      clearBackoff(realm.id)

      return realmToSave
    } catch (e: any) {
      error.value = e.message
      console.error('Failed to save realm:', e)
      if (isRetryableError(e)) {
        applyBackoff(realm.id)
      }
      throw e
    } finally {
      loading.value = false
    }
  }

  /**
   * Delete a realm from Supabase
   */
  const deleteRealm = async (id: string) => {
    enforceRealmWriteCooldown(id)
    
    // Check rate limit before allowing delete
    const { checkLimit, formatResetTime } = useRateLimit()
    const isAllowed = await checkLimit('realm-delete')
    if (!isAllowed) {
      const { status } = useRateLimit().getStatus()
      throw new Error(`Rate limit exceeded. Please wait ${formatResetTime(status.value.resetIn)} before deleting again.`)
    }
    
    const userId = await getUserId()

    loading.value = true
    error.value = null

    try {
      const { error: deleteError } = await supabase
        .from('realms')
        .delete()
        .eq('id', id)
        .eq('user_id', userId)

      if (deleteError) throw deleteError

      realms.value = realms.value.filter(r => r.id !== id)
      console.log('Deleted realm:', id)
      clearBackoff(id)
    } catch (e: any) {
      error.value = e.message
      console.error('Failed to delete realm:', e)
      if (isRetryableError(e)) {
        applyBackoff(id)
      }
      throw e
    } finally {
      loading.value = false
    }
  }

  const calculateRealmValue = (enhancements: EnhancementItem[], limitations: LimitationItem[]): number => {
    const enhancementSum = enhancements.reduce((sum, e) => sum + e.totalCost, 0)
    const limitationSum = limitations.reduce((sum, l) => sum + l.totalCost, 0)
    return enhancementSum + limitationSum
  }

  const createDefaultResourcePoints = (): ResourcePoint[] => [
    { id: '1', name: 'Agr (Animal)', value: 0 },
    { id: '2', name: 'Agr (Farming)', value: 0 },
    { id: '3', name: 'Luxury/Precious', value: 0 },
    { id: '4', name: 'Natural Resources', value: 0 },
    { id: '5', name: 'Workforce (P)', value: 0 },
    { id: '6', name: 'Workforce (M)', value: 0 },
  ]

  const createEmptyRealm = (): Realm => ({
    id: Math.random().toString(36).substr(2, 9),
    name: '',
    surroundings: {
      totalArea: 0,
      realmSizeValue: 0,
      areaKnowledgeClass: '',
      defenseBonus: '',
      terrain: '',
      habitabilityValue: 10,
      habitability: 'Neutral'
    },
    government: {
      type: '',
      economyType: '',
      reactionTimeModifier: 0,
      controlRating: 0
    },
    details: {
      techLevel: 1,
      conformityRating: 1,
      openessRating: 1,
      educationRating: 1,
      infrastructureRating: 1,
      citizenLoyaltyValue: 10,
      citizenLoyalty: 'Neutral',
      description: '',
      useDescription: false
    },
    realmValue: 0,
    enhancements: [],
    enhancementsSum: 0,
    limitations: [],
    limitationsSum: 0,
    realmValueWithModifiers: 0,
    fundsAndPeople: {
      densityPerMile: 0,
      maxPopulation: 0,
      population: 0,
      averageIncome: 0,
      workDependMod: 0.5,
      managementSkill: 0,
      taxationCR: 0,
      revenueFactor: 0,
      revenue: 0,
      corrupt: false,
      independentIncomes: [],
      debts: [],
      earningsAtTurn: 0,
      bank: 0,
      bankPlusEarnings: 0
    },
    military: {
      wartime: false,
      militaryBudgetFactor: 0,
      militaryResources: 0
    },
    resources: {
      resourcePointCost: 0,
      resourcePoints: createDefaultResourcePoints()
    }
  })



  const loadRealmForEdit = (realm: Realm | Readonly<Realm>): Realm => {
    const copy = JSON.parse(JSON.stringify(realm)) as Realm
    // IMPORTANT: Preserve the original ID for editing, don't generate a new one
    // Ensure arrays are mutable by spreading them
    copy.enhancements = [...(copy.enhancements || [])]
    copy.limitations = [...(copy.limitations || [])]
    copy.resources.resourcePoints = [...(copy.resources.resourcePoints || [])]
    copy.fundsAndPeople.independentIncomes = (copy.fundsAndPeople.independentIncomes || []).map(item => {
      const legacy = item as unknown as { pointCost?: number; level?: number }
      const legacyValue = typeof legacy.pointCost === 'number' && typeof legacy.level === 'number'
        ? legacy.pointCost * legacy.level
        : undefined
      return {
        id: item.id || Math.random().toString(36).substr(2, 9),
        name: item.name || '',
        value: typeof item.value === 'number' ? item.value : (legacyValue ?? 0),
        valueType: item.valueType === 'flat' || item.valueType === 'percent' ? item.valueType : 'percent',
        active: typeof item.active === 'boolean' ? item.active : true
      }
    })
    copy.fundsAndPeople.debts = (copy.fundsAndPeople.debts || []).map(item => {
      const legacy = item as unknown as { pointCost?: number; level?: number }
      const legacyValue = typeof legacy.pointCost === 'number' && typeof legacy.level === 'number'
        ? legacy.pointCost * legacy.level
        : undefined
      return {
        id: item.id || Math.random().toString(36).substr(2, 9),
        name: item.name || '',
        value: typeof item.value === 'number' ? item.value : (legacyValue ?? 0),
        valueType: item.valueType === 'flat' || item.valueType === 'percent' ? item.valueType : 'percent',
        active: typeof item.active === 'boolean' ? item.active : true
      }
    })
    return copy
  }

  return {
    realms: readonly(realms),
    loading: readonly(loading),
    error: readonly(error),
    loadRealms,
    saveRealm,
    deleteRealm,
    calculateRealmValue,
    createEmptyRealm,
    loadRealmForEdit
  }
}
