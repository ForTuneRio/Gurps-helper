<template>
  <div class="realm-builder">
    <form id="realm-form" @submit.prevent="handleSubmit" class="space-y-4">
      <!-- FIRST BLOCK: Basic Info (3 columns) -->
      <div class="border border-gray-300 rounded-md p-3 bg-white dark:bg-gray-800">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
          <!-- Column 1: Government Info -->
          <div class="space-y-2">
            <div>
              <label for="realmName" class="block text-xs font-medium text-gray-700 mb-1">
                Domain Name
              </label>
              <input
                id="realmName"
                v-model="realmForm.name"
                type="text"
                required
                maxlength="100"
                class="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                placeholder="Enter domain name"
              />
            </div>
            <div>
              <label for="govType" class="block text-xs font-medium text-gray-700 mb-1">
                Government Type
              </label>
              <input
                id="govType"
                v-model="realmForm.government.type"
                type="text"
                placeholder="e.g., Dictator"
                maxlength="100"
                class="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
            </div>
            <div>
              <label for="economyType" class="block text-xs font-medium text-gray-700 mb-1">
                Economy Type
              </label>
              <input
                id="economyType"
                v-model="realmForm.government.economyType"
                type="text"
                placeholder="e.g., Trad."
                maxlength="100"
                class="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
            </div>
            <div>
              <label for="rtm" class="block text-xs font-medium text-gray-700 mb-1">
                Reaction-Time Modifier (RTM)
              </label>
              <input
                id="rtm"
                v-model.number="realmForm.government.reactionTimeModifier"
                type="number"
                maxlength="30"
                data-min="0"
                data-max="100"
                @input="clampNumberInput"
                class="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
              />
            </div>
          </div>

          <!-- Column 2: Surroundings -->
          <div class="space-y-2">
            <div>
              <label for="totalArea" class="block text-xs font-medium text-gray-700 mb-1">
                Total Area (mile²)
              </label>
              <input
                id="totalArea"
                v-model.number="realmForm.surroundings.totalArea"
                type="number"
                maxlength="30"
                data-min="0"
                data-max="1000000000000000000"
                @input="clampNumberInput"
                class="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
              />
            </div>
            <div>
              <label for="sizeValue" class="block text-xs font-medium text-gray-700 mb-1">
                Realm Size Value
              </label>
              <input
                id="sizeValue"
                v-model.number="realmForm.surroundings.realmSizeValue"
                type="number"
                maxlength="30"
                data-min="0"
                data-max="100"
                @input="clampNumberInput"
                class="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
              />
            </div>
            <div>
              <label for="areaKnowledge" class="block text-xs font-medium text-gray-700 mb-1">
                Area Knowledge Class
              </label>
              <input
                id="areaKnowledge"
                v-model="realmForm.surroundings.areaKnowledgeClass"
                type="text"
                placeholder="e.g., Small county"
                maxlength="100"
                class="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
              />
            </div>
            <div>
              <label for="defenseBonus" class="block text-xs font-medium text-gray-700 mb-1">
                Defense Bonus
              </label>
              <input
                id="defenseBonus"
                v-model="realmForm.surroundings.defenseBonus"
                type="text"
                placeholder="e.g., +2"
                maxlength="100"
                class="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
              />
            </div>
            <div>
              <label for="terrain" class="block text-xs font-medium text-gray-700 mb-1">
                Terrain
              </label>
              <input
                id="terrain"
                v-model="realmForm.surroundings.terrain"
                type="text"
                placeholder="e.g., Plains"
                maxlength="100"
                class="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
              />
            </div>
            <div>
              <label for="habitabilityValue" class="block text-xs font-medium text-gray-700 mb-1">
                Habitability
              </label>
              <div class="flex gap-1">
                <input
                  id="habitabilityValue"
                  v-model.number="realmForm.surroundings.habitabilityValue"
                  type="number"
                  maxlength="30"
                  data-min="-100"
                  data-max="100"
                  @input="clampNumberInput"
                  class="w-16 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                />
                <div class="flex-1 px-2 py-1 border border-gray-300 rounded bg-gray-100 text-gray-700 text-xs">
                  {{ habitabilityComputed }}
                </div>
              </div>
            </div>
          </div>

          <!-- Column 3: Details & Ratings -->
          <div class="space-y-2">
            <div>
              <label for="cr" class="block text-xs font-medium text-gray-700 mb-1">
                Control Rating (CR)
              </label>
              <input
                id="cr"
                v-model.number="realmForm.government.controlRating"
                type="number"
                maxlength="30"
                data-min="0"
                data-max="6"
                @input="clampNumberInput"
                class="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
              />
            </div>
            <div>
              <label for="conr" class="block text-xs font-medium text-gray-700 mb-1">
                Conformity Rating (ConR)
              </label>
              <input
                id="conr"
                v-model.number="realmForm.details.conformityRating"
                type="number"
                maxlength="30"
                data-min="0"
                data-max="6"
                @input="clampNumberInput"
                class="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
              />
            </div>
            <div>
              <label for="or" class="block text-xs font-medium text-gray-700 mb-1">
                Openness Rating (OR)
              </label>
              <input
                id="or"
                v-model.number="realmForm.details.openessRating"
                type="number"
                maxlength="30"
                data-min="0"
                data-max="6"
                @input="clampNumberInput"
                class="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
              />
            </div>
            <div>
              <label for="er" class="block text-xs font-medium text-gray-700 mb-1">
                Education Rating (ER)
              </label>
              <input
                id="er"
                v-model.number="realmForm.details.educationRating"
                type="number"
                maxlength="30"
                data-min="0"
                data-max="6"
                @input="clampNumberInput"
                class="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
              />
            </div>
            <div>
              <label for="citizenLoyaltyVal" class="block text-xs font-medium text-gray-700 mb-1">
                Citizen Loyalty
              </label>
              <div class="flex gap-1">
                <input
                  id="citizenLoyaltyVal"
                  v-model.number="realmForm.details.citizenLoyaltyValue"
                  type="number"
                  maxlength="30"
                  data-min="-100"
                  data-max="100"
                  @input="clampNumberInput"
                  class="w-16 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                />
                <div class="flex-1 px-2 py-1 border border-gray-300 rounded bg-gray-100 text-gray-700 text-xs">
                  {{ citizenLoyaltyComputed }}
                </div>
              </div>
            </div>
            <div>
              <label for="ir" class="block text-xs font-medium text-gray-700 mb-1">
                Infrastructure Rating (IR)
              </label>
              <input
                id="ir"
                v-model.number="realmForm.details.infrastructureRating"
                type="number"
                maxlength="30"
                data-min="0"
                data-max="6"
                @input="clampNumberInput"
                class="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- SECOND BLOCK: Realm Value Showcase (horizontal row) -->
      <div class="border border-gray-300 rounded-md p-3 bg-white dark:bg-gray-800">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div class="flex items-center gap-2 text-sm">
            <span class="text-gray-600">Realm Value:</span>
            <span class="font-semibold text-gray-800">{{ realmValueComputed.toLocaleString() }}</span>
          </div>
          <div class="flex items-center gap-2 text-sm">
            <span class="text-gray-600">Enhancements:</span>
            <span class="font-semibold text-green-700">+{{ enhancementsSumComputed }}%</span>
          </div>
          <div class="flex items-center gap-2 text-sm">
            <span class="text-gray-600">Limitations:</span>
            <span class="font-semibold text-red-700">{{ limitationsSumComputed }}%</span>
          </div>
          <div class="flex items-center gap-2 text-sm">
            <span class="text-gray-600">RV with Mod:</span>
            <span class="font-semibold text-gray-800">{{ realmValueWithModComputed.toLocaleString() }}</span>
          </div>
        </div>
      </div>

      <!-- THIRD BLOCK: Enhancements & Limitations (2 columns) -->
      <div class="border border-gray-300 rounded-md p-3 bg-white dark:bg-gray-800">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <!-- Enhancements Column -->
          <div>
            <div class="flex justify-between items-center mb-2">
              <h4 class="text-sm font-semibold text-green-700">Enhancements</h4>
              <button
                type="button"
                @click="addEnhancement"
                class="px-2 py-1 bg-green-600 hover:bg-green-700 text-white text-xs rounded"
              >
                + Add
              </button>
            </div>
            <div v-if="realmForm.enhancements.length === 0" class="text-gray-400 text-xs italic">
              No enhancements
            </div>
            <div v-else class="space-y-2">
              <div
                v-for="(enhancement, idx) in realmForm.enhancements"
                :key="enhancement.id"
                class="border border-gray-200 rounded bg-white"
              >
                <!-- Readonly View -->
                <div v-if="!editingEnhancement[idx]" class="p-2">
                  <div class="flex items-center justify-between gap-2 mb-1">
                    <span class="font-semibold text-xs flex-1">{{ enhancement.name || 'Unnamed' }}</span>
                    <div class="flex items-center gap-2 text-xs">
                      <span class="text-gray-500">Cost: {{ enhancement.pointCost }}</span>
                      <span class="text-gray-500">Lvl: {{ enhancement.level }}</span>
                      <span class="px-1 bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-200 rounded font-semibold">+{{ enhancement.totalCost }}%</span>
                      <button
                        type="button"
                        @click="toggleEnhancementEdit(idx)"
                        class="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400"
                        title="Edit"
                      >
                        <Cog6ToothIcon class="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div v-if="enhancement.details" class="text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded">
                    {{ enhancement.details }}
                  </div>
                </div>

                <!-- Edit View -->
                <div v-else class="p-2 bg-gray-50">
                  <div class="flex items-start justify-between gap-2 mb-1">
                    <div class="flex-1">
                      <label class="text-xs text-gray-500">Name</label>
                      <input
                        v-model="enhancement.name"
                        type="text"
                        placeholder="Name"
                        maxlength="100"
                        class="w-full px-1 py-1 border rounded text-xs"
                      />
                    </div>
                    <button
                      type="button"
                      @click="toggleEnhancementEdit(idx)"
                      class="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400"
                      title="Done"
                    >
                      <Cog6ToothIcon class="w-4 h-4" />
                    </button>
                  </div>
                  <label class="text-xs text-gray-500">Description</label>
                  <input
                    v-model="enhancement.details"
                    type="text"
                    placeholder="Details"
                    maxlength="1000"
                    class="w-full px-1 py-1 border rounded text-xs mb-1"
                  />
                  <div class="grid grid-cols-3 gap-1 mb-2">
                    <div>
                      <label class="text-xs text-gray-500">Cost</label>
                      <input
                        v-model.number="enhancement.pointCost"
                        type="number"
                        min="0"
                        maxlength="30"
                        data-min="0"
                        data-max="1000"
                        @input="clampNumberInput"
                        class="w-full px-1 py-1 border rounded text-xs"
                      />
                    </div>
                    <div>
                      <label class="text-xs text-gray-500">Lvl</label>
                      <input
                        v-model.number="enhancement.level"
                        type="number"
                        min="0"
                        maxlength="30"
                        data-min="0"
                        data-max="100"
                        @input="clampNumberInput"
                        class="w-full px-1 py-1 border rounded text-xs"
                      />
                    </div>
                    <div>
                      <label class="text-xs text-gray-500">Total</label>
                      <div class="px-1 py-1 bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-200 rounded text-xs font-semibold text-center">
                        +{{ enhancement.totalCost }}%
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    @click="removeEnhancement(idx)"
                    class="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                    title="Remove"
                  >
                    <TrashIcon class="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Limitations Column -->
          <div>
            <div class="flex justify-between items-center mb-2">
              <h4 class="text-sm font-semibold text-red-700">Limitations</h4>
              <button
                type="button"
                @click="addLimitation"
                class="px-2 py-1 bg-red-600 hover:bg-red-700 text-white text-xs rounded"
              >
                + Add
              </button>
            </div>
            <div v-if="realmForm.limitations.length === 0" class="text-gray-400 text-xs italic">
              No limitations
            </div>
            <div v-else class="space-y-2">
              <div
                v-for="(limitation, idx) in realmForm.limitations"
                :key="limitation.id"
                class="border border-gray-200 rounded bg-white"
              >
                <!-- Readonly View -->
                <div v-if="!editingLimitation[idx]" class="p-2">
                  <div class="flex items-center justify-between gap-2 mb-1">
                    <span class="font-semibold text-xs flex-1">{{ limitation.name || 'Unnamed' }}</span>
                    <div class="flex items-center gap-2 text-xs">
                      <span class="text-gray-500">Cost: {{ limitation.pointCost }}</span>
                      <span class="text-gray-500">Lvl: {{ limitation.level }}</span>
                      <span class="px-1 bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-200 rounded font-semibold">{{ limitation.totalCost }}%</span>
                      <button
                        type="button"
                        @click="toggleLimitationEdit(idx)"
                        class="text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                        title="Edit"
                      >
                        <Cog6ToothIcon class="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div v-if="limitation.details" class="text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded">
                    {{ limitation.details }}
                  </div>
                </div>

                <!-- Edit View -->
                <div v-else class="p-2 bg-gray-50">
                  <div class="flex items-start justify-between gap-2 mb-1">
                    <div class="flex-1">
                      <label class="text-xs text-gray-500">Name</label>
                      <input
                        v-model="limitation.name"
                        type="text"
                        placeholder="Name"
                        maxlength="100"
                        class="w-full px-1 py-1 border rounded text-xs"
                      />
                    </div>
                    <button
                      type="button"
                      @click="toggleLimitationEdit(idx)"
                      class="text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                      title="Done"
                    >
                      <Cog6ToothIcon class="w-4 h-4" />
                    </button>
                  </div>
                  <label class="text-xs text-gray-500">Description</label>
                  <input
                    v-model="limitation.details"
                    type="text"
                    placeholder="Details"
                    maxlength="1000"
                    class="w-full px-1 py-1 border rounded text-xs mb-1"
                  />
                  <div class="grid grid-cols-3 gap-1 mb-2">
                    <div>
                      <label class="text-xs text-gray-500">Cost</label>
                      <input
                        v-model.number="limitation.pointCost"
                        type="number"
                        min="-1000"
                        max="0"
                        maxlength="30"
                        data-min="-1000"
                        data-max="0"
                        @input="clampNumberInput"
                        class="w-full px-1 py-1 border rounded text-xs"
                      />
                    </div>
                    <div>
                      <label class="text-xs text-gray-500">Lvl</label>
                      <input
                        v-model.number="limitation.level"
                        type="number"
                        min="0"
                        maxlength="30"
                        data-min="0"
                        data-max="100"
                        @input="clampNumberInput"
                        class="w-full px-1 py-1 border rounded text-xs"
                      />
                    </div>
                    <div>
                      <label class="text-xs text-gray-500">Total</label>
                      <div class="px-1 py-1 bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-200 rounded text-xs font-semibold text-center">
                        {{ limitation.totalCost }}%
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    @click="removeLimitation(idx)"
                    class="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                    title="Remove"
                  >
                    <TrashIcon class="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- FOURTH BLOCK: People, Funds, Resources (3 columns) -->
      <div class="border border-gray-300 rounded-md p-3 bg-white dark:bg-gray-800">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
          <!-- Column 1: People -->
          <div>
            <h4 class="text-sm font-semibold text-green-700 mb-2">People</h4>
            <div class="space-y-2">
              <div>
                <label for="density" class="block text-xs font-medium text-gray-700 mb-1">
                  Density per mile²
                </label>
                <input
                  id="density"
                  v-model.number="realmForm.fundsAndPeople.densityPerMile"
                  type="number"
                  maxlength="30"
                  data-min="0"
                  data-max="1000000000000000000"
                  @input="clampNumberInput"
                  class="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                />
              </div>
              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">Max Pop.</label>
                <div class="w-full px-2 py-1 border border-gray-300 rounded bg-gray-100 text-gray-700 text-sm font-semibold">
                  {{ maxPopulationComputed.toLocaleString() }}
                </div>
              </div>
              <div>
                <label for="population" class="block text-xs font-medium text-gray-700 mb-1">
                  Population
                </label>
                <input
                  id="population"
                  v-model.number="realmForm.fundsAndPeople.population"
                  type="number"
                  maxlength="30"
                  data-min="0"
                  data-max="1000000000000000000"
                  @input="clampNumberInput"
                  class="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                />
              </div>
              <div>
                <label for="techLevel" class="block text-xs font-medium text-gray-700 mb-1">
                  Tech Level (TL)
                </label>
                <input
                  id="techLevel"
                  v-model.number="realmForm.details.techLevel"
                  type="number"
                  maxlength="30"
                  data-min="0"
                  data-max="12"
                  @input="clampNumberInput"
                  class="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                />
              </div>
              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">Average Income</label>
                <div class="w-full px-2 py-1 border border-gray-300 rounded bg-gray-100 text-gray-700 text-sm font-semibold">
                  {{ averageIncomeComputed.toLocaleString() }}
                </div>
              </div>
              <div>
                <label for="workDependMod" class="block text-xs font-medium text-gray-700 mb-1">
                  Work/Depend Mod
                </label>
                <input
                  id="workDependMod"
                  v-model.number="realmForm.fundsAndPeople.workDependMod"
                  type="number"
                  step="0.01"
                  min="0"
                  max="1"
                  maxlength="30"
                  data-min="0"
                  data-max="1"
                  @input="clampNumberInput"
                  class="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                />
              </div>
              <div>
                <label for="manageSkill" class="block text-xs font-medium text-gray-700 mb-1">
                  Management Skill
                </label>
                <input
                  id="manageSkill"
                  v-model.number="realmForm.fundsAndPeople.managementSkill"
                  type="number"
                  maxlength="30"
                  data-min="0"
                  data-max="100"
                  @input="clampNumberInput"
                  class="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                />
              </div>
            </div>
          </div>

          <!-- Column 2: Funds (2 sub-columns) -->
          <div>
            <h4 class="text-sm font-semibold text-green-700 mb-2">Funds</h4>
            <!-- Military (full width) -->
            <div class="mb-2 border border-gray-200 rounded p-2 bg-gray-50">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-2 items-center">
                <label class="flex items-center gap-2 text-xs font-medium text-gray-700">
                  <input
                    id="wartime"
                    v-model="realmForm.military.wartime"
                    type="checkbox"
                    class="rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <span>Wartime</span>
                </label>
                <div>
                  <label class="block text-xs font-medium text-gray-600 mb-1">Mil. Budget Factor</label>
                  <div class="px-2 py-1 bg-gray-100 rounded text-xs font-semibold">
                    {{ (militaryBudgetFactorComputed * 100).toFixed(1) }}%
                  </div>
                </div>
                <div>
                  <label class="block text-xs font-medium text-gray-600 mb-1">Military Resources</label>
                  <div class="px-2 py-1 bg-gray-100 rounded text-xs font-semibold">
                    {{ militaryResourcesComputed.toLocaleString() }}
                  </div>
                </div>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-2">
              <!-- Sub-column 1: Taxation & Military -->
              <div class="space-y-2">
                <!-- Taxation Box -->
                <div class="border border-gray-200 rounded p-2 bg-gray-50">
                  <div>
                    <label for="taxCR" class="block text-xs font-medium text-gray-700 mb-1">
                      Taxation CR
                    </label>
                    <input
                      id="taxCR"
                      v-model.number="realmForm.fundsAndPeople.taxationCR"
                      type="number"
                      maxlength="30"
                      data-min="0"
                      data-max="6"
                      @input="clampNumberInput"
                      class="w-full px-2 py-1 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                    />
                  </div>
                  <div class="mt-2">
                    <label class="block text-xs font-medium text-gray-600 mb-1">Rev. Factor</label>
                    <div class="px-2 py-1 bg-gray-100 rounded text-xs font-semibold">
                      {{ (revenueFactorComputed * 100).toFixed(1) }}%
                    </div>
                  </div>
                  <div class="mt-2">
                    <label class="block text-xs font-medium text-gray-600 mb-1">Revenue</label>
                    <div class="px-2 py-1 bg-gray-100 rounded text-xs font-semibold">
                      {{ revenueComputed.toLocaleString() }}
                    </div>
                  </div>
                </div>

              </div>

              <!-- Sub-column 2: Bank -->
              <div class="space-y-2">
                <!-- Bank Box -->
                <div class="border border-gray-200 rounded p-2 bg-gray-50">
                  <div>
                    <label for="bank" class="block text-xs font-medium text-gray-700 mb-1">
                      Bank
                    </label>
                    <input
                      id="bank"
                      v-model.number="realmForm.fundsAndPeople.bank"
                      type="number"
                      maxlength="30"
                      data-min="-1000000000000000000"
                      data-max="1000000000000000000"
                      @input="clampNumberInput"
                      class="w-full px-2 py-1 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                    />
                  </div>
                  <div class="mt-2">
                    <label class="block text-xs font-medium text-gray-600 mb-1">Earnings at Turn</label>
                    <div class="px-2 py-1 bg-gray-100 rounded text-xs font-semibold">
                      {{ earningsAtTurnComputed.toLocaleString() }}
                    </div>
                  </div>
                  <div class="mt-2">
                    <label class="block text-xs font-medium text-gray-600 mb-1">Bank + Earnings</label>
                    <div class="px-2 py-1 bg-gray-100 rounded text-xs font-semibold">
                      {{ bankPlusEarningsComputed.toLocaleString() }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Income Modifiers (full width) -->
            <div class="mt-2 border border-gray-200 rounded p-2 bg-gray-50 space-y-2">
              <div class="flex items-center gap-2">
                <input
                  id="corrupt"
                  v-model="realmForm.fundsAndPeople.corrupt"
                  type="checkbox"
                  class="rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <label for="corrupt" class="text-xs font-medium text-gray-700">
                  Corrupt
                </label>
              </div>

              <div>
                <div class="flex justify-between items-center mb-1">
                  <h5 class="text-xs font-semibold text-green-700">Income</h5>
                  <button
                    type="button"
                    @click="addIndependentIncome"
                    class="px-2 py-1 bg-green-600 hover:bg-green-700 text-white text-xs rounded"
                  >
                    + Add
                  </button>
                </div>
                <div v-if="realmForm.fundsAndPeople.independentIncomes.length === 0" class="text-gray-400 text-xs italic">
                  No income
                </div>
                <div v-else class="space-y-2">
                  <div
                    v-for="(income, idx) in realmForm.fundsAndPeople.independentIncomes"
                    :key="income.id"
                    class="border border-gray-200 rounded bg-white p-2"
                  >
                    <div class="space-y-2">
                      <div class="flex items-center gap-2">
                        <label class="flex items-center gap-2 text-xs text-gray-600 shrink-0">
                          <input
                            v-model="income.active"
                            type="checkbox"
                            class="rounded border-gray-300 text-green-600 focus:ring-green-500"
                          />
                        </label>
                        <input
                          v-model="income.name"
                          type="text"
                          placeholder="Income name"
                          maxlength="100"
                          class="flex-1 px-2 py-1 border rounded text-xs"
                        />
                      </div>
                      <div class="flex items-center gap-2">
                        <input
                          v-model.number="income.value"
                          type="number"
                          min="0"
                          maxlength="30"
                          data-min="0"
                          data-max="1000000000000000000"
                          @input="clampNumberInput"
                          class="w-24 px-2 py-1 border rounded text-xs"
                        />
                        <label class="flex items-center gap-1 text-xs text-gray-600">
                          <input
                            v-model="income.valueType"
                            type="radio"
                            value="percent"
                            class="rounded border-gray-300 text-green-600 focus:ring-green-500"
                          />
                          <span>%</span>
                        </label>
                        <label class="flex items-center gap-1 text-xs text-gray-600">
                          <input
                            v-model="income.valueType"
                            type="radio"
                            value="flat"
                            class="rounded border-gray-300 text-green-600 focus:ring-green-500"
                          />
                          <span>$</span>
                        </label>
                        <button
                          type="button"
                          @click="removeIndependentIncome(idx)"
                          class="ml-auto text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 text-xs shrink-0"
                          title="Remove"
                        >
                          <TrashIcon class="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div class="flex justify-between items-center mb-1">
                  <h5 class="text-xs font-semibold text-red-700">Debt</h5>
                  <button
                    type="button"
                    @click="addDebt"
                    class="px-2 py-1 bg-red-600 hover:bg-red-700 text-white text-xs rounded"
                  >
                    + Add
                  </button>
                </div>
                <div v-if="realmForm.fundsAndPeople.debts.length === 0" class="text-gray-400 text-xs italic">
                  No debt
                </div>
                <div v-else class="space-y-2">
                  <div
                    v-for="(debt, idx) in realmForm.fundsAndPeople.debts"
                    :key="debt.id"
                    class="border border-gray-200 rounded bg-white p-2"
                  >
                    <div class="space-y-2">
                      <div class="flex items-center gap-2">
                        <label class="flex items-center gap-2 text-xs text-gray-600 shrink-0">
                          <input
                            v-model="debt.active"
                            type="checkbox"
                            class="rounded border-gray-300 text-red-600 focus:ring-red-500"
                          />
                        </label>
                        <input
                          v-model="debt.name"
                          type="text"
                          placeholder="Debt name"
                          maxlength="100"
                          class="flex-1 px-2 py-1 border rounded text-xs"
                        />
                      </div>
                      <div class="flex items-center gap-2">
                        <input
                          v-model.number="debt.value"
                          type="number"
                          min="0"
                          maxlength="30"
                          data-min="0"
                          data-max="1000000000000000000"
                          @input="clampNumberInput"
                          class="w-24 px-2 py-1 border rounded text-xs"
                        />
                        <label class="flex items-center gap-1 text-xs text-gray-600">
                          <input
                            v-model="debt.valueType"
                            type="radio"
                            value="percent"
                            class="rounded border-gray-300 text-red-600 focus:ring-red-500"
                          />
                          <span>%</span>
                        </label>
                        <label class="flex items-center gap-1 text-xs text-gray-600">
                          <input
                            v-model="debt.valueType"
                            type="radio"
                            value="flat"
                            class="rounded border-gray-300 text-red-600 focus:ring-red-500"
                          />
                          <span>$</span>
                        </label>
                        <button
                          type="button"
                          @click="removeDebt(idx)"
                          class="ml-auto text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 text-xs shrink-0"
                          title="Remove"
                        >
                          <TrashIcon class="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Column 3: Resource Points -->
          <div>
            <div class="flex justify-between items-center mb-2">
              <h4 class="text-sm font-semibold text-green-700">
                Resource Points <span class="text-xs text-gray-500 font-normal">({{ resourcePointCostComputed.toLocaleString() }}$ each)</span>
              </h4>
              <button
                type="button"
                @click="addResourcePoint"
                class="px-2 py-1 bg-green-600 hover:bg-green-700 text-white text-xs rounded"
              >
                + Add
              </button>
            </div>
            <div v-if="realmForm.resources.resourcePoints.length === 0" class="text-gray-400 text-xs italic">
              No resources
            </div>
            <div v-else class="space-y-2">
              <div
                v-for="(rp, idx) in realmForm.resources.resourcePoints"
                :key="rp.id"
                class="border border-gray-200 rounded p-2 bg-gray-50"
              >
                <div class="flex gap-1 mb-1">
                  <input
                    v-model="rp.name"
                    type="text"
                    placeholder="Name"
                    maxlength="100"
                    class="flex-1 px-1 py-1 border rounded text-xs"
                  />
                  <button
                    type="button"
                    @click="removeResourcePoint(idx)"
                    class="text-red-600 hover:text-red-800 text-xs px-1"
                  >
                    ✕
                  </button>
                </div>
                <div class="flex items-center gap-2">
                  <label class="text-xs text-gray-500">Value</label>
                  <input
                    v-model.number="rp.value"
                    type="number"
                    maxlength="30"
                    data-min="0"
                    data-max="1000000"
                    @input="clampNumberInput"
                    class="w-24 px-1 py-1 border rounded text-xs"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Description (optional, at bottom) -->
      <div class="border border-gray-300 rounded-md p-3 bg-white dark:bg-gray-800">
        <label for="description" class="block text-xs font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          id="description"
          ref="descriptionRef"
          v-model="realmForm.details.description"
          rows="2"
          placeholder="Enter realm description..."
          maxlength="1000"
          class="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-green-500 resize-none overflow-hidden"
          @input="resizeDescription"
        />
      </div>

    </form>

    <!-- Success Message -->
    <div v-if="saved" class="p-3 bg-green-50 rounded mt-3">
      <p class="text-green-700 font-semibold text-sm">✓ Realm {{ isEditMode ? 'updated' : 'saved' }} successfully!</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch, nextTick } from 'vue'
