<script setup lang="ts">
import { api } from '@/modules/api'
import { basic_keys } from '@/modules/defaults'
import { type BarState } from '@/modules/api'
import { type CallbackUnregisterFunction } from '@/modules/callback_manager'

import ScheduleItem from '@/components/User/ScheduleItem.vue'

const state = ref<BarState>(new Map())
let cb_unregister: CallbackUnregisterFunction | null = null

function update_status(new_state: BarState | null) {
  if (!new_state || !new_state.size) {
    //Sanity check here that we at least have some keys listed for the UI
    console.log('Generating first time buttons')
    for (const key of basic_keys) {
      state.value.set(key, false)
    }
    return
  }

  for (const [key, pressed] of new_state) {
    // console.log(`${key}: ${pressed ? 'Pressed' : 'Unpressed'}`);
    state.value.set(key, pressed)
  }
}

async function button_clicked(id: string) {
  console.log(`Clicked: ${id}`)

  //immediately show the button as clicked for good user feedback
  const new_value = state.value.has(id) ? !state.value.get(id) : true
  state.value.set(id, new_value)

  //Push the new status to the server
  const current_state = await api.set_status(api.uuid(), state.value)
  if (!current_state) return

  update_status(current_state)
}

onMounted(() => {
  cb_unregister = api.watch_status(update_status)
})

onUnmounted(() => {
  if (cb_unregister) cb_unregister()
})

const scheduleItems = ref([
  { imageSrc: "/src/assets/image/entertainment.png", title: "Entertainment" },
  { imageSrc: "/src/assets/image/drink.png", title: "Drinks" },
  { imageSrc: "/src/assets/image/home.svg", title: "Home" },
  { imageSrc: "/src/assets/image/phone.png", title: "Phone Call" },
  { imageSrc: "/src/assets/image/music.png", title: "Music" },
  // Add more items as needed
]);
</script>

<template>
  <!-- <ButtonBar :state="state" @clicked="button_clicked" /> -->
  <div class="mt-75 px-100">
    <div class="flex flex-col items-center">
      <div class="relative mt-10 p-20 bg-gray-10 rounded-50 inline-flex flex-wrap justify-center gap-20">
        <div class="absolute left-0 -top-65 rounded-30 bg-gray-10 text-gray-1 px-20 py-15">
          Morning routines 6:00AM 12:00PM
        </div>
        <ScheduleItem v-for="(item, index) in scheduleItems" :key="index" :image-src="item.imageSrc"
          :title="item.title" />
      </div>
      <div class="mt-20 text-16-20-400 text-gray-11">
        Select and hold the button you want to change
      </div>
    </div>
  </div>
</template>

<route lang="yaml">
name: 'user'
</route>

<style scoped></style>
