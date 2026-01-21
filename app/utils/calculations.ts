// Utility functions for GURPS calculations

export const calculateAttributeModifier = (attribute: number): number => {
  return Math.floor((attribute - 10) / 2)
}

export const calculateSkillLevel = (attribute: number, skillPoints: number): number => {
  return attribute + skillPoints
}

export const calculateRitualPathMagic = (ritual: string, path: string, power: number): number => {
  // Placeholder calculation
  return power * 2 + Math.floor(Math.random() * 10)
}