<script setup lang="ts">
import type { SystemState } from '@/modules/api'
import { known_buttons, button_label_unknown } from '@/modules/defaults'

defineProps<{
  state: SystemState
}>()

defineEmits<{
  clicked: [string, string]
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
  <div class="list">
    <div class="user" v-for="[key, bar] of state.entries()" :key="key">
      <!-- TODO: Could have favicon here -->
      <div>ID: {{ key }}</div>
      <div class="requests">
        <div
          v-for="[button_id, value] of bar.entries()"
          :key="button_id"
          :class="{ highlight: value }"
          @click="$emit('clicked', key, button_id)"
        >
          <font-awesome-icon :icon="['fas', icon(button_id)]" />
          <div>{{ label(button_id) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.list {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
}

.user {
  margin: 0.4em;
  border: 4px solid black;
  border-radius: 1em;
  background-color: #404040;
  padding: 1em;
}

.requests {
  display: flex;
  flex-direction: row;
}

.requests > div {
  margin: 0.2em;
  padding: 0.2em;
  display: flex;
  flex: auto;
  flex-direction: column;
  align-items: center;
  border: 2px solid gray;
  border-radius: 0.4em;
}

.highlight {
  background-color: var(--vt-c-indigo);
}
</style>
