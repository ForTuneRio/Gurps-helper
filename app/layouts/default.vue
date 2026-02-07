<template>
  <div>
    <header class="bg-gray-800 text-white p-4 shadow-lg">
      <nav class="container mx-auto flex justify-between items-center">
        <NuxtLink to="/" class="text-xl font-bold hover:text-blue-300 transition">
          GURPS Helper
        </NuxtLink>
        
        <div class="flex items-center gap-4">
          <template v-if="isAuthenticated">
            <NuxtLink 
              to="/realms" 
              class="hover:text-blue-300 transition"
            >
              Realms
            </NuxtLink>
            <NuxtLink 
              to="/spaceships" 
              class="hover:text-blue-300 transition"
            >
              Spaceships
            </NuxtLink>
            <NuxtLink 
              to="/calculator" 
              class="hover:text-blue-300 transition"
            >
              Magic
            </NuxtLink>
            <span class="text-gray-400 text-sm">
              {{ user?.email }}
            </span>
            <button 
              @click="handleSignOut"
              class="bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition"
            >
              Sign Out
            </button>
          </template>
          <template v-else>
            <NuxtLink 
              to="/auth/login" 
              class="hover:text-blue-300 transition"
            >
              Sign In
            </NuxtLink>
            <NuxtLink 
              to="/auth/register" 
              class="bg-green-600 hover:bg-green-700 px-4 py-2 rounded transition"
            >
              Sign Up
            </NuxtLink>
          </template>
        </div>
      </nav>
    </header>
    <main class="container mx-auto p-4">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
const { user, isAuthenticated, signOut } = useAuth()

const handleSignOut = async () => {
  await signOut()
}
</script>