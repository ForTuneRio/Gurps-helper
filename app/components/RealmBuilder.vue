<template>
  <div class="realm-builder">
    <form id="realm-form" @submit.prevent="handleSubmit" class="space-y-4">
      <fieldset :disabled="isReadOnly" :class="{ 'opacity-85': isReadOnly }" class="space-y-4">
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
              <label for="rtm" class="flex items-center gap-1 text-xs font-medium text-gray-700 mb-1">
                Reaction-Time Modifier (RTM)
                <InfoBox title="Reaction-Time Modifier">
                  <ModifierInfoContent name="Reaction-Time Modifier" />
                </InfoBox>
              </label>
              <input
                id="rtm"
                v-model.number="realmForm.government.reactionTimeModifier"
                type="number"
                maxlength="30"
                data-min="-100"
                data-max="100"
                @input="clampNumberInput"
                class="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
              />
            </div>
          </div>

          <!-- Column 2: Surroundings -->
          <div class="space-y-2">
            <div>
              <label for="totalArea" class="flex items-center gap-1 text-xs font-medium text-gray-700 mb-1">
                Total Area (mile²)
                <InfoBox title="Size">
                  <ModifierInfoContent name="Realm Size Value" />
                </InfoBox>
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
              <label for="defenseBonus" class="flex items-center gap-1 text-xs font-medium text-gray-700 mb-1">
                Defense Bonus
                <InfoBox title="Defense Bonus and Terrain">
                  <ModifierInfoContent name="Defense Bonus and Terrain" />
                </InfoBox>
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
              <label for="habitabilityValue" class="flex items-center gap-1 text-xs font-medium text-gray-700 mb-1">
                Habitability
                <InfoBox title="Habitability">
                  <ModifierInfoContent name="Habitability" />
                </InfoBox>
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
              <label for="cr" class="flex items-center gap-1 text-xs font-medium text-gray-700 mb-1">
                Control Rating (CR)
                <InfoBox title="Control Rating">
                  <ModifierInfoContent name="Control Rating" />
                </InfoBox>
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
              <label for="conr" class="flex items-center gap-1 text-xs font-medium text-gray-700 mb-1">
                Conformity Rating (ConR)
                <InfoBox title="Conformity Rating">
                  <ModifierInfoContent name="Conformity Rating" />
                </InfoBox>
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
              <label for="or" class="flex items-center gap-1 text-xs font-medium text-gray-700 mb-1">
                Openness Rating (OR)
                <InfoBox title="Openness Rating">
                  <ModifierInfoContent name="Openness Rating" />
                </InfoBox>
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
              <label for="er" class="flex items-center gap-1 text-xs font-medium text-gray-700 mb-1">
                Education Rating (ER)
                <InfoBox title="Education Rating">
                  <ModifierInfoContent name="Education Rating" />
                </InfoBox>
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
              <label for="citizenLoyaltyVal" class="flex items-center gap-1 text-xs font-medium text-gray-700 mb-1">
                Citizen Loyalty
                <InfoBox title="Citizen Loyalty">
                  <ModifierInfoContent name="Citizen Loyalty" />
                </InfoBox>
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
              <label for="ir" class="flex items-center gap-1 text-xs font-medium text-gray-700 mb-1">
                Infrastructure Rating (IR)
                <InfoBox title="Infrastructure Rating">
                  <ModifierInfoContent name="Infrastructure Rating" />
                </InfoBox>
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
                v-if="!isReadOnly"
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
                        v-if="!isReadOnly"
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
                      v-if="!isReadOnly"
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
                    v-if="!isReadOnly"
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
                v-if="!isReadOnly"
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
                        v-if="!isReadOnly"
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
                      v-if="!isReadOnly"
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
                    v-if="!isReadOnly"
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
                <label for="techLevel" class="flex items-center gap-1 text-xs font-medium text-gray-700 mb-1">
                  Tech Level (TL)
                  <InfoBox title="Tech Level (TL)">
                    <ModifierInfoContent name="Technology Level" />
                  </InfoBox>
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
                <label for="workDependMod" class="flex items-center gap-1 text-xs font-medium text-gray-700 mb-1">
                  Work/Depend Mod
                  <InfoBox title="Work/Depend Mod">
                    <ModifierInfoContent name="Work/Depend Mod" />
                  </InfoBox>
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
                    <label class="flex items-center gap-1 text-xs font-medium text-gray-600 mb-1">
                      Rev. Factor
                      <InfoBox title="Revenue">
                        <ModifierInfoContent name="Revenue" />
                      </InfoBox>
                    </label>
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
                  <InfoBox title="Corrupt">
                    <ModifierInfoContent name="Corrupt" />
                  </InfoBox>
                </label>
              </div>

              <div>
                <div class="flex justify-between items-center mb-1">
                  <h5 class="text-xs font-semibold text-green-700">Income</h5>
                  <button
                    v-if="!isReadOnly"
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
                          v-if="!isReadOnly"
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
                    v-if="!isReadOnly"
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
                          v-if="!isReadOnly"
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
                v-if="!isReadOnly"
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
                    v-if="!isReadOnly"
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

      <!-- FIFTH BLOCK: Army -->
      <div class="border border-gray-300 rounded-md p-3 bg-white dark:bg-gray-800 space-y-3">
        <div class="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <h4 class="text-sm font-semibold text-green-700">Army</h4>
          <button
            v-if="!isReadOnly"
            type="button"
            @click="addCompany"
            class="inline-flex items-center justify-center rounded bg-green-600 px-2 py-1 text-xs font-medium text-white hover:bg-green-700"
          >
            + Add Company
          </button>
        </div>

        <div class="border border-gray-200 rounded p-3 bg-gray-50">
          <div class="grid grid-cols-1 gap-3 md:grid-cols-3 md:items-center">
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
              <label class="flex items-center gap-1 text-xs font-medium text-gray-600 mb-1">
                Mil. Budget Factor
                <InfoBox title="Military Resources">
                  <ModifierInfoContent name="Military Resources" />
                </InfoBox>
              </label>
              <div class="rounded bg-gray-100 px-2 py-1 text-xs font-semibold">
                {{ (militaryBudgetFactorComputed * 100).toFixed(1) }}%
              </div>
            </div>
            <div>
              <label class="block text-xs font-medium text-gray-600 mb-1">Military Resources</label>
              <div class="rounded bg-gray-100 px-2 py-1 text-xs font-semibold">
                {{ militaryResourcesComputed.toLocaleString() }}
              </div>
            </div>
          </div>
        </div>

        <div v-if="realmForm.army.companies.length === 0" class="rounded border border-dashed border-gray-300 bg-gray-50 px-3 py-4 text-xs italic text-gray-500">
          No companies yet.
        </div>

        <div v-else class="space-y-3">
          <div
            v-for="(company, companyIndex) in realmForm.army.companies"
            :key="company.id"
            class="rounded-md border border-gray-200 bg-gray-50 p-3"
          >
            <div class="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
              <div class="space-y-2 flex-1">
                <div class="flex flex-wrap items-center gap-2">
                  <h5 class="text-sm font-semibold text-gray-800">{{ company.name || `Company ${companyIndex + 1}` }}</h5>
                  <span class="rounded bg-blue-100 dark:bg-blue-900/40 px-2 py-0.5 text-xs font-medium text-blue-700 dark:text-blue-200">Raise: {{ getCompanyRaiseTotal(company).toLocaleString() }}</span>
                  <span class="rounded bg-amber-100 dark:bg-amber-900/40 px-2 py-0.5 text-xs font-medium text-amber-700 dark:text-amber-200">Maintain: {{ getCompanyMaintainTotal(company).toLocaleString() }}</span>
                  <span class="rounded bg-gray-200 dark:bg-gray-700 px-2 py-0.5 text-xs font-medium text-gray-700 dark:text-gray-200">Total TS: {{ getCompanyTotalTs(company).toLocaleString() }}</span>
                </div>

                <div class="flex flex-wrap items-center gap-2 text-xs text-gray-600">
                  <span class="font-medium text-gray-700">Logistics:</span>
                  <span
                    v-for="type in getCompanyLogisticsTypes(company)"
                    :key="type"
                    class="rounded bg-white px-2 py-0.5 border border-gray-200"
                  >
                    {{ type }}
                  </span>
                  <span v-if="getCompanyLogisticsTypes(company).length === 0" class="text-gray-400">No units</span>
                </div>

                <div v-if="getCompanySpecialClassTotals(company).length > 0" class="space-y-1">
                  <div class="text-xs font-medium text-gray-700">Special Class TS</div>
                  <div class="flex flex-wrap gap-2">
                    <span
                      v-for="item in getCompanySpecialClassTotals(company)"
                      :key="item.label"
                      class="rounded bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-800"
                    >
                      {{ item.label }}: {{ item.value.toLocaleString() }}
                    </span>
                  </div>
                </div>

                <div v-if="getCompanyAntiSpecialClassTotals(company).length > 0" class="space-y-1">
                  <div class="text-xs font-medium text-gray-700">Anti Special Class TS</div>
                  <div class="flex flex-wrap gap-2">
                    <span
                      v-for="item in getCompanyAntiSpecialClassTotals(company)"
                      :key="item.label"
                      class="rounded bg-rose-100 px-2 py-0.5 text-xs font-medium text-rose-800"
                    >
                      {{ item.label }}: {{ item.value.toLocaleString() }}
                    </span>
                  </div>
                </div>
              </div>

              <div class="flex items-center gap-2">
                <button
                  v-if="!isReadOnly"
                  type="button"
                  @click="toggleCompanyEdit(company.id)"
                  class="rounded bg-white px-2 py-1 text-xs font-medium text-gray-700 border border-gray-200 hover:bg-gray-100"
                >
                  {{ editingCompany[company.id] ? 'Done' : 'Edit' }}
                </button>
                <button
                  v-if="!isReadOnly"
                  type="button"
                  @click="removeCompany(companyIndex)"
                  class="text-red-600 hover:text-red-800"
                  title="Delete company"
                >
                  <TrashIcon class="h-4 w-4" />
                </button>
              </div>
            </div>

            <div v-if="editingCompany[company.id]" class="mt-3 space-y-3 rounded border border-gray-200 bg-white p-3">
              <div>
                <label class="mb-1 block text-xs font-medium text-gray-700">Company Name</label>
                <input
                  v-model="company.name"
                  type="text"
                  maxlength="120"
                  placeholder="Company name"
                  class="w-full rounded border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                />
              </div>

              <div class="flex items-center justify-between gap-2">
                <h6 class="text-xs font-semibold text-gray-700">Units</h6>
                <button
                  v-if="!isReadOnly"
                  type="button"
                  @click="addUnit(companyIndex)"
                  class="rounded bg-green-600 px-2 py-1 text-xs font-medium text-white hover:bg-green-700"
                >
                  + Add Unit
                </button>
              </div>

              <div v-if="company.units.length === 0" class="rounded border border-dashed border-gray-300 bg-gray-50 px-3 py-4 text-xs italic text-gray-500">
                No units in this company.
              </div>

              <div v-else class="space-y-3">
                <div
                  v-for="(unit, unitIndex) in company.units"
                  :key="unit.id"
                  class="rounded border border-gray-200 bg-gray-50 p-3"
                >
                  <div class="mb-3 flex items-center justify-between gap-2">
                    <div class="text-xs font-semibold text-gray-700">{{ unit.name || `Unit ${unitIndex + 1}` }}</div>
                    <button
                      v-if="!isReadOnly"
                      type="button"
                      @click="removeUnit(companyIndex, unitIndex)"
                      class="text-red-600 hover:text-red-800"
                      title="Delete unit"
                    >
                      <TrashIcon class="h-4 w-4" />
                    </button>
                  </div>

                  <div class="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
                    <div class="xl:col-span-2">
                      <label class="mb-1 block text-xs font-medium text-gray-700">Unit Name</label>
                      <input
                        v-model="unit.name"
                        type="text"
                        maxlength="120"
                        placeholder="Horse Archers"
                        class="w-full rounded border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label class="mb-1 block text-xs font-medium text-gray-700">TS</label>
                      <input
                        v-model.number="unit.ts"
                        type="number"
                        maxlength="30"
                        data-min="0"
                        data-max="1000000"
                        @input="clampNumberInput"
                        class="w-full rounded border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label class="mb-1 block text-xs font-medium text-gray-700">Amount</label>
                      <input
                        v-model.number="unit.amount"
                        type="number"
                        maxlength="30"
                        data-min="1"
                        data-max="1000000"
                        @input="clampNumberInput"
                        class="w-full rounded border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                      />
                    </div>
                    <div class="xl:col-span-2">
                      <label class="mb-1 block text-xs font-medium text-gray-700">Class</label>
                      <input
                        v-model="unit.class"
                        type="text"
                        maxlength="200"
                        placeholder="Cv, F, Rec, (F)"
                        class="w-full rounded border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label class="mb-1 block text-xs font-medium text-gray-700">WT</label>
                      <input
                        v-model="unit.wt"
                        type="text"
                        maxlength="80"
                        placeholder="Mtd"
                        class="w-full rounded border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label class="mb-1 block text-xs font-medium text-gray-700">Mob</label>
                      <input
                        v-model="unit.mob"
                        type="text"
                        maxlength="80"
                        placeholder="Mounted"
                        class="w-full rounded border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label class="mb-1 block text-xs font-medium text-gray-700">Raise</label>
                      <input
                        v-model.number="unit.raise"
                        type="number"
                        maxlength="30"
                        data-min="0"
                        data-max="1000000000000000000"
                        @input="clampNumberInput"
                        class="w-full rounded border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label class="mb-1 block text-xs font-medium text-gray-700">Maintain</label>
                      <input
                        v-model.number="unit.maintain"
                        type="number"
                        maxlength="30"
                        data-min="0"
                        data-max="1000000000000000000"
                        @input="clampNumberInput"
                        class="w-full rounded border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label class="mb-1 block text-xs font-medium text-gray-700">TL</label>
                      <input
                        v-model.number="unit.techLevel"
                        type="number"
                        maxlength="30"
                        data-min="0"
                        data-max="20"
                        @input="clampNumberInput"
                        class="w-full rounded border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label class="mb-1 block text-xs font-medium text-gray-700">Current Unit TL</label>
                      <input
                        v-model.number="unit.currentTechLevel"
                        type="number"
                        maxlength="30"
                        data-min="0"
                        data-max="20"
                        @input="clampNumberInput"
                        class="w-full rounded border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                      />
                    </div>
                  </div>

                  <div class="mt-3 space-y-2">
                    <div class="flex items-center justify-between gap-2">
                      <div class="text-xs font-medium text-gray-700">Features</div>
                      <button
                        v-if="!isReadOnly"
                        type="button"
                        @click="addUnitFeature(companyIndex, unitIndex)"
                        class="rounded bg-white px-2 py-1 text-xs font-medium text-gray-700 border border-gray-200 hover:bg-gray-100"
                      >
                        + Add Feature
                      </button>
                    </div>

                    <div v-if="unit.features.length === 0" class="text-xs italic text-gray-400">
                      No features
                    </div>

                    <div v-else class="space-y-2">
                      <div
                        v-for="(feature, featureIndex) in unit.features"
                        :key="`${unit.id}-feature-${featureIndex}`"
                        class="flex items-center gap-2"
                      >
                        <input
                          v-model="unit.features[featureIndex]"
                          type="text"
                          maxlength="120"
                          placeholder="Feature"
                          class="flex-1 rounded border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                        />
                        <button
                          v-if="!isReadOnly"
                          type="button"
                          @click="removeUnitFeature(companyIndex, unitIndex, featureIndex)"
                          class="text-red-600 hover:text-red-800"
                          title="Delete feature"
                        >
                          <TrashIcon class="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
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
      </fieldset>

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
import type { RealmSaveConflictError } from '~/composables/useRealms'
import { Cog6ToothIcon, TrashIcon } from '@heroicons/vue/24/solid'
import InfoBox from '~/components/InfoBox.vue'
import ModifierInfoContent from '~/components/ModifierInfoContent.vue'
import type { Realm, ArmyCompany, ArmyUnit } from '~/types/realm'
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

