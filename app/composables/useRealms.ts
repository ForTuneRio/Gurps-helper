import { ref, readonly } from 'vue'
import type { Realm, Surroundings, Government, FundsAndPeople, Military, Resources, EnhancementItem, LimitationItem } from '~/types/realm'

export const useRealms = () => {
  const realms = ref<Realm[]>([])

  const loadRealms = () => {
    const stored = localStorage.getItem('realms')
    if (stored) {
      realms.value = JSON.parse(stored)
    }
  }

  const saveRealm = (realm: Realm) => {
    const existing = realms.value.findIndex(r => r.id === realm.id)
    if (existing >= 0) {
      realms.value[existing] = realm
    } else {
      realms.value.push(realm)
    }
    localStorage.setItem('realms', JSON.stringify(realms.value))
  }

  const deleteRealm = (id: string) => {
    realms.value = realms.value.filter(r => r.id !== id)
    localStorage.setItem('realms', JSON.stringify(realms.value))
  }

  const calculateRealmValue = (enhancements: EnhancementItem[], limitations: LimitationItem[]): number => {
    const enhancementSum = enhancements.reduce((sum, e) => sum + e.sum, 0)
    const limitationSum = limitations.reduce((sum, l) => sum + l.sum, 0)
    return enhancementSum + limitationSum
  }

  const createEmptyRealm = (): Realm => ({
    id: Math.random().toString(36).substr(2, 9),
    name: '',
    surroundings: {
      totalArea: 0,
      realmSizeValue: 0,
      areaKnowledgeClass: '',
      defenseBonus: 0,
      terrain: '',
      habitability: 'Neutral',
      habitabilityValue: 10
    },
    government: {
      type: '',
      economyType: '',
      techLevel: 1,
      reactionTimeModifier: 0,
      controlRating: 0,
      conformityRating: 1,
      openessRating: 1,
      educationRating: 1,
      infrastructureRating: 1,
      citizenLoyalty: 'Neutral',
      citizenLoyaltyValue: 10
    },
    enhancements: [],
    limitations: [],
    fundsAndPeople: {
      densityPerMile: 0,
      maxPopulation: 0,
      population: 0,
      averageIncome: 0,
      workDependMod: 0,
      managementSkill: 0,
      taxationCR: 0,
      revenueFactor: 0.5,
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
      militaryResources: 0,
      agricultureAnimal: 0,
      agricultureFarming: 0,
      luxuryPrecious: 0
    },
    resources: {
      pointPerPoint: 0,
      naturalResources: 0,
      workforcePhysical: 0,
      workforceMental: 0
    },
    realmValue: 195000,
    realmValueWithModifiers: 195000
  })

  const cloneRealm = (realm: Readonly<Realm>): Realm => {
    return JSON.parse(JSON.stringify(realm))
  }

  const exportRealms = () => {
    const data = JSON.stringify(realms.value, null, 2)
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `realms-backup-${new Date().toISOString().split('T')[0]}.json`
    a.click()
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