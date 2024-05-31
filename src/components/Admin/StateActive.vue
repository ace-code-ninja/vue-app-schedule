<script setup lang="ts">
import { type BarState, type SystemState } from '@/modules/api'
import ActiveRequests from './ActiveRequests.vue'

defineProps<{
  state: SystemState
}>()

defineEmits<{
  clicked: [string, string]
}>()

function has_any(values: BarState) {
  for (const v of values.values()) {
    if (v) return true
  }

  return false
}
</script>

<template>
  <div class="list">
    <ActiveRequests
      :id="key"
      v-for="[key, bar] of state"
      :key="key"
      v-show="has_any(bar)"
      :state="bar"
      @clicked="(button_id) => $emit('clicked', key, button_id)"
    />
  </div>
</template>

<style scoped>
.list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  align-items: center;
  justify-content: center;
}
</style>