const props = defineProps<{
  realmId?: string
  realmData?: Realm | null
  readOnly?: boolean
  baseVersion?: number
}>()
const emit = defineEmits<{ 
  close: []
  dirty: [isDirty: boolean]
  'saved-meta': [payload: { version: number; updatedAt: string | null }]
}>()

const { saveRealm, createEmptyRealm, realms, loadRealmForEdit } = useRealms()
const realmForm = ref<Realm>(createEmptyRealm())
const saving = ref(false)
const saved = ref(false)
const loadedRealmId = ref<string | null>(null)
const currentVersion = ref(Number(props.baseVersion ?? 1))
const isDirty = ref(false)
const autoSaveTimer = ref<number | null>(null)
const autoSaveDebounce = ref<number | null>(null)
const ignoreNextChange = ref(false)

const descriptionRef = ref<HTMLTextAreaElement | null>(null)
const isReadOnly = computed(() => Boolean(props.readOnly))

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



// Edit state tracking for enhancements, limitations, and companies
const editingEnhancement = ref<Record<number, boolean>>({})
const editingLimitation = ref<Record<number, boolean>>({})
const editingCompany = ref<Record<string, boolean>>({})

const specialClassLabels = ['F', 'Cv', 'Rec', 'Eng', 'Art', 'Arm', 'C3l', 'Air', 'Nav'] as const
const antiSpecialClassLabels = specialClassLabels.map(label => `(${label})`)

