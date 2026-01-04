import { useGameStore } from '@/stores/gameStore'
import { ALL_CHARACTERS, OBJECTIVES, TIMED_OBJECTIVES, CHALLENGES, CHALLENGE_INCOMPATIBILITIES } from '@/constants/gameData'

export function useRandomizer() {
  const store = useGameStore()

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  function buildWeightedArray(items, weights, selected) {
    const result = []

    items.forEach(item => {
      if (!selected.has(item.id)) return

      const weight = weights[item.id] || 1.0
      const count = Math.round(weight * 10)

      for (let i = 0; i < count; i++) {
        result.push(item)
      }
    })

    return result
  }

  function getCharacterById(id) {
    // Check regular characters
    const char = ALL_CHARACTERS.find(c => c.id === id)
    if (char) return char

    // Check custom characters
    const custom = store.customCharacters.find(c => c.id === id)
    if (custom) {
      return { id: custom.id, name: custom.name, isCustom: true }
    }

    return null
  }

  function getObjectiveById(id) {
    const obj = OBJECTIVES.find(o => o.id === id)
    if (obj) return obj

    const timed = TIMED_OBJECTIVES.find(t => t.id === id)
    if (timed) return { ...timed, isTimed: true }

    return null
  }

  function getChallengeById(id) {
    return CHALLENGES.find(c => c.id === id)
  }

  function randomize() {
    const numPlayers = store.numberPlayers
    const noDuplicates = store.duplicateCheck
    const checkCompletion = store.completionCheck && numPlayers === 1

    // Build character pool
    let characterPool = buildWeightedArray(
      ALL_CHARACTERS,
      store.characterWeights,
      store.selectedCharacters
    )

    // Add custom characters if enabled
    if (store.customCharactersEnabled) {
      store.customCharacters.forEach(custom => {
        if (custom.enabled && custom.name) {
          const weight = custom.weight || 1.0
          const count = Math.round(weight * 10)
          for (let i = 0; i < count; i++) {
            characterPool.push({ id: custom.id, name: custom.name, isCustom: true })
          }
        }
      })
    }

    if (characterPool.length < numPlayers) {
      throw new Error(`Not enough characters selected. Need at least ${numPlayers}.`)
    }

    // Build objective pool
    let objectivePool = buildWeightedArray(
      OBJECTIVES,
      store.objectiveWeights,
      store.selectedObjectives
    )

    if (objectivePool.length === 0) {
      throw new Error('No objectives selected.')
    }

    // Select players
    const selectedPlayers = []
    let workingCharPool = [...characterPool]

    for (let i = 0; i < numPlayers; i++) {
      if (workingCharPool.length === 0) {
        throw new Error('Ran out of available characters.')
      }

      const idx = randomInt(0, workingCharPool.length - 1)
      const selected = workingCharPool[idx]
      selectedPlayers.push(selected)

      // Remove duplicates if option is enabled
      if (noDuplicates) {
        workingCharPool = workingCharPool.filter(c => c.id !== selected.id)
      }
    }

    // Select objective
    let workingObjPool = [...objectivePool]

    // Filter by completion if enabled (only for single player)
    if (checkCompletion && selectedPlayers.length === 1) {
      const charId = selectedPlayers[0].id
      workingObjPool = workingObjPool.filter(obj => {
        return !store.getCompletion(charId, obj.id)
      })

      if (workingObjPool.length === 0) {
        // All objectives completed for this character, use full pool
        workingObjPool = [...objectivePool]
      }
    }

    const objIdx = randomInt(0, workingObjPool.length - 1)
    const selectedObjective = workingObjPool[objIdx]

    // Check for timed objective
    let selectedTimedObjective = null
    if (store.timedEnabled && store.selectedTimedObjectives.size > 0) {
      const timedRoll = randomInt(1, 100)
      if (timedRoll <= store.timedChance) {
        const timedArray = TIMED_OBJECTIVES.filter(t =>
          store.selectedTimedObjectives.has(t.id)
        )
        if (timedArray.length > 0) {
          const timedIdx = randomInt(0, timedArray.length - 1)
          selectedTimedObjective = { ...timedArray[timedIdx], isTimed: true }
        }
      }
    }

    // Select challenges
    const selectedChallenges = []
    if (store.selectedChallenges.size > 0) {
      const availableChallenges = CHALLENGES.filter(ch => {
        if (!store.selectedChallenges.has(ch.id)) return false

        // Check incompatibilities
        const incompatible = CHALLENGE_INCOMPATIBILITIES[ch.id]
        if (incompatible && incompatible.includes(selectedObjective.id)) {
          return false
        }

        return true
      })

      // Roll for each challenge
      availableChallenges.forEach(ch => {
        const roll = randomInt(1, 100)
        if (roll <= store.challengeChance) {
          selectedChallenges.push(ch)
        }
      })

      // Guarantee at least one if option is enabled
      if (store.challengeEnabled && selectedChallenges.length === 0 && availableChallenges.length > 0) {
        const idx = randomInt(0, availableChallenges.length - 1)
        selectedChallenges.push(availableChallenges[idx])
      }
    }

    // Build results
    const results = {
      players: selectedPlayers.map(p => ({
        id: p.id,
        name: p.name,
        isCustom: p.isCustom || false
      })),
      objectives: [selectedObjective],
      challenges: selectedChallenges
    }

    if (selectedTimedObjective) {
      results.objectives.push(selectedTimedObjective)
    }

    store.setResults(results)

    return results
  }

  function markCurrentAsComplete() {
    const { players, objectives } = store.results

    if (players.length !== 1) return // Only for single player

    const charId = players[0].id
    if (players[0].isCustom) return // Don't track custom characters

    objectives.forEach(obj => {
      store.setCompletion(charId, obj.id, true)
    })
  }

  return {
    randomize,
    markCurrentAsComplete,
    getCharacterById,
    getObjectiveById,
    getChallengeById
  }
}
