export interface RitualForm {
  ritual: string
  path: string
  power: number
  modifiers: string
}

export type EffectStrength = 'Lesser' | 'Greater'

export interface EffectDraft {
  strength: EffectStrength
  action: EffectAction
  path: MagicPath
}

export interface SpellEffect {
  name: string
  cost: number
  greater: boolean
  path: MagicPath
}


export interface SpellModifier {
  name: string
  cost: number
  type: 'effect' | 'modifier'
}

export interface ModifierState {
  name: string
  enabled: boolean
  value: number
}


export interface SpellCraft {
  name: string
  effects: SpellEffect[]
  modifiers: SpellModifier[] ,
  greaterEffects: number
  totalEnergy: number
}

export interface CastingResult {
  spellName: string
  requiredEnergy: number
  cap: number
  skill: number
  rolls: CastingRoll[]
  totalEnergy: number
  success: boolean
  quirks: string[]
  criticalFailure: boolean
}

export interface CastingRoll {
  roll: number
  energy: number
  success: boolean
  critical: boolean
  quirk: boolean
  criticalFailure: boolean
}

export const MAGIC_PATHS = [
  'Body',
  'Magic',
  'Matter',
  'Mind',
  'Spirit',
  'Undead',
  'Chance',
  'Crossroads',
  'Energy'
] as const

export type MagicPath = typeof MAGIC_PATHS[number]

export const EFFECT_ACTIONS = [
  'Sense',
  'Strengthen',
  'Restore',
  'Control',
  'Destroy',
  'Create',
  'Transform'
] as const

export type EffectAction = typeof EFFECT_ACTIONS[number]

export const MODIFIERS = [
  'Subject Weight',
  'Duration',
  'Damage',
  'Range',
  'Speed',
  'Area of Effect',
  'Bonus or Penalty',
  'Meta-Magic',
  'Altered Traits',
  'Extra Energy'
] as const

export type ModifierName = typeof MODIFIERS[number]
