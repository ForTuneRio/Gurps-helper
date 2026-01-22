<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-2xl font-semibold mb-6">GURPS Ritual Path Magic</h2>

      <!-- Tab Navigation -->
      <div class="flex border-b border-gray-200 mb-6">
        <button
          @click="activeTab = 'crafter'"
          :class="['py-2 px-4 font-medium text-sm', activeTab === 'crafter' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700']"
        >
          Spell Crafter
        </button>
        <button
          @click="activeTab = 'roller'"
          :class="['py-2 px-4 font-medium text-sm', activeTab === 'roller' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700']"
        >
          Spell Roller
        </button>
      </div>

      <!-- Spell Crafter Tab -->
      <div v-if="activeTab === 'crafter'" class="space-y-6">
        <div>
          <h3 class="text-lg font-semibold mb-4">Build Your Spell</h3>

          <form @submit.prevent="craftSpell" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label for="spellName" class="block text-sm font-medium text-gray-700 mb-1">
                  Spell Name
                </label>
                <input
                  id="spellName"
                  v-model="craftForm.name"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter spell name"
                />
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Spell Effects
              </label>
              <div class="grid grid-cols-1 md:grid-cols-4 gap-2 items-end">
                <select v-model="effectDraft.path" class="input">
                  <option disabled value="">Path</option>
                  <option v-for="p in paths" :key="p" :value="p">{{ p }}</option>
                </select>
                <select v-model="effectDraft.action" class="input">
                  <option v-for="a in actions" :key="a" :value="a">{{ a }}</option>
                </select>
                <select v-model="effectDraft.strength" class="input">
                  <option value="Lesser">Lesser</option>
                  <option value="Greater">Greater</option>
                </select>
                <button
                  type="button"
                  @click="addEffect"
                  class="bg-blue-600 text-white px-3 py-2 rounded"
                >
                  Add Effect
                </button>
              </div>
              <ul class="mt-4 space-y-2">
                <li
                  v-for="(effect, i) in selectedEffects"
                  :key="i"
                  class="flex justify-between items-center bg-gray-100 px-3 py-2 rounded"
                >
                  <span>{{ effect.name }} — {{ effect.cost }}</span>
                  <button
                    @click="selectedEffects.splice(i, 1)"
                    class="text-red-600 text-sm"
                  >
                    Remove
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Modifiers
              </label>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Modifiers
                </label>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  <label
                    v-for="modifier in craftForm.modifiers"
                    :key="modifier.name"
                    class="flex items-center gap-2 text-sm"
                  >
                    <input
                      type="checkbox"
                      v-model="modifier.enabled"
                      class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span class="min-w-[120px]">{{ modifier.name }}</span>
                    <input
                      v-if="modifier.enabled"
                      type="number"
                      v-model.number="modifier.value"
                      min="0"
                      class="w-16 rounded border border-gray-300 px-2 py-1 text-sm"
                    />
                  </label>
                </div>
              </div>
            </div>
            <button
              type="submit"
              class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
              :disabled="crafting"
            >
              {{ crafting ? 'Crafting...' : 'Craft Spell' }}
            </button>
          </form>
        </div>

        <div v-if="craftedSpell" class="p-4 bg-gray-50 rounded-md">
          <h4 class="text-lg font-semibold mb-3">Spell Details</h4>
          <div class="space-y-2">
            <p><strong>Name:</strong> {{ craftedSpell.name }}</p>
            <p><strong>Effects:</strong> {{ craftedSpell.effects.map(e => e.name).join(', ') }}</p>
            <p><strong>Modifiers:</strong>{{ craftedSpell.modifiers.map(m => `${m.name} (${m.cost})`).join(', ') }}</p>
            <p><strong>Greater Effects:</strong> {{ craftedSpell.greaterEffects }}</p>
            <p><strong>Total Energy Required:</strong> <span class="text-xl font-bold text-blue-600">{{ craftedSpell.totalEnergy }}</span></p>
          </div>
        </div>
      </div>

      <!-- Spell Roller Tab -->
      <div v-if="activeTab === 'roller'" class="space-y-6">
        <div>
          <h3 class="text-lg font-semibold mb-4">Cast Your Spell</h3>

          <form @submit.prevent="castSpell" class="space-y-4">
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

        <div v-if="castResult" class="p-4 bg-gray-50 rounded-md">
          <h4 class="text-lg font-semibold mb-3">Casting Results</h4>
          <div class="space-y-3">
            <div class="grid grid-cols-2 gap-4">
              <p><strong>Spell:</strong> {{ castResult.spellName }}</p>
              <p><strong>Required Energy:</strong> {{ castResult.requiredEnergy }}</p>
              <p><strong>Effective Cap:</strong> {{ castResult.cap }}</p>
              <p><strong>Path Skill:</strong> {{ castResult.skill }}</p>
            </div>

            <div>
              <p><strong>Total Energy Gathered:</strong> <span class="text-xl font-bold">{{ castResult.totalEnergy }}</span></p>
              <p><strong>Success:</strong>
                <span :class="castResult.success ? 'text-green-600 font-bold' : 'text-red-600 font-bold'">
                  {{ castResult.success ? 'YES' : 'NO' }}
                </span>
              </p>
              <p v-if="castResult.criticalFailure" class="text-red-600 font-bold">
                <strong>CRITICAL FAILURE!</strong> Botch occurred!
              </p>
            </div>

            <div>
              <h5 class="font-semibold mb-2">Casting Rolls ({{ castResult.rolls.length }} attempts):</h5>
              <div class="space-y-1 max-h-40 overflow-y-auto">
                <div v-for="(roll, index) in castResult.rolls" :key="index" class="text-sm">
                  <span>Attempt {{ index + 1 }}: </span>
                  <span :class="roll.critical ? 'text-green-600 font-bold' : roll.criticalFailure ? 'text-red-600 font-bold' : roll.success ? 'text-blue-600' : 'text-orange-600'">
                    {{ roll.roll }} ({{ roll.energy }} energy)
                    <span v-if="roll.critical"> - CRITICAL SUCCESS!</span>
                    <span v-else-if="roll.criticalFailure"> - CRITICAL FAILURE!</span>
                    <span v-else-if="roll.quirk"> - Quirk</span>
                  </span>
                </div>
              </div>
            </div>

            <div v-if="castResult.quirks.length > 0">
              <h5 class="font-semibold mb-2">Quirks:</h5>
              <ul class="list-disc list-inside text-sm">
                <li v-for="quirk in castResult.quirks" :key="quirk">{{ quirk }}</li>
              </ul>
            </div>
          </div>
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
import { type SpellCraft, type CastingResult, type MagicPath, type EffectDraft, type SpellEffect, type EffectAction, type ModifierState, MAGIC_PATHS, EFFECT_ACTIONS, MODIFIERS, type ModifierName } from '~/types/magic'

