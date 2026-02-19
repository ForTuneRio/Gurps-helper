<template>
  <div>
    <header class="bg-gray-800 text-white p-4 shadow-lg">
      <nav class="container mx-auto flex justify-between items-center">
        <NuxtLink to="/" class="text-xl font-bold hover:text-blue-300 transition">
          GURPS Helper
        </NuxtLink>
        
        <div class="flex items-center gap-4">
          <template v-if="isAuthenticated">
            <span class="text-gray-400 text-sm">
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
import { UserIcon, ArrowRightOnRectangleIcon } from '@heroicons/vue/24/solid'

const { user, isAuthenticated, signOut } = useAuth()

const handleSignOut = async () => {
  const confirmed = window.confirm('Are you sure you want to log out?')
  if (confirmed) {
    await signOut()
  }
}
</script>