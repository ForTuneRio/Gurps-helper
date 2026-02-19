<template>
  <div>
    <div class="mb-4 flex items-center gap-2">
      <button
        @click="goBackToList"
        class="inline-flex items-center gap-2 rounded-md bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700 hover:bg-blue-100"
      >
        <span aria-hidden="true">←</span>
        Back to list
      </button>
      <button
        type="submit"
        form="realm-form"
        class="inline-flex items-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-green-700"
      >
        Save
      </button>
    </div>

    <div v-if="isNew" class="p-4 bg-white border border-green-200 rounded-lg">
      <RealmBuilder @dirty="realmBuilderDirty = $event" />
    </div>
    <div v-else>
      <div v-if="loading && !realm" class="py-8 text-gray-600">Loading realm...</div>
      <div v-else-if="!realm" class="py-8 text-red-600">Realm not found.</div>
      <div v-else class="p-4 bg-white border border-green-200 rounded-lg">
        <RealmBuilder :realm-id="realmId" @dirty="realmBuilderDirty = $event" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed, ref } from 'vue'
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
const realmBuilderDirty = ref(false)

onMounted(async () => {
  if (!isNew.value) {
    await loadRealms()
  }
})

const realm = computed(() => (
  isNew.value ? undefined : realms.value.find(r => r.id === realmId.value)
))

const goBackToList = () => {
  if (realmBuilderDirty.value) {
    const confirmed = window.confirm('You have unsaved changes. Do you want to leave without saving?')
    if (!confirmed) return
  }
  navigateTo('/realms')
}
</script>
