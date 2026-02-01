import type { Realm } from '~/types/realm'

/**
 * Exports a realm to JSON and triggers download
 */
export function exportRealmToJSON(realm: Realm): void {
  const jsonString = JSON.stringify(realm, null, 2)
  const blob = new Blob([jsonString], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${realm.name || 'realm'}-${Date.now()}.json`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

/**
 * Imports a realm from JSON file
 * Returns the parsed realm or null if invalid
 */
export async function importRealmFromJSON(file: File): Promise<Realm | null> {
  return new Promise((resolve) => {
    const reader = new FileReader()

    reader.onload = (event) => {
      try {
        const jsonString = event.target?.result as string
        const realm = JSON.parse(jsonString) as Realm
        // Basic validation - ensure critical fields exist
        if (realm && realm.name && realm.surroundings && realm.government && realm.resources) {
          // Ensure arrays exist
          if (!realm.enhancements) realm.enhancements = []
          if (!realm.limitations) realm.limitations = []
          if (!realm.resources.resourcePoints) realm.resources.resourcePoints = []
          resolve(realm)
        } else {
          resolve(null)
        }
      } catch (error) {
        console.error('Failed to parse JSON:', error)
        resolve(null)
      }
    }

    reader.onerror = () => {
      console.error('Failed to read file')
      resolve(null)
    }

    reader.readAsText(file)
  })
}