const parseFeatureModifiers = (features: string[]): { tsMult: number; raiseMult: number; maintainMult: number } => {
  let tsMult = 1
  let raiseMult = 1
  let maintainMult = 1

  features.forEach((feature) => {
    const lower = feature.toLowerCase()
    if (/x([0-9.]+)\s*ts/i.test(lower)) {
      const match = lower.match(/x([0-9.]+)\s*ts/i)
      tsMult *= Number(match?.[1]) || 1
    }
    if (/x([0-9.]+)\s*raise/i.test(lower)) {
      const match = lower.match(/x([0-9.]+)\s*raise/i)
      raiseMult *= Number(match?.[1]) || 1
    }
    if (/x([0-9.]+)\s*maintain/i.test(lower)) {
      const match = lower.match(/x([0-9.]+)\s*maintain/i)
      maintainMult *= Number(match?.[1]) || 1
    }
  })

  return { tsMult, raiseMult, maintainMult }
}

const createArmyUnit = (): ArmyUnit => ({
  id: Math.random().toString(36).substr(2, 9),
  name: '',
  ts: 0,
  class: '',
  wt: '',
  mob: '',
  raise: 0,
  maintain: 0,
  techLevel: realmForm.value.details.techLevel,
  currentTechLevel: realmForm.value.details.techLevel,
  amount: 1,
  features: []
})

