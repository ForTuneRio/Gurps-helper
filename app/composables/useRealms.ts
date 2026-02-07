import { ref, readonly } from 'vue'
import type { Realm, ResourcePoint, EnhancementItem, LimitationItem } from '~/types/realm'
import type { DbRealm } from '~/types/database'

// Global state - shared across all composable instances
const realms = ref<Realm[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

export const useRealms = () => {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()

  /**
   * Load all realms for the current user from Supabase
   */
  const loadRealms = async () => {
    if (!user.value) {
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
        .eq('user_id', user.value.id)
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
  const saveRealm = async (realm: Realm) => {
    if (!user.value) {
      throw new Error('You must be logged in to save realms')
    }

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
        limitations: realm.limitations || []
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
          .eq('user_id', user.value.id)

        if (updateError) throw updateError
        
        realms.value[existing] = realmToSave
        console.log('Updated existing realm:', realmToSave.name)
      } else {
        // Create new realm
        const { data, error: insertError } = await supabase
          .from('realms')
          .insert({
            id: realmToSave.id,
            user_id: user.value.id,
            name: realmToSave.name,
            data: realmToSave
          })
          .select()
          .single()

        if (insertError) throw insertError
        
        realms.value.unshift(realmToSave)
        console.log('Created new realm:', realmToSave.name)
      }
    } catch (e: any) {
      error.value = e.message
      console.error('Failed to save realm:', e)
      throw e
    } finally {
      loading.value = false
    }
  }

  /**
   * Delete a realm from Supabase
   */
  const deleteRealm = async (id: string) => {
    if (!user.value) {
      throw new Error('You must be logged in to delete realms')
    }

    loading.value = true
    error.value = null

    try {
      const { error: deleteError } = await supabase
        .from('realms')
        .delete()
        .eq('id', id)
        .eq('user_id', user.value.id)

      if (deleteError) throw deleteError

      realms.value = realms.value.filter(r => r.id !== id)
      console.log('Deleted realm:', id)
    } catch (e: any) {
      error.value = e.message
      console.error('Failed to delete realm:', e)
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
      independentIncome: false,
      debt: false,
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

  const cloneRealm = (realm: Realm | Readonly<Realm>): Realm => {
    const cloned = JSON.parse(JSON.stringify(realm)) as Realm
    // Generate new ID for cloned realm
    cloned.id = Math.random().toString(36).substr(2, 9)
    cloned.name = `${cloned.name} (Copy)`
    // Ensure arrays are mutable by spreading them
    cloned.enhancements = [...(cloned.enhancements || [])]
    cloned.limitations = [...(cloned.limitations || [])]
    cloned.resources.resourcePoints = [...(cloned.resources.resourcePoints || [])]
    return cloned
  }

  const exportRealms = () => {
    if (typeof window === 'undefined') return
    
    console.log('Exporting realms. Count:', realms.value.length)
    const data = JSON.stringify(realms.value, null, 2)
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `realms-backup-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const importRealms = async (file: File): Promise<void> => {
    if (!user.value) {
      throw new Error('You must be logged in to import realms')
    }

    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = async (e) => {
        try {
          const imported = JSON.parse(e.target?.result as string)
          if (!Array.isArray(imported)) {
            reject(new Error('Invalid file format: expected array of realms'))
            return
          }

          loading.value = true
          error.value = null

          // Save each imported realm to Supabase
          for (const realm of imported) {
            // Generate new ID to avoid conflicts
            const realmToImport = {
              ...realm,
              id: Math.random().toString(36).substr(2, 9)
            }
            await saveRealm(realmToImport)
          }

          await loadRealms()
          resolve()
          } catch (importError: any) {
            error.value = `Failed to import: ${importError.message}`
            reject(new Error(`Failed to parse JSON: ${importError.message}`))
        } finally {
          loading.value = false
        }
      }
      reader.onerror = () => reject(new Error('Failed to read file'))
      reader.readAsText(file)
    })
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
    cloneRealm,
    exportRealms,
    importRealms
  }
}
