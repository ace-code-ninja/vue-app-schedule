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

const num_columns = known_buttons.size + 1
const column_width = Math.floor(100 / num_columns)
const column_width_percentage = `${column_width}%`
</script>

<template>
  <div class="container">
    <div class="header"><div>User Name</div></div>
    <div class="header" v-for="button_id of known_buttons.keys()" :key="button_id">
      <div>
        <font-awesome-icon :icon="['fas', icon(button_id)]" />
      </div>
      <div>{{ label(button_id) }}</div>
    </div>
    <template v-for="[key, value] of state" :key="key">
      <!-- TODO: Could have favicon here -->
      <div class="wrap">{{ key }}</div>
      <div
        v-for="button_id of known_buttons.keys()"
        :key="button_id"
        :class="{ highlight: Boolean(value.get(button_id)) }"
        @click="$emit('clicked', key, button_id)"
      >
        <!-- <span>{{ button_id }}:</span><span>{{ value.get(button_id) ? "true" : "false" }}</span> -->
      </div>
    </template>
  </div>
</template>

<style scoped>
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, v-bind('column_width_percentage'));
  /* grid-template-columns: repeat(auto-fill, 100%); */
  width: 100%;
}

.container > div {
  display: inline-grid;
  /* margin: 0.4em; */
  border: 1px solid black;
  /* border-radius: 1em; */
  background-color: #404040;
  padding: 1em;
}

.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.header > div {
  display: block;
  text-align: center;
  font-weight: bold;
}

.wrap {
  grid-column-start: 1;
}

/*
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
  } */

.highlight {
  background-color: var(--vt-c-indigo) !important;
}
</style>
