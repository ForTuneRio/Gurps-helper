<template>
  <div>
    <header class="bg-gray-800 text-white p-4">
      <nav class="container mx-auto flex justify-between items-center">
        <NuxtLink to="/" class="text-xl font-bold">GURPS Helper</NuxtLink>
      </nav>
    </header>
    <main class="container mx-auto p-4">
      <slot />
    </main>
  </div>
</template>