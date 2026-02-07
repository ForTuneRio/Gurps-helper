// Database table types (what's stored in Supabase)
export interface DbRealm {
  id: string
  user_id: string
  name: string
  data: any // JSONB column containing full Realm object
  created_at: string
  updated_at: string
}

export interface DbSpaceship {
  id: string
  user_id: string
  name: string
  data: any // JSONB column containing full Spaceship object
  created_at: string
  updated_at: string
}

// Helper types for API responses
export type RealmWithMeta = {
  id: string
  userId: string
  createdAt: string
  updatedAt: string
} & import('./realm').Realm

export type SpaceshipWithMeta = {
  id: string
  userId: string
  createdAt: string
  updatedAt: string
} & import('./spaceship').Spaceship
