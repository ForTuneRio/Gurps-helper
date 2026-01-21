<template>
  <div class="max-w-2xl mx-auto">
    <div class="bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-2xl font-semibold mb-6">Calculate Ritual Path Magic</h2>

      <form @submit.prevent="calculateMagic" class="space-y-4">
        <div>
          <label for="ritual" class="block text-sm font-medium text-gray-700 mb-1">
            Ritual Name
          </label>
          <input
            id="ritual"
            v-model="form.ritual"
            type="text"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter ritual name"
          />
        </div>

        <div>
          <label for="path" class="block text-sm font-medium text-gray-700 mb-1">
            Magic Path
          </label>
          <select
            id="path"
            v-model="form.path"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a path</option>
            <option value="fire">Fire</option>
            <option value="water">Water</option>
            <option value="earth">Earth</option>
            <option value="air">Air</option>
            <option value="spirit">Spirit</option>
            <option value="necromancy">Necromancy</option>
            <option value="illusion">Illusion</option>
            <option value="healing">Healing</option>
          </select>
        </div>

        <div>
          <label for="power" class="block text-sm font-medium text-gray-700 mb-1">
            Power Level (1-20)
          </label>
          <input
            id="power"
            v-model.number="form.power"
            type="number"
            min="1"
            max="20"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label for="modifiers" class="block text-sm font-medium text-gray-700 mb-1">
            Modifiers (comma-separated)
          </label>
          <input
            id="modifiers"
            v-model="form.modifiers"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., +2, -1, +3"
          />
        </div>

        <button
          type="submit"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
          :disabled="loading"
        >
          {{ loading ? 'Calculating...' : 'Calculate Magic' }}
        </button>
      </form>

      <div v-if="result" class="mt-6 p-4 bg-gray-50 rounded-md">
        <h3 class="text-lg font-semibold mb-2">Calculation Result</h3>
        <div class="space-y-2">
          <p><strong>Ritual:</strong> {{ result.ritual }}</p>
          <p><strong>Path:</strong> {{ result.path }}</p>
          <p><strong>Base Power:</strong> {{ result.basePower }}</p>
          <p><strong>Modifiers:</strong> {{ result.totalModifiers }}</p>
          <p><strong>Final Result:</strong> <span class="text-xl font-bold text-blue-600">{{ result.finalResult }}</span></p>
          <p><strong>Success Chance:</strong> {{ result.successChance }}%</p>
        </div>
      </div>

      <div v-if="error" class="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
        <p class="text-red-700">{{ error }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { CalculationResult, RitualForm, MagicPath } from '~/types/magic'

const { calculateRitualMagic, parseModifiers } = useMagicCalculator()

const form = ref<RitualForm>({
  ritual: '',
  path: '' as MagicPath,
  power: 1,
  modifiers: ''
})

const result = ref<CalculationResult | null>(null)
const loading = ref(false)
const error = ref('')

const calculateMagic = async () => {
  loading.value = true
  error.value = ''

  try {
    const modifierArray = parseModifiers(form.value.modifiers)

    result.value = calculateRitualMagic(
      form.value.ritual,
      form.value.path as MagicPath,
      form.value.power,
      modifierArray
    )
  } catch (err) {
    error.value = 'Error calculating magic. Please check your inputs.'
  } finally {
    loading.value = false
  }
}
</script>