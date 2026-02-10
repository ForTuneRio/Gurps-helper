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
              v-model="realmForm.surroundings.defenseBonus"
              type="text"
              placeholder="e.g., +2"
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
            <label for="habitabilityValue" class="block text-sm font-medium text-gray-700 mb-1">
              Habitability (Value)
            </label>
            <input
              id="habitabilityValue"
              v-model.number="realmForm.surroundings.habitabilityValue"
              type="number"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Habitability (Calculated)
            </label>
            <div class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700">
              {{ habitabilityComputed }}
            </div>
          </div>
        </div>
      </div>

      <!-- Government Section -->
      <div class="border-t pt-4">
        <h4 class="text-md font-semibold mb-3 text-green-700">Government</h4>
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
            <label for="rtm" class="block text-sm font-medium text-gray-700 mb-1">
              Reaction-Time Modifier (RTM)
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
              Control Rating (CR)
            </label>
            <input
              id="cr"
              v-model.number="realmForm.government.controlRating"
              type="number"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>
      </div>

      <!-- Details Section -->
      <div class="border-t pt-4">
        <h4 class="text-md font-semibold mb-3 text-green-700">Details</h4>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label for="techLevel" class="block text-sm font-medium text-gray-700 mb-1">
              Tech Level (TL)
            </label>
            <input
              id="techLevel"
              v-model.number="realmForm.details.techLevel"
              type="number"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label for="conr" class="block text-sm font-medium text-gray-700 mb-1">
              Conformity Rating (ConR)
            </label>
            <input
              id="conr"
              v-model.number="realmForm.details.conformityRating"
              type="number"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label for="or" class="block text-sm font-medium text-gray-700 mb-1">
              Openness Rating (OR)
            </label>
            <input
              id="or"
              v-model.number="realmForm.details.openessRating"
              type="number"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label for="er" class="block text-sm font-medium text-gray-700 mb-1">
              Education Rating (ER)
            </label>
            <input
              id="er"
              v-model.number="realmForm.details.educationRating"
              type="number"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label for="citizenLoyaltyVal" class="block text-sm font-medium text-gray-700 mb-1">
              Citizen Loyalty (Value)
            </label>
            <input
              id="citizenLoyaltyVal"
              v-model.number="realmForm.details.citizenLoyaltyValue"
              type="number"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Citizen Loyalty (Calculated)
            </label>
            <div class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700">
              {{ citizenLoyaltyComputed }}
            </div>
          </div>
          <div>
            <label for="ir" class="block text-sm font-medium text-gray-700 mb-1">
              Infrastructure Rating (IR)
            </label>
            <input
              id="ir"
              v-model.number="realmForm.details.infrastructureRating"
              type="number"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>
        <div class="mt-4">
          <label for="description" class="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            v-model="realmForm.details.description"
            rows="3"
            placeholder="Enter realm description..."
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
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
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Max Population (Calculated)
            </label>
            <div class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700 font-semibold">
              {{ maxPopulationComputed.toLocaleString() }}
            </div>
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
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Average Income (Calculated from TL)
            </label>
            <div class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700 font-semibold">
              {{ averageIncomeComputed.toLocaleString() }}
            </div>
          </div>
          <div>
            <label for="workDependMod" class="block text-sm font-medium text-gray-700 mb-1">
              Work/Depend Mod (0-1)
            </label>
            <input
              id="workDependMod"
              v-model.number="realmForm.fundsAndPeople.workDependMod"
              type="number"
              step="0.01"
              min="0"
              max="1"
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
        </div>
      </div>

      <!-- Realm Value Section -->
      <div class="border-t pt-4">
        <h4 class="text-md font-semibold mb-3 text-green-700">Realm</h4>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Realm Value (Calculated)
            </label>
            <div class="w-full px-3 py-2 border border-gray-300 rounded-md bg-blue-50 text-blue-700 font-bold">
              {{ realmValueComputed.toLocaleString() }}
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Enhancements Sum
            </label>
            <div class="w-full px-3 py-2 border border-gray-300 rounded-md bg-green-50 text-green-700 font-semibold">
              +{{ enhancementsSumComputed }}%
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Limitations Sum
            </label>
            <div class="w-full px-3 py-2 border border-gray-300 rounded-md bg-red-50 text-red-700 font-semibold">
              {{ limitationsSumComputed }}%
            </div>
          </div>
          <div class="md:col-span-3">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Realm Value with Modifiers (Calculated)
            </label>
            <div class="w-full px-3 py-2 border border-gray-300 rounded-md bg-blue-50 text-blue-700 font-bold text-lg">
              {{ realmValueWithModComputed.toLocaleString() }}
            </div>
          </div>
        </div>
      </div>

      <!-- Enhancements Section -->
      <div class="border-t pt-4">
        <div class="flex justify-between items-center mb-3">
          <h4 class="text-md font-semibold text-green-700">Realm Enhancements</h4>
          <button
            type="button"
            @click="addEnhancement"
            class="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-sm rounded-md"
          >
            + Add Enhancement
          </button>
        </div>
        <div v-if="realmForm.enhancements.length === 0" class="text-gray-500 text-sm italic">
          No enhancements added yet.
        </div>
        <div v-else class="space-y-3">
          <div
            v-for="(enhancement, idx) in realmForm.enhancements"
            :key="enhancement.id"
            class="border border-gray-300 rounded-md p-3 bg-gray-50"
          >
            <div class="grid grid-cols-1 md:grid-cols-6 gap-2">
              <div class="md:col-span-2">
                <label class="block text-xs font-medium text-gray-600 mb-1">Name</label>
                <input
                  v-model="enhancement.name"
                  type="text"
                  placeholder="Enhancement name"
                  class="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                />
              </div>
              <div class="md:col-span-2">
                <label class="block text-xs font-medium text-gray-600 mb-1">Details</label>
                <input
                  v-model="enhancement.details"
                  type="text"
                  placeholder="Details"
                  class="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                />
              </div>
              <div>
                <label class="block text-xs font-medium text-gray-600 mb-1">Point Cost</label>
                <input
                  v-model.number="enhancement.pointCost"
                  type="number"
                  class="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                />
              </div>
              <div>
                <label class="block text-xs font-medium text-gray-600 mb-1">Level</label>
                <input
                  v-model.number="enhancement.level"
                  type="number"
                  class="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                />
              </div>
            </div>
            <div class="flex justify-between items-center mt-2">
              <div class="text-sm font-semibold text-green-700">
                Total Cost: +{{ enhancement.totalCost }}%
              </div>
              <button
                type="button"
                @click="removeEnhancement(idx)"
                class="text-red-600 hover:text-red-800 text-sm"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Limitations Section -->
      <div class="border-t pt-4">
        <div class="flex justify-between items-center mb-3">
          <h4 class="text-md font-semibold text-red-700">Realm Limitations</h4>
          <button
            type="button"
            @click="addLimitation"
            class="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded-md"
          >
            + Add Limitation
          </button>
        </div>
        <div v-if="realmForm.limitations.length === 0" class="text-gray-500 text-sm italic">
          No limitations added yet.
        </div>
        <div v-else class="space-y-3">
          <div
            v-for="(limitation, idx) in realmForm.limitations"
            :key="limitation.id"
            class="border border-gray-300 rounded-md p-3 bg-gray-50"
          >
            <div class="grid grid-cols-1 md:grid-cols-6 gap-2">
              <div class="md:col-span-2">
                <label class="block text-xs font-medium text-gray-600 mb-1">Name</label>
                <input
                  v-model="limitation.name"
                  type="text"
                  placeholder="Limitation name"
                  class="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                />
              </div>
              <div class="md:col-span-2">
                <label class="block text-xs font-medium text-gray-600 mb-1">Details</label>
                <input
                  v-model="limitation.details"
                  type="text"
                  placeholder="Details"
                  class="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                />
              </div>
              <div>
                <label class="block text-xs font-medium text-gray-600 mb-1">Point Cost (negative)</label>
                <input
                  v-model.number="limitation.pointCost"
                  type="number"
                  class="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                />
              </div>
              <div>
                <label class="block text-xs font-medium text-gray-600 mb-1">Level</label>
                <input
                  v-model.number="limitation.level"
                  type="number"
                  class="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                />
              </div>
            </div>
            <div class="flex justify-between items-center mt-2">
              <div class="text-sm font-semibold text-red-700">
                Total Cost: {{ limitation.totalCost }}%
              </div>
              <button
                type="button"
                @click="removeLimitation(idx)"
                class="text-red-600 hover:text-red-800 text-sm"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Taxation Section -->
      <div class="border-t pt-4">
        <h4 class="text-md font-semibold mb-3 text-green-700">Taxation</h4>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Revenue Factor (Calculated)
            </label>
            <div class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700 font-semibold">
              {{ (revenueFactorComputed * 100).toFixed(1) }}%
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Revenue (Calculated)
            </label>
            <div class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700 font-semibold">
              {{ revenueComputed.toLocaleString() }}
            </div>
          </div>
        </div>
      </div>

      <!-- Income Modifiers Section (conditional) -->
      <div v-if="showIncomeMods" class="border-t pt-4">
        <h4 class="text-md font-semibold mb-3 text-green-700">Income Modifiers</h4>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div v-if="hasIndependentIncome" class="flex items-center gap-2">
            <input
              id="independentIncome"
              v-model="realmForm.fundsAndPeople.independentIncome"
              type="checkbox"
              class="rounded border-gray-300 text-green-600 focus:ring-green-500"
            />
            <label for="independentIncome" class="text-sm font-medium text-gray-700">
              Use Independent Income
            </label>
          </div>
          <div v-if="hasCorrupt" class="flex items-center gap-2">
            <input
              id="corrupt"
              v-model="realmForm.fundsAndPeople.corrupt"
              type="checkbox"
              class="rounded border-gray-300 text-green-600 focus:ring-green-500"
            />
            <label for="corrupt" class="text-sm font-medium text-gray-700">
              Corrupt (-20%)
            </label>
          </div>
          <div v-if="hasDebt" class="flex items-center gap-2">
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

      <!-- Money Section -->
      <div class="border-t pt-4">
        <h4 class="text-md font-semibold mb-3 text-green-700">Money</h4>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
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
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Earnings at Turn (Calculated)
            </label>
            <div class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700 font-semibold">
              {{ earningsAtTurnComputed.toLocaleString() }}
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Bank + Earnings (Calculated)
            </label>
            <div class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700 font-semibold">
              {{ bankPlusEarningsComputed.toLocaleString() }}
            </div>
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
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Military Budget Factor (Calculated)
            </label>
            <div class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700 font-semibold">
              {{ (militaryBudgetFactorComputed * 100).toFixed(1) }}%
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Military Resources (Calculated)
            </label>
            <div class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700 font-semibold">
              {{ militaryResourcesComputed.toLocaleString() }}
            </div>
          </div>
        </div>
      </div>

      <!-- Resource Points Section -->
      <div class="border-t pt-4">
        <div class="flex justify-between items-center mb-3">
          <h4 class="text-md font-semibold text-green-700">
            Resource Points (Cost: {{ resourcePointCostComputed.toLocaleString() }} each)
          </h4>
          <button
            type="button"
            @click="addResourcePoint"
            class="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-sm rounded-md"
          >
            + Add Resource Point
          </button>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div
            v-for="(rp, idx) in realmForm.resources.resourcePoints"
            :key="rp.id"
            class="border border-gray-300 rounded-md p-2 bg-gray-50"
          >
            <div class="flex gap-2 items-start">
              <div class="flex-1">
                <label class="block text-xs font-medium text-gray-600 mb-1">Name</label>
                <input
                  v-model="rp.name"
                  type="text"
                  placeholder="Resource name"
                  class="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                />
              </div>
              <div class="w-20">
                <label class="block text-xs font-medium text-gray-600 mb-1">Value</label>
                <input
                  v-model.number="rp.value"
                  type="number"
                  class="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                />
              </div>
              <button
                type="button"
                @click="removeResourcePoint(idx)"
                class="text-red-600 hover:text-red-800 text-xs mt-5"
              >
                ✕
              </button>
            </div>
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
import { ref, onMounted, computed, watch } from 'vue'
import { useRealms } from '~/composables/useRealms'
import type { Realm } from '~/types/realm'
import {
  getHabitabilityLabel,
  getCitizenLoyaltyLabel,
  getAverageIncome,
  getMilitaryBudgetFactor,
  getRevenueFactor,
  calculateMaxPopulation,
  calculateRealmValue,
  calculateEnhancementsSum,
  calculateLimitationsSum,
  calculateRealmValueWithMod,
  calculateMilitaryResources,
  calculateRevenue,
  calculateEarningsAtTurn,
  calculateResourcePointCost
} from '~/utils/realmCalculations'

