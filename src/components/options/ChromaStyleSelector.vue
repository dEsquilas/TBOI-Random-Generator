<script setup>
import { computed } from 'vue'
import { useGameStore } from '@/stores/gameStore'

const store = useGameStore()

const style = computed({
  get: () => store.chromaStyle,
  set: (val) => { store.chromaStyle = val }
})

const styles = [
  { value: 'full', label: 'Full' },
  { value: 'simpleA', label: 'Simple A' },
  { value: 'simpleB', label: 'Simple B' },
  { value: 'plainText', label: 'Plain text' }
]
</script>

<template>
  <div class="mb-4">
    <p class="font-bold mb-2">Style:</p>
    <div class="flex flex-wrap gap-3">
      <label v-for="s in styles" :key="s.value" class="flex items-center gap-1 cursor-pointer">
        <input type="radio" name="chromaStyle" :value="s.value" v-model="style" class="cursor-pointer" />
        {{ s.label }}
      </label>
    </div>
  </div>
</template>
