<script setup>
import { computed } from 'vue'
import { useGameStore } from '@/stores/gameStore'
import { CHARACTERS } from '@/constants/gameData'
import PlayerResult from './PlayerResult.vue'

const store = useGameStore()

const taintedIds = new Set(CHARACTERS.tainted.map(c => c.id))

const hasResults = computed(() => store.results.players.length > 0 || store.results.gameChallenge)
const isSpinning = computed(() => store.isSpinning)
const spinningPlayers = computed(() => store.spinningPlayers)
const spinningObjectives = computed(() => store.spinningObjectives)
const players = computed(() => store.results.players)
const objectives = computed(() => store.results.objectives)
const timedObjectives = computed(() => store.results.timedObjectives || [])
const challenges = computed(() => store.results.challenges)
const gameChallenge = computed(() => store.results.gameChallenge)
const numPlayers = computed(() => store.numberPlayers)

// Show spinning players during animation, otherwise show results or placeholder
const displayPlayers = computed(() => {
  if (isSpinning.value && spinningPlayers.value.length > 0) {
    return spinningPlayers.value
  }
  if (hasResults.value) {
    return players.value
  }
  return null
})

// Show spinning objectives during animation, otherwise show results
const displayObjectives = computed(() => {
  if (isSpinning.value && spinningObjectives.value.length > 0) {
    return spinningObjectives.value
  }
  if (hasResults.value) {
    return objectives.value
  }
  return null
})

// Check if current display has a tainted character
const isTainted = computed(() => {
  const currentPlayers = displayPlayers.value
  if (!currentPlayers) return false
  return currentPlayers.some(p => taintedIds.has(p.id))
})

const pageImage = computed(() => isTainted.value ? '/img/page_alt_blood.png' : '/img/page_blood.png')
</script>

<template>
  <div class="relative w-full max-w-[600px]">
    <img :src="pageImage" class="w-full h-auto" />

    <!-- Game Challenge Display -->
    <template v-if="gameChallenge && !isSpinning">
      <div class="absolute top-[25%] left-1/2 -translate-x-1/2 text-center w-[90%] px-2">
        <div class="text-[#4a4a4a] font-isaac text-xl mb-1">CHALLENGE</div>
        <div class="text-[#4a4a4a] font-isaac text-4xl leading-tight">
          #{{ gameChallenge.num }}
        </div>
        <div class="text-[#4a4a4a] font-isaac text-xl mt-2 leading-tight break-words">
          {{ gameChallenge.name.toUpperCase() }}
        </div>
      </div>
    </template>

    <!-- Normal Display -->
    <template v-else>
      <!-- Players -->
      <div class="absolute top-[27%] left-1/2 -translate-x-1/2 flex justify-center gap-4">
        <template v-if="displayPlayers">
          <PlayerResult
            v-for="(player, idx) in displayPlayers"
            :key="`${player.id}-${idx}`"
            :player="player"
            :size="numPlayers > 2 ? 'small' : 'normal'"
            :show-name="numPlayers < 4"
          />
        </template>
        <template v-else>
          <img
            v-for="i in numPlayers"
            :key="i"
            src="/img/questionmark.png"
            :class="numPlayers > 2 ? 'w-12' : 'w-16'"
          />
        </template>
      </div>

      <!-- Objectives -->
      <div v-if="displayObjectives" class="absolute bottom-[25%] left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
        <!-- Main objective -->
        <div class="flex gap-2 justify-center">
          <img
            v-for="(obj, idx) in displayObjectives"
            :key="`${obj.id}-${idx}`"
            :src="`/img/${obj.image}`"
            :alt="obj.name"
            class="max-w-[100px] h-auto"
          />
        </div>
        <!-- Timed objectives (Boss Rush, Hush) below main objective -->
        <div v-if="timedObjectives.length > 0 && !isSpinning" class="flex gap-2 justify-center">
          <img
            v-for="timed in timedObjectives"
            :key="timed.id"
            :src="`/img/${timed.image}`"
            :alt="timed.name"
            class="max-w-[60px] h-auto"
          />
        </div>
      </div>

      <!-- Challenges -->
      <div v-if="challenges.length > 0 && !isSpinning" class="absolute bottom-[5%] left-1/2 -translate-x-1/2 flex gap-2">
        <img
          v-for="ch in challenges"
          :key="ch.id"
          :src="`/img/${ch.icon}`"
          :alt="ch.name"
          class="w-10 h-10"
        />
      </div>
    </template>
  </div>
</template>
