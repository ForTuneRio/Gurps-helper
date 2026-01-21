export interface Realm {
  id: string
  name: string
  description: string
  type: 'fantasy' | 'sci-fi' | 'modern' | 'other'
  features: string[]
}