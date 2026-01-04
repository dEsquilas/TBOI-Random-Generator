<script setup>
import { computed } from 'vue'
import { useGameStore } from '@/stores/gameStore'
import { CHALLENGES } from '@/constants/gameData'

const store = useGameStore()

const challengeEnabled = computed({
  get: () => store.challengeEnabled,
  set: (val) => { store.challengeEnabled = val }
})

const challengeChance = computed({
  get: () => store.challengeChance,
  set: (val) => { store.challengeChance = Math.max(1, Math.min(100, parseInt(val) || 20)) }
})

function isSelected(id) { return store.selectedChallenges.has(id) }
function toggleChallenge(id) { store.toggleChallenge(id) }
</script>

<template>
  <div class="mb-4">
    <h3 class="font-bold mb-2">Extra Challenges</h3>

    <div class="flex flex-wrap gap-1 mb-2">
      <button @click="store.selectAllChallenges()" class="px-2 py-1 bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded text-xs">All</button>
      <button @click="store.deselectAllChallenges()" class="px-2 py-1 bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded text-xs">None</button>
    </div>

    <label class="flex items-center gap-2 cursor-pointer mb-2">
      <input type="checkbox" v-model="challengeEnabled" class="cursor-pointer" />
      <span class="text-sm">Guarantee at least 1 challenge?</span>
    </label>

    <p class="text-xs text-gray-500 mb-2">
      May still get 0 challenges for Mother, Ultra Greed, or Mega Satan.
    </p>

    <div class="flex items-center gap-2 mb-3">
      <label class="text-sm">Chance per challenge (%):</label>
      <input type="number" v-model="challengeChance" min="1" max="100" step="1"
        class="w-16 px-2 py-1 bg-gray-800 border border-gray-600 rounded text-sm" />
    </div>

    <div class="space-y-1">
      <div v-for="ch in CHALLENGES" :key="ch.id">
        <label class="flex items-center gap-1.5 cursor-pointer">
          <input type="checkbox" :checked="isSelected(ch.id)" @change="toggleChallenge(ch.id)" class="cursor-pointer" />
          <img :src="`/img/${ch.icon}`" class="w-5 h-5" />
          <span class="text-sm">{{ ch.name }}</span>
        </label>
      </div>
    </div>
  </div>
</template>
