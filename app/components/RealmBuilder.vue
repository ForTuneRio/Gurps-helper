<template>
  <div>
    <h3 class="text-lg font-semibold mb-4">{{ isEditMode ? 'Edit Realm' : 'Build Your Realm' }}</h3>

    <form @submit.prevent="saveRealmFn" class="space-y-6">
      <!-- Realm Name -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label for="realmName" class="block text-sm font-medium text-gray-700 mb-1">
            Realm Name
          </label>
          <input
            id="realmName"
            v-model="realmForm.name"
            type="text"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter realm name"
          />
        </div>
      </div>

      <!-- Surroundings Section -->
      <div class="border-t pt-4">
        <h4 class="text-md font-semibold mb-3 text-green-700">Surroundings</h4>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label for="totalArea" class="block text-sm font-medium text-gray-700 mb-1">
              Total Area (mile²)
            </label>
            <input
              id="totalArea"
              v-model.number="realmForm.surroundings.totalArea"
              type="number"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label for="sizeValue" class="block text-sm font-medium text-gray-700 mb-1">
              Realm Size Value
            </label>
            <input
              id="sizeValue"
              v-model.number="realmForm.surroundings.realmSizeValue"
              type="number"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label for="areaKnowledge" class="block text-sm font-medium text-gray-700 mb-1">
              Area Knowledge Class
            </label>
            <input
              id="areaKnowledge"
              v-model="realmForm.surroundings.areaKnowledgeClass"
              type="text"
              placeholder="e.g., Small county"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label for="defenseBonus" class="block text-sm font-medium text-gray-700 mb-1">
              Defense Bonus
            </label>
            <input
              id="defenseBonus"
              v-model.number="realmForm.surroundings.defenseBonus"
              type="number"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label for="terrain" class="block text-sm font-medium text-gray-700 mb-1">
              Terrain
            </label>
            <input
              id="terrain"
              v-model="realmForm.surroundings.terrain"
              type="text"
              placeholder="e.g., Plains"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label for="habitability" class="block text-sm font-medium text-gray-700 mb-1">
              Habitability
            </label>
            <input
              id="habitability"
              v-model="realmForm.surroundings.habitability"
              type="text"
              placeholder="e.g., Neutral"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label for="habitabilityValue" class="block text-sm font-medium text-gray-700 mb-1">
              Habitability Value
            </label>
            <input
              id="habitabilityValue"
              v-model.number="realmForm.surroundings.habitabilityValue"
              type="number"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>
      </div>

      <!-- Government Section -->
      <div class="border-t pt-4">
        <h4 class="text-md font-semibold mb-3 text-green-700">Government & Economy</h4>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label for="govType" class="block text-sm font-medium text-gray-700 mb-1">
              Government Type
            </label>
            <input
              id="govType"
              v-model="realmForm.government.type"
              type="text"
              placeholder="e.g., Dictator"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label for="economyType" class="block text-sm font-medium text-gray-700 mb-1">
              Economy Type
            </label>
            <input
              id="economyType"
              v-model="realmForm.government.economyType"
              type="text"
              placeholder="e.g., Trad."
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label for="techLevel" class="block text-sm font-medium text-gray-700 mb-1">
              Tech Level
            </label>
            <input
              id="techLevel"
              v-model.number="realmForm.government.techLevel"
              type="number"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label for="rtm" class="block text-sm font-medium text-gray-700 mb-1">
              Reaction-Time Modifier
            </label>
            <input
              id="rtm"
              v-model.number="realmForm.government.reactionTimeModifier"
              type="number"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label for="cr" class="block text-sm font-medium text-gray-700 mb-1">
              Control Rating
            </label>
            <input
              id="cr"
              v-model.number="realmForm.government.controlRating"
              type="number"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label for="conr" class="block text-sm font-medium text-gray-700 mb-1">
              Conformity Rating
            </label>
            <input
              id="conr"
              v-model.number="realmForm.government.conformityRating"
              type="number"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label for="or" class="block text-sm font-medium text-gray-700 mb-1">
              Openness Rating
            </label>
            <input
              id="or"
              v-model.number="realmForm.government.openessRating"
              type="number"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label for="er" class="block text-sm font-medium text-gray-700 mb-1">
              Education Rating
            </label>
            <input
              id="er"
              v-model.number="realmForm.government.educationRating"
              type="number"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label for="ir" class="block text-sm font-medium text-gray-700 mb-1">
              Infrastructure Rating
            </label>
            <input
              id="ir"
              v-model.number="realmForm.government.infrastructureRating"
              type="number"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label for="citizenLoyalty" class="block text-sm font-medium text-gray-700 mb-1">
              Citizen Loyalty
            </label>
            <input
              id="citizenLoyalty"
              v-model="realmForm.government.citizenLoyalty"
              type="text"
              placeholder="e.g., Neutral"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label for="citizenLoyaltyVal" class="block text-sm font-medium text-gray-700 mb-1">
              Citizen Loyalty Value
            </label>
            <input
              id="citizenLoyaltyVal"
              v-model.number="realmForm.government.citizenLoyaltyValue"
              type="number"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>
      </div>

      <!-- Funds and People Section -->
      <div class="border-t pt-4">
        <h4 class="text-md font-semibold mb-3 text-green-700">Funds & People</h4>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label for="density" class="block text-sm font-medium text-gray-700 mb-1">
              Density per mile²
            </label>
            <input
              id="density"
              v-model.number="realmForm.fundsAndPeople.densityPerMile"
              type="number"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label for="maxPop" class="block text-sm font-medium text-gray-700 mb-1">
              Max Population
            </label>
            <input
              id="maxPop"
              v-model.number="realmForm.fundsAndPeople.maxPopulation"
              type="number"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label for="population" class="block text-sm font-medium text-gray-700 mb-1">
              Population
            </label>
            <input
              id="population"
              v-model.number="realmForm.fundsAndPeople.population"
              type="number"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label for="avgIncome" class="block text-sm font-medium text-gray-700 mb-1">
              Average Income
            </label>
            <input
              id="avgIncome"
              v-model.number="realmForm.fundsAndPeople.averageIncome"
              type="number"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label for="workDependMod" class="block text-sm font-medium text-gray-700 mb-1">
              Work/Depend Mod
            </label>
            <input
              id="workDependMod"
              v-model.number="realmForm.fundsAndPeople.workDependMod"
              type="number"
              step="0.1"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label for="manageSkill" class="block text-sm font-medium text-gray-700 mb-1">
              Management Skill
            </label>
            <input
              id="manageSkill"
              v-model.number="realmForm.fundsAndPeople.managementSkill"
              type="number"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label for="taxCR" class="block text-sm font-medium text-gray-700 mb-1">
              Taxation CR
            </label>
            <input
              id="taxCR"
              v-model.number="realmForm.fundsAndPeople.taxationCR"
              type="number"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label for="revenueFactor" class="block text-sm font-medium text-gray-700 mb-1">
              Revenue Factor (%)
            </label>
            <input
              id="revenueFactor"
              v-model.number="realmForm.fundsAndPeople.revenueFactor"
              type="number"
              step="0.1"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label for="revenue" class="block text-sm font-medium text-gray-700 mb-1">
              Revenue
            </label>
            <input
              id="revenue"
              v-model.number="realmForm.fundsAndPeople.revenue"
              type="number"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label for="earnings" class="block text-sm font-medium text-gray-700 mb-1">
              Earnings at Turn
            </label>
            <input
              id="earnings"
              v-model.number="realmForm.fundsAndPeople.earningsAtTurn"
              type="number"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label for="bank" class="block text-sm font-medium text-gray-700 mb-1">
              Bank
            </label>
            <input
              id="bank"
              v-model.number="realmForm.fundsAndPeople.bank"
              type="number"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div class="flex items-center gap-2">
            <input
              id="corrupt"
              v-model="realmForm.fundsAndPeople.corrupt"
              type="checkbox"
              class="rounded border-gray-300 text-green-600 focus:ring-green-500"
            />
            <label for="corrupt" class="text-sm font-medium text-gray-700">
              Corrupt
            </label>
          </div>
          <div class="flex items-center gap-2">
            <input
              id="debt"
              v-model="realmForm.fundsAndPeople.debt"
              type="checkbox"
              class="rounded border-gray-300 text-green-600 focus:ring-green-500"
            />
            <label for="debt" class="text-sm font-medium text-gray-700">
              Debt
            </label>
          </div>
        </div>
      </div>

      <!-- Military Section -->
      <div class="border-t pt-4">
        <h4 class="text-md font-semibold mb-3 text-green-700">Military</h4>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="flex items-center gap-2">
            <input
              id="wartime"
              v-model="realmForm.military.wartime"
              type="checkbox"
              class="rounded border-gray-300 text-green-600 focus:ring-green-500"
            />
            <label for="wartime" class="text-sm font-medium text-gray-700">
              Wartime
            </label>
          </div>
          <div>
            <label for="milBudget" class="block text-sm font-medium text-gray-700 mb-1">
              Military Budget Factor (%)
            </label>
            <input
              id="milBudget"
              v-model.number="realmForm.military.militaryBudgetFactor"
              type="number"
              step="0.1"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label for="milResources" class="block text-sm font-medium text-gray-700 mb-1">
              Military Resources
            </label>
            <input
              id="milResources"
              v-model.number="realmForm.military.militaryResources"
              type="number"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>
      </div>

      <!-- Resources Section -->
      <div class="border-t pt-4">
        <h4 class="text-md font-semibold mb-1 text-green-700">Resources</h4> 
        <h5 class="text-xs font-semibold mb-3"> each {{ calculatedPointPerPoint }}</h5>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label for="natRes" class="block text-sm font-medium text-gray-700 mb-1">
              Natural Resources
            </label>
            <input
              id="natRes"
              v-model.number="realmForm.resources.naturalResources"
              type="number"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label for="workPhys" class="block text-sm font-medium text-gray-700 mb-1">
              Workforce (Physical)
            </label>
            <input
              id="workPhys"
              v-model.number="realmForm.resources.workforcePhysical"
              type="number"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label for="workMental" class="block text-sm font-medium text-gray-700 mb-1">
              Workforce (Mental)
            </label>
            <input
              id="workMental"
              v-model.number="realmForm.resources.workforceMental"
              type="number"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label for="agAnimal" class="block text-sm font-medium text-gray-700 mb-1">
              Agriculture (Animal)
            </label>
            <input
              id="agAnimal"
              v-model.number="realmForm.military.agricultureAnimal"
              type="number"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label for="agFarming" class="block text-sm font-medium text-gray-700 mb-1">
              Agriculture (Farming)
            </label>
            <input
              id="agFarming"
              v-model.number="realmForm.military.agricultureFarming"
              type="number"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label for="luxury" class="block text-sm font-medium text-gray-700 mb-1">
              Luxury/Precious
            </label>
            <input
              id="luxury"
              v-model.number="realmForm.military.luxuryPrecious"
              type="number"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>
      </div>
      <!-- Realm Value -->
      <div class="border-t pt-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label for="realmValue" class="block text-sm font-medium text-gray-700 mb-1">
              Realm Value
            </label>
            <input
              id="realmValue"
              v-model.number="realmForm.realmValue"
              type="number"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label for="realmValueMod" class="block text-sm font-medium text-gray-700 mb-1">
              Realm Value w/ Modifiers
            </label>
            <input
              id="realmValueMod"
              v-model.number="realmForm.realmValueWithModifiers"
              type="number"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        class="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
        :disabled="saving"
      >
        {{ saving ? (isEditMode ? 'Updating...' : 'Saving...') : (isEditMode ? 'Update Realm' : 'Save Realm') }}
      </button>
    </form>

    <div v-if="saved" class="p-4 bg-green-50 rounded-md mt-4">
      <p class="text-green-700 font-semibold">✓ Realm {{ isEditMode ? 'updated' : 'saved' }} successfully!</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRealms } from '~/composables/useRealms'
import type { Realm } from '~/types/realm'

const props = defineProps<{ realmId?: string }>()
const emit = defineEmits<{ close: [] }>()

const { saveRealm, createEmptyRealm, realms, cloneRealm } = useRealms()
const realmForm = ref<Realm>(createEmptyRealm())
const saving = ref(false)
const saved = ref(false)

const isEditMode = computed(() => !!props.realmId)

const calculatedPointPerPoint = computed(() => {
  return (realmForm.value.realmValue * 0.001).toFixed(2)
})

onMounted(() => {
  if (props.realmId) {
    const realm = realms.value.find(r => r.id === props.realmId)
    if (realm) {
      realmForm.value = cloneRealm(realm)
    }
  }
})

const saveRealmFn = async () => {
  saving.value = true
  try {
    saveRealm(realmForm.value)
    saved.value = true
    setTimeout(() => {
      saved.value = false
      if (isEditMode.value) {
        emit('close')
      }
    }, 2000)
  } finally {
    saving.value = false
  }
}
</script>