import { useRealms } from '~/composables/useRealms'
import { Cog6ToothIcon, TrashIcon } from '@heroicons/vue/24/solid'
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
const emit = defineEmits<{ 
  close: []
  dirty: [isDirty: boolean]
}>()

const { saveRealm, createEmptyRealm, realms, loadRealmForEdit } = useRealms()
const realmForm = ref<Realm>(createEmptyRealm())
const saving = ref(false)
const saved = ref(false)
const loadedRealmId = ref<string | null>(null)
const isDirty = ref(false)
const autoSaveTimer = ref<number | null>(null)

const descriptionRef = ref<HTMLTextAreaElement | null>(null)

const MAX_NUMBER_LENGTH = 30

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

const resizeDescription = () => {
  if (!descriptionRef.value) return
  descriptionRef.value.style.height = 'auto'
  descriptionRef.value.style.height = `${descriptionRef.value.scrollHeight}px`
}



// Edit state tracking for enhancements and limitations
const editingEnhancement = ref<Record<number, boolean>>({})
const editingLimitation = ref<Record<number, boolean>>({})

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

// Watch isDirty and emit when it changes
watch(isDirty, (dirty) => {
  emit('dirty', dirty)
}, { immediate: true })

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
const independentIncomePercentComputed = computed(() =>
  realmForm.value.fundsAndPeople.independentIncomes
    .filter(i => i.active && i.valueType === 'percent')
    .reduce((sum, i) => sum + i.value, 0)
)