const createArmyCompany = (): ArmyCompany => ({
  id: Math.random().toString(36).substr(2, 9),
  name: '',
  units: []
})

const getUnitAmount = (unit: ArmyUnit): number => {
  const amount = Number(unit.amount)
  return Number.isFinite(amount) && amount > 0 ? amount : 1
}

const normalizeClassToken = (token: string): string => {
  const trimmed = token.trim()
  if (!trimmed) return ''

  const isAnti = trimmed.startsWith('(') && trimmed.endsWith(')')
  const core = isAnti ? trimmed.slice(1, -1).trim() : trimmed
  const normalizedCore = specialClassLabels.find((label) => {
    const lowered = core.toLowerCase()
    return label.toLowerCase() === lowered || (label === 'C3l' && lowered === 'c3i')
  }) ?? core

  return isAnti ? `(${normalizedCore})` : normalizedCore
}

const parseClassTokens = (value: string): string[] => value
  .split(',')
  .map(token => normalizeClassToken(token))
  .filter(Boolean)

const getWeightedUnitTs = (unit: ArmyUnit): number => {
  const mods = parseFeatureModifiers(unit.features)
  return Math.round(unit.ts * getUnitAmount(unit) * mods.tsMult)
}

const getUnitRaiseCost = (unit: ArmyUnit): number => {
  const mods = parseFeatureModifiers(unit.features)
  return Math.round(unit.raise * getUnitAmount(unit) * mods.raiseMult)
}

