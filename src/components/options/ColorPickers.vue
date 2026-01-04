<script setup>
import { ref, watch } from 'vue'
import { useGameStore } from '@/stores/gameStore'

const store = useGameStore()

const textColor = ref(store.chromaTextColor)
const bgColor = ref(store.chromaBgColor)

function applyTextColor() {
  if (/^[0-9A-Fa-f]{6}$/.test(textColor.value)) {
    store.chromaTextColor = textColor.value.toUpperCase()
  }
}

function applyBgColor() {
  if (/^[0-9A-Fa-f]{6}$/.test(bgColor.value)) {
    store.chromaBgColor = bgColor.value.toUpperCase()
  }
}

watch(() => store.chromaTextColor, (val) => { textColor.value = val })
watch(() => store.chromaBgColor, (val) => { bgColor.value = val })
</script>

<template>
  <div class="mb-4 space-y-3">
    <div class="flex flex-wrap items-center gap-2">
      <label for="chromaText" class="min-w-[140px]">Text color (Hex):</label>
      <input
        type="text"
        id="chromaText"
        v-model="textColor"
        maxlength="6"
        placeholder="FFFFFF"
        class="w-20 px-2 py-1 bg-gray-800 border border-gray-600 rounded font-mono text-sm"
      />
      <button @click="applyTextColor" class="px-3 py-1 bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded text-sm">
        Apply
      </button>
      <span class="text-xs text-gray-500">Default: #FFFFFF</span>
    </div>

    <div class="flex flex-wrap items-center gap-2">
      <label for="chromaBG" class="min-w-[140px]">Background (Hex):</label>
      <input
        type="text"
        id="chromaBG"
        v-model="bgColor"
        maxlength="6"
        placeholder="00FF00"
        class="w-20 px-2 py-1 bg-gray-800 border border-gray-600 rounded font-mono text-sm"
      />
      <button @click="applyBgColor" class="px-3 py-1 bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded text-sm">
        Apply
      </button>
      <span class="text-xs text-gray-500">Default: #00FF00</span>
    </div>

    <p class="text-xs text-gray-500">
      Alignment works in Simple/Plain text modes. Text color only in Plain text mode.
    </p>
  </div>
</template>
