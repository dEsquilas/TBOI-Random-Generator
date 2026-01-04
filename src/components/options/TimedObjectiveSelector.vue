<script setup>
import { computed } from 'vue'
import { useGameStore } from '@/stores/gameStore'

const store = useGameStore()

const timedAsExtra = computed({
  get: () => store.timedAsExtra,
  set: (val) => { store.timedAsExtra = val }
})

const timedEnabled = computed({
  get: () => store.timedEnabled,
  set: (val) => { store.timedEnabled = val }
})

const timedChance = computed({
  get: () => store.timedChance,
  set: (val) => { store.timedChance = Math.max(1, Math.min(100, parseInt(val) || 50)) }
})
</script>

<template>
  <div class="mb-4">
    <h3 class="font-bold mb-2">Timed Objectives</h3>
    <p class="text-xs text-gray-400 mb-2">Boss Rush & Hush</p>

    <label class="flex items-center gap-2 cursor-pointer mb-2">
      <input type="checkbox" v-model="timedAsExtra" class="cursor-pointer" />
      <span class="text-sm">Roll as extra objectives</span>
    </label>

    <p class="text-xs text-gray-500 mb-3">
      When enabled, Boss Rush and Hush can appear alongside the main objective instead of being independent targets.
    </p>

    <div v-if="timedAsExtra" class="pl-4 border-l-2 border-gray-600">
      <label class="flex items-center gap-2 cursor-pointer mb-2">
        <input type="checkbox" v-model="timedEnabled" class="cursor-pointer" />
        <span class="text-sm">Enable timed objective rolls</span>
      </label>

      <div v-if="timedEnabled" class="flex items-center gap-2">
        <label class="text-sm">Chance per objective (%):</label>
        <input type="number" v-model="timedChance" min="1" max="100" step="1"
          class="w-16 px-2 py-1 bg-gray-800 border border-gray-600 rounded text-sm" />
      </div>
    </div>
  </div>
</template>
