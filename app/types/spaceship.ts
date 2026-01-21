export interface Spaceship {
  id: string
  name: string
  type: string
  crew: number
  cargo: number
  weapons: Weapon[]
  defenses: Defense[]
}

export interface Weapon {
  name: string
  damage: string
  range: string
}

export interface Defense {
  name: string
  type: 'armor' | 'shield' | 'evasion'
  value: number
}