<template>
  <div class="inline-block">
    <div
      class="relative inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 cursor-help text-xs font-bold"
      @mouseenter="showTooltip = true"
      @mouseleave="showTooltip = false"
    >
      i
      <div
        v-if="showTooltip"
        class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-50"
      >
        <div
          class="bg-gray-900 dark:bg-gray-800 text-white dark:text-gray-100 text-sm rounded-md px-3 py-2 max-w-xs whitespace-normal shadow-lg border border-gray-700"
        >
          <p v-if="title" class="font-semibold mb-1">{{ title }}</p>
          <p>{{ description }}</p>
          <div
            class="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900 dark:border-t-gray-800"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  title?: string
  description: string
}>()

const showTooltip = ref(false)
</script>

<style scoped>
/* Additional hover effects */
div:hover {
  transition: opacity 0.2s ease-in-out
}
</style>
