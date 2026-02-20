<template>
<div>
    <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Cast Your Spell</h3>
    <form @submit.prevent="castSpellfn" class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
            <label for="castSpellName" class="block text-sm font-medium text-gray-700 mb-1">
                Spell Name
            </label>
            <input
                id="castSpellName"
                v-model="castForm.spellName"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter spell name"
            />
            </div>

            <div>
            <label for="requiredEnergy" class="block text-sm font-medium text-gray-700 mb-1">
                Required Energy
            </label>
            <input
                id="requiredEnergy"
                v-model.number="castForm.requiredEnergy"
                type="number"
                min="1"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            </div>

            <div>
            <label for="cap" class="block text-sm font-medium text-gray-700 mb-1">
                Effective Cap
            </label>
            <input
                id="cap"
                v-model.number="castForm.cap"
                type="number"
                min="1"
                max="50"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            </div>

            <div>
            <label for="skill" class="block text-sm font-medium text-gray-700 mb-1">
                Path Skill
            </label>
            <input
                id="skill"
                v-model.number="castForm.skill"
                type="number"
                min="1"
                max="50"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            </div>
        </div>

        <button
            type="submit"
            class="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
            :disabled="casting"
        >
            {{ casting ? 'Casting...' : 'Cast Spell' }}
        </button>
    </form>
    </div>

    <div v-if="result" class="p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
        <h4 class="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">Casting Results</h4>
        <div class="space-y-3">
        <div class="grid grid-cols-2 gap-4">
            <p class="text-gray-900 dark:text-gray-100"><strong>Spell:</strong> {{ result.spellName }}</p>
            <p class="text-gray-900 dark:text-gray-100"><strong>Required Energy:</strong> {{ result.requiredEnergy }}</p>
            <p class="text-gray-900 dark:text-gray-100"><strong>Effective Cap:</strong> {{ result.cap }}</p>
            <p class="text-gray-900 dark:text-gray-100"><strong>Path Skill:</strong> {{ result.skill }}</p>
        </div>

        <div>
            <p class="text-gray-900 dark:text-gray-100"><strong>Total Energy Gathered:</strong> <span class="text-xl font-bold">{{ result.totalEnergy }}</span></p>
            <p class="text-gray-900 dark:text-gray-100"><strong>Success:</strong>
            <span :class="result.success ? 'text-green-600 font-bold' : 'text-red-600 font-bold'">
                {{ result.success ? 'YES' : 'NO' }}
            </span>
            </p>
            <p v-if="result.criticalFailure" class="text-red-600 dark:text-red-400 font-bold">
            <strong>CRITICAL FAILURE!</strong> Botch occurred!
            </p>
        </div>

        <div>
            <h5 class="font-semibold mb-2 text-gray-900 dark:text-gray-100">Casting Rolls ({{ result.rolls.length }} attempts):</h5>
            <div class="space-y-1 max-h-40 overflow-y-auto">
            <div v-for="(roll, index) in result.rolls" :key="index" class="text-sm">
                <span class="text-gray-700 dark:text-gray-300">Attempt {{ index + 1 }}: </span>
                <span :class="roll.critical ? 'text-green-600 font-bold' : roll.criticalFailure ? 'text-red-600 font-bold' : roll.success ? 'text-blue-600' : 'text-orange-600'">
                {{ roll.roll }} ({{ roll.energy }} energy)
                <span v-if="roll.critical"> - CRITICAL SUCCESS!</span>
                <span v-else-if="roll.criticalFailure"> - CRITICAL FAILURE!</span>
                <span v-else-if="roll.quirk"> - Quirk</span>
                </span>
            </div>
            </div>
        </div>

        <div v-if="result.quirks.length > 0">
            <h5 class="font-semibold mb-2 text-gray-900 dark:text-gray-100">Quirks:</h5>
            <ul class="list-disc list-inside text-sm text-gray-900 dark:text-gray-100">
            <li v-for="quirk in result.quirks" :key="quirk">{{ quirk }}</li>
            </ul>
        </div>
    </div>
    <div v-if="error" class="mt-4 p-4 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-md">
        <p class="text-red-700 dark:text-red-200">{{ error }}</p>
      </div>
</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { CastingResult } from '~/types/magic'
const { castSpell } = useMagicCalculator()

const result = ref<CastingResult | null>(null)
const casting = ref(false)

const castForm = ref({
  spellName: '',
  requiredEnergy: 1,
  cap: 15,
  skill: 12
})

const error = ref('')

const castSpellfn = async () => {
  casting.value = true
  error.value = ''

  try {
    result.value = castSpell(
      castForm.value.spellName,
      castForm.value.requiredEnergy,
      castForm.value.cap,
      castForm.value.skill
    )
  } catch (err) {
    error.value = 'Error casting spell. Please check your inputs.'
  } finally {
    casting.value = false
  }
}
</script>
