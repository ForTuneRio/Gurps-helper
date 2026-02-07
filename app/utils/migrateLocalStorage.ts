/**
 * Migration utility to move data from localStorage to Supabase
 * Call this after user logs in for the first time
 */

import type { Realm } from '~/types/realm'
import type { Spaceship } from '~/types/spaceship'
import type { SupabaseClient, User } from '@supabase/supabase-js'

export const migrateLocalStorageToSupabase = async (
  supabase: SupabaseClient,
  user: User
) => {
  if (!user) {
    throw new Error('User must be logged in to migrate data')
  }

  const results = {
    realms: { migrated: 0, failed: 0 },
    spaceships: { migrated: 0, failed: 0 },
    errors: [] as string[]
  }

  // Migrate Realms
  try {
    const realmsJson = localStorage.getItem('realms')
    if (realmsJson) {
      const realms: Realm[] = JSON.parse(realmsJson)
      
      for (const realm of realms) {
        try {
          const { error } = await supabase
            .from('realms')
            .insert({
              id: realm.id,
              user_id: user.id,
              name: realm.name,
              data: realm
            })

          if (error) {
            // If duplicate, skip
            if (error.code === '23505') {
              console.log('Realm already exists, skipping:', realm.name)
            } else {
              throw error
            }
          } else {
            results.realms.migrated++
          }
        } catch (e: any) {
          results.realms.failed++
          results.errors.push(`Realm "${realm.name}": ${e.message}`)
        }
      }

      // Backup old data before clearing
      localStorage.setItem('realms_backup_' + Date.now(), realmsJson)
      localStorage.removeItem('realms')
    }
  } catch (e: any) {
    results.errors.push(`Failed to migrate realms: ${e.message}`)
  }

  // Migrate Spaceships
  try {
    const spaceshipsJson = localStorage.getItem('spaceships')
    if (spaceshipsJson) {
      const spaceships: Spaceship[] = JSON.parse(spaceshipsJson)
      
      for (const spaceship of spaceships) {
        try {
          const { error } = await supabase
            .from('spaceships')
            .insert({
              id: spaceship.id,
              user_id: user.id,
              name: spaceship.name,
              data: spaceship
            })

          if (error) {
            // If duplicate, skip
            if (error.code === '23505') {
              console.log('Spaceship already exists, skipping:', spaceship.name)
            } else {
              throw error
            }
          } else {
            results.spaceships.migrated++
          }
        } catch (e: any) {
          results.spaceships.failed++
          results.errors.push(`Spaceship "${spaceship.name}": ${e.message}`)
        }
      }

      // Backup old data before clearing
      localStorage.setItem('spaceships_backup_' + Date.now(), spaceshipsJson)
      localStorage.removeItem('spaceships')
    }
  } catch (e: any) {
    results.errors.push(`Failed to migrate spaceships: ${e.message}`)
  }

  return results
}

/**
 * Check if there's localStorage data to migrate
 */
export const hasLocalStorageData = (): boolean => {
  if (typeof window === 'undefined') return false
  
  const realms = localStorage.getItem('realms')
  const spaceships = localStorage.getItem('spaceships')
  
  return !!(realms || spaceships)
}
