export interface Surroundings {
  totalArea: number // mile²
  realmSizeValue: number
  areaKnowledgeClass: string
  defenseBonus: string
  terrain: string
  habitabilityValue: number
  habitability: string // Computed from habitabilityValue
}

export interface Government {
  type: string // Dictator, Democracy, etc.
  economyType: string // Trad., Industrial, etc.
  reactionTimeModifier: number
  controlRating: number
}

export interface Details {
  techLevel: number
  conformityRating: number
  openessRating: number
  educationRating: number
  citizenLoyaltyValue: number
  citizenLoyalty: string // Computed from citizenLoyaltyValue
  infrastructureRating: number
  description: string // Optional description
  useDescription: boolean // Checkbox to enable description
}

export interface EnhancementItem {
  id: string
  name: string
  details: string
  pointCost: number
  level: number
  totalCost: number // Computed: pointCost * level
}

export interface LimitationItem {
  id: string
  name: string
  details: string
  pointCost: number // Negative value
  level: number
  totalCost: number // Computed: pointCost * level (will be negative)
}

export interface FundsAndPeople {
  densityPerMile: number
  maxPopulation: number // Computed: densityPerMile * totalArea
  population: number
  averageIncome: number // Computed from techLevel
  workDependMod: number // Between 0 and 1
  managementSkill: number
  taxationCR: number
  revenueFactor: number // Computed from taxationCR
  revenue: number // Computed: population * averageIncome * workDependMod * revenueFactor
  corrupt: boolean
  independentIncome: boolean
  debt: boolean
  earningsAtTurn: number // Computed with modifiers
  bank: number
  bankPlusEarnings: number // Computed: bank + earningsAtTurn
}

export interface Military {
  wartime: boolean
  militaryBudgetFactor: number // Computed based on CR and wartime
  militaryResources: number // Computed: population * averageIncome * militaryBudgetFactor
}

export interface ResourcePoint {
  id: string
  name: string
  value: number
}

export interface Resources {
  resourcePointCost: number // Computed: realmValue * 0.001
  resourcePoints: ResourcePoint[] // Dynamic list of resource points
}

export interface Realm {
  id: string
  name: string
  surroundings: Surroundings
  government: Government
  details: Details
  realmValue: number // Computed: population * averageIncome * workDependMod
  enhancements: EnhancementItem[]
  enhancementsSum: number // Computed: sum of all enhancement costs (positive)
  limitations: LimitationItem[]
  limitationsSum: number // Computed: sum of all limitation costs (negative)
  realmValueWithModifiers: number // Computed: realmValue + (realmValue * enhancementsSum/100) + (realmValue * limitationsSum/100)
  fundsAndPeople: FundsAndPeople
  military: Military
  resources: Resources
}