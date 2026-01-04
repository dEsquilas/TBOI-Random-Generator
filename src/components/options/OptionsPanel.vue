<script setup>
import { ref } from 'vue'
import { useLocalStorage } from '@/composables/useLocalStorage'
import ChromaStyleSelector from './ChromaStyleSelector.vue'
import AlignmentSelector from './AlignmentSelector.vue'
import ColorPickers from './ColorPickers.vue'
import PresetButtons from './PresetButtons.vue'
import PlayerCount from './PlayerCount.vue'
import CharacterSelector from './CharacterSelector.vue'
import ObjectiveSelector from './ObjectiveSelector.vue'
import ChallengeSelector from './ChallengeSelector.vue'

const { exportToFile, importFromFile } = useLocalStorage()

const fileResult = ref('')

async function handleFileImport(event) {
  const file = event.target.files[0]
  if (!file) return

  try {
    await importFromFile(file)
    fileResult.value = 'Settings loaded!'
  } catch (e) {
    fileResult.value = 'Error: ' + e.message
  }
  event.target.value = ''
}
</script>

<template>
  <div class="bg-black/90 text-white p-4 max-h-screen overflow-y-auto">
    <div class="max-w-md">
      <!-- Chroma Options -->
      <div class="mb-4">
        <ChromaStyleSelector />
        <AlignmentSelector />
        <ColorPickers />
      </div>

      <hr class="border-gray-600 my-4" />

      <!-- Save/Load -->
      <div class="mb-4">
        <h3 class="font-bold mb-2">Save/Load Settings</h3>
        <div class="flex flex-wrap items-center gap-2">
          <button
            @click="exportToFile"
            class="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded text-sm"
          >
            Save to file
          </button>
          <input
            type="file"
            accept="application/json"
            @change="handleFileImport"
            class="max-w-[200px] text-sm"
          />
          <span v-if="fileResult" class="text-xs text-green-400">{{ fileResult }}</span>
        </div>
      </div>

      <hr class="border-gray-600 my-4" />
      <PresetButtons />

      <hr class="border-gray-600 my-4" />
      <PlayerCount />

      <hr class="border-gray-600 my-4" />
      <CharacterSelector />

      <hr class="border-gray-600 my-4" />
      <ObjectiveSelector />

      <hr class="border-gray-600 my-4" />
      <ChallengeSelector />

      <hr class="border-gray-600 my-4" />

      <!-- Credits -->
      <div class="text-xs text-gray-500 text-center">
        <p>by u/TRPG_ | @trpgdraws</p>
        <p>Not affiliated with Edmund McMillen or Nicalis.</p>
      </div>
    </div>
  </div>
</template>
