<script setup>
import { computed } from 'vue'
import { useGameStore } from '@/stores/gameStore'

const store = useGameStore()

const hasResults = computed(() => store.results.players.length > 0 || store.results.gameChallenge)
const players = computed(() => store.results.players)
const objectives = computed(() => store.results.objectives)
const challenges = computed(() => store.results.challenges)
const gameChallenge = computed(() => store.results.gameChallenge)
const numPlayers = computed(() => store.numberPlayers)
const alignment = computed(() => store.chromaAlignment)

const alignClass = computed(() => ({
  'items-start': alignment.value === 'left',
  'items-center': alignment.value === 'center',
  'items-end': alignment.value === 'right'
}))

const customNames = computed(() => {
  return players.value.filter(p => p.isCustom).map(p => p.name).join(', ')
})
</script>

<template>
  <div class="flex flex-col gap-4 p-4" :class="alignClass">
    <!-- Game Challenge Display -->
    <template v-if="gameChallenge">
      <div class="text-center">
        <div class="text-amber-200 font-isaac text-xl mb-1">CHALLENGE #{{ gameChallenge.num }}</div>
        <div class="text-white font-isaac text-2xl">{{ gameChallenge.name }}</div>
      </div>
    </template>

    <!-- Normal Display -->
    <template v-else>
      <!-- Character section -->
      <div class="flex items-center gap-3">
        <img src="/img/playas.png" class="h-8 w-auto" />

        <template v-if="numPlayers === 1">
          <template v-if="hasResults">
            <img
              :src="players[0].isCustom ? '/img/questionmark.png' : `/img/${players[0].id}.png`"
              class="max-w-[120px] h-auto"
            />
            <img
              v-if="!players[0].isCustom"
              :src="`/img/${players[0].id}_name.png`"
              class="max-w-[150px] h-auto"
            />
          </template>
          <img v-else src="/img/questionmark.png" class="max-w-[120px] h-auto" />
        </template>

        <div v-else class="flex gap-2">
          <template v-if="hasResults">
            <img
              v-for="player in players"
              :key="player.id"
              :src="player.isCustom ? '/img/questionmark.png' : `/img/${player.id}.png`"
              class="max-w-[60px] h-auto"
            />
          </template>
          <template v-else>
            <img v-for="i in numPlayers" :key="i" src="/img/questionmark.png" class="max-w-[60px] h-auto" />
          </template>
        </div>

        <p v-if="customNames" class="text-white text-base drop-shadow-[1px_1px_0_#000]">{{ customNames }}</p>
      </div>

      <!-- Goal section -->
      <div v-if="hasResults" class="flex items-center gap-3">
        <img src="/img/defeat.png" class="h-8 w-auto" />
        <img :src="`/img/${objectives[0].image}`" class="max-w-[100px] h-auto" />
        <template v-if="objectives.length > 1">
          <img src="/img/plus.png" class="w-6 h-6" />
          <img :src="`/img/${objectives[1].image}`" class="max-w-[100px] h-auto" />
        </template>
      </div>

      <!-- Challenges section -->
      <div v-if="challenges.length > 0" class="flex items-center gap-3">
        <img src="/img/challenges.png" class="h-6 w-auto" />
        <div class="flex gap-2">
          <img v-for="ch in challenges" :key="ch.id" :src="`/img/${ch.icon}`" :alt="ch.name" class="w-8 h-8" />
        </div>
      </div>
    </template>
  </div>
</template>
