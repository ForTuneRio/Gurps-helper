<template>
    <div>
        <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Build Your Spell</h3>

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
              maxlength="100"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter spell name"
            />
            </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
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
              :disabled="selectedEffects.length >= MAX_EFFECTS"
              class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded"
            >
                Add Effect
            </button>
            </div>
            <ul class="mt-4 space-y-2">
            <li
                v-for="(effect, i) in selectedEffects"
                :key="i"
              class="flex justify-between items-center bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded"
            >
              <span class="text-gray-900 dark:text-gray-100">{{ effect.name }} — {{ effect.cost }}</span>
                <button
                @click="selectedEffects.splice(i, 1)"
              class="text-red-600 dark:text-red-400 text-sm"
                >
                Remove
                </button>
            </li>
            </ul>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Modifiers
          </label>
            <div>
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
                      max="1000"
                      maxlength="30"
                      data-max="1000"
                      @input="clampNumberInput"
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

    <div v-if="craftedSpell" class="p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
      <h4 class="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">Spell Details</h4>
        <div class="space-y-2">
      <p class="text-gray-900 dark:text-gray-100"><strong>Name:</strong> {{ craftedSpell.name }}</p>
      <p class="text-gray-900 dark:text-gray-100"><strong>Effects:</strong> {{ craftedSpell.effects.map(e => e.name).join(', ') }}</p>
      <p class="text-gray-900 dark:text-gray-100"><strong>Modifiers:</strong>{{ craftedSpell.modifiers.map(m => `${m.name} (${m.cost})`).join(', ') }}</p>
      <p class="text-gray-900 dark:text-gray-100"><strong>Greater Effects:</strong> {{ craftedSpell.greaterEffects }}</p>
      <p class="text-gray-900 dark:text-gray-100"><strong>Total Energy Required:</strong> <span class="text-xl font-bold text-blue-600 dark:text-blue-400">{{ craftedSpell.totalEnergy }}</span></p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { type SpellCraft, type MagicPath, type EffectDraft, type SpellEffect, type EffectAction, type ModifierState, MAGIC_PATHS, EFFECT_ACTIONS, MODIFIERS, type ModifierName } from '~/types/magic'

const { craftSpellFn } = useMagicCalculator()

const effectDraft = ref<EffectDraft>({
  path: 'Body' as MagicPath,
  action: 'Sense',
  strength: 'Lesser'
})

const MAX_NUMBER_LENGTH = 30
const MAX_EFFECTS = 30

const clampNumberInput = (event: Event) => {
  const target = event.target as HTMLInputElement | null
  if (!target) return

  let value = target.value
  if (value.length > MAX_NUMBER_LENGTH) {
    value = value.slice(0, MAX_NUMBER_LENGTH)
  }

  if (value === '' || value === '-' || value === '.' || value === '-.') {
    target.value = value
    return
  }

  const numeric = Number(value)
  if (!Number.isFinite(numeric)) {
    target.value = value
    return
  }

  const maxAttr = target.getAttribute('data-max')
  const minAttr = target.getAttribute('data-min')
  let clamped = numeric

  if (maxAttr !== null) {
    const maxValue = Number(maxAttr)
    if (Number.isFinite(maxValue)) {
      clamped = Math.min(clamped, maxValue)
    }
  }

  if (minAttr !== null) {
    const minValue = Number(minAttr)
    if (Number.isFinite(minValue)) {
      clamped = Math.max(clamped, minValue)
    }
  }

  if (clamped !== numeric) {
    value = String(clamped)
  }

  target.value = value
}

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

  if (selectedEffects.value.length >= MAX_EFFECTS) {
    error.value = `You can select up to ${MAX_EFFECTS} effects.`
    return
  }

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
</script>
