<template>
  <div class="min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
    <header class="bg-gray-800 text-white p-4 shadow-lg dark:bg-gray-950">
      <nav class="container mx-auto flex justify-between items-center">
        <NuxtLink to="/" class="text-xl font-bold hover:text-blue-300 transition">
          GURPS Helper
        </NuxtLink>
        
        <div class="flex items-center gap-4">
          <button
            type="button"
            @click="toggleTheme"
            class="bg-gray-700/60 hover:bg-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 p-2 rounded-full transition"
            title="Toggle theme"
          >
            <ClientOnly>
              <SunIcon v-if="isDark" class="w-5 h-5 text-yellow-300" />
              <MoonIcon v-else class="w-5 h-5 text-gray-200" />
              <template #fallback>
                <span class="block w-5 h-5" aria-hidden="true"></span>
              </template>
            </ClientOnly>
          </button>
          <template v-if="isAuthenticated">
            <span class="text-gray-400 dark:text-gray-300 text-sm">
              {{ user?.email }}
            </span>
            <button 
              @click="handleSignOut"
              class="bg-red-600 hover:bg-red-700 p-2 rounded-full transition"
              title="Log Out"
            >
              <ArrowRightOnRectangleIcon class="w-5 h-5" />
            </button>
          </template>
          <template v-else>
            <NuxtLink 
              to="/auth/login" 
              class="bg-green-600 hover:bg-green-700 p-2 rounded-full transition"
              title="Account"
            >
              <UserIcon class="w-5 h-5" />
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
import { computed } from 'vue'
import { UserIcon, ArrowRightOnRectangleIcon, SunIcon, MoonIcon } from '@heroicons/vue/24/solid'

const { user, isAuthenticated, signOut } = useAuth()
const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')

const toggleTheme = () => {
  colorMode.preference = isDark.value ? 'light' : 'dark'
}

const handleSignOut = async () => {
  const confirmed = window.confirm('Are you sure you want to log out?')
  if (confirmed) {
    await signOut()
  }
}
</script>