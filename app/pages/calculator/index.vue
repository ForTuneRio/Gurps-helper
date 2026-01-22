<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-2xl font-semibold mb-6">
        GURPS Ritual Path Magic
      </h2>

      <!-- Tabs -->
      <div class="flex border-b border-gray-200 mb-6">
        <button
          @click="activeTab = 'crafter'"
          :class="tabClass('crafter')"
        >
          Spell Crafter
        </button>
        <button
          @click="activeTab = 'roller'"
          :class="tabClass('roller')"
        >
          Spell Roller
        </button>
      </div>

      <!-- Content -->
      <SpellCrafter v-if="activeTab === 'crafter'" />
      <SpellRoller v-else />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref<'crafter' | 'roller'>('crafter')

const tabClass = (tab: 'crafter' | 'roller') => [
  'py-2 px-4 font-medium text-sm',
  activeTab.value === tab
    ? 'border-b-2 border-blue-500 text-blue-600'
    : 'text-gray-500 hover:text-gray-700'
]
</script>
