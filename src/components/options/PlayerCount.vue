<script setup>
import { computed } from 'vue'
import { useGameStore } from '@/stores/gameStore'

const store = useGameStore()

const numPlayers = computed({
  get: () => store.numberPlayers,
  set: (val) => { store.numberPlayers = parseInt(val) }
})

const duplicateCheck = computed({
  get: () => store.duplicateCheck,
  set: (val) => { store.duplicateCheck = val }
})
</script>

<template>
  <div class="mb-4">
    <h3 class="font-bold mb-2">Number of Players</h3>
    <div class="flex gap-4 mb-2">
      <label v-for="n in 4" :key="n" class="flex items-center gap-1 cursor-pointer">
        <input type="radio" name="numPlayers" :value="n" v-model="numPlayers" class="cursor-pointer" />
        {{ n }}
      </label>
    </div>
    <label class="flex items-center gap-2 cursor-pointer mb-2">
      <input type="checkbox" v-model="duplicateCheck" class="cursor-pointer" />
      <span class="text-sm">Don't let players get same character</span>
    </label>
    <p class="text-xs text-gray-500">Completion tracking ignored for multiplayer.</p>
  </div>
</template>