const props = defineProps<{ realmId?: string }>()
const emit = defineEmits<{ close: [] }>()

const { saveRealm, createEmptyRealm, realms, loadRealmForEdit } = useRealms()
const realmForm = ref<Realm>(createEmptyRealm())
const saving = ref(false)
const saved = ref(false)
const loadedRealmId = ref<string | null>(null)

const isEditMode = computed(() => !!props.realmId)

// Computed lookups
const habitabilityComputed = computed(() => 
  getHabitabilityLabel(realmForm.value.surroundings.habitabilityValue)
)

const citizenLoyaltyComputed = computed(() => 
  getCitizenLoyaltyLabel(realmForm.value.details.citizenLoyaltyValue)
)

const averageIncomeComputed = computed(() => 
  getAverageIncome(realmForm.value.details.techLevel)
)

const maxPopulationComputed = computed(() => 
  calculateMaxPopulation(
    realmForm.value.fundsAndPeople.densityPerMile,
    realmForm.value.surroundings.totalArea
  )
)

// Watchers for automatic totalCost calculation
watch(() => realmForm.value.enhancements, (enhancements) => {
  enhancements.forEach(e => {
    e.totalCost = e.pointCost * e.level
  })
}, { deep: true })

watch(() => realmForm.value.limitations, (limitations) => {
  limitations.forEach(l => {
    l.totalCost = l.pointCost * l.level
  })
}, { deep: true })

