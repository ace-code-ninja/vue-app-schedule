<script setup lang="ts">
import { type BarState } from '@/modules/api'
import { known_buttons, button_label_unknown } from '@/modules/defaults'

defineProps<{ state: BarState }>()

defineEmits<{ clicked: [string] }>()

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
  <div class="bar">
    <VButton
      :key="key"
      v-for="[key, value] of state.entries()"
      :title="label(key)"
      :icon="icon(key)"
      :pressed="value"
      @clicked="$emit('clicked', key)"
    />
  </div>
</template>

<style scoped>
.bar {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  align-items: center;
  justify-content: center;
}

@media (orientation: portrait) {
  .bar {
    flex-direction: column;
  }
}

@media (max-width: 1200px) {
  .bar {
    font-size: 0.7em;
  }
}
</style>
