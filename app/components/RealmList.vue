<template>
  <div class="border p-4 rounded">
    <h2 class="text-xl font-semibold mb-4">Realm List</h2>
    <ul>
      <li v-for="realm in realms" :key="realm.id" class="mb-2">
        {{ realm.name }} - {{ realm.description }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
// Placeholder for realm data
const realms = ref([
  { id: 1, name: 'Fantasy Realm', description: 'A magical world' },
  { id: 2, name: 'Sci-Fi Realm', description: 'A futuristic world' }
])
</script>