// Realm Value calculations
const enhancementsSumComputed = computed(() => 
  calculateEnhancementsSum(realmForm.value.enhancements)
)

const limitationsSumComputed = computed(() => 
  calculateLimitationsSum(realmForm.value.limitations)
)

const realmValueComputed = computed(() => 
  calculateRealmValue(
    realmForm.value.fundsAndPeople.population,
    averageIncomeComputed.value,
    realmForm.value.fundsAndPeople.workDependMod
  )
)

const realmValueWithModComputed = computed(() => 
  calculateRealmValueWithMod(
    realmValueComputed.value,
    enhancementsSumComputed.value,
    limitationsSumComputed.value
  )
)

// Military calculations
const militaryBudgetFactorComputed = computed(() => 
  getMilitaryBudgetFactor(
    realmForm.value.government.controlRating,
    realmForm.value.military.wartime
  )
)

const militaryResourcesComputed = computed(() => 
  calculateMilitaryResources(
    realmForm.value.fundsAndPeople.population,
    averageIncomeComputed.value,
    militaryBudgetFactorComputed.value
  )
)

// Taxation & Revenue calculations
const revenueFactorComputed = computed(() => 
  getRevenueFactor(realmForm.value.fundsAndPeople.taxationCR)
)

const revenueComputed = computed(() => 
  calculateRevenue(
    realmForm.value.fundsAndPeople.population,
    averageIncomeComputed.value,
    realmForm.value.fundsAndPeople.workDependMod,
    revenueFactorComputed.value
  )
)

