<template>
  <div>
    <h1 class="text-3xl font-bold mb-4">Realms</h1>
    <div class="mb-4 flex gap-2">
      <button
        @click="showBuilder = !showBuilder"
        class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        {{ showBuilder ? 'Hide Builder' : '+ New Realm' }}
      </button>
      <button
        @click="exportRealms()"
        class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        📥 Export JSON
      </button>
      <label class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
        📤 Import JSON
        <input
          ref="fileInput"
          type="file"
          accept=".json"
          class="hidden"
          @change="handleImport"
        />
      </label>
      <button
        @click="clearStorage"
        class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        🗑️ Clear Storage
      </button>
      <div v-if="importMessage" :class="['px-4 py-2 rounded font-semibold', importMessage.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700']">
        {{ importMessage.text }}
      </div>
    </div>

    <!-- Realm Builder -->
    <div v-if="showBuilder" class="mb-8 p-4 bg-white border border-green-200 rounded-lg">
      <RealmBuilder :realm-id="editingRealmId" @close="closeBuilder" />
    </div>

    <!-- Realms List -->
    <div v-if="realms.length > 0" class="space-y-4">
      <h2 class="text-2xl font-semibold mb-4">Your Realms</h2>
      <div v-for="realm in realms" :key="realm.id" class="border border-gray-200 rounded-lg p-4 bg-white">
        <div class="flex justify-between items-center mb-2">
          <h3 class="text-xl font-bold">{{ realm.name }}</h3>
          <div class="text-sm text-gray-600">
            <span class="font-semibold">Realm Value:</span> {{ realm.realmValue.toLocaleString() }}
          </div>
        </div>
        <p class="text-gray-600 mb-2">
          <span class="font-semibold">Government:</span> {{ realm.government.type }} |
          <span class="font-semibold ml-4">Population:</span> {{ realm.fundsAndPeople.population }} /
          {{ realm.fundsAndPeople.maxPopulation }}
        </p>
        <p class="text-gray-600 mb-4">
          <span class="font-semibold">Area:</span> {{ realm.surroundings.totalArea }} mi² |
          <span class="font-semibold ml-4">Terrain:</span> {{ realm.surroundings.terrain }}
        </p>
        <RealmDisplay :realm="realm" @edit="editRealm(realm)" @delete="deleteRealmFn(realm.id)" />
      </div>
    </div>
    <div v-else class="text-center py-8 text-gray-600">
      <p class="text-lg">No realms yet. Create one to get started!</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRealms } from '~/composables/useRealms'
import type { Realm } from '~/types/realm'

const user = useSupabaseUser()

if (!user.value) {
  await navigateTo('/auth/login')
}

const { realms, loadRealms, deleteRealm, exportRealms: exportRealmsComposable, importRealms: importRealmsComposable } = useRealms()
const showBuilder = ref(false)
const editingRealmId = ref<string>()
const fileInput = ref<HTMLInputElement>()
const importMessage = ref<{ type: 'success' | 'error'; text: string } | null>(null)

onMounted(() => {
  console.log('Realms page mounted, loading realms...')
  loadRealms()
  console.log('After loadRealms, realms count:', realms.value.length)
})

const closeBuilder = () => {
  showBuilder.value = false
  editingRealmId.value = undefined
}

const exportRealms = () => {
  exportRealmsComposable()
}

const handleImport = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  try {
    await importRealmsComposable(file)
    importMessage.value = { type: 'success', text: '✓ Realms imported successfully!' }
    setTimeout(() => {
      importMessage.value = null
    }, 3000)
  } catch (error) {
    importMessage.value = { type: 'error', text: `✗ Import failed: ${error}` }
    setTimeout(() => {
      importMessage.value = null
    }, 5000)
  }

  // Reset file input
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

const editRealm = (realm: Readonly<Realm>) => {
  editingRealmId.value = realm.id
  showBuilder.value = true
}

const deleteRealmFn = (id: string) => {
  if (confirm('Are you sure you want to delete this realm?')) {
    deleteRealm(id)
  }
}

const clearStorage = () => {
  if (confirm('Are you sure you want to clear all realm data? This cannot be undone.')) {
    localStorage.removeItem('realms')
    loadRealms()
    console.log('Storage cleared')
  }
}
</script>