const { craftSpellFn, castSpell: castSpellFn } = useMagicCalculator()

const activeTab = ref<'crafter' | 'roller'>('crafter')

const effectDraft = ref<EffectDraft>({
  path: '' as MagicPath,
  action: 'Sense',
  strength: 'Lesser'
})

const selectedEffects = ref<SpellEffect[]>([])
const paths = ref<MagicPath[]>([...MAGIC_PATHS])
const actions = ref<EffectAction[]>([...EFFECT_ACTIONS])
const commonModifiers = ref<ModifierName[]>([...MODIFIERS])

const ACTION_COST: Record<EffectAction, number> = {
  Sense: 2,
  Strengthen: 3,
  Restore: 4,
  Control: 5,
  Destroy: 5,
  Create: 6,
  Transform: 8
}

const addEffect = () => {
  const { path, action, strength } = effectDraft.value
  if (!path) return

  const greater = strength === 'Greater'
  const baseCost = ACTION_COST[action]
  const cost = greater ? baseCost : baseCost

  selectedEffects.value.push({
    name: `${strength} ${action} (${path})`,
    path,
    cost,
    greater
  })
}


// Spell Crafter
const craftForm = ref({
  name: '',
  selectedEffects: [] as string[],
  modifiers: commonModifiers.value.map(name => ({
    name,
    enabled: false,
    value: 0
  })) as ModifierState[]
})

const craftedSpell = ref<SpellCraft | null>(null)
const crafting = ref(false)

// Spell Roller
const castForm = ref({
  spellName: '',
  requiredEnergy: 1,
  cap: 15,
  skill: 12
})

const castResult = ref<CastingResult | null>(null)
const casting = ref(false)

const error = ref('')

const selectedModifiers = computed(() =>
  craftForm.value.modifiers
    .filter(m => m.enabled)
    .map(m => ({
      name: m.name,
      cost: m.value,
      type: 'modifier' as const
    }))
)


const craftSpell = async () => {
  crafting.value = true
  error.value = ''

  try {
    craftedSpell.value = craftSpellFn(
      craftForm.value.name,
      selectedEffects.value,
      selectedModifiers.value
    )
  } catch {
    error.value = 'Error crafting spell. Please check your inputs.'
  } finally {
    crafting.value = false
  }
}

const castSpell = async () => {
  casting.value = true
  error.value = ''

  try {
    castResult.value = castSpellFn(
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