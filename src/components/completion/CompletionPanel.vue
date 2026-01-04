<script setup>
import { useGameStore } from '@/stores/gameStore'
import { CHARACTERS, OBJECTIVES, TIMED_OBJECTIVES } from '@/constants/gameData'

const store = useGameStore()

const allObjectives = [...OBJECTIVES, ...TIMED_OBJECTIVES]

function isCompleted(charId, objId) {
  return store.getCompletion(charId, objId)
}

function toggleCompletion(charId, objId) {
  const current = store.getCompletion(charId, objId)
  store.setCompletion(charId, objId, !current)
}

function getCompletionCount(charId) {
  return allObjectives.filter(obj => store.getCompletion(charId, obj.id)).length
}

function isCharacterComplete(charId) {
  return getCompletionCount(charId) === allObjectives.length
}

const allCharacters = [...CHARACTERS.normal, ...CHARACTERS.tainted]
const totalMarks = allCharacters.length * allObjectives.length

function getTotalCompleted() {
  let count = 0
  allCharacters.forEach(char => {
    allObjectives.forEach(obj => {
      if (store.getCompletion(char.id, obj.id)) count++
    })
  })
  return count
}
</script>

<template>
  <div class="bg-black/90 text-white p-4 max-h-screen overflow-y-auto">
    <div class="max-w-md">
      <h2 class="text-lg font-bold mb-4">
        Completion Tracker
        <span class="text-sm font-normal text-gray-400">({{ getTotalCompleted() }}/{{ totalMarks }})</span>
      </h2>

      <!-- Objective Icons Header -->
      <div class="flex items-center gap-1 mb-2">
        <span class="w-[94px] shrink-0"></span>
        <div
          v-for="obj in allObjectives"
          :key="obj.id"
          class="w-6 h-6 flex items-center justify-center"
        >
          <img
            :src="`/img/${obj.icon}`"
            :alt="obj.name"
            :title="obj.name"
            class="w-4 h-4 object-contain"
          />
        </div>
      </div>

      <!-- Normal Characters -->
      <div class="mb-4">
        <h3 class="text-sm font-semibold text-gray-400 mb-2">Normal</h3>
        <div class="space-y-1">
          <div
            v-for="char in CHARACTERS.normal"
            :key="char.id"
            class="flex items-center gap-1"
            :class="{ 'opacity-50': isCharacterComplete(char.id) }"
          >
            <span class="w-[100px] shrink-0 text-xs truncate" :title="char.name">
              {{ char.name }}
            </span>
            <button
              v-for="obj in allObjectives"
              :key="obj.id"
              @click="toggleCompletion(char.id, obj.id)"
              class="w-6 h-6 border border-gray-600 rounded flex items-center justify-center transition-colors"
              :class="isCompleted(char.id, obj.id) ? 'bg-green-600 border-green-500' : 'bg-gray-800 hover:bg-gray-700'"
              :title="`${char.name} - ${obj.name}`"
            >
              <span v-if="isCompleted(char.id, obj.id)" class="text-xs">✓</span>
            </button>
            <span class="text-xs text-gray-500 ml-1">
              {{ getCompletionCount(char.id) }}/{{ allObjectives.length }}
            </span>
          </div>
        </div>
      </div>

      <hr class="border-gray-600 my-4" />

      <!-- Tainted Characters -->
      <div>
        <h3 class="text-sm font-semibold text-gray-400 mb-2">Tainted</h3>
        <div class="space-y-1">
          <div
            v-for="char in CHARACTERS.tainted"
            :key="char.id"
            class="flex items-center gap-1"
            :class="{ 'opacity-50': isCharacterComplete(char.id) }"
          >
            <span class="w-[100px] shrink-0 text-xs truncate" :title="char.name">
              {{ char.name.replace('Tainted ', 'T. ') }}
            </span>
            <button
              v-for="obj in allObjectives"
              :key="obj.id"
              @click="toggleCompletion(char.id, obj.id)"
              class="w-6 h-6 border border-gray-600 rounded flex items-center justify-center transition-colors"
              :class="isCompleted(char.id, obj.id) ? 'bg-green-600 border-green-500' : 'bg-gray-800 hover:bg-gray-700'"
              :title="`${char.name} - ${obj.name}`"
            >
              <span v-if="isCompleted(char.id, obj.id)" class="text-xs">✓</span>
            </button>
            <span class="text-xs text-gray-500 ml-1">
              {{ getCompletionCount(char.id) }}/{{ allObjectives.length }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
