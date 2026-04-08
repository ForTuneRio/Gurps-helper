<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
    <div class="w-full max-w-2xl rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
      <!-- Header -->
      <div class="mb-4 flex items-center justify-between">
        <h2 class="text-lg font-bold text-gray-900 dark:text-white">
          {{ companyName }} - Casualty Calculator
        </h2>
        <button
          type="button"
          @click="close"
          class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          title="Close"
        >
          <XMarkIcon class="h-6 w-6" />
        </button>
      </div>

      <!-- Loss Percentage Input -->
      <div class="mb-6 rounded-lg bg-gray-50 p-4 dark:bg-gray-900/40">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
          Casualty Percentage
        </label>
        <div class="flex items-center gap-2">
          <input
            v-model.number="lossPercentage"
            type="number"
            min="0"
            max="100"
            step="0.1"
            @input="updatePreview"
            class="w-24 rounded border border-gray-300 px-3 py-2 text-sm font-medium focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          />
          <span class="text-sm font-medium text-gray-700 dark:text-gray-300">%</span>
        </div>
      </div>

      <!-- Current Units Display -->
      <div class="mb-6">
        <h3 class="mb-3 text-sm font-semibold text-gray-900 dark:text-white">Current Units</h3>
        <div class="max-h-96 overflow-y-auto rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
          <div v-if="units.length === 0" class="p-4 text-center text-sm text-gray-500 dark:text-gray-400">
            No units in this company
          </div>
          <div v-else class="divide-y divide-gray-200 dark:divide-gray-700">
            <div
              v-for="(unit, index) in units"
              :key="unit.id"
              class="border-b border-gray-100 p-3 last:border-b-0 dark:border-gray-700"
            >
              <div class="flex items-center justify-between gap-4">
                <div class="flex-1 min-w-0">
                  <div class="text-sm font-medium text-gray-900 dark:text-white">
                    {{ unit.name || `Unit ${index + 1}` }}
                  </div>
                  <div class="text-xs text-gray-500 dark:text-gray-400">
                    Class: {{ unit.class || '-' }}
                  </div>
                </div>
                <div class="text-right">
                  <div class="text-sm font-semibold text-gray-900 dark:text-white">
                    {{ unit.amount }}
                  </div>
                  <div class="text-xs text-gray-500 dark:text-gray-400">Current</div>
                </div>
                <div class="w-px h-8 bg-gray-200 dark:bg-gray-700"></div>
                <div class="text-right">
                  <div class="text-sm font-semibold text-amber-600 dark:text-amber-400">
                    {{ (preview[unit.id]?.afterCasualties || 0).toLocaleString('en-US', { maximumFractionDigits: 2 }) }}
                  </div>
                  <div class="text-xs text-gray-500 dark:text-gray-400">After {{ lossPercentage }}%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Summary -->
      <div v-if="units.length > 0" class="mb-6 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
        <div class="grid grid-cols-3 gap-4 text-center">
          <div>
            <div class="text-xs font-medium text-gray-600 dark:text-gray-400">Total Before</div>
            <div class="text-lg font-bold text-gray-900 dark:text-white">
              {{ totalBefore.toLocaleString('en-US', { maximumFractionDigits: 2 }) }}
            </div>
          </div>
          <div>
            <div class="text-xs font-medium text-red-600 dark:text-red-400">Total Casualties</div>
            <div class="text-lg font-bold text-red-700 dark:text-red-400">
              -{{ totalCasualties.toLocaleString('en-US', { maximumFractionDigits: 2 }) }}
            </div>
          </div>
          <div>
            <div class="text-xs font-medium text-amber-600 dark:text-amber-400">Total After</div>
            <div class="text-lg font-bold text-amber-700 dark:text-amber-400">
              {{ totalAfter.toLocaleString('en-US', { maximumFractionDigits: 2 }) }}
            </div>
          </div>
        </div>
      </div>

      <!-- Confirmation Message -->
      <div v-if="showConfirmation" class="mb-6 rounded-lg border-l-4 border-red-500 bg-red-50 p-4 dark:bg-red-900/20">
        <p class="text-sm font-medium text-red-800 dark:text-red-200">
          ⚠️ Are you sure you want to apply {{ lossPercentage }}% casualties to this company?
        </p>
        <p class="mt-2 text-xs text-red-700 dark:text-red-300">
          This will reduce {{ totalBefore.toLocaleString('en-US', { maximumFractionDigits: 2 }) }} units to {{ totalAfter.toLocaleString('en-US', { maximumFractionDigits: 2 }) }} units.
        </p>
      </div>

      <!-- Actions -->
      <div class="flex justify-end gap-3">
        <button
          type="button"
          @click="close"
          class="rounded border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          Cancel
        </button>
        <button
          type="button"
          @click="toggleConfirmation"
          :disabled="lossPercentage <= 0 || units.length === 0"
          class="rounded bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ showConfirmation ? 'Confirm Casualties' : 'Apply Casualties' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import type { ArmyUnit, ArmyCompany } from '~/types/realm'

interface Props {
  isOpen: boolean
  company: ArmyCompany | null
}

interface Emits {
  (e: 'close'): void
  (e: 'apply-casualties', units: ArmyUnit[]): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const lossPercentage = ref(0)
const showConfirmation = ref(false)
const preview = ref<Record<string, { afterCasualties: number }>>({})

const units = computed(() => props.company?.units || [])
const companyName = computed(() => props.company?.name || 'Company')

const totalBefore = computed(() => {
  return units.value.reduce((sum, unit) => sum + unit.amount, 0)
})

const totalAfter = computed(() => {
  const survivalRate = 1 - lossPercentage.value / 100
  return units.value.reduce((sum, unit) => sum + unit.amount * survivalRate, 0)
})

const totalCasualties = computed(() => {
  return Number((totalBefore.value - totalAfter.value).toFixed(2))
})

const updatePreview = () => {
  const survivalRate = 1 - lossPercentage.value / 100
  const newPreview: Record<string, { afterCasualties: number }> = {}

  units.value.forEach((unit) => {
    const afterCasualties = Number((unit.amount * survivalRate).toFixed(2))
    newPreview[unit.id] = { afterCasualties }
  })

  preview.value = newPreview
  showConfirmation.value = false
}

const toggleConfirmation = () => {
  if (!showConfirmation.value) {
    showConfirmation.value = true
  } else {
    applyCasualties()
  }
}

const applyCasualties = () => {
  const survivalRate = 1 - lossPercentage.value / 100
  const updatedUnits = units.value.map((unit) => ({
    ...unit,
    amount: Number((unit.amount * survivalRate).toFixed(2)),
  }))

  emit('apply-casualties', updatedUnits)
  close()
}

const close = () => {
  lossPercentage.value = 0
  showConfirmation.value = false
  preview.value = {}
  emit('close')
}

// Initialize preview when company changes
watch(() => props.company, () => {
  lossPercentage.value = 0
  showConfirmation.value = false
  preview.value = {}
})
</script>
