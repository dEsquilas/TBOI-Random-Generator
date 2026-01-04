<script setup>
import { computed } from 'vue'
import { useGameStore } from '@/stores/gameStore'
import { OBJECTIVES, TIMED_OBJECTIVES } from '@/constants/gameData'

const store = useGameStore()

const weightsVisible = computed({
  get: () => store.objectiveWeightsVisible,
  set: (val) => { store.objectiveWeightsVisible = val }
})

const timedEnabled = computed({
  get: () => store.timedEnabled,
  set: (val) => { store.timedEnabled = val }
})

const timedChance = computed({
  get: () => store.timedChance,
  set: (val) => { store.timedChance = Math.max(1, Math.min(100, parseInt(val) || 50)) }
})

function isSelected(id) { return store.selectedObjectives.has(id) }
function isTimedSelected(id) { return store.selectedTimedObjectives.has(id) }
function toggleObj(id) { store.toggleObjective(id) }
function toggleTimed(id) { store.toggleTimedObjective(id) }
function getWeight(id) { return store.objectiveWeights[id] || 1.0 }
function setWeight(id, e) {
  let val = parseFloat(e.target.value)
  if (isNaN(val) || val < 0.1) val = 0.1
  if (val > 1) val = 1.0
  store.setObjectiveWeight(id, val)
}
</script>

<template>
  <div class="mb-4">
    <h3 class="font-bold mb-2">Objectives</h3>

    <div class="flex flex-wrap gap-1 mb-2">
      <button @click="store.selectAllObjectives()" class="px-2 py-1 bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded text-xs">All</button>
      <button @click="store.deselectAllObjectives()" class="px-2 py-1 bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded text-xs">None</button>
      <button @click="weightsVisible = !weightsVisible" class="px-2 py-1 bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded text-xs">
        {{ weightsVisible ? 'Hide' : 'Show' }} Weights
      </button>
    </div>

    <!-- Main Objectives -->
    <div class="space-y-1 mb-3">
      <div v-for="obj in OBJECTIVES" :key="obj.id" class="flex items-center gap-2">
        <label class="flex items-center gap-1.5 cursor-pointer min-w-[150px]">
          <input type="checkbox" :checked="isSelected(obj.id)" @change="toggleObj(obj.id)" class="cursor-pointer" />
          <img :src="`/img/${obj.icon}`" class="w-5 h-5" />
          <span class="text-sm">{{ obj.name }}</span>
        </label>
        <div v-if="weightsVisible" class="flex items-center gap-1">
          <span class="text-xs text-gray-500">W:</span>
          <input type="number" :value="getWeight(obj.id)" @change="setWeight(obj.id, $event)"
            min="0.1" max="1" step="0.1"
            class="w-14 px-1 py-0.5 bg-gray-800 border border-gray-600 rounded text-xs" />
        </div>
      </div>
    </div>

    <!-- Timed Objectives -->
    <div class="border-t border-gray-600 pt-3 mt-3">
      <label class="flex items-center gap-2 cursor-pointer mb-2">
        <input type="checkbox" v-model="timedEnabled" class="cursor-pointer" />
        <span class="text-sm">Allow timed objectives?</span>
      </label>

      <div class="flex items-center gap-2 mb-2">
        <label class="text-sm">Chance (%):</label>
        <input type="number" v-model="timedChance" min="1" max="100" step="1"
          class="w-16 px-2 py-1 bg-gray-800 border border-gray-600 rounded text-sm" />
      </div>

      <div class="space-y-1">
        <div v-for="obj in TIMED_OBJECTIVES" :key="obj.id" class="flex items-center gap-2">
          <label class="flex items-center gap-1.5 cursor-pointer">
            <input type="checkbox" :checked="isTimedSelected(obj.id)" @change="toggleTimed(obj.id)" class="cursor-pointer" />
            <img :src="`/img/${obj.icon}`" class="w-5 h-5" />
            <span class="text-sm">{{ obj.name }}</span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>
