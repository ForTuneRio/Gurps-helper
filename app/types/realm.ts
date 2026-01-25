export interface Surroundings {
  totalArea: number // mile²
  realmSizeValue: number
  areaKnowledgeClass: string
  defenseBonus: number
  terrain: string
  habitability: string
  habitabilityValue: number
}

export interface Government {
  type: string // Dictator, Democracy, etc.
  economyType: string // Trad., Industrial, etc.
  techLevel: number
  reactionTimeModifier: number
  controlRating: number
  conformityRating: number
  openessRating: number
  educationRating: number
  infrastructureRating: number
  citizenLoyalty: string
  citizenLoyaltyValue: number
}

export interface EnhancementItem {
  name: string
  details: string
  points: number
  sum: number
  level: number
}

export interface LimitationItem {
  name: string
  details: string
  points: number
  sum: number
  level: number
}

export interface FundsAndPeople {
  densityPerMile: number
  maxPopulation: number
  population: number
  averageIncome: number
  workDependMod: number
  managementSkill: number
  taxationCR: number
  revenueFactor: number // percentage
  revenue: number
  corrupt: boolean
  independentIncome: boolean
  debt: boolean
  earningsAtTurn: number
  bank: number
  bankPlusEarnings: number
}

export interface Military {
  wartime: boolean
  militaryBudgetFactor: number // percentage
  militaryResources: number
  agricultureAnimal: number
  agricultureFarming: number
  luxuryPrecious: number
}

export interface Resources {
  pointPerPoint: number
  naturalResources: number
  workforcePhysical: number
  workforceMental: number
}

export interface Realm {
  id: string
  name: string
  surroundings: Surroundings
  government: Government
  enhancements: readonly EnhancementItem[]
  limitations: readonly LimitationItem[]
  fundsAndPeople: FundsAndPeople
  military: Military
  resources: Resources
  realmValue: number
  realmValueWithModifiers: number
}