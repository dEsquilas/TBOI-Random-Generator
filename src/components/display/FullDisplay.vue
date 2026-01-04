<script setup>
import { computed } from 'vue'
import { useGameStore } from '@/stores/gameStore'
import PlayerResult from './PlayerResult.vue'

const store = useGameStore()

const hasResults = computed(() => store.results.players.length > 0)
const players = computed(() => store.results.players)
const objectives = computed(() => store.results.objectives)
const challenges = computed(() => store.results.challenges)
const numPlayers = computed(() => store.numberPlayers)
</script>

<template>
  <div class="relative w-full max-w-[600px]">
    <img src="/img/page_blood.png" class="w-full h-auto" />

    <!-- Players -->
    <div class="absolute top-[27%] left-1/2 -translate-x-1/2 flex justify-center gap-4">
      <template v-if="hasResults">
        <PlayerResult
          v-for="(player, idx) in players"
          :key="player.id"
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
    <div v-if="hasResults" class="absolute bottom-[25%] left-1/2 -translate-x-1/2 flex gap-2">
      <img
        v-for="obj in objectives"
        :key="obj.id"
        :src="`/img/${obj.image}`"
        :alt="obj.name"
        class="max-w-[100px] h-auto"
      />
    </div>

    <!-- Challenges -->
    <div v-if="challenges.length > 0" class="absolute bottom-[5%] left-1/2 -translate-x-1/2 flex gap-2">
      <img
        v-for="ch in challenges"
        :key="ch.id"
        :src="`/img/${ch.icon}`"
        :alt="ch.name"
        class="w-10 h-10"
      />
    </div>
  </div>
</template>
