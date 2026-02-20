<template>
  <div>
    <h1 class="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">Spaceships</h1>
    <div class="mb-4">
      <NuxtLink to="/spaceships/new" class="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
        Create New Spaceship
      </NuxtLink>
    </div>
    <SpaceshipSheet />
  </div>
</template>
<script setup lang="ts">
const user = useSupabaseUser()

if (!user.value) {
  await navigateTo('/auth/login')
}
</script>