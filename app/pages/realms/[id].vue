<template>
  <div>
    <div class="flex items-center justify-between mb-4">
      <div>
        <h1 class="text-3xl font-bold">{{ isNew ? 'New Realm' : 'Edit Realm' }}</h1>
        <p v-if="!isNew && realm" class="text-gray-600">{{ realm.name }}</p>
      </div>
      <NuxtLink to="/realms" class="text-sm text-gray-600 hover:text-gray-900">
        Back to list
      </NuxtLink>
    </div>

    <div v-if="isNew" class="p-4 bg-white border border-green-200 rounded-lg">
      <RealmBuilder />
    </div>
    <div v-else>
      <div v-if="loading" class="py-8 text-gray-600">Loading realm...</div>
      <div v-else-if="!realm" class="py-8 text-red-600">Realm not found.</div>
      <div v-else class="p-4 bg-white border border-green-200 rounded-lg">
        <RealmBuilder :realm-id="realmId" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useRealms } from '~/composables/useRealms'

const user = useSupabaseUser()
watchEffect(() => {
  if (!user.value) {
    navigateTo('/auth/login')
  }
})

const route = useRoute()
const realmId = computed(() => String(route.params.id || ''))
const isNew = computed(() => realmId.value === 'new')

const { realms, loadRealms, loading } = useRealms()

onMounted(async () => {
  if (!isNew.value) {
    await loadRealms()
  }
})
const realm = computed(() => (
  isNew.value ? undefined : realms.value.find(r => r.id === realmId.value)
))
</script>
