<template>
  <button
    type="button"
    class="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 cursor-help text-xs font-bold hover:bg-blue-200 dark:hover:bg-blue-800 transition"
    @click.prevent.stop="open"
  >
    i
  </button>

  <Teleport to="body">
    <Transition name="slide-panel">
      <div
        v-if="isOpen()"
        class="fixed right-0 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm rounded-md px-6 py-4 w-full max-w-[95vw] md:w-[480px] md:max-w-[480px] max-h-[80vh] overflow-y-auto shadow-lg border border-gray-300 dark:border-gray-700 z-50"
        @click.stop
      >
        <button
          type="button"
          @click="close"
          class="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7m0 0l-7 7m7-7H5"></path>
          </svg>
        </button>

        <p v-if="title" class="font-semibold mb-3 pr-8">{{ title }}</p>
        <div class="font-normal">
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { useInfoBox } from '~/composables/useInfoBox'

defineProps<{
  title?: string
}>()

const { open, close, isOpen } = useInfoBox()
</script>

<style scoped>
.inline-flex:hover {
  transition: background-color 0.2s ease-in-out
}

.slide-panel-enter-active {
  animation: slideInLeft 0.3s ease-out;
}

.slide-panel-leave-active {
  animation: slideOutRight 0.3s ease-in;
}

@keyframes slideInLeft {
  from {
    transform: translateX(100%) translateY(-50%);
    opacity: 0;
  }
  to {
    transform: translateX(0) translateY(-50%);
    opacity: 1;
  }
}

@keyframes slideOutRight {
  from {
    transform: translateX(0) translateY(-50%);
    opacity: 1;
  }
  to {
    transform: translateX(100%) translateY(-50%);
    opacity: 0;
  }
}
</style>
