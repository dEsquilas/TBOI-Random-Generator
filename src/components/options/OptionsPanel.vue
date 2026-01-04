<script setup>
import ChromaStyleSelector from './ChromaStyleSelector.vue'
import ColorPickers from './ColorPickers.vue'
import PresetButtons from './PresetButtons.vue'
import CharacterSelector from './CharacterSelector.vue'
import ObjectiveSelector from './ObjectiveSelector.vue'
import ChallengeSelector from './ChallengeSelector.vue'
</script>

<template>
  <div class="bg-black/90 text-white p-4 max-h-screen overflow-y-auto">
    <div class="max-w-md">
      <!-- Chroma Options -->
      <div class="mb-4">
        <ChromaStyleSelector />
        <ColorPickers />
      </div>

      <hr class="border-gray-600 my-4" />
      <PresetButtons />

      <hr class="border-gray-600 my-4" />
      <CharacterSelector />

      <hr class="border-gray-600 my-4" />
      <ObjectiveSelector />

      <hr class="border-gray-600 my-4" />
      <ChallengeSelector />

    </div>
  </div>
</template>
