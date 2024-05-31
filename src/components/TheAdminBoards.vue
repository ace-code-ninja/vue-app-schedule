<script setup lang="ts">
import { api } from '@/modules/api'
import { type SystemState } from '@/modules/api'
import { type CallbackUnregisterFunction } from '@/modules/callback_manager'
import StateBoards from '@/components/admin/StateBoards.vue'

const state = ref<SystemState>(new Map())
let cb_unregister: CallbackUnregisterFunction | null = null

function update_state(new_state: SystemState | null) {
  if (!new_state) {
    state.value = new Map()
    return
  }

  //TODO: There's probably a more efficient way to merge and update this
  state.value = new_state
}

async function button_clicked(bar_id: string, button_id: string) {
  console.log(`Clicked: ${bar_id}/${button_id}`)

  //immediately show the button as clicked for good user feedback
  const bar = state.value.get(bar_id)
  if (!bar) return

  const new_value = bar.has(button_id) ? !bar.get(button_id) : true
  bar.set(button_id, new_value)

  //Push the new status to the server
  const current_status = await api.set_status(bar_id, bar)
  if (!current_status) return

  state.value.set(bar_id, current_status)
}

onMounted(() => {
  cb_unregister = api.watch_state(update_state)
})

onUnmounted(() => {
  if (cb_unregister) cb_unregister()
})
</script>

<template>
  <StateBoards class="fill" :state="state" @clicked="button_clicked" />
</template>

<style scoped>
.fill {
  height: 100%;
  width: 100%;
}
</style>
