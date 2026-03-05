<template>
  <div>
    <template v-if="name === 'Duration'">
      <p class="text-xs text-gray-500 dark:text-gray-400 mb-2">p. 18</p>
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
      <p class="mt-2"><strong>Over 1 year:</strong> Energy = (number of years) + 21.</p>
    </template>
    
    <template v-else-if="name === 'Subject Weight'">
      <p class="text-xs text-gray-500 dark:text-gray-400 mb-2">p. 18</p>
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
    
    <template v-else-if="name === 'Damage / Healing' || name === 'Damage'">
      <p class="text-xs text-gray-500 dark:text-gray-400 mb-2">p. 17</p>
      <p class="mb-2"><strong>Internal Damage:</strong> Direct magical damage. Target's DR does not protect. Target may resist. Invisible to mundane senses.</p>
      <p class="mb-2"><strong>External Damage (Missile):</strong> Creates physical missile (hand-held or ranged). Requires attack roll (Innate Attack). Triple damage listed (or 2× if explosive). Target's DR protects. Visible and can be dodged/blocked. Missile stats: Acc 3, Range 10/100, RoF 1, Rcl 1.</p>
      <p class="mb-2"><strong>Duration restriction:</strong> Damage cannot be combined with Duration (except via enhancements like Cyclic).</p>
      <table class="w-full text-left text-xs mb-2">
        <thead>
          <tr class="border-b border-gray-300 dark:border-gray-600">
            <th class="px-1 py-1">Damage / Healing</th>
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
      <p class="mt-2"><strong>Damage Type Energy Multiplier:</strong> ×0.5 for small piercing, ×1.5 for cutting or large piercing, ×2 for corrosion, fatigue, huge piercing, or impaling. Always round up.</p>
      <p class="mt-2"><strong>Healing:</strong> Use this same damage column to determine HP or FP restored.</p>
      <p class="mt-2"><strong>Restoring attributes:</strong> Uses Altered Traits modifier.</p>
      <p class="mt-2"><strong>Duration restriction:</strong> Healing cannot be combined with Duration; effect is already permanent.</p>
      <p class="mt-3 font-semibold">Enhancements:</p>
      <p class="mt-2">Calculate total energy for damage modifier only (including type multiplier).</p>
      <p class="mt-2"><strong>20 or less energy:</strong> +1 energy per +5% enhancement (or fraction).</p>
      <p class="mt-2"><strong>21+ energy:</strong> Apply enhancement % to damage cost only (round up).</p>
      <p class="mt-2"><strong>Limitations:</strong> Can reduce enhancement cost (net min +0%; always min +1 energy). <strong>Cannot replicate</strong> existing modifiers (Area Effect, Range, etc.). <strong>Exception:</strong> Duration enhancements (Cyclic, Persistent) allowed.</p>
    </template>
    
    <template v-else-if="name === 'Range'">
      <p class="text-xs text-gray-500 dark:text-gray-400 mb-2">p. 18</p>
      <p class="mb-2">Extends casting distance from caster to subject.</p>
      <p class="font-semibold mb-2">Most Spells:</p>
      <p class="mb-2">Find range in yards on Size and Speed/Range Table, add "Size" value (minimum +0) to energy cost.</p>
      <p class="mb-2"><strong>Important:</strong> If caster guesses too low, spell has no effect.</p>
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
      <p class="mb-8"><strong>Progression:</strong> Each 10× increase in linear measurement gives +6 to Size/modifier.</p>
      <p class="font-semibold mb-2">Information Spells:</p>
      <p class="mb-2">Use Long-Distance Modifiers (inverted penalties) as energy cost.</p>
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
      <p class="mb-2">Use Long-Distance Modifiers table, but read "miles" as "days."</p>
      <p class="font-semibold mb-2">Dimensional Barriers:</p>
      <p><strong>+10 energy</strong> per dimension crossed.</p>
    </template>
    
    <template v-else-if="name === 'Speed'">
      <p class="text-xs text-gray-500 dark:text-gray-400 mb-2">p. 18</p>
      <p class="font-semibold mb-2">Movement Spells:</p>
      <p class="mb-2">Look up speed in yards/second on Size and Speed/Range Table, add "Size" value (minimum +0) to energy cost.</p>
      <p class="mb-2"><strong>Crossroads shortcuts:</strong> A gate 12 miles away = 12 miles/second speed (+25 energy).</p>
      <p class="mb-2"><strong>Note:</strong> Gates to other times/dimensions don't need speed component.</p>
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
      <p><strong>Progression:</strong> Each 10× increase in linear measurement gives +6 to Size/modifier.</p>
    </template>
    
    <template v-else-if="name === 'Area of Effect'">
      <p class="text-xs text-gray-500 dark:text-gray-400 mb-2">p. 17</p>
      <p class="mb-2">Find <strong>radius</strong> (not diameter!) in yards, multiply Size value × 2 for energy cost (minimum +2).</p>
      <p class="mb-2"><em>Example: 10 yd radius = Size +4 → +4 × 2 = +8 energy</em></p>
      <p class="mb-2"><strong>Caster outside area:</strong> Calculate range to nearest edge.</p>
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
      <p class="mb-2"><strong>Progression:</strong> Each 10× increase gives +6 to Size modifier.</p>
      <p class="font-semibold mb-2">Excluding Targets:</p>
      <p><strong>+1 energy per 2 subjects</strong> excluded. Must designate each explicitly.</p>
    </template>
    
    <template v-else-if="name === 'Bonus or Penalty'">
      <p class="text-xs text-gray-500 dark:text-gray-400 mb-2">p. 17</p>
      <p class="mb-2">Bestows a bonus or inflicts a penalty on target rolls.</p>
      <p class="mb-2">Choose scope based on how many rolls are affected:</p>
      <p class="mb-2"><strong>Broad</strong>: large categories (e.g., active defense rolls, Sense rolls, or a wildcard skill).</p>
      <p class="mb-2"><strong>Moderate</strong>: related subsets (e.g., rolls to hide or Vision rolls).</p>
      <p class="mb-2"><strong>Narrow</strong>: specific situations (e.g., Climbing rolls or social rolls affecting a specific person).</p>
      <table class="w-full text-left text-xs mb-2">
        <thead>
          <tr class="border-b border-gray-300 dark:border-gray-600">
            <th class="px-2 py-1">Modifier</th>
            <th class="px-2 py-1">Broad</th>
            <th class="px-2 py-1">Moderate</th>
            <th class="px-2 py-1">Narrow</th>
          </tr>
        </thead>
        <tbody>
          <tr><td class="px-2 py-1">+/-1</td><td class="px-2 py-1">5</td><td class="px-2 py-1">2</td><td class="px-2 py-1">1</td></tr>
          <tr><td class="px-2 py-1">+/-2</td><td class="px-2 py-1">10</td><td class="px-2 py-1">4</td><td class="px-2 py-1">2</td></tr>
          <tr><td class="px-2 py-1">+/-3</td><td class="px-2 py-1">20</td><td class="px-2 py-1">8</td><td class="px-2 py-1">4</td></tr>
          <tr><td class="px-2 py-1">+/-4</td><td class="px-2 py-1">40</td><td class="px-2 py-1">16</td><td class="px-2 py-1">8</td></tr>
          <tr><td class="px-2 py-1">+/-5</td><td class="px-2 py-1">80</td><td class="px-2 py-1">32</td><td class="px-2 py-1">16</td></tr>
          <tr><td class="px-2 py-1">Each additional +/-1</td><td class="px-2 py-1">x2</td><td class="px-2 py-1">x2</td><td class="px-2 py-1">x2</td></tr>
        </tbody>
      </table>
      <p><strong>Restriction:</strong> May apply penalties to magic use, but not bonuses.</p>
    </template>
    
    <template v-else-if="name === 'Affliction'">
      <p class="text-xs text-gray-500 dark:text-gray-400 mb-2">p. 16</p>
      <p class="mb-2">Applies negative conditions to target (stunning, nausea, paralysis, etc.).</p>
      <p class="mb-2"><strong>Stunning (mental or physical):</strong> No additional energy - spell effect is sufficient.</p>
      <p class="mb-2"><strong>Other afflictions:</strong> +1 energy per +5% (based on Affliction enhancement value).</p>
      <p class="mb-2"><em>Example: Nausea spell = +6 energy</em></p>
      <p><strong>Note:</strong> Generally requires separate spell effect for each affliction (GM may allow exceptions for closely related conditions).</p>
    </template>
    
    <template v-else-if="name === 'Meta-Magic'">
      <p class="text-xs text-gray-500 dark:text-gray-400 mb-2">p. 18</p>
      <p class="mb-2">Used to dispel or alter existing magic.</p>
      <p>Additional energy cost equals the full energy cost of the original spell being affected.</p>
    </template>
    
    <template v-else-if="name === 'Altered Traits'">
      <p class="text-xs text-gray-500 dark:text-gray-400 mb-2">p. 16</p>
      <p class="mb-2">Modifies character traits: advantages, disadvantages, attributes, etc.</p>
      <p class="mb-2"><strong>Improving character:</strong> +1 per 1 CP</p>
      <p class="mb-2"><strong>Worsening character:</strong> +1 per 5 CP</p>
      <p class="mb-2"><strong>Self-Control Rolls:</strong> Disadvantages with self-control rolls let the target resist. If you remove the self-control roll option, multiply the disadvantage value by 2.5.</p>
      <p class="mb-2"><strong>Multiple Traits:</strong> One spell can alter multiple traits if they make sense together (GM discretion).</p>
      <p class="mb-2"><strong>Healing Reduced Traits:</strong> If a trait was artificially reduced (e.g., by another spell), a spell adding it back permanently heals the loss.</p>
      <p><strong>Restrictions:</strong> Cannot add Magery or Ritual Adept. HP/FP added this way cannot be sacrificed for magical energy.</p>
    </template>
    
    <template v-else-if="name === 'Extra Energy'">
      <p class="text-xs text-gray-500 dark:text-gray-400 mb-2">p. 18</p>
      <p class="mb-2">Caster can add extra energy for no additional effect.</p>
      <p class="mb-2"><strong>Common uses:</strong> Make spell harder to dispel (Meta-Magic), overcome existing spell effects (Stacking Spells), or when caster gathers more energy than expected without needing extra range/duration/effect.</p>
      <p><strong>Other uses:</strong> Enhancements, limitations adjustments, GM-specific requirements, or unique spell effects.</p>
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
