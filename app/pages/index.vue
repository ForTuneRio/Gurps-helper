<template>
  <div class="text-center text-gray-900 dark:text-gray-100">
    <h1 class="text-4xl font-bold mb-4">Welcome to GURPS Helper</h1>
    <p class="text-lg mb-8 text-gray-600 dark:text-gray-300">Create and manage your GURPS realm lists and spaceship sheets with automatic ritual path magic calculations.</p>
    <div class="flex flex-col gap-4 max-w-xs mx-auto">
      <NuxtLink to="/realms" class="btn-neutral">
        Realms
      </NuxtLink>
      <NuxtLink to="/spaceships" class="btn-neutral">
        Spaceships (TODO)
      </NuxtLink>
      <NuxtLink to="/calculator" class="btn-neutral">
        Magic Calculator
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'GURPS Helper - Free Tools for Realms, Spaceships & Magic',
  meta: [
    {
      name: 'description',
      content: 'Free GURPS helper for managing realms, spaceships, and calculating Ritual Path Magic spells. Open source portfolio project by ForTuneRio.',
    },
    {
      name: 'og:title',
      content: 'GURPS Helper - Free GURPS Tools',
    },
    {
      name: 'og:description',
      content: 'Create and manage GURPS realms, spaceships, and perform Ritual Path Magic calculations.',
    },
  ],
})
</script>