// Income modifiers
const debtLevel = computed(() => {
  const debtLimitation = realmForm.value.limitations.find(l => 
    l.name.toLowerCase().includes('debt')
  )
  return debtLimitation ? Math.abs(debtLimitation.totalCost) : 0
})

const independentIncomeLevel = computed(() => {
  const indIncomeEnhancement = realmForm.value.enhancements.find(e => 
    e.name.toLowerCase().includes('independent income')
  )
  return indIncomeEnhancement ? indIncomeEnhancement.totalCost : 0
})

const earningsAtTurnComputed = computed(() => 
  calculateEarningsAtTurn(
    revenueComputed.value,
    realmForm.value.fundsAndPeople.corrupt,
    realmForm.value.fundsAndPeople.debt,
    realmForm.value.fundsAndPeople.independentIncome,
    debtLevel.value,
    independentIncomeLevel.value
  )
)

const bankPlusEarningsComputed = computed(() => 
  realmForm.value.fundsAndPeople.bank + earningsAtTurnComputed.value
)

const resourcePointCostComputed = computed(() => 
  calculateResourcePointCost(realmValueWithModComputed.value)
)

// Computed properties for conditional display
const hasIndependentIncome = computed(() => 
  realmForm.value.enhancements.some(e => e.name.toLowerCase().includes('independent income'))
)