const getUnitMaintainCost = (unit: ArmyUnit): number => {
  const mods = parseFeatureModifiers(unit.features)
  return Math.round(unit.maintain * getUnitAmount(unit) * mods.maintainMult)
}

const getCompanyRaiseTotal = (company: ArmyCompany): number => company.units
  .reduce((sum, unit) => sum + getUnitRaiseCost(unit), 0)

const getCompanyMaintainTotal = (company: ArmyCompany): number => company.units
  .reduce((sum, unit) => sum + getUnitMaintainCost(unit), 0)

const getCompanyTotalTs = (company: ArmyCompany): number => company.units
  .reduce((sum, unit) => sum + getWeightedUnitTs(unit), 0)

const buildCompanyClassTotals = (company: ArmyCompany, labels: readonly string[], useAntiTotals: boolean) => labels
  .map((label) => {
    const value = company.units.reduce((sum, unit) => {
      const tokens = parseClassTokens(unit.class)
      if (useAntiTotals) {
        // Only use explicit anti-class tokens like (F), (Cv), etc.
        return tokens.includes(label) ? sum + getWeightedUnitTs(unit) : sum
      }

      return tokens.includes(label) ? sum + getWeightedUnitTs(unit) : sum
    }, 0)

    return { label, value }
  })
  .filter(item => item.value > 0)

