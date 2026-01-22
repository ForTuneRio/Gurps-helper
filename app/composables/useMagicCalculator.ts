import type { SpellCraft, SpellEffect, CastingResult, CastingRoll, MagicPath, SpellModifier } from '~/types/magic'

export const useMagicCalculator = () => {

  const calculateEffectiveCap = (coreSkill: number, magery: number): number => {
    return Math.min(coreSkill, 12 + magery)
  }

  const getGreaterEffectsMultiplier = (greaterEffects: number): number => {
    if (greaterEffects === 0) return 1
    if (greaterEffects === 1) return 3
    if (greaterEffects === 2) return 5
    if (greaterEffects === 3) return 7
    if (greaterEffects === 4) return 9
    return 9 + ((greaterEffects - 4) * 2)
  }

  const craftSpellFn = (
    name: string,
    effects: SpellEffect[],
    modifiers: SpellModifier[]
  ): SpellCraft => {
    const effectsCost = effects.reduce((s, e) => s + e.cost, 0)
    const modifiersCost = modifiers.reduce((s, m) => s + m.cost, 0)

    const baseCost = effectsCost + modifiersCost

    const greaterEffects = effects.filter(e => e.greater).length
    const multiplier = getGreaterEffectsMultiplier(greaterEffects)

    const totalEnergy = baseCost * multiplier

    return {
      name,
      effects,
      modifiers,
      greaterEffects,
      totalEnergy
    }
  }


  const roll3d6 = (): number => {
    return Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6) + 3
  }

  const isCriticalSuccess = (roll: number, skill: number, cap: number): boolean => {
    const effectiveSkill = Math.min(skill, cap)
    return roll <= 4 || (roll <= effectiveSkill - 10)
  }

  const isCriticalFailure = (roll: number, skill: number, cap: number): boolean => {
    const effectiveSkill = Math.min(skill, cap)
    if (effectiveSkill < 16) {
      return roll >= 17
    }
    return roll >= effectiveSkill + 10 || roll >= 18
  }

  const castSpell = (spellName: string, requiredEnergy: number, cap: number, skill: number): CastingResult => {
    const rolls: CastingRoll[] = []
    let totalEnergy = 0
    let success = false
    const quirks: string[] = []
    let criticalFailure = false
    let attemptPenalty = 0

    while (totalEnergy < requiredEnergy && !criticalFailure) {
      const roll = roll3d6()
      const effectiveSkill = Math.min(skill - attemptPenalty, cap)
      const critSuccess = isCriticalSuccess(roll, skill, cap)
      const critFailure = isCriticalFailure(roll, skill, cap)
      const rollSuccess = roll <= effectiveSkill

      let energy = 0
      let quirk = false

      if (critFailure) {
        criticalFailure = true
        energy = 0 // Botch handled separately
      } else if (critSuccess) {
        energy = Math.max(1, effectiveSkill - roll + 1)
        success = true
      } else if (rollSuccess) {
        energy = Math.max(1, effectiveSkill - roll + 1)
        success = true
      } else {
        energy = 1
        quirk = true
        quirks.push(`Quirk on attempt ${rolls.length + 1}`)
      }

      rolls.push({
        roll,
        energy,
        success: rollSuccess || critSuccess,
        critical: critSuccess,
        quirk,
        criticalFailure: critFailure
      })

      totalEnergy += energy

      // Every 3rd attempt gets cumulative -1
      if (rolls.length % 3 === 0) {
        attemptPenalty += 1
      }
    }

    return {
      spellName,
      requiredEnergy,
      cap,
      skill,
      rolls,
      totalEnergy,
      success: success && !criticalFailure,
      quirks,
      criticalFailure
    }
  }

  const parseModifiers = (modifierString: string): number[] => {
    return modifierString
      .split(',')
      .map(m => parseInt(m.trim()))
      .filter(m => !isNaN(m))
  }
  return {
    roll3d6,
    calculateEffectiveCap,
    craftSpellFn,
    castSpell,
    parseModifiers
  }
}