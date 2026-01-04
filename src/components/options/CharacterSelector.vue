<script setup>
import { computed } from 'vue'
import { useGameStore } from '@/stores/gameStore'
import { CHARACTERS } from '@/constants/gameData'

const store = useGameStore()

const weightsVisible = computed({
  get: () => store.weightsVisible,
  set: (val) => { store.weightsVisible = val }
})

function isSelected(id) {
  return store.selectedCharacters.has(id)
}

function toggleChar(id) {
  store.toggleCharacter(id)
}

function getWeight(id) {
  return store.characterWeights[id] || 1.0
}

function setWeight(id, e) {
  let val = parseFloat(e.target.value)
  if (isNaN(val) || val < 0.1) val = 0.1
  if (val > 1) val = 1.0
  store.setCharacterWeight(id, val)
}
</script>

<template>
  <div class="mb-4">
    <h3 class="font-bold mb-2">Characters</h3>

    <div class="flex flex-wrap gap-1 mb-2">
      <button @click="store.selectAllCharacters()" class="px-2 py-1 bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded text-xs">All</button>
      <button @click="store.selectNormalCharacters()" class="px-2 py-1 bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded text-xs">Normal</button>
      <button @click="store.selectTaintedCharacters()" class="px-2 py-1 bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded text-xs">Tainted</button>
      <button @click="store.deselectAllCharacters()" class="px-2 py-1 bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded text-xs">None</button>
    </div>

    <div class="flex flex-wrap gap-1 mb-3">
      <button @click="weightsVisible = !weightsVisible" class="px-2 py-1 bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded text-xs">
        {{ weightsVisible ? 'Hide' : 'Show' }} Weights
      </button>
      <button v-if="weightsVisible" @click="store.resetAllWeights()" class="px-2 py-1 bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded text-xs">
        Reset Weights
      </button>
    </div>

    <!-- Normal Characters -->
    <div class="space-y-1 mb-3">
      <div v-for="char in CHARACTERS.normal" :key="char.id" class="flex items-center gap-2">
        <label class="flex items-center gap-1.5 cursor-pointer min-w-[150px]">
          <input type="checkbox" :checked="isSelected(char.id)" @change="toggleChar(char.id)" class="cursor-pointer" />
          <span class="text-sm">{{ char.name }}</span>
        </label>
        <div v-if="weightsVisible" class="flex items-center gap-1">
          <span class="text-xs text-gray-500">W:</span>
          <input
            type="number"
            :value="getWeight(char.id)"
            @change="setWeight(char.id, $event)"
            min="0.1" max="1" step="0.1"
            class="w-14 px-1 py-0.5 bg-gray-800 border border-gray-600 rounded text-xs"
          />
        </div>
      </div>
    </div>

    <!-- Tainted Characters -->
    <div class="space-y-1">
      <div v-for="char in CHARACTERS.tainted" :key="char.id" class="flex items-center gap-2">
        <label class="flex items-center gap-1.5 cursor-pointer min-w-[150px]">
          <input type="checkbox" :checked="isSelected(char.id)" @change="toggleChar(char.id)" class="cursor-pointer" />
          <span class="text-sm">{{ char.name }}</span>
        </label>
        <div v-if="weightsVisible" class="flex items-center gap-1">
          <span class="text-xs text-gray-500">W:</span>
          <input
            type="number"
            :value="getWeight(char.id)"
            @change="setWeight(char.id, $event)"
            min="0.1" max="1" step="0.1"
            class="w-14 px-1 py-0.5 bg-gray-800 border border-gray-600 rounded text-xs"
          />
        </div>
      </div>
    </div>
  </div>
</template>
