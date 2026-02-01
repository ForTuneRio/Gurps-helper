/**
 * GURPS Realm calculation utilities
 * Implements VLOOKUP-equivalent functions for various realm properties
 */

interface HabitabilityEntry {
  min: number
  label: string
  modifier: string
}

interface LoyaltyEntry {
  min: number
  label: string
}

/**
 * Lookup table for Habitability values
 * Format: [minValue, label, modifier]
 */
const HABITABILITY_TABLE: HabitabilityEntry[] = [
  { min: 0, label: 'Disastrous', modifier: '-3*' },
  { min: 1, label: 'Very Bad', modifier: '-2*' },
  { min: 4, label: 'Bad', modifier: '-1*' },
  { min: 7, label: 'Poor', modifier: '-1' },
  { min: 10, label: 'Neutral', modifier: '' },
  { min: 13, label: 'Good', modifier: '+1' },
  { min: 16, label: 'Very Good', modifier: '+2*' },
  { min: 19, label: 'Excellent', modifier: '+3*' },
]

/**
 * Lookup table for Citizen Loyalty values
 * Format: [minValue, label]
 */
const CITIZEN_LOYALTY_TABLE: LoyaltyEntry[] = [
  { min: 0, label: 'Disastrous' },
  { min: 1, label: 'Very Bad' },
  { min: 4, label: 'Bad' },
  { min: 7, label: 'Poor' },
  { min: 10, label: 'Neutral' },
  { min: 13, label: 'Good' },
  { min: 16, label: 'Very Good' },
  { min: 19, label: 'Excellent' },
]

/**
 * Lookup table for Average Income by Tech Level
 */
const AVERAGE_INCOME_TABLE: Record<number, number> = {
  0: 625,
  1: 650,
  2: 675,
  3: 700,
  4: 800,
  5: 1100,
  6: 1600,
  7: 2100,
  8: 2600,
  9: 3600,
  10: 5600,
  11: 8100,
  12: 10600,
}

/**
 * Lookup table for Military Budget Factor by Control Rating
 * Returns the factor value based on CR
 */
const MILITARY_BUDGET_TABLE: Record<number, number> = {
  0: 0,
  1: 0.005,
  2: 0.01,
  3: 0.02,
  4: 0.05,
  5: 0.1,
  6: 0.2,
  7: 0.5,
}

/**
 * Lookup table for Revenue Factor by Taxation CR
 */
const REVENUE_FACTOR_TABLE: Record<number, number> = {
  0: 0,
  1: 0.005,
  2: 0.02,
  3: 0.05,
  4: 0.1,
  5: 0.2,
  6: 0.3,
  7: 0.5,
}

/**
 * VLOOKUP equivalent for habitability
 * Returns the label based on the habitability value
 */
export function getHabitabilityLabel(value: number): string {
  for (let i = HABITABILITY_TABLE.length - 1; i >= 0; i--) {
    if (value >= HABITABILITY_TABLE[i].min) {
      const entry = HABITABILITY_TABLE[i]
      return entry.modifier ? `${entry.label} ${entry.modifier}` : entry.label
    }
  }
  return 'Disastrous -3*'
}

/**
 * VLOOKUP equivalent for citizen loyalty
 * Returns the label based on the loyalty value
 */
export function getCitizenLoyaltyLabel(value: number): string {
  for (let i = CITIZEN_LOYALTY_TABLE.length - 1; i >= 0; i--) {
    if (value >= CITIZEN_LOYALTY_TABLE[i].min) {
      return CITIZEN_LOYALTY_TABLE[i].label
    }
  }
  return 'Disastrous'
}

/**
 * Gets average income based on Tech Level
 * Returns the typical monthly pay for the given TL
 */
export function getAverageIncome(techLevel: number): number {
  // Clamp TL to valid range
  const tl = Math.max(0, Math.min(12, Math.round(techLevel)))
  return AVERAGE_INCOME_TABLE[tl] || 0
}

