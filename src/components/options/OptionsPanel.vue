<script setup>
import { computed } from 'vue'
import { useGameStore } from '@/stores/gameStore'
import ChromaStyleSelector from './ChromaStyleSelector.vue'
import ColorPickers from './ColorPickers.vue'
import PresetButtons from './PresetButtons.vue'
import TimedObjectiveSelector from './TimedObjectiveSelector.vue'
import ChallengeSelector from './ChallengeSelector.vue'
import GameChallengeSelector from './GameChallengeSelector.vue'

const store = useGameStore()

const characterScale = computed({
  get: () => store.characterScale,
  set: (val) => { store.characterScale = val }
})

const objectiveScale = computed({
  get: () => store.objectiveScale,
  set: (val) => { store.objectiveScale = val }
})
</script>

<template>
  <div class="bg-black/90 text-white p-4 min-h-screen max-h-screen overflow-y-auto">
    <div class="max-w-md">
      <!-- Chroma Options -->
      <div class="mb-4">
        <ChromaStyleSelector />
        <ColorPickers />
      </div>

      <!-- Scale Options -->
      <div class="mb-4">
        <p class="font-bold mb-2">Scale:</p>
        <div class="space-y-3">
          <div>
            <label class="flex items-center gap-2 text-sm">
              Character: {{ characterScale }}%
            </label>
            <input
              type="range"
              v-model.number="characterScale"
              min="50"
              max="150"
              step="5"
              class="w-full accent-amber-500"
            />
          </div>
          <div>
            <label class="flex items-center gap-2 text-sm">
              Objective: {{ objectiveScale }}%
            </label>
            <input
              type="range"
              v-model.number="objectiveScale"
              min="50"
              max="150"
              step="5"
              class="w-full accent-amber-500"
            />
          </div>
        </div>
      </div>

      <hr class="border-gray-600 my-4" />
      <PresetButtons />

      <hr class="border-gray-600 my-4" />
      <TimedObjectiveSelector />

      <hr class="border-gray-600 my-4" />
      <ChallengeSelector />

      <hr class="border-gray-600 my-4" />
      <GameChallengeSelector />

    </div>
  </div>
</template>
