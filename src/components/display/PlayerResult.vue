<script setup>
import { computed } from 'vue'

const props = defineProps({
  player: { type: Object, required: true },
  showName: { type: Boolean, default: true },
  size: { type: String, default: 'normal' }
})

const characterImage = computed(() => {
  if (props.player.isCustom) return '/img/questionmark.png'
  return `/img/${props.player.id}.png`
})

const nameImage = computed(() => {
  if (props.player.isCustom) return null
  return `/img/${props.player.id}_name.png`
})

const sizeClass = computed(() => ({
  'max-w-[200px]': props.size === 'normal',
  'max-w-[100px]': props.size === 'small'
}))
</script>

<template>
  <div class="flex flex-col items-center gap-2">
    <img :src="characterImage" :alt="player.name" class="h-auto" :class="sizeClass" />
    <img v-if="showName && nameImage" :src="nameImage" :alt="player.name" class="max-w-full h-auto" />
    <div v-else-if="showName && player.isCustom" class="text-lg text-white drop-shadow-[2px_2px_0_#000]">
      {{ player.name }}
    </div>
  </div>
</template>
