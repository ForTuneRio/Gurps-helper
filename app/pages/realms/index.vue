<template>
  <div>
    <h1 class="text-3xl font-bold mb-4">Realms</h1>
    <div class="mb-4 flex gap-2">
      <button
        @click="createAndOpenRealm"
        :disabled="creating"
        class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {{ creating ? 'Creating...' : '+ New Realm' }}
      </button>
      <div v-if="createError" class="text-sm text-red-600 self-center">
        {{ createError }}
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="py-8 text-gray-600">
      <p>Loading your realms...</p>
    </div>

    <!-- Realms List -->
    <div v-else-if="realms.length > 0" class="space-y-4">
      <h2 class="text-2xl font-semibold mb-4">Your Realms</h2>
      <div v-for="realm in realms" :key="realm.id" class="border border-gray-200 rounded-lg p-4 bg-white hover:shadow-md transition-shadow">
        <div class="flex justify-between items-start gap-4">
          <div class="flex-1">
            <h3 class="text-xl font-bold text-gray-900">{{ realm.name }}</h3>
            <p v-if="realm.details.description" class="text-gray-600 mt-2">{{ realm.details.description }}</p>
            <p v-else class="text-gray-400 italic mt-2">No description</p>
          </div>
          <div class="flex gap-2 flex-shrink-0">
            <button
              @click="openRealm(realm.id)"
              class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1 px-3 rounded text-sm"
            >
              Edit
            </button>
            <button
              @click="deleteRealmFn(realm.id)"
              class="bg-red-600 hover:bg-red-700 text-white font-semibold py-1 px-3 rounded text-sm"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="text-center py-8 text-gray-600">
      <p class="text-lg">No realms yet. Create one to get started!</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRealms } from '~/composables/useRealms'

const router = useRouter()

const user = useSupabaseUser()
watchEffect(() => {
  if (!user.value) {
    navigateTo('/auth/login')
  }
})

const { realms, loadRealms, deleteRealm, createEmptyRealm, saveRealm, loading } = useRealms()
const creating = ref(false)
const createError = ref('')

watchEffect(() => {
  console.log('watchEffect triggered. user.value:', user.value)
  if (user.value) {
    console.log('User detected, loading realms...')
    loadRealms()
  } else {
    console.log('user.value is falsy, not loading realms')
  }
})

const openRealm = (id: string) => {
  router.push(`/realms/${id}`)
}

const createAndOpenRealm = async () => {
  if (creating.value) return
  creating.value = true
  createError.value = ''
  try {
    if (!user.value?.id) {
      const supabase = useSupabaseClient()
      const { data, error } = await supabase.auth.getUser()
      if (error || !data.user?.id) {
        throw new Error('You must be logged in to create realms')
      }
    }
    const newRealm = createEmptyRealm()
    const saved = await saveRealm(newRealm)
    await router.push(`/realms/${saved.id}`)
  } catch (e: any) {
    createError.value = e?.message || 'Failed to create realm'
    console.error('Failed to create realm:', e)
  } finally {
    creating.value = false
  }
}

const deleteRealmFn = (id: string) => {
  if (confirm('Are you sure you want to delete this realm?')) {
    deleteRealm(id)
  }
}

</script>