/**
 * Gets military budget factor based on Control Rating and wartime status
 * If wartime, uses CR+1 for lookup
 */
export function getMilitaryBudgetFactor(controlRating: number, wartime: boolean): number {
  const lookupCR = wartime ? controlRating + 1 : controlRating
  const clampedCR = Math.max(0, Math.min(7, lookupCR))
  return MILITARY_BUDGET_TABLE[clampedCR] || 0
}

/**
 * Gets revenue factor based on Taxation CR
 * Uses Taxation CR + 1 for lookup
 */
export function getRevenueFactor(taxationCR: number): number {
  const lookupCR = taxationCR + 1
  const clampedCR = Math.max(0, Math.min(7, lookupCR))
  return REVENUE_FACTOR_TABLE[clampedCR] || 0
}

/**
 * Calculates max population based on density and total area
 */
export function calculateMaxPopulation(densityPerMile: number, totalArea: number): number {
  return Math.round(densityPerMile * totalArea)
}

/**
 * Calculates Realm Value
 * Formula: Population × Average Income × Work/Depend Mod
 */
export function calculateRealmValue(
  population: number,
  averageIncome: number,
  workDependMod: number
): number {
  return Math.round(population * averageIncome * workDependMod)
}

/**
 * Calculates sum of all enhancements
 * Returns positive sum
 */
export function calculateEnhancementsSum(enhancements: { totalCost: number }[]): number {
  return enhancements.reduce((sum, e) => sum + e.totalCost, 0)
}

/**
 * Calculates sum of all limitations
 * Returns negative sum
 */
export function calculateLimitationsSum(limitations: { totalCost: number }[]): number {
  return limitations.reduce((sum, l) => sum + l.totalCost, 0)
}

/**
 * Calculates Realm Value with modifiers
 * Formula: Realm Value + (Realm Value × Enhancements/100) + (Realm Value × Limitations/100)
 */
export function calculateRealmValueWithMod(
  realmValue: number,
  enhancementsSum: number,
  limitationsSum: number
): number {
  const enhancementMod = (realmValue * enhancementsSum) / 100
  const limitationMod = (realmValue * limitationsSum) / 100
  return Math.round(realmValue + enhancementMod + limitationMod)
}

/**
 * Calculates military resources
 * Formula: Population × Average Income × Military Budget Factor
 */
export function calculateMilitaryResources(
  population: number,
  averageIncome: number,
  militaryBudgetFactor: number
): number {
  return Math.round(population * averageIncome * militaryBudgetFactor)
}

/**
 * Calculates revenue
 * Formula: Population × Average Income × Work/Depend Mod × Revenue Factor
 */
export function calculateRevenue(
  population: number,
  averageIncome: number,
  workDependMod: number,
  revenueFactor: number
): number {
  return Math.round(population * averageIncome * workDependMod * revenueFactor)
}

/**
 * Calculates earnings at turn with income modifiers
 * Formula: Revenue - (corrupt ? 20% of Revenue) - (debt ? debt level from Revenue) + (independent income ? level from Revenue)
 */
export function calculateEarningsAtTurn(
  revenue: number,
  corrupt: boolean,
  debt: boolean,
  independentIncome: boolean,
  debtLevel: number = 0,
  independentIncomeLevel: number = 0
): number {
  let earnings = revenue

  // Subtract 20% if corrupt
  if (corrupt) {
    earnings -= revenue * 0.2
  }

  // Subtract debt level percentage
  if (debt && debtLevel > 0) {
    earnings -= revenue * (debtLevel / 100)
  }

  // Add independent income level percentage
  if (independentIncome && independentIncomeLevel > 0) {
    earnings += revenue * (independentIncomeLevel / 100)
  }

  return Math.round(earnings)
}

/**
 * Calculates Resource Point cost
 * Formula: Realm Value × 0.001
 */
export function calculateResourcePointCost(realmValue: number): number {
  return Math.round(realmValue * 0.001)
}
