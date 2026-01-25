<template>
  <div v-if="realm" class="p-4 bg-gray-50 rounded-md">
    <h4 class="text-xl font-semibold mb-4">{{ realm.name }}</h4>

    <div class="space-y-6">
      <!-- Summary -->
      <div class="border-b pb-4">
        <h5 class="font-semibold mb-3 text-green-700">Summary</h5>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p class="text-sm text-gray-600">Realm Value</p>
            <p class="text-lg font-bold text-green-600">{{ realm.realmValue.toLocaleString() }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-600">With Modifiers</p>
            <p class="text-lg font-bold text-green-600">{{ realm.realmValueWithModifiers.toLocaleString() }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-600">Population</p>
            <p class="text-lg font-bold">{{ realm.fundsAndPeople.population }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-600">Max Population</p>
            <p class="text-lg font-bold">{{ realm.fundsAndPeople.maxPopulation }}</p>
          </div>
        </div>
      </div>

      <!-- Surroundings -->
      <div class="border-b pb-4">
        <h5 class="font-semibold mb-3 text-green-700">Surroundings</h5>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
          <p><strong>Area:</strong> {{ realm.surroundings.totalArea }} mi²</p>
          <p><strong>Size Value:</strong> {{ realm.surroundings.realmSizeValue }}</p>
          <p><strong>Class:</strong> {{ realm.surroundings.areaKnowledgeClass }}</p>
          <p><strong>Defense Bonus:</strong> {{ realm.surroundings.defenseBonus }}</p>
          <p><strong>Terrain:</strong> {{ realm.surroundings.terrain }}</p>
          <p><strong>Habitability:</strong> {{ realm.surroundings.habitability }} ({{ realm.surroundings.habitabilityValue }})</p>
        </div>
      </div>

      <!-- Government -->
      <div class="border-b pb-4">
        <h5 class="font-semibold mb-3 text-green-700">Government & Economy</h5>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
          <p><strong>Type:</strong> {{ realm.government.type }}</p>
          <p><strong>Economy:</strong> {{ realm.government.economyType }}</p>
          <p><strong>Tech Level:</strong> {{ realm.government.techLevel }}</p>
          <p><strong>Control Rating:</strong> {{ realm.government.controlRating }}</p>
          <p><strong>Conformity:</strong> {{ realm.government.conformityRating }}</p>
          <p><strong>Openness:</strong> {{ realm.government.openessRating }}</p>
          <p><strong>Education:</strong> {{ realm.government.educationRating }}</p>
          <p><strong>Infrastructure:</strong> {{ realm.government.infrastructureRating }}</p>
          <p><strong>Citizen Loyalty:</strong> {{ realm.government.citizenLoyalty }} ({{ realm.government.citizenLoyaltyValue }})</p>
        </div>
      </div>

      <!-- Finances -->
      <div class="border-b pb-4">
        <h5 class="font-semibold mb-3 text-green-700">Finances</h5>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
          <p><strong>Density:</strong> {{ realm.fundsAndPeople.densityPerMile }}/mi²</p>
          <p><strong>Avg Income:</strong> {{ realm.fundsAndPeople.averageIncome }}</p>
          <p><strong>Revenue:</strong> {{ realm.fundsAndPeople.revenue }}</p>
          <p><strong>Tax CR:</strong> {{ realm.fundsAndPeople.taxationCR }}</p>
          <p><strong>Tax Factor:</strong> {{ realm.fundsAndPeople.revenueFactor }}%</p>
          <p><strong>Earnings:</strong> {{ realm.fundsAndPeople.earningsAtTurn }}</p>
          <p><strong>Bank:</strong> {{ realm.fundsAndPeople.bank }}</p>
          <p><strong>Bank + Earnings:</strong> {{ realm.fundsAndPeople.bankPlusEarnings }}</p>
          <p><strong>Management Skill:</strong> {{ realm.fundsAndPeople.managementSkill }}</p>
          <p v-if="realm.fundsAndPeople.corrupt" class="text-red-600"><strong>⚠ Corrupt</strong></p>
          <p v-if="realm.fundsAndPeople.debt" class="text-red-600"><strong>⚠ In Debt</strong></p>
        </div>
      </div>

      <!-- Military -->
      <div class="border-b pb-4">
        <h5 class="font-semibold mb-3 text-green-700">Military</h5>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
          <p :class="realm.military.wartime ? 'text-red-600' : 'text-gray-600'">
            <strong>Wartime:</strong> {{ realm.military.wartime ? 'YES' : 'No' }}
          </p>
          <p><strong>Budget Factor:</strong> {{ realm.military.militaryBudgetFactor }}%</p>
          <p><strong>Resources:</strong> {{ realm.military.militaryResources }}</p>
          <p><strong>Agriculture (Animal):</strong> {{ realm.military.agricultureAnimal }}</p>
          <p><strong>Agriculture (Farming):</strong> {{ realm.military.agricultureFarming }}</p>
          <p><strong>Luxury/Precious:</strong> {{ realm.military.luxuryPrecious }}</p>
        </div>
      </div>

      <!-- Resources -->
      <div>
        <h5 class="font-semibold mb-3 text-green-700">Resources</h5>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
          <p><strong>Point per Point:</strong> {{ realm.resources.pointPerPoint }}</p>
          <p><strong>Natural Resources:</strong> {{ realm.resources.naturalResources }}</p>
          <p><strong>Workforce (Physical):</strong> {{ realm.resources.workforcePhysical }}</p>
          <p><strong>Workforce (Mental):</strong> {{ realm.resources.workforceMental }}</p>
        </div>
      </div>
    </div>

    <div class="flex gap-2 mt-6">
      <button
        @click="$emit('edit')"
        class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition"
      >
        Edit
      </button>
      <button
        @click="$emit('delete')"
        class="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Realm } from '~/types/realm'

defineProps<{ realm: Realm }>()
defineEmits<{ edit: []; delete: [] }>()
</script>
