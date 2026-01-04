<script setup>
import { useGameStore } from '@/stores/gameStore'
import { useRandomizer } from '@/composables/useRandomizer'

const store = useGameStore()
const { randomize } = useRandomizer()

const emit = defineEmits(['error'])

async function handleClick() {
  if (store.isRandomizing) return
  store.isRandomizing = true

  try {
    randomize()
  } catch (e) {
    emit('error', e.message)
  } finally {
    setTimeout(() => {
      store.isRandomizing = false
    }, 300)
  }
}
</script>

<template>
  <button
    class="bg-transparent border-none cursor-pointer p-0 transition-transform duration-200 hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
    :class="{ 'scale-95': store.isRandomizing }"
    @click="handleClick"
    :disabled="store.isRandomizing"
  >
    <img src="/img/randomize.png" alt="Randomize" class="max-w-[200px] h-auto" />
  </button>
</template>