const getCompanySpecialClassTotals = (company: ArmyCompany) => buildCompanyClassTotals(company, specialClassLabels, false)
const getCompanyAntiSpecialClassTotals = (company: ArmyCompany) => buildCompanyClassTotals(company, antiSpecialClassLabels, true)

const getCompanyLogisticsTypes = (company: ArmyCompany): string[] => {
  const types = new Set<string>()

  company.units.forEach((unit) => {
    const mobility = unit.mob.toLowerCase()
    if (!mobility.trim()) {
      types.add('Land')
      return
    }

    let assigned = false
    if (/(air|aero|fly|flight|airborne)/i.test(mobility)) {
      types.add('Air')
      assigned = true
    }
    if (/(nav|naval|sea|ship|boat|sub|marine)/i.test(mobility)) {
      types.add('Naval')
      assigned = true
    }
    if (!assigned) {
      types.add('Land')
    }
  })

  return ['Land', 'Naval', 'Air'].filter(type => types.has(type))
}

const addCompany = () => {
  const company = createArmyCompany()
  realmForm.value.army.companies.push(company)
}

const removeCompany = (index: number) => {
  const confirmed = window.confirm('Delete this company and all its units?')
  if (!confirmed) return
  
  const [company] = realmForm.value.army.companies.splice(index, 1)
  if (company) {
    delete editingCompany.value[company.id]
  }
}

const toggleCompanyEdit = (companyId: string) => {
  editingCompany.value[companyId] = !editingCompany.value[companyId]
}

const addUnit = (companyIndex: number) => {
  realmForm.value.army.companies[companyIndex]?.units.push(createArmyUnit())
}

const removeUnit = (companyIndex: number, unitIndex: number) => {
  realmForm.value.army.companies[companyIndex]?.units.splice(unitIndex, 1)
}

