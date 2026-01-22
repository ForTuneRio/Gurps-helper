<template>
  <div class="text-center">
    <h1 class="text-4xl font-bold mb-4">Welcome to GURPS Helper</h1>
    <p class="text-lg mb-8">Create and manage your GURPS realm lists and spaceship sheets with automatic ritual path magic calculations.</p>
    <div class="flex flex-col gap-4 max-w-xs mx-auto">
      <NuxtLink to="/realms" class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
        Realms
      </NuxtLink>
      <NuxtLink to="/spaceships" class="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
        Spaceships
      </NuxtLink>
      <NuxtLink to="/calculator" class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
        Magic Calculator
      </NuxtLink>
    </div>
  </div>
</template>