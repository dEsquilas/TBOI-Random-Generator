<script setup>
import { computed } from 'vue'
import { useGameStore } from '@/stores/gameStore'

const store = useGameStore()

const hasResults = computed(() => store.results.players.length > 0)
const players = computed(() => store.results.players)
const objectives = computed(() => store.results.objectives)
const challenges = computed(() => store.results.challenges)
const alignment = computed(() => store.chromaAlignment)
const textColor = computed(() => `#${store.chromaTextColor}`)

const textAlignClass = computed(() => ({
  'text-left': alignment.value === 'left',
  'text-center': alignment.value === 'center',
  'text-right': alignment.value === 'right'
}))

const playerNames = computed(() => players.value.map(p => p.name).join(', '))
const objectiveNames = computed(() => objectives.value.map(o => o.name).join(' + '))
const challengeNames = computed(() => challenges.value.map(c => c.name).join(', '))
</script>

<template>
  <div class="p-4 text-lg" :class="textAlignClass" :style="{ color: textColor }">
    <p class="my-2">
      <span class="font-bold mr-2">Play as:</span>
      <span>{{ hasResults ? playerNames : '?' }}</span>
    </p>
    <p v-if="hasResults" class="my-2">
      <span class="font-bold mr-2">Defeat:</span>
      <span>{{ objectiveNames }}</span>
    </p>
    <p v-if="challenges.length > 0" class="my-2">
      <span class="font-bold mr-2">Challenges:</span>
      <span>{{ challengeNames }}</span>
    </p>
  </div>
</template>