const addUnitFeature = (companyIndex: number, unitIndex: number) => {
  realmForm.value.army.companies[companyIndex]?.units[unitIndex]?.features.push('')
}

const removeUnitFeature = (companyIndex: number, unitIndex: number, featureIndex: number) => {
  realmForm.value.army.companies[companyIndex]?.units[unitIndex]?.features.splice(featureIndex, 1)
}

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
  if (props.realmData) {
    if (!isReadOnly.value && isDirty.value) return
    ignoreNextChange.value = true
    realmForm.value = loadRealmForEdit(props.realmData)
    loadedRealmId.value = props.realmData.id
    isDirty.value = false
    return
  }

  if (!props.realmId) return
  if (loadedRealmId.value === props.realmId && !isReadOnly.value) return

  const realm = realms.value.find(r => r.id === props.realmId)
  if (realm) {
    ignoreNextChange.value = true
    realmForm.value = loadRealmForEdit(realm as Realm)
    loadedRealmId.value = props.realmId
    isDirty.value = false
  }
}

onMounted(loadRealmFromStore)
watch([() => props.realmId, realms, () => props.realmData], loadRealmFromStore, { deep: true })
watch(() => props.baseVersion, (version) => {
  if (typeof version === 'number' && Number.isFinite(version)) {
    currentVersion.value = version
  }
}, { immediate: true })

watch(
  realmForm,
  () => {
    if (ignoreNextChange.value) {
      ignoreNextChange.value = false
      return
    }
    if (isReadOnly.value) return
    isDirty.value = true

    if (autoSaveDebounce.value !== null) {
      window.clearTimeout(autoSaveDebounce.value)
    }

    autoSaveDebounce.value = window.setTimeout(() => {
      if (saving.value || !isDirty.value) return
      if (!realmForm.value.name.trim()) return
      void saveRealmFn({ showSaved: false, closeAfter: false })
    }, 10 * 1000)
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
    if (isReadOnly.value) return
    if (saving.value || !isDirty.value) return
    if (!realmForm.value.name.trim()) return
    void saveRealmFn({ showSaved: false, closeAfter: false })
  }, 10 * 60 * 1000)

  const handleBeforeUnload = (e: BeforeUnloadEvent) => {
    if (isDirty.value && !isReadOnly.value) {
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
    if (autoSaveDebounce.value !== null) {
      window.clearTimeout(autoSaveDebounce.value)
    }
    window.removeEventListener('beforeunload', handleBeforeUnload)
  })
})

const saveRealmFn = async (options?: { showSaved?: boolean; closeAfter?: boolean; forceOverride?: boolean }) => {
  const showSaved = options?.showSaved ?? true
  const closeAfter = options?.closeAfter ?? true
  const forceOverride = options?.forceOverride ?? false
  if (isReadOnly.value) return
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

    const result = await saveRealm(realmForm.value, {
      expectedVersion: currentVersion.value,
      force: forceOverride
    })
    currentVersion.value = result.version
    emit('saved-meta', { version: result.version, updatedAt: result.updatedAt })
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
  } catch (e: unknown) {
    const conflictError = e as RealmSaveConflictError
    if (conflictError?.code === 'REALM_CONFLICT') {
      currentVersion.value = conflictError.serverVersion
      if (showSaved) {
        const wantsOverride = window.confirm('Someone else changed this realm since you loaded it. Do you want to override their version with your current changes?')
        if (wantsOverride) {
          const retryResult = await saveRealm(realmForm.value, {
            expectedVersion: currentVersion.value,
            force: true
          })
          currentVersion.value = retryResult.version
          emit('saved-meta', { version: retryResult.version, updatedAt: retryResult.updatedAt })
          isDirty.value = false
          saved.value = true
          setTimeout(() => {
            saved.value = false
            if (closeAfter && isEditMode.value) {
              emit('close')
            }
          }, 2000)
        }
      }
      return
    }
    throw e
  } finally {
    saving.value = false
  }
}

const handleSubmit = (event: SubmitEvent) => {
  event.preventDefault()
  void saveRealmFn()
}
</script>