const hasCorrupt = computed(() => 
  realmForm.value.limitations.some(l => l.name.toLowerCase().includes('corrupt'))
)

const hasDebt = computed(() => 
  realmForm.value.limitations.some(l => l.name.toLowerCase().includes('debt'))
)

const showIncomeMods = computed(() => 
  hasIndependentIncome.value || hasCorrupt.value || hasDebt.value
)

// Enhancement management
const addEnhancement = () => {
  realmForm.value.enhancements.push({
    id: Math.random().toString(36).substr(2, 9),
    name: '',
    details: '',
    pointCost: 0,
    level: 1,
    totalCost: 0
  })
}

const removeEnhancement = (index: number) => {
  realmForm.value.enhancements.splice(index, 1)
}

// Limitation management
const addLimitation = () => {
  realmForm.value.limitations.push({
    id: Math.random().toString(36).substr(2, 9),
    name: '',
    details: '',
    pointCost: 0,
    level: 1,
    totalCost: 0
  })
}

const removeLimitation = (index: number) => {
  realmForm.value.limitations.splice(index, 1)
}

// Resource Point management
const addResourcePoint = () => {
  realmForm.value.resources.resourcePoints.push({
    id: Math.random().toString(36).substr(2, 9),
    name: '',
    value: 0
  })
}

const removeResourcePoint = (index: number) => {
  realmForm.value.resources.resourcePoints.splice(index, 1)
}

const loadRealmFromStore = () => {
  if (!props.realmId) return
  if (loadedRealmId.value === props.realmId) return

  const realm = realms.value.find(r => r.id === props.realmId)
  if (realm) {
    realmForm.value = loadRealmForEdit(realm as Realm)
    loadedRealmId.value = props.realmId
  }
}

onMounted(loadRealmFromStore)
watch([() => props.realmId, realms], loadRealmFromStore)

const saveRealmFn = async () => {
  saving.value = true
  try {
    // Sync all computed values before saving
    realmForm.value.surroundings.habitability = habitabilityComputed.value
    realmForm.value.details.citizenLoyalty = citizenLoyaltyComputed.value
    realmForm.value.fundsAndPeople.maxPopulation = maxPopulationComputed.value
    realmForm.value.fundsAndPeople.averageIncome = averageIncomeComputed.value
    realmForm.value.realmValue = realmValueComputed.value
    realmForm.value.enhancementsSum = enhancementsSumComputed.value
    realmForm.value.limitationsSum = limitationsSumComputed.value
    realmForm.value.realmValueWithModifiers = realmValueWithModComputed.value
    realmForm.value.military.militaryBudgetFactor = militaryBudgetFactorComputed.value
    realmForm.value.military.militaryResources = militaryResourcesComputed.value
    realmForm.value.fundsAndPeople.revenueFactor = revenueFactorComputed.value
    realmForm.value.fundsAndPeople.revenue = revenueComputed.value
    realmForm.value.fundsAndPeople.earningsAtTurn = earningsAtTurnComputed.value
    realmForm.value.fundsAndPeople.bankPlusEarnings = bankPlusEarningsComputed.value
    realmForm.value.resources.resourcePointCost = resourcePointCostComputed.value

    await saveRealm(realmForm.value)
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