const independentIncomeFlatComputed = computed(() =>
  realmForm.value.fundsAndPeople.independentIncomes
    .filter(i => i.active && i.valueType === 'flat')
    .reduce((sum, i) => sum + i.value, 0)
)

const debtPercentComputed = computed(() =>
  realmForm.value.fundsAndPeople.debts
    .filter(d => d.active && d.valueType === 'percent')
    .reduce((sum, d) => sum + d.value, 0)
)

const debtFlatComputed = computed(() =>
  realmForm.value.fundsAndPeople.debts
    .filter(d => d.active && d.valueType === 'flat')
    .reduce((sum, d) => sum + d.value, 0)
)

const earningsAtTurnComputed = computed(() => 
  calculateEarningsAtTurn(
    revenueComputed.value,
    realmForm.value.fundsAndPeople.corrupt,
    debtPercentComputed.value,
    debtFlatComputed.value,
    independentIncomePercentComputed.value,
    independentIncomeFlatComputed.value
  )
)

const bankPlusEarningsComputed = computed(() => 
  realmForm.value.fundsAndPeople.bank + earningsAtTurnComputed.value
)

const resourcePointCostComputed = computed(() => 
  calculateResourcePointCost(realmValueWithModComputed.value)
)

// Enhancement management
const addEnhancement = () => {
  const newIndex = realmForm.value.enhancements.length
  realmForm.value.enhancements.push({
    id: Math.random().toString(36).substr(2, 9),
    name: '',
    details: '',
    pointCost: 0,
    level: 1,
    totalCost: 0
  })
  // Put new enhancement in edit mode
  editingEnhancement.value[newIndex] = true
}

