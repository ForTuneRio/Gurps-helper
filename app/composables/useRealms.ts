import { ref, readonly } from 'vue'
import type { Realm, Surroundings, Government, Details, FundsAndPeople, Military, Resources, EnhancementItem, LimitationItem, ResourcePoint } from '~/types/realm'

// Global state - shared across all composable instances
const realms = ref<Realm[]>([])

export const useRealms = () => {
  const loadRealms = () => {
    const stored = localStorage.getItem('realms')
    console.log('Loading realms from localStorage:', stored)
    if (stored) {
      realms.value = JSON.parse(stored)
      console.log('Loaded realms:', realms.value.length, 'realms')
    } else {
      console.log('No realms found in localStorage')
    }
  }

  const saveRealm = (realm: Realm) => {
    console.log('saveRealm called with:', realm)
    console.log('Current realms.value before save:', realms.value)
    
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
    
    console.log('Realm to save:', realmToSave)
    
    const existing = realms.value.findIndex(r => r.id === realmToSave.id)
    if (existing >= 0) {
      realms.value[existing] = realmToSave
      console.log('Updated existing realm at index:', existing, realmToSave.name)
    } else {
      realms.value.push(realmToSave)
      console.log('Added new realm:', realmToSave.name)
    }
    console.log('Total realms after save:', realms.value.length)
    console.log('All realms:', realms.value)
    
    const jsonToSave = JSON.stringify(realms.value)
    console.log('JSON to save to localStorage (length):', jsonToSave.length)
    localStorage.setItem('realms', jsonToSave)
    
    // Verify it was saved
    const verification = localStorage.getItem('realms')
    console.log('Verification - localStorage now contains (length):', verification?.length)
  }

  const deleteRealm = (id: string) => {
    realms.value = realms.value.filter(r => r.id !== id)
    localStorage.setItem('realms', JSON.stringify(realms.value))
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
    // Ensure arrays are mutable by spreading them
    cloned.enhancements = [...(cloned.enhancements || [])]
    cloned.limitations = [...(cloned.limitations || [])]
    cloned.resources.resourcePoints = [...(cloned.resources.resourcePoints || [])]
    return cloned
  }

  const exportRealms = () => {
    if (typeof window === 'undefined') return
    
    console.log('Exporting realms. Count:', realms.value.length)
    console.log('Realms data:', realms.value)
    const data = JSON.stringify(realms.value, null, 2)
    console.log('JSON data length:', data.length)
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

  const importRealms = (file: File): Promise<void> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const imported = JSON.parse(e.target?.result as string)
          if (Array.isArray(imported)) {
            realms.value = imported
            localStorage.setItem('realms', JSON.stringify(realms.value))
            resolve()
          } else {
            reject(new Error('Invalid file format: expected array of realms'))
          }
        } catch (error) {
          reject(new Error(`Failed to parse JSON: ${error}`))
        }
      }
      reader.onerror = () => reject(new Error('Failed to read file'))
      reader.readAsText(file)
    })
  }

  return {
    realms: readonly(realms),
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