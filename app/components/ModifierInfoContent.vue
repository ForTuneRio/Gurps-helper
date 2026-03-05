<template>
  <div>
    <template v-if="name === 'Duration'">
      <table class="w-full text-left mb-2 text-xs">
        <thead>
          <tr class="border-b border-gray-300 dark:border-gray-600">
            <th class="px-1 py-1">Duration</th>
            <th class="px-1 py-1">Energy</th>
          </tr>
        </thead>
        <tbody>
          <tr><td class="px-1 py-1">Momentary</td><td class="px-1 py-1">0</td></tr>
          <tr><td class="px-1 py-1">10 minutes</td><td class="px-1 py-1">1</td></tr>
          <tr><td class="px-1 py-1">30 minutes</td><td class="px-1 py-1">2</td></tr>
          <tr><td class="px-1 py-1">1 hour</td><td class="px-1 py-1">3</td></tr>
          <tr><td class="px-1 py-1">3 hours</td><td class="px-1 py-1">4</td></tr>
          <tr><td class="px-1 py-1">6 hours</td><td class="px-1 py-1">5</td></tr>
          <tr><td class="px-1 py-1">12 hours</td><td class="px-1 py-1">6</td></tr>
          <tr><td class="px-1 py-1">1 day</td><td class="px-1 py-1">7</td></tr>
          <tr><td class="px-1 py-1">3 days</td><td class="px-1 py-1">8</td></tr>
          <tr><td class="px-1 py-1">1 week</td><td class="px-1 py-1">9</td></tr>
          <tr><td class="px-1 py-1">2 weeks</td><td class="px-1 py-1">10</td></tr>
          <tr><td class="px-1 py-1">1 month</td><td class="px-1 py-1">11</td></tr>
          <tr><td class="px-1 py-1">+1 month</td><td class="px-1 py-1">+1</td></tr>
        </tbody>
      </table>
      <p class="mt-2">For durations over a year, the added energy becomes (number of years) + 21.</p>
    </template>
    
    <template v-else-if="name === 'Subject Weight'">
      <table class="w-full text-left text-xs">
        <thead>
          <tr class="border-b border-gray-300 dark:border-gray-600">
            <th class="px-1 py-1">Weight</th>
            <th class="px-1 py-1">Energy</th>
          </tr>
        </thead>
        <tbody>
          <tr><td class="px-1 py-1">10 lbs.</td><td class="px-1 py-1">0</td></tr>
          <tr><td class="px-1 py-1">30 lbs.</td><td class="px-1 py-1">1</td></tr>
          <tr><td class="px-1 py-1">100 lbs.</td><td class="px-1 py-1">2</td></tr>
          <tr><td class="px-1 py-1">300 lbs.</td><td class="px-1 py-1">3</td></tr>
          <tr><td class="px-1 py-1">1,000 lbs.</td><td class="px-1 py-1">4</td></tr>
          <tr><td class="px-1 py-1">3,000 lbs.</td><td class="px-1 py-1">5</td></tr>
          <tr><td class="px-1 py-1">5 tons</td><td class="px-1 py-1">6</td></tr>
          <tr><td class="px-1 py-1">15 tons</td><td class="px-1 py-1">7</td></tr>
          <tr><td class="px-1 py-1">50 tons</td><td class="px-1 py-1">8</td></tr>
          <tr><td class="px-1 py-1">150 tons</td><td class="px-1 py-1">9</td></tr>
          <tr><td class="px-1 py-1">450 tons</td><td class="px-1 py-1">10</td></tr>
          <tr><td class="px-1 py-1">1,350 tons</td><td class="px-1 py-1">11</td></tr>
          <tr><td class="px-1 py-1">×3</td><td class="px-1 py-1">+1</td></tr>
        </tbody>
      </table>
    </template>
    
    <template v-else-if="name === 'Damage'">
      <table class="w-full text-left text-xs">
        <thead>
          <tr class="border-b border-gray-300 dark:border-gray-600">
            <th class="px-1 py-1">Damage</th>
            <th class="px-1 py-1">Energy</th>
          </tr>
        </thead>
        <tbody>
          <tr><td class="px-1 py-1">1d</td><td class="px-1 py-1">0</td></tr>
          <tr><td class="px-1 py-1">1d+1</td><td class="px-1 py-1">1</td></tr>
          <tr><td class="px-1 py-1">1d+2</td><td class="px-1 py-1">2</td></tr>
          <tr><td class="px-1 py-1">2d-1</td><td class="px-1 py-1">3</td></tr>
          <tr><td class="px-1 py-1">2d</td><td class="px-1 py-1">4</td></tr>
          <tr><td class="px-1 py-1">2d+1</td><td class="px-1 py-1">5</td></tr>
          <tr><td class="px-1 py-1">2d+2</td><td class="px-1 py-1">6</td></tr>
          <tr><td class="px-1 py-1">3d-1</td><td class="px-1 py-1">7</td></tr>
          <tr><td class="px-1 py-1">3d</td><td class="px-1 py-1">8</td></tr>
          <tr><td class="px-1 py-1">3d+1</td><td class="px-1 py-1">9</td></tr>
          <tr><td class="px-1 py-1">3d+2</td><td class="px-1 py-1">10</td></tr>
          <tr><td class="px-1 py-1">4d-1</td><td class="px-1 py-1">11</td></tr>
          <tr><td class="px-1 py-1">etc.</td><td class="px-1 py-1">+1</td></tr>
        </tbody>
      </table>
      <p class="mt-2">Damage Type Energy Multiplier: ×0.5 for small piercing, ×1.5 for cutting or large piercing, ×2 for corrosion, fatigue, huge piercing, or impaling. Always round up.</p>
    </template>
    
    <template v-else-if="name === 'Range'">
      <p class="mb-2">Extends the distance from which the spell can be cast.</p>
      <p class="font-semibold mb-2">Most Spells:</p>
      <p class="mb-2">Find the range in yards on the Size and Speed/Range Table and add the "Size" value for that line (minimum +0) to the energy cost.</p>
      <p class="mb-2">If the caster guesses and doesn't add enough range to reach the subject, the spell will have no effect.</p>
      <p class="font-semibold mb-2">Size and Speed/Range Table:</p>
      <table class="w-full text-left text-xs mb-3">
        <thead>
          <tr class="border-b border-gray-300 dark:border-gray-600">
            <th class="px-2 py-1">Size</th>
            <th class="px-2 py-1">Linear Measurement</th>
          </tr>
        </thead>
        <tbody>
          <tr><td class="px-2 py-1">0</td><td class="px-2 py-1">2 yd</td></tr>
          <tr><td class="px-2 py-1">+1</td><td class="px-2 py-1">3 yd</td></tr>
          <tr><td class="px-2 py-1">+2</td><td class="px-2 py-1">5 yd</td></tr>
          <tr><td class="px-2 py-1">+3</td><td class="px-2 py-1">7 yd</td></tr>
          <tr><td class="px-2 py-1">+4</td><td class="px-2 py-1">10 yd</td></tr>
          <tr><td class="px-2 py-1">+5</td><td class="px-2 py-1">15 yd</td></tr>
          <tr><td class="px-2 py-1">+6</td><td class="px-2 py-1">20 yd</td></tr>
          <tr><td class="px-2 py-1">+7</td><td class="px-2 py-1">30 yd</td></tr>
          <tr><td class="px-2 py-1">+8</td><td class="px-2 py-1">50 yd</td></tr>
          <tr><td class="px-2 py-1">+9</td><td class="px-2 py-1">70 yd</td></tr>
          <tr><td class="px-2 py-1">+10</td><td class="px-2 py-1">100 yd</td></tr>
          <tr><td class="px-2 py-1">+11</td><td class="px-2 py-1">150 yd</td></tr>
          <tr><td class="px-2 py-1">etc.</td><td class="px-2 py-1">etc.</td></tr>
        </tbody>
      </table>
      <p class="mb-8">Continue this progression indefinitely, with each 10× increase in linear measurement giving +6 to SM or modifier.</p>
      <p class="font-semibold mb-2">Information Spells:</p>
      <p class="mb-2">Use Long-Distance Modifiers (penalty inverted) as additional energy cost.</p>
      <table class="w-full text-left text-xs mb-3">
        <thead>
          <tr class="border-b border-gray-300 dark:border-gray-600">
            <th class="px-2 py-1">Distance</th>
            <th class="px-2 py-1">Energy Cost</th>
          </tr>
        </thead>
        <tbody>
          <tr><td class="px-2 py-1">Up to 200 yards</td><td class="px-2 py-1">0</td></tr>
          <tr><td class="px-2 py-1">1/2 mile</td><td class="px-2 py-1">+1</td></tr>
          <tr><td class="px-2 py-1">1 mile</td><td class="px-2 py-1">+2</td></tr>
          <tr><td class="px-2 py-1">3 miles</td><td class="px-2 py-1">+3</td></tr>
          <tr><td class="px-2 py-1">10 miles</td><td class="px-2 py-1">+4</td></tr>
          <tr><td class="px-2 py-1">30 miles</td><td class="px-2 py-1">+5</td></tr>
          <tr><td class="px-2 py-1">100 miles</td><td class="px-2 py-1">+6</td></tr>
          <tr><td class="px-2 py-1">300 miles</td><td class="px-2 py-1">+7</td></tr>
          <tr><td class="px-2 py-1">1,000 miles</td><td class="px-2 py-1">+8</td></tr>
        </tbody>
      </table>
      <p class="font-semibold mb-2">Cross-Time Spells:</p>
      <p class="mb-2">Use the Long-Distance Modifiers table above, but read "miles" as "days."</p>
      <p class="font-semibold mb-2">Dimensional Barriers:</p>
      <p>Crossing dimensional barriers adds a flat +10 energy per dimension.</p>
    </template>
    
    <template v-else-if="name === 'Speed'">
      <p class="font-semibold mb-2">Movement Spells:</p>
      <p class="mb-2">For movement spells, look up the speed in yards/second on the Size and Speed/Range Table and add the "Size" value for that line (minimum +0) to the energy cost.</p>
      <p class="mb-2">This includes Crossroads-based shortcuts – a gate to your home 12 miles away is allowing you to travel at an effective speed of 12 miles/second (+25 energy).</p>
      <p class="mb-2">Gates to other times or dimensions don't need a speed component.</p>
      <p class="font-semibold mb-2">Size and Speed/Range Table:</p>
      <table class="w-full text-left text-xs mb-2">
        <thead>
          <tr class="border-b border-gray-300 dark:border-gray-600">
            <th class="px-2 py-1">Size</th>
            <th class="px-2 py-1">Linear Measurement</th>
          </tr>
        </thead>
        <tbody>
          <tr><td class="px-2 py-1">0</td><td class="px-2 py-1">2 yd</td></tr>
          <tr><td class="px-2 py-1">+1</td><td class="px-2 py-1">3 yd</td></tr>
          <tr><td class="px-2 py-1">+2</td><td class="px-2 py-1">5 yd</td></tr>
          <tr><td class="px-2 py-1">+3</td><td class="px-2 py-1">7 yd</td></tr>
          <tr><td class="px-2 py-1">+4</td><td class="px-2 py-1">10 yd</td></tr>
          <tr><td class="px-2 py-1">+5</td><td class="px-2 py-1">15 yd</td></tr>
          <tr><td class="px-2 py-1">+6</td><td class="px-2 py-1">20 yd</td></tr>
          <tr><td class="px-2 py-1">+7</td><td class="px-2 py-1">30 yd</td></tr>
          <tr><td class="px-2 py-1">+8</td><td class="px-2 py-1">50 yd</td></tr>
          <tr><td class="px-2 py-1">+9</td><td class="px-2 py-1">70 yd</td></tr>
          <tr><td class="px-2 py-1">+10</td><td class="px-2 py-1">100 yd</td></tr>
          <tr><td class="px-2 py-1">+11</td><td class="px-2 py-1">150 yd</td></tr>
          <tr><td class="px-2 py-1">etc.</td><td class="px-2 py-1">etc.</td></tr>
        </tbody>
      </table>
      <p>Continue this progression indefinitely, with each 10× increase in linear measurement giving +6 to SM or modifier.</p>
    </template>
    
    <template v-else-if="name === 'Area of Effect'">
      <p class="mb-2">Find radius (not diameter!) in yards on the table, multiply Size value × 2 for energy cost (minimum +2).</p>
      <p class="mb-2"><em>Example: 10 yd radius = Size +4 → +4 × 2 = +8 energy</em></p>
      <p class="mb-2">If caster not in area, calculate range to nearest edge.</p>
      <p class="font-semibold mb-2">Size and Speed/Range Table:</p>
      <table class="w-full text-left text-xs mb-2">
        <thead>
          <tr class="border-b border-gray-300 dark:border-gray-600">
            <th class="px-2 py-1">Size</th>
            <th class="px-2 py-1">Radius (yards)</th>
          </tr>
        </thead>
        <tbody>
          <tr><td class="px-2 py-1">0</td><td class="px-2 py-1">2 yd</td></tr>
          <tr><td class="px-2 py-1">+1</td><td class="px-2 py-1">3 yd</td></tr>
          <tr><td class="px-2 py-1">+2</td><td class="px-2 py-1">5 yd</td></tr>
          <tr><td class="px-2 py-1">+3</td><td class="px-2 py-1">7 yd</td></tr>
          <tr><td class="px-2 py-1">+4</td><td class="px-2 py-1">10 yd</td></tr>
          <tr><td class="px-2 py-1">+5</td><td class="px-2 py-1">15 yd</td></tr>
          <tr><td class="px-2 py-1">+6</td><td class="px-2 py-1">20 yd</td></tr>
          <tr><td class="px-2 py-1">+7</td><td class="px-2 py-1">30 yd</td></tr>
          <tr><td class="px-2 py-1">+8</td><td class="px-2 py-1">50 yd</td></tr>
          <tr><td class="px-2 py-1">+9</td><td class="px-2 py-1">70 yd</td></tr>
          <tr><td class="px-2 py-1">+10</td><td class="px-2 py-1">100 yd</td></tr>
          <tr><td class="px-2 py-1">+11</td><td class="px-2 py-1">150 yd</td></tr>
          <tr><td class="px-2 py-1">etc.</td><td class="px-2 py-1">etc.</td></tr>
        </tbody>
      </table>
      <p class="mb-2">Each 10× increase gives +6 to Size modifier.</p>
      <p class="font-semibold mb-2">Excluding Targets:</p>
      <p>+1 energy per 2 specific subjects excluded. Must designate each explicitly.</p>
    </template>
    
    <template v-else-if="name === 'Bonus or Penalty'">
      <p>Applies a modifier to rolls affected by the spell.</p>
    </template>
    
    <template v-else-if="name === 'Meta-Magic'">
      <p>Adds special magical effects or modifies spell casting rules.</p>
    </template>
    
    <template v-else-if="name === 'Altered Traits'">
      <p>Allows creation of beings or objects with unusual characteristics.</p>
    </template>
    
    <template v-else-if="name === 'Extra Energy'">
      <p>Adds additional energy cost for specialized effects.</p>
    </template>
    
    <template v-else>
      <p>{{ name }} description not available.</p>
    </template>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  name: string
}>()
</script>