const removeEnhancement = (index: number) => {
  realmForm.value.enhancements.splice(index, 1)
  // Clean up edit state
  delete editingEnhancement.value[index]
}

const toggleEnhancementEdit = (index: number) => {
  editingEnhancement.value[index] = !editingEnhancement.value[index]
}

// Limitation management
const addLimitation = () => {
  const newIndex = realmForm.value.limitations.length
  realmForm.value.limitations.push({
    id: Math.random().toString(36).substr(2, 9),
    name: '',
    details: '',
    pointCost: 0,
    level: 1,
    totalCost: 0
  })
  // Put new limitation in edit mode
  editingLimitation.value[newIndex] = true
}

const removeLimitation = (index: number) => {
  realmForm.value.limitations.splice(index, 1)
  // Clean up edit state
  delete editingLimitation.value[index]
}

const toggleLimitationEdit = (index: number) => {
  editingLimitation.value[index] = !editingLimitation.value[index]
}

// Independent income management
const addIndependentIncome = () => {
  realmForm.value.fundsAndPeople.independentIncomes.push({
    id: Math.random().toString(36).substr(2, 9),
    name: '',
    value: 0,
    valueType: 'percent',
    active: true
  })
}

const removeIndependentIncome = (index: number) => {
  realmForm.value.fundsAndPeople.independentIncomes.splice(index, 1)
}

