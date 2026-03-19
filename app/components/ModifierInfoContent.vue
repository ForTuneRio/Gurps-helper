<template>
  <div>
    <template v-if="name === 'Spell Effects'">
      <p class="font-semibold mb-2">Effect Costs:</p>
      <table class="w-full text-left mb-3">
        <thead>
          <tr class="border-b border-gray-300 dark:border-gray-600">
            <th class="px-2 py-1">Effect</th>
            <th class="px-2 py-1">Cost</th>
          </tr>
        </thead>
        <tbody>
          <tr><td class="px-2 py-1">Sense</td><td class="px-2 py-1">2</td></tr>
          <tr><td class="px-2 py-1">Strengthen</td><td class="px-2 py-1">3</td></tr>
          <tr><td class="px-2 py-1">Restore</td><td class="px-2 py-1">4</td></tr>
          <tr><td class="px-2 py-1">Control</td><td class="px-2 py-1">5</td></tr>
          <tr><td class="px-2 py-1">Destroy</td><td class="px-2 py-1">5</td></tr>
          <tr><td class="px-2 py-1">Create</td><td class="px-2 py-1">6</td></tr>
          <tr><td class="px-2 py-1">Transform</td><td class="px-2 py-1">8</td></tr>
        </tbody>
      </table>
      <p class="font-semibold mb-2">Greater Effects Multiplier:</p>
      <table class="w-full text-left">
        <thead>
          <tr class="border-b border-gray-300 dark:border-gray-600">
            <th class="px-2 py-1">Greater Effects</th>
            <th class="px-2 py-1">Multiplier</th>
          </tr>
        </thead>
        <tbody>
          <tr><td class="px-2 py-1">0</td><td class="px-2 py-1">×1</td></tr>
          <tr><td class="px-2 py-1">1</td><td class="px-2 py-1">×3</td></tr>
          <tr><td class="px-2 py-1">2</td><td class="px-2 py-1">×5</td></tr>
          <tr><td class="px-2 py-1">3</td><td class="px-2 py-1">×7</td></tr>
          <tr><td class="px-2 py-1">4</td><td class="px-2 py-1">×9</td></tr>
          <tr><td class="px-2 py-1">+1</td><td class="px-2 py-1">+2</td></tr>
        </tbody>
      </table>
    </template>

    <template v-else-if="name === 'Reaction-Time Modifier'">
      <p class="mb-2">Reaction-Time Modifier (RTM) is a broad indicator of how quickly the realm can respond to events. It reflects how well organized the realm is - both in administrative processes and availability of physical resources - as well as the technological ease of communicating and coordinating activities.</p>
      <p class="mb-2">Think of it as "Basic Speed for realms," with these differences: lower is faster (e.g., -1 is better than +1), and slower realms act first and faster ones can interrupt those actions, as explained in Chapter 2.</p>
      <p class="mb-2">Use the Reaction-Time Modifier Table to determine RTM. This normally applies to all responses. However, certain realms work particularly quickly or slowly for specialized tasks, so the GM may specify different RTMs in some circumstances.</p>
      <p class="font-semibold mb-2">Base Reaction-Time Modifier Table</p>
      <table class="w-full text-left text-xs mb-2">
        <thead>
          <tr class="border-b border-gray-300 dark:border-gray-600">
            <th class="px-1 py-1">Trait</th>
            <th class="px-1 py-1">Modifier</th>
          </tr>
        </thead>
        <tbody>
          <tr><td class="px-1 py-1">TL0-4</td><td class="px-1 py-1">+2</td></tr>
          <tr><td class="px-1 py-1">TL5-6</td><td class="px-1 py-1">+1</td></tr>
          <tr><td class="px-1 py-1">TL7-8</td><td class="px-1 py-1">0</td></tr>
          <tr><td class="px-1 py-1">TL9-10</td><td class="px-1 py-1">-1</td></tr>
          <tr><td class="px-1 py-1">TL11+</td><td class="px-1 py-1">-2</td></tr>
          <tr><td class="px-1 py-1">Management Skill 9 or less</td><td class="px-1 py-1">+3</td></tr>
          <tr><td class="px-1 py-1">Management Skill 10-11</td><td class="px-1 py-1">+2</td></tr>
          <tr><td class="px-1 py-1">Management Skill 12-14</td><td class="px-1 py-1">+1</td></tr>
          <tr><td class="px-1 py-1">Management Skill 15-17</td><td class="px-1 py-1">0</td></tr>
          <tr><td class="px-1 py-1">Management Skill 18-20</td><td class="px-1 py-1">-1</td></tr>
          <tr><td class="px-1 py-1">Management Skill 21+</td><td class="px-1 py-1">-2</td></tr>
          <tr><td class="px-1 py-1">Complexity</td><td class="px-1 py-1">+(highest Status the realm supports)/2, rounded down</td></tr>
        </tbody>
      </table>
      <p>RTM can be modified from this base. Raising it is a limitation, and lowering it is an enhancement; see Reflexive/Inactive Realm, p. 26.</p>
    </template>

    <template v-else-if="name === 'Realm Size Value'">
      <p class="font-semibold mb-2">Realm Size Table</p>
      <table class="w-full text-left text-xs mb-3">
        <thead>
          <tr class="border-b border-gray-300 dark:border-gray-600">
            <th class="px-1 py-1">Typical Area</th>
            <th class="px-1 py-1">Area Knowledge Class</th>
            <th class="px-1 py-1">Typical Realm Size Value</th>
            <th class="px-1 py-1">Examples (with adjusted values)</th>
            <th class="px-1 py-1">Notes</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="px-1 py-1">All inhabited solar systems in a galaxy</td>
            <td class="px-1 py-1">Galaxy</td>
            <td class="px-1 py-1">+36</td>
            <td class="px-1 py-1">Milky Way Galaxy</td>
            <td class="px-1 py-1">[1]</td>
          </tr>
          <tr>
            <td class="px-1 py-1">100 planets</td>
            <td class="px-1 py-1">Interplanetary State</td>
            <td class="px-1 py-1">+30</td>
            <td class="px-1 py-1">United Federation of Planets</td>
            <td class="px-1 py-1">[1]</td>
          </tr>
          <tr>
            <td class="px-1 py-1">50 million square miles</td>
            <td class="px-1 py-1">Planet</td>
            <td class="px-1 py-1">+24</td>
            <td class="px-1 py-1">Earth (land area; +24); Mars (+24); Moon (+22); Krypton (+23)</td>
            <td class="px-1 py-1">[2]</td>
          </tr>
          <tr>
            <td class="px-1 py-1">500,000 square miles</td>
            <td class="px-1 py-1">Large Nation</td>
            <td class="px-1 py-1">+18</td>
            <td class="px-1 py-1">Russia (+21); United States (+21); France (+17); Ghana (+16)</td>
            <td class="px-1 py-1">[3]</td>
          </tr>
          <tr>
            <td class="px-1 py-1">5,000 square miles</td>
            <td class="px-1 py-1">Barony, County, Duchy, or Small Nation</td>
            <td class="px-1 py-1">+12</td>
            <td class="px-1 py-1">South Korea (+15); Denmark (+14); Jamaica (+12); Luxembourg (+10)</td>
            <td class="px-1 py-1">[3]</td>
          </tr>
          <tr>
            <td class="px-1 py-1">50 square miles</td>
            <td class="px-1 py-1">City-State, Micro-State, or Tribal Land</td>
            <td class="px-1 py-1">+6</td>
            <td class="px-1 py-1">Hong Kong (+9); Singapore (+8); Liechtenstein (+6)</td>
            <td class="px-1 py-1">[3]</td>
          </tr>
          <tr>
            <td class="px-1 py-1">0.5 square mile or smaller</td>
            <td class="px-1 py-1">Village and Surrounding Lands</td>
            <td class="px-1 py-1">0</td>
            <td class="px-1 py-1">Monaco (+1); Vatican City (-1); medieval knight's fief</td>
            <td class="px-1 py-1">[3]</td>
          </tr>
        </tbody>
      </table>

      <p class="font-semibold mb-2">Notes</p>
      <p class="mb-2">[1] Realm Size Value for the whole galaxy, or the whole of inhabited space, depends on the number of inhabited planets and their total effective land area, and could be much larger than the table suggests. The same applies to a large interstellar state that is not the whole of inhabited space.</p>
      <p class="mb-2">[2] The Earth's total area is about 200 million square miles, but only the land is densely habitable for humans.</p>
      <p>[3] Typical width (diameter) for a roughly circular realm: 800 miles for a large nation; 80 miles for a small nation; 8 miles for a city-state; 0.8 miles for a village and surrounds.</p>
    </template>

    <template v-else-if="name === 'Defense Bonus and Terrain'">
      <p class="mb-2">If other direct action against the realm does not lay it to waste first, it can be besieged or attacked; see GURPS Mass Combat, pp. 39-40.</p>
      <p class="mb-2">Terrain plays a major role in Mass Combat, as more dense or difficult terrain allows military forces to surprise their foes.</p>
      <p class="mb-2">The realm's typical terrain has no cost - and can be chosen freely - if it helps or hinders attackers and defenders alike.</p>
      <p class="mb-2">Terrain that helps only defenders requires the Defensible Terrain enhancement (p. 25), however, while terrain that helps only attackers imposes the Indefensible Terrain limitation (p. 27).</p>
      <p>These modifiers adjust the Defense Bonus (DB) of the realm's settlements, fortresses, etc. in mass combat.</p>
    </template>

    <template v-else-if="name === 'Habitability'">
      <p class="mb-2">A realm can by definition sustain a population of people - otherwise, it is just land. A realm's Habitability rates a combination of its arable land, nonarable-but-still-useful land (such as pasture), and living space, and how forgiving that land is.</p>
      <p class="mb-2">The higher a realm's Habitability, the easier it is to grow food, raise livestock, gather wild edibles, and so on, and thus the more population the realm can support.</p>
      <p class="mb-2">Habitability gives a modifier that affects Animal Handling (Livestock), Farming, Fishing, Gardening, Survival, and Tracking (for hunting game only). This also applies to HT rolls to resist climate extremes, reflecting natural shelter (or lack thereof), local weather patterns, and so on.</p>

      <p class="font-semibold mb-2">Habitability Levels</p>
      <table class="w-full text-left text-xs mb-3">
        <thead>
          <tr class="border-b border-gray-300 dark:border-gray-600">
            <th class="px-1 py-1">Level (Value)</th>
            <th class="px-1 py-1">Modifier</th>
            <th class="px-1 py-1">Summary</th>
            <th class="px-1 py-1">Example</th>
          </tr>
        </thead>
        <tbody>
          <tr><td class="px-1 py-1">Disastrous (0)</td><td class="px-1 py-1">-3 or worse</td><td class="px-1 py-1">Worst terrain/climate/location. Roll 3d every 1d turns; famine on 6 or less.</td><td class="px-1 py-1">Arctic, marginal stations, desert island</td></tr>
          <tr><td class="px-1 py-1">Very Bad (1-3)</td><td class="px-1 py-1">-2</td><td class="px-1 py-1">Two major problems. Famine checks as above, but on 4 or less.</td><td class="px-1 py-1">Siberia</td></tr>
          <tr><td class="px-1 py-1">Bad (4-6)</td><td class="px-1 py-1">-1</td><td class="px-1 py-1">Lacks one of good terrain, climate, or location; otherwise as Very Bad.</td><td class="px-1 py-1">Tibet</td></tr>
          <tr><td class="px-1 py-1">Poor (7-9)</td><td class="px-1 py-1">-1 (GM discretion)</td><td class="px-1 py-1">Livable but marginal.</td><td class="px-1 py-1">Northern Sweden</td></tr>
          <tr><td class="px-1 py-1">Neutral (10-12)</td><td class="px-1 py-1">0</td><td class="px-1 py-1">Neither especially good nor bad.</td><td class="px-1 py-1">Most of Europe</td></tr>
          <tr><td class="px-1 py-1">Good (13-15)</td><td class="px-1 py-1">+1</td><td class="px-1 py-1">One of terrain/weather/location is ideal.</td><td class="px-1 py-1">Nile or Indus valleys</td></tr>
          <tr><td class="px-1 py-1">Very Good (16-18)</td><td class="px-1 py-1">+2</td><td class="px-1 py-1">Two are ideal. Ignore weather/famine/drought-like disruptions on 4 or less (3d).</td><td class="px-1 py-1">Ideal terraformed world</td></tr>
          <tr><td class="px-1 py-1">Excellent (19)</td><td class="px-1 py-1">+3</td><td class="px-1 py-1">All ideal. As Very Good, but ignore such disruptions on 6 or less (3d).</td><td class="px-1 py-1">Biblical Eden</td></tr>
        </tbody>
      </table>
      <p class="mb-2">Habitability starts at "Neutral." Having a higher or lower rating is an enhancement or a limitation, respectively; see Habitable/Uninhabitable Land, p. 25.</p>
      <p>Optionally, the GM can find baseline Habitability for a realm by rolling 3d for its numeric value.</p>
    </template>

    <template v-else-if="name === 'Military Resources'">
      <p class="mb-2">A realm's Military Resources (MR) represents its total per-turn budget for combat forces and the logistics that support them.</p>
      <p class="mb-2">GURPS Mass Combat describes combat elements and their upkeep costs. Logistics can be treated as overhead on base cost: 50% (land), 100% (naval), 200% (air/orbital/submersible), or 500% (interplanetary).</p>
      <p class="mb-2">Distance further modifies logistics cost: short (300 miles or less) -50%, middling (up to 500 miles) x1, long (up to 5,000 miles) x2, extreme (planetary-global) x3. Interstellar realms use x20 for inter-system distance or x100+ for interstellar distance, subject to GM adjustments from available technologies.</p>

      <p class="font-semibold mb-2">Military Resources Formula</p>
      <p class="mb-2">MR = (Monthly pay of average citizen) x Population x MBF</p>

      <p class="font-semibold mb-2">Control Rating to Military Budget Factor</p>
      <table class="w-full text-left text-xs mb-3">
        <thead>
          <tr class="border-b border-gray-300 dark:border-gray-600">
            <th class="px-1 py-1">CR</th>
            <th class="px-1 py-1">MBF</th>
          </tr>
        </thead>
        <tbody>
          <tr><td class="px-1 py-1">0</td><td class="px-1 py-1">No true military</td></tr>
          <tr><td class="px-1 py-1">1</td><td class="px-1 py-1">0.5%</td></tr>
          <tr><td class="px-1 py-1">2</td><td class="px-1 py-1">1%</td></tr>
          <tr><td class="px-1 py-1">3</td><td class="px-1 py-1">2%</td></tr>
          <tr><td class="px-1 py-1">4</td><td class="px-1 py-1">5%</td></tr>
          <tr><td class="px-1 py-1">5</td><td class="px-1 py-1">10%</td></tr>
          <tr><td class="px-1 py-1">6</td><td class="px-1 py-1">20%</td></tr>
        </tbody>
      </table>

      <p class="mb-2">The GM may assign higher/lower effective CR for mobilization. In wartime, MBF usually rises by one table step; treat CR6 in wartime as 50%.</p>
      <p class="mb-2">Use MR to decide which combat elements the realm can readily field (see Mass Combat for element costs and options).</p>
      <p class="mb-2">A subjugated realm has CR0 and no military, but may have forces assigned by the occupying government; note these in the realm write-up.</p>
      <p>Record Military Resources separately from Realm Value, as with Resource Points.</p>
    </template>

    <template v-else-if="name === 'Control Rating'">
      <p class="mb-2"><span class="font-semibold">Control Rating (CR)</span> measures how restrictive a government is. Lower CR = more freedom. CR does not depend solely on government type — a monarchy can be free, a democracy can be strict.</p>

      <p class="font-semibold mb-1">CR Levels</p>
      <table class="w-full text-left text-xs mb-3">
        <thead>
          <tr class="border-b border-gray-300 dark:border-gray-600">
            <th class="px-1 py-1">CR</th>
            <th class="px-1 py-1">Name</th>
            <th class="px-1 py-1">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr><td class="px-1 py-1 align-top">0</td><td class="px-1 py-1 align-top">Anarchy</td><td class="px-1 py-1">No laws, taxes, or controls.</td></tr>
          <tr><td class="px-1 py-1 align-top">1</td><td class="px-1 py-1 align-top">Very Free</td><td class="px-1 py-1">Nothing illegal except force/intimidation. Light or voluntary taxes. Only LC0 items controlled.</td></tr>
          <tr><td class="px-1 py-1 align-top">2</td><td class="px-1 py-1 align-top">Free</td><td class="px-1 py-1">Some laws, mostly benefiting individuals. Light taxes. LC0–LC1 items controlled.</td></tr>
          <tr><td class="px-1 py-1 align-top">3</td><td class="px-1 py-1 align-top">Moderate</td><td class="px-1 py-1">Many laws, mostly benefiting individuals. Moderate and fair taxes. LC0–LC2 items controlled.</td></tr>
          <tr><td class="px-1 py-1 align-top">4</td><td class="px-1 py-1 align-top">Controlled</td><td class="px-1 py-1">Many laws for state convenience. Broadcasts/printing may be restricted. Heavy, sometimes unfair taxation. LC0–LC3 items controlled.</td></tr>
          <tr><td class="px-1 py-1 align-top">5</td><td class="px-1 py-1 align-top">Repressive</td><td class="px-1 py-1">Strict laws strictly enforced. Heavy, unfair taxes. All information technology regulated. All goods controlled; ration coupons required.</td></tr>
          <tr><td class="px-1 py-1 align-top">6</td><td class="px-1 py-1 align-top">Total Control</td><td class="px-1 py-1">Individual exists to serve the state. Many offenses carry death penalty. Crushing taxes. Full censorship. Private info-tech forbidden. Govt may withhold basic necessities.</td></tr>
        </tbody>
      </table>

      <p class="font-semibold mb-1">Legality Check</p>
      <p class="mb-2">Roll 1d. If result &lt; CR &rarr; act is illegal or authorities harass/arrest. If result &gt; CR &rarr; act is legal or overlooked. If result = CR &rarr; situation is ambiguous; play it out or make a reaction roll. Skip the roll when only one logical outcome exists.</p>

      <p class="font-semibold mb-1">Split Control Rating</p>
      <p>A society can have separate CRs for different domains (basic rights, taxation, weapons, magic, psionics, etc.) if the GM wants more granularity.</p>
    </template>

    <template v-else-if="name === 'Corrupt'">
      <p class="mb-2"><span class="font-semibold">Corrupt</span> is an income modifier toggle.</p>
      <p class="mb-2">When it is turned on, the realm loses <span class="font-semibold">20% of its revenue</span>.</p>
      <p>This penalty is applied when calculating earnings for the turn, before debt and independent income modifiers are fully resolved.</p>
    </template>

    <template v-else-if="name === 'Work/Depend Mod'">
      <p class="mb-2"><span class="font-semibold">Work/Depend Mod</span> is the workforce dependency modifier used in realm value and revenue calculations.</p>
      <p class="mb-2">The standard value is <span class="font-semibold">0.6</span>, but it can be changed if the realm has unusually strong or weak productive capacity.</p>
      <p class="mb-2">It is used in formulas such as:</p>
      <p class="mb-2">Realm Value = Population x Average Income x Work/Depend Mod</p>
      <p>Revenue = Population x Average Income x Work/Depend Mod x Revenue Factor</p>
    </template>

    <template v-else-if="name === 'Technology Level'">
      <p class="mb-2"><span class="font-semibold">Technology Level (TL)</span> starts at the campaign base TL. It may be lowered freely. Raising TL above the campaign TL requires GM permission.</p>

      <p class="mb-2">When realms of different TLs exist, a lower-TL realm may improve TL in play through immigration, trade, espionage, or the Improve maneuver. Progress beyond the campaign maximum also requires GM approval and may take many turns.</p>

      <p class="font-semibold mb-1">Typical Monthly Pay by TL</p>
      <table class="w-full text-left text-xs mb-3">
        <thead>
          <tr class="border-b border-gray-300 dark:border-gray-600">
            <th class="px-1 py-1">TL</th>
            <th class="px-1 py-1">Monthly Pay</th>
          </tr>
        </thead>
        <tbody>
          <tr><td class="px-1 py-1">0</td><td class="px-1 py-1">$625</td></tr>
          <tr><td class="px-1 py-1">1</td><td class="px-1 py-1">$650</td></tr>
          <tr><td class="px-1 py-1">2</td><td class="px-1 py-1">$675</td></tr>
          <tr><td class="px-1 py-1">3</td><td class="px-1 py-1">$700</td></tr>
          <tr><td class="px-1 py-1">4</td><td class="px-1 py-1">$800</td></tr>
          <tr><td class="px-1 py-1">5</td><td class="px-1 py-1">$1,100</td></tr>
          <tr><td class="px-1 py-1">6</td><td class="px-1 py-1">$1,600</td></tr>
          <tr><td class="px-1 py-1">7</td><td class="px-1 py-1">$2,100</td></tr>
          <tr><td class="px-1 py-1">8</td><td class="px-1 py-1">$2,600</td></tr>
          <tr><td class="px-1 py-1">9</td><td class="px-1 py-1">$3,600</td></tr>
          <tr><td class="px-1 py-1">10</td><td class="px-1 py-1">$5,600</td></tr>
          <tr><td class="px-1 py-1">11</td><td class="px-1 py-1">$8,100</td></tr>
          <tr><td class="px-1 py-1">12</td><td class="px-1 py-1">$10,600</td></tr>
        </tbody>
      </table>

      <p class="mb-2">Progress can be slow. Moving from TL7 to TL8 may take decades. Earlier TL transitions can take far longer.</p>
      <p>Use this together with Average Income and any GM rules for technological progression.</p>
    </template>

    <template v-else-if="name === 'Education Rating'">
      <p class="mb-2"><span class="font-semibold">Education Rating (ER)</span> is a literacy and education scale from 0 to 6. It modifies rolls for science, medicine, and technology tasks. Apply the inverse modifier to propaganda attempts.</p>

      <p class="font-semibold mb-1">Education Levels</p>
      <table class="w-full text-left text-xs mb-3">
        <thead>
          <tr class="border-b border-gray-300 dark:border-gray-600">
            <th class="px-1 py-1">ER</th>
            <th class="px-1 py-1">Modifier</th>
            <th class="px-1 py-1">Level</th>
            <th class="px-1 py-1">Summary</th>
          </tr>
        </thead>
        <tbody>
          <tr><td class="px-1 py-1">0</td><td class="px-1 py-1">-4</td><td class="px-1 py-1">No Education</td><td class="px-1 py-1">Mostly illiterate population. Oral teaching is dominant.</td></tr>
          <tr><td class="px-1 py-1">1</td><td class="px-1 py-1">-3</td><td class="px-1 py-1">Rare Education</td><td class="px-1 py-1">Basic math is known, literacy is uncommon, trades use apprenticeship.</td></tr>
          <tr><td class="px-1 py-1">2</td><td class="px-1 py-1">-2</td><td class="px-1 py-1">Infrequent Education</td><td class="px-1 py-1">Higher education exists for elites, but most people remain lightly educated.</td></tr>
          <tr><td class="px-1 py-1">3</td><td class="px-1 py-1">-1</td><td class="px-1 py-1">Uncommon Education</td><td class="px-1 py-1">About half the population is literate and numerate.</td></tr>
          <tr><td class="px-1 py-1">4</td><td class="px-1 py-1">0</td><td class="px-1 py-1">Common Education</td><td class="px-1 py-1">Literacy is common and expected in daily life.</td></tr>
          <tr><td class="px-1 py-1">5</td><td class="px-1 py-1">+1</td><td class="px-1 py-1">Near Universal Education</td><td class="px-1 py-1">Most citizens are literate and higher education is broadly accessible.</td></tr>
          <tr><td class="px-1 py-1">6</td><td class="px-1 py-1">+2</td><td class="px-1 py-1">Universal Education</td><td class="px-1 py-1">Nearly all citizens are literate, with common higher education or skilled training.</td></tr>
        </tbody>
      </table>

      <p class="mb-2">Starting ER is half of realm TL, rounded up.</p>
      <p>Higher or lower ER is treated as an enhancement or limitation.</p>
    </template>

    <template v-else-if="name === 'Citizen Loyalty'">
      <p class="mb-2"><span class="font-semibold">Citizen Loyalty</span> rates inhabitants' attitudes toward leadership and realm as an institution, using the Reaction Table scale. Record a specific numeric value. Also gives a Will modifier when resisting Influence rolls against realm interests, plus half the realm's Control Rating (rounded down). Subtract half the loyalty modifier (rounded up) from black-market, bribery, and corruption rolls.</p>

      <p class="font-semibold mb-1">Citizen Loyalty Levels and Modifiers</p>
      <table class="w-full text-left text-xs mb-3">
        <thead>
          <tr class="border-b border-gray-300 dark:border-gray-600">
            <th class="px-1 py-1">Level</th>
            <th class="px-1 py-1">Range</th>
            <th class="px-1 py-1">Will Mod</th>
            <th class="px-1 py-1">Effects</th>
          </tr>
        </thead>
        <tbody>
          <tr><td class="px-1 py-1 align-top">Disastrous</td><td class="px-1 py-1 align-top">0 or less</td><td class="px-1 py-1 align-top">-7</td><td class="px-1 py-1">Realm falling apart. Corruption rife. Citizens sabotage each other or band against government. Skill -5, time x4. Examples: Roman crisis 3rd century; French Revolution.</td></tr>
          <tr><td class="px-1 py-1 align-top">Very Bad</td><td class="px-1 py-1 align-top">1 to 3</td><td class="px-1 py-1 align-top">-5</td><td class="px-1 py-1">Citizens seek escape; work slowly, inefficiently. Pilfering common. Or unrest with authorities building. Skill -2, time x2. Examples: Conquered nations; Tsarist Russia in WWI.</td></tr>
          <tr><td class="px-1 py-1 align-top">Bad</td><td class="px-1 py-1 align-top">4 to 6</td><td class="px-1 py-1 align-top">-3</td><td class="px-1 py-1">Passive discontent. Groups mistrust government; poor cooperation. Time x1.5. Examples: East Germany pre-1990; Qin Dynasty China; Charles I realms.</td></tr>
          <tr><td class="px-1 py-1 align-top">Poor</td><td class="px-1 py-1 align-top">7 to 9</td><td class="px-1 py-1 align-top">-1</td><td class="px-1 py-1">Unenthusiastic; stay from inertia. Won't risk major harm. May rationalize small violations. Example: USSR in later days.</td></tr>
          <tr><td class="px-1 py-1 align-top">Neutral</td><td class="px-1 py-1 align-top">10 to 12</td><td class="px-1 py-1 align-top">0</td><td class="px-1 py-1">Like their realm but feel no special attachment. Examples: Canada; modern USA or France.</td></tr>
          <tr><td class="px-1 py-1 align-top">Good</td><td class="px-1 py-1 align-top">13 to 15</td><td class="px-1 py-1 align-top">+1</td><td class="px-1 py-1">Happy or proud. Make extra efforts. Difficult to find traitors. Examples: 20th-century Philippines; Germany in WWI.</td></tr>
          <tr><td class="px-1 py-1 align-top">Very Good</td><td class="px-1 py-1 align-top">16 to 18</td><td class="px-1 py-1 align-top">+3</td><td class="px-1 py-1">Very happy; realm success is priority. Extend special efforts gladly. Many have Sense of Duty. Examples: 20th-century Australia; Israel 1950; contemporary Scotland.</td></tr>
          <tr><td class="px-1 py-1 align-top">Excellent</td><td class="px-1 py-1 align-top">19 or more</td><td class="px-1 py-1 align-top">+5</td><td class="px-1 py-1">Near-fanatical devotion to realm. Many may have Fanaticism disadvantage. Examples: Thomas More's Utopia; Plato's ideal state.</td></tr>
        </tbody>
      </table>

      <p class="mb-2">Will modifier formula: Loyalty modifier plus half realm Control Rating (rounded down). Subtract half the loyalty modifier (rounded up) from black-market and bribery rolls (or use city Corruption if available). Example: Good (14; +2), which is +1 modifier plus CR/2.</p>
      <p>Starts at Neutral. Higher or lower is an enhancement or limitation. GM may roll 3d for baseline numeric value.</p>
    </template>

    <template v-else-if="name === 'Infrastructure Rating'">
      <p class="mb-2"><span class="font-semibold">Infrastructure Rating (IR)</span> measures physical structures supporting a realm: homes, roads, transportation, water, power grids, communications. Does not cover social infrastructure (hospitals, schools, law enforcement).</p>

      <p class="font-semibold mb-1">IR Modifiers to Management Skill Rolls</p>
      <table class="w-full text-left text-xs mb-3">
        <thead>
          <tr class="border-b border-gray-300 dark:border-gray-600">
            <th class="px-1 py-1">IR</th>
            <th class="px-1 py-1">Mod</th>
            <th class="px-1 py-1">Name</th>
            <th class="px-1 py-1">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr><td class="px-1 py-1 align-top">0</td><td class="px-1 py-1 align-top">-5</td><td class="px-1 py-1 align-top">None</td><td class="px-1 py-1">No infrastructure. Travel by foot or animals; no maintained trails. Communication person-to-person. Water from springs or streams. Examples: Stone Age; post-apocalypse; new colony.</td></tr>
          <tr><td class="px-1 py-1 align-top">1</td><td class="px-1 py-1 align-top">-3</td><td class="px-1 py-1 align-top">Very Loose</td><td class="px-1 py-1">Old or very new infrastructure. Travel dangerous. Outdated communication (Morse code at TL8). Wells supply water. Examples: Post-apocalyptic city-state; early-stage colony.</td></tr>
          <tr><td class="px-1 py-1 align-top">2</td><td class="px-1 py-1 align-top">-1</td><td class="px-1 py-1 align-top">Loose</td><td class="px-1 py-1">Behind the times or archaic, properly maintained. Roads to major cities; expensive long-distance travel. Running water exists. Communication 1 TL behind. Examples: Recently settled area; British colonies in 1910s.</td></tr>
          <tr><td class="px-1 py-1 align-top">3</td><td class="px-1 py-1 align-top">0</td><td class="px-1 py-1 align-top">Average</td><td class="px-1 py-1">Up-to-date, properly maintained. Travel by road, ship, or air common. Public transit commonplace; poorest lack running water. Communication at campaign TL. Examples: 1970s United States; 20th-century China.</td></tr>
          <tr><td class="px-1 py-1 align-top">4</td><td class="px-1 py-1 align-top">+1</td><td class="px-1 py-1 align-top">Advanced</td><td class="px-1 py-1">Modern, well-maintained, occasional cutting-edge. Cheap travel to all but remote areas. Urban public transit common. Examples: 21st-century Iceland; ancient Rome with aqueducts.</td></tr>
          <tr><td class="px-1 py-1 align-top">5</td><td class="px-1 py-1 align-top">+2</td><td class="px-1 py-1 align-top">Very Advanced</td><td class="px-1 py-1">Heavily invested, bleeding-edge tech. All citizens have communication and travel access. Low or free public transit. Example: TL9 society with infrastructure priority.</td></tr>
          <tr><td class="px-1 py-1 align-top">6</td><td class="px-1 py-1 align-top">+3+</td><td class="px-1 py-1 align-top">Futuristic</td><td class="px-1 py-1">1 TL higher than campaign (enhancement). Instantaneous or very reliable communication. Safe, cheap travel. Example: MCU Wakanda.</td></tr>
        </tbody>
      </table>

      <p class="mb-2">Modifiers apply to Management Skill rolls for moving troops and gathering information.</p>
      <p>Starting IR is 3. Higher or lower IR is an enhancement or limitation. TL0 societies should buy IR down to 0-1.</p>
    </template>

    <template v-else-if="name === 'Openness Rating'">
      <p class="mb-2"><span class="font-semibold">Openness Rating (OR)</span> measures how a realm's citizens react to outsiders. Citizens may have traits like Intolerance (Foreigners) or Paranoia at low OR values. OR can be split to show different attitudes toward specific realms.</p>

      <p class="font-semibold mb-1">Reaction Modifiers and OR Levels</p>
      <table class="w-full text-left text-xs mb-3">
        <thead>
          <tr class="border-b border-gray-300 dark:border-gray-600">
            <th class="px-1 py-1">OR</th>
            <th class="px-1 py-1">Reaction Mod</th>
            <th class="px-1 py-1">Name</th>
            <th class="px-1 py-1">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr><td class="px-1 py-1 align-top">0</td><td class="px-1 py-1 align-top">-4</td><td class="px-1 py-1 align-top">Xenophobic</td><td class="px-1 py-1">Citizens actively hostile to strangers. Harsh customs for outsiders. Those displaying foreign habits treated with suspicion. Diplomacy unpopular. Examples: 16th-century Japan; North Sentinel Islanders.</td></tr>
          <tr><td class="px-1 py-1 align-top">1</td><td class="px-1 py-1 align-top">-2</td><td class="px-1 py-1 align-top">Very Insular</td><td class="px-1 py-1">Unfriendly, prefer isolation. Customs unfair to outsiders. Those leaving are seen as odd. Foreign habits are an Odious Personal Habit. Force over diplomacy preferred. Examples: Albania 1944-1985; North Korea.</td></tr>
          <tr><td class="px-1 py-1 align-top">2</td><td class="px-1 py-1 align-top">-1</td><td class="px-1 py-1 align-top">Moderately Insular</td><td class="px-1 py-1">Prefer to keep to their own, indifferent to outsiders. Reaction penalties for foreign customs. Noncitizens identified as outsiders suffer penalties. Force over diplomacy. Examples: Imperial China; East Germany.</td></tr>
          <tr><td class="px-1 py-1 align-top">3</td><td class="px-1 py-1 align-top">0</td><td class="px-1 py-1 align-top">Neutral</td><td class="px-1 py-1">Standoffish but coolly diplomatic. Outsiders expected to adapt to local norms. Full integration accepted. Foreign ideas/goods have no penalty. Examples: Byzantine Empire in decline; modern Singapore; Victorian Britain.</td></tr>
          <tr><td class="px-1 py-1 align-top">4</td><td class="px-1 py-1 align-top">+1</td><td class="px-1 py-1 align-top">Mildly Open</td><td class="px-1 py-1">Open-minded about outsiders. Mild customs. Welcome would-be citizens. Speaking foreign languages gives +1 to reactions. Example: 1990s European Union.</td></tr>
          <tr><td class="px-1 py-1 align-top">5</td><td class="px-1 py-1 align-top">+2</td><td class="px-1 py-1 align-top">Moderately Open</td><td class="px-1 py-1">Actively welcome outsiders. Interested in foreign customs and goods. Diplomacy more popular than force. Example: 19th-century Argentina.</td></tr>
          <tr><td class="px-1 py-1 align-top">6</td><td class="px-1 py-1 align-top">+4</td><td class="px-1 py-1 align-top">Extremely Open</td><td class="px-1 py-1">Like OR5, eager to meet outsiders and hear their tales. May have stricter standards for locals. Diplomacy popular; violence may cause populace resistance. Example: Anarchies.</td></tr>
        </tbody>
      </table>

      <p class="mb-2">These modifiers also apply to realm-management rolls (reversed for hostile actions). Starting OR is 2-4 (creator's choice). Deviation from this range is a disadvantage.</p>
    </template>

    <template v-else-if="name === 'Conformity Rating'">
      <p class="mb-2"><span class="font-semibold">Conformity Rating (ConR)</span> measures how much citizens identify with the realm versus their own social groups. High ConR doesn't always mean willing conformity &mdash; fear of punishment or social shunning can be just as effective.</p>

      <p class="font-semibold mb-1">ConR Levels</p>
      <table class="w-full text-left text-xs mb-3">
        <thead>
          <tr class="border-b border-gray-300 dark:border-gray-600">
            <th class="px-1 py-1">ConR</th>
            <th class="px-1 py-1">Name</th>
            <th class="px-1 py-1">Effects</th>
          </tr>
        </thead>
        <tbody>
          <tr><td class="px-1 py-1 align-top">0</td><td class="px-1 py-1 align-top">No Conformity</td><td class="px-1 py-1">Citizens identify with social groups, not the realm. -1 reaction to outsiders, -3 to groups in conflict. Effective CR -1. Examples: Apartheid Africa; conquered lands.</td></tr>
          <tr><td class="px-1 py-1 align-top">1</td><td class="px-1 py-1 align-top">Some Conformity</td><td class="px-1 py-1">Citizens tolerate others unless seen as outsiders. -2 reaction to conflicting groups (approx. 25% of population). Examples: Early Latin American republics; Second French Empire.</td></tr>
          <tr><td class="px-1 py-1 align-top">2</td><td class="px-1 py-1 align-top">Mild Conformity</td><td class="px-1 py-1">Citizens identify as part of the realm, but deep conflicts remain. -1 reaction toward approx. 25% of population, or -3 toward approx. 5%. Examples: 20th-century China; Cold War USSR.</td></tr>
          <tr><td class="px-1 py-1 align-top">3</td><td class="px-1 py-1 align-top">Moderate Conformity</td><td class="px-1 py-1">Citizens share common ideals and realm pride. +2 reaction when citizens from the realm meet abroad. Examples: Modern United States; British Empire.</td></tr>
          <tr><td class="px-1 py-1 align-top">4</td><td class="px-1 py-1 align-top">Abundant Conformity</td><td class="px-1 py-1">Shared identity and vision for the future. +2 reaction abroad; Sense of Duty common. Behavior outside cultural norms increases effective CR by 1. Examples: Star Trek's Federation; North Korea.</td></tr>
          <tr><td class="px-1 py-1 align-top">5</td><td class="px-1 py-1 align-top">Near Total Conformity</td><td class="px-1 py-1">Near lockstep; Sense of Duty to realm and citizens common. Nonconforming citizens get -2 reaction Social Stigma. Realm propaganda +2. Effective CR +2 for citizens. Examples: Tokugawa Shogunate; Nazi Germany; Star Wars' First Order.</td></tr>
          <tr><td class="px-1 py-1 align-top">6</td><td class="px-1 py-1 align-top">Total Conformity</td><td class="px-1 py-1">Citizens and government are one. Propaganda succeeds automatically. Effective CR is 6, but citizens won't obey orders against cultural norms. Examples: Hive mind; programmed loyalty; The Smurfs.</td></tr>
        </tbody>
      </table>

      <p class="mb-2">A realm's base ConR is 2 or 3 (creator's choice). Higher ConR is an enhancement (<span class="italic">Conventional Populace</span>); lower is a limitation (<span class="italic">Unconventional Populace</span>).</p>
    </template>

    <template v-else-if="name === 'Revenue'">
      <p class="mb-2">Revenue is the total amount of money a realm can access in a given turn. It represents monies after collecting taxes, funding the government and war efforts, and so on.</p>

      <p class="font-semibold mb-2">Revenue Formula</p>
      <p class="mb-2">Revenue = (Monthly pay of average citizen) x Population x RF x 0.6</p>

      <p class="font-semibold mb-2">Control Rating to Revenue Factor</p>
      <table class="w-full text-left text-xs mb-3">
        <thead>
          <tr class="border-b border-gray-300 dark:border-gray-600">
            <th class="px-1 py-1">CR</th>
            <th class="px-1 py-1">RF</th>
          </tr>
        </thead>
        <tbody>
          <tr><td class="px-1 py-1">0</td><td class="px-1 py-1">No normal taxation; optional 0.5%</td></tr>
          <tr><td class="px-1 py-1">1</td><td class="px-1 py-1">2%</td></tr>
          <tr><td class="px-1 py-1">2</td><td class="px-1 py-1">5%</td></tr>
          <tr><td class="px-1 py-1">3</td><td class="px-1 py-1">10%</td></tr>
          <tr><td class="px-1 py-1">4</td><td class="px-1 py-1">20%</td></tr>
          <tr><td class="px-1 py-1">5</td><td class="px-1 py-1">30%</td></tr>
          <tr><td class="px-1 py-1">6</td><td class="px-1 py-1">50%</td></tr>
        </tbody>
      </table>

      <p class="mb-2">The GM may decide that a realm has a higher or lower effective CR for determining Revenue. This taxation CR does not have to be the same as the effective CR used for Military Budget Factor, though using many effective CRs increases bookkeeping complexity.</p>
      <p class="mb-2">A realm can garner more than this amount for emergencies or special occasions through borrowing, war taxes, or similar measures.</p>
      <p class="mb-2">Each step by which RF increases on the table gives a cumulative -2 to all Finance and Administration rolls to keep the government solvent. The maximum increase is to five times normal.</p>
      <p class="mb-2">Example: if RF is normally 10%, it could go to 50%, which is three steps and -6 to skill. Failing to fund the government leads to shutdown and unrest.</p>

      <p class="font-semibold mb-2">Starting Revenue</p>
      <p class="mb-2">A realm normally begins with Starting Revenue equal to 1% of its Realm Value. This can be spent to purchase military forces, bribe other realms for Resource Points, and so on.</p>
      <p>A realm may start with less than this if it is in debt.</p>
    </template>

    <template v-else-if="name === 'Duration'">
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

    <template v-else-if="name === 'Effective Cap'">
      <p class="text-xs text-gray-500 dark:text-gray-400 mb-2">p. 7</p>
      <p>A caster's Path skill can never exceed the lower of his Thaumatology skill or (12 + Magery level); bonuses from Higher Purpose (p. 5), Ritual Mastery (p. 6), grimoires (pp. 30-32), etc., can raise effective skill above this cap, however.</p>
    </template>

    <template v-else-if="name === 'Path Skill'">
      <p class="text-xs text-gray-500 dark:text-gray-400 mb-2">p. 7</p>
      <p>Use the lowest Path skill for all rolls, with a -1 penalty for every Path beyond the first two.</p>
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
