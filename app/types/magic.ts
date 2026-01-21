export interface CalculationResult {
  ritual: string
  path: string
  basePower: number
  totalModifiers: number
  finalResult: number
  successChance: number
}

export interface RitualForm {
  ritual: string
  path: string
  power: number
  modifiers: string
}

export type MagicPath =
  | 'fire'
  | 'water'
  | 'earth'
  | 'air'
  | 'spirit'
  | 'necromancy'
  | 'illusion'
  | 'healing'