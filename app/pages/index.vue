<template>
  <div class="text-center">
    <h1 class="text-4xl font-bold mb-4">Welcome to GURPS Helper</h1>
    <p class="text-lg mb-8">Create and manage your GURPS realm lists and spaceship sheets with automatic ritual path magic calculations.</p>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <NuxtLink to="/realms" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
        Realms
      </NuxtLink>
      <NuxtLink to="/spaceships" class="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
        Spaceships
      </NuxtLink>
      <NuxtLink to="/calculator" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
        Magic Calculator
      </NuxtLink>
    </div>
  </div>
</template>