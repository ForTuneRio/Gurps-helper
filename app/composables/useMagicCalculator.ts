import type { CalculationResult, MagicPath } from '~/types/magic'

export const useMagicCalculator = () => {
  const calculateRitualMagic = (ritual: string, path: MagicPath, power: number, modifiers: number[] = []): CalculationResult => {
    const totalModifiers = modifiers.reduce((sum, mod) => sum + mod, 0)

    // Base calculation: power * 2 + random factor
    const baseResult = power * 2 + Math.floor(Math.random() * 10)
    const finalResult = baseResult + totalModifiers

    // Success chance calculation (simplified GURPS-style)
    const successChance = Math.min(95, Math.max(5, 50 + (power * 2) + totalModifiers))

    return {
      ritual,
      path,
      basePower: power,
      totalModifiers,
      finalResult,
      successChance
    }
  }

  const parseModifiers = (modifierString: string): number[] => {
    return modifierString
      .split(',')
      .map(m => parseInt(m.trim()))
      .filter(m => !isNaN(m))
  }

  return {
    calculateRitualMagic,
    parseModifiers
  }
}