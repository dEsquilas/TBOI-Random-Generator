<script setup>
import { computed } from 'vue'
import { useGameStore } from '@/stores/gameStore'

const store = useGameStore()

const alignment = computed({
  get: () => store.chromaAlignment,
  set: (val) => { store.chromaAlignment = val }
})

const alignments = [
  { value: 'left', label: 'Left' },
  { value: 'center', label: 'Center' },
  { value: 'right', label: 'Right' }
]
</script>

<template>
  <div class="mb-4">
    <p class="font-bold mb-2">Alignment:</p>
    <div class="flex gap-3">
      <label v-for="a in alignments" :key="a.value" class="flex items-center gap-1 cursor-pointer">
        <input type="radio" name="chromaAlign" :value="a.value" v-model="alignment" class="cursor-pointer" />
        {{ a.label }}
      </label>
    </div>
  </div>
</template>
