<template>
  <div>
    <header class="bg-gray-800 text-white p-4">
      <nav class="container mx-auto flex justify-between items-center">
        <NuxtLink to="/" class="text-xl font-bold">GURPS Helper</NuxtLink>
        <ul class="flex space-x-4">
          <li><NuxtLink to="/realms" class="hover:underline">Realms</NuxtLink></li>
          <li><NuxtLink to="/spaceships" class="hover:underline">Spaceships</NuxtLink></li>
          <li><NuxtLink to="/calculator" class="hover:underline">Magic Calculator</NuxtLink></li>
        </ul>
      </nav>
    </header>
    <main class="container mx-auto p-4">
      <slot />
    </main>
    <footer class="bg-gray-800 text-white p-4 text-center">
      <p>&copy; 2026 GURPS Helper App</p>
    </footer>
  </div>
</template>