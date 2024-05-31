<script setup lang="ts">
import type { BarState } from '@/modules/api'
import { known_buttons, button_label_unknown } from '@/modules/defaults'

defineProps<{
  id: string
  state: BarState
}>()

defineEmits<{
  clicked: [string]
}>()

function label(id: string) {
  const b = known_buttons.get(id)
  return b ? b.label : button_label_unknown
}

function icon(id: string) {
  const b = known_buttons.get(id)
  return b ? b.icon : button_label_unknown
}
</script>

<template>
  <div class="wrapper">
    <div>ID: {{ id }}</div>
    <div
      class="requests"
      v-for="[button_id, value] of state"
      :key="button_id"
      @click="$emit('clicked', button_id)"
      v-show="value"
    >
      <div class="icon">
        <font-awesome-icon :icon="['fas', icon(button_id)]" />
      </div>
      <div>{{ label(button_id) }}</div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  margin: 0.4em;
  border: 4px solid black;
  border-radius: 1em;
  background-color: #404040;
  padding: 1em;
}

.requests {
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  width: 100%;
  padding: 0.2em 0 0.2em 0;
  border-radius: 0.2em;
}

.requests:hover {
  background-color: lightgray;
  color: black;
}

.icon {
  text-align: left;
  width: 2em;
}
</style>
