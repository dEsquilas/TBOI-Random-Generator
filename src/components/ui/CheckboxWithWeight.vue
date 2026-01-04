<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: Boolean,
  label: String,
  weightValue: {
    type: Number,
    default: 1.0
  },
  showWeight: {
    type: Boolean,
    default: false
  },
  icon: String
})

const emit = defineEmits(['update:modelValue', 'update:weight'])

const checked = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

function onWeightChange(e) {
  let val = parseFloat(e.target.value)
  if (isNaN(val) || val < 0.1) val = 0.1
  if (val > 1) val = 1.0
  emit('update:weight', val)
}
</script>

<template>
  <div class="checkbox-weight">
    <label class="checkbox-label">
      <input type="checkbox" v-model="checked" />
      <img v-if="icon" :src="icon" class="checkbox-icon" />
      <span>{{ label }}</span>
    </label>
    <div v-if="showWeight" class="weight-input">
      <label>Weight:</label>
      <input
        type="number"
        :value="weightValue"
        @change="onWeightChange"
        min="0.1"
        max="1"
        step="0.1"
      />
    </div>
  </div>
</template>

<style scoped>
.checkbox-weight {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 4px 0;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
}

.checkbox-icon {
  width: 20px;
  height: 20px;
}

.weight-input {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: 8px;
}

.weight-input input {
  width: 50px;
  padding: 2px 4px;
}
</style>