// Debt management
const addDebt = () => {
  realmForm.value.fundsAndPeople.debts.push({
    id: Math.random().toString(36).substr(2, 9),
    name: '',
    value: 0,
    valueType: 'percent',
    active: true
  })
}

const removeDebt = (index: number) => {
  realmForm.value.fundsAndPeople.debts.splice(index, 1)
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
    isDirty.value = false
  }
}

onMounted(loadRealmFromStore)
watch([() => props.realmId, realms], loadRealmFromStore)

watch(
  realmForm,
  () => {
    isDirty.value = true
  },
  { deep: true }
)

watch(
  () => realmForm.value.details.description,
  () => {
    void nextTick(resizeDescription)
  }
)

onMounted(() => {
  void nextTick(resizeDescription)
  autoSaveTimer.value = window.setInterval(() => {
    if (saving.value || !isDirty.value) return
    if (!realmForm.value.name.trim()) return
    void saveRealmFn({ showSaved: false, closeAfter: false })
  }, 10 * 60 * 1000)

  const handleBeforeUnload = (e: BeforeUnloadEvent) => {
    if (isDirty.value) {
      e.preventDefault()
      e.returnValue = ''
      return ''
    }
  }
  window.addEventListener('beforeunload', handleBeforeUnload)

  onUnmounted(() => {
    if (autoSaveTimer.value !== null) {
      window.clearInterval(autoSaveTimer.value)
    }
    window.removeEventListener('beforeunload', handleBeforeUnload)
  })
})

const saveRealmFn = async (options?: { showSaved?: boolean; closeAfter?: boolean }) => {
  const showSaved = options?.showSaved ?? true
  const closeAfter = options?.closeAfter ?? true
  if (saving.value) return
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
    isDirty.value = false
    if (showSaved) {
      saved.value = true
      setTimeout(() => {
        saved.value = false
        if (closeAfter && isEditMode.value) {
          emit('close')
        }
      }, 2000)
    } else if (closeAfter && isEditMode.value) {
      emit('close')
    }
  } finally {
    saving.value = false
  }
}

const handleSubmit = (event: SubmitEvent) => {
  event.preventDefault()
  void saveRealmFn()
}
</script>
