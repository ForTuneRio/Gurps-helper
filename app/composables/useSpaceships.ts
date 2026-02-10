import { ref, readonly } from 'vue'
import type { Spaceship } from '~/types/spaceship'
import type { DbSpaceship } from '~/types/database'

// Global state - shared across all composable instances
const spaceships = ref<Spaceship[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

export const useSpaceships = () => {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()

  const loadSpaceships = async () => {
    if (!user.value) {
      console.log('No user logged in, skipping spaceship load')
      spaceships.value = []
      return
    }

    loading.value = true
    error.value = null

    try {
      const { data, error: fetchError } = await supabase
        .from('spaceships')
        .select('*')
        .eq('user_id', user.value.id)
        .order('created_at', { ascending: false })

      if (fetchError) throw fetchError

      spaceships.value = (data || []).map((dbSpaceship: DbSpaceship) => ({
        ...dbSpaceship.data,
        id: dbSpaceship.id,
      }))
    } catch (e: any) {
      error.value = e.message
      console.error('Failed to load spaceships:', e)
    } finally {
      loading.value = false
    }
  }

  const saveSpaceship = async (spaceship: Spaceship) => {
    if (!user.value) {
      throw new Error('You must be logged in to save spaceships')
    }

    loading.value = true
    error.value = null

    try {
      const existing = spaceships.value.findIndex(s => s.id === spaceship.id)

      if (existing >= 0) {
        const { error: updateError } = await supabase
          .from('spaceships')
          .update({
            name: spaceship.name,
            data: spaceship,
            updated_at: new Date().toISOString()
          })
          .eq('id', spaceship.id)
          .eq('user_id', user.value.id)

        if (updateError) throw updateError
        spaceships.value[existing] = spaceship
      } else {
        const { error: insertError } = await supabase
          .from('spaceships')
          .insert({
            id: spaceship.id,
            user_id: user.value.id,
            name: spaceship.name,
            data: spaceship
          })

        if (insertError) throw insertError
        spaceships.value.unshift(spaceship)
      }
    } catch (e: any) {
      error.value = e.message
      console.error('Failed to save spaceship:', e)
      throw e
    } finally {
      loading.value = false
    }
  }

  const deleteSpaceship = async (id: string) => {
    if (!user.value) {
      throw new Error('You must be logged in to delete spaceships')
    }

    loading.value = true
    error.value = null

    try {
      const { error: deleteError } = await supabase
        .from('spaceships')
        .delete()
        .eq('id', id)
        .eq('user_id', user.value.id)

      if (deleteError) throw deleteError

      spaceships.value = spaceships.value.filter(s => s.id !== id)
    } catch (e: any) {
      error.value = e.message
      console.error('Failed to delete spaceship:', e)
      throw e
    } finally {
      loading.value = false
    }
  }

  return {
    spaceships: readonly(spaceships),
    loading: readonly(loading),
    error: readonly(error),
    loadSpaceships,
    saveSpaceship,
    deleteSpaceship
  }
}