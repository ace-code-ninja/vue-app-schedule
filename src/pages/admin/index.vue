<script setup lang="ts">
import { api } from '@/modules/api'
import { AdminComponentType } from '@/types/admin'

import Item from '@/components/Admin/Item.vue';

const is_admin = ref(api.is_admin())
const componentType = ref<string>('active')
const onClickHandle = (type: string) => {
  componentType.value = type
  console.log('componentType', componentType.value)
}

const AdminComponentRenderer = computed(() => useAdminComponentResolver(componentType.value))
</script>

<template>
  <!-- TODO: Put a login landing page -->
  <!-- <div v-if="is_admin" class="wrapper">
    <nav aria-label="Main">
      <div class="text-white" @click="() => onClickHandle(AdminComponentType.active)">Active</div>
      <div class="text-white" @click="() => onClickHandle(AdminComponentType.board)">Boards</div>
      <div class="text-white" @click="() => onClickHandle(AdminComponentType.table)">Table</div>
    </nav>
    <AdminComponentRenderer />
  </div>
  <div v-else>You must be logged in to see this page</div> -->
  <div class="pl-38 pt-15">
    <div class="text-14-24-400 text-indigo-1">
      Hi Jonathon Salter,
    </div>
    <div class="text-30-36-700 text-indigo-1">
      Welcome back
    </div>
    <div class="mt-40">
      <Item />
    </div>
  </div>
</template>

<route lang="yaml">
name: 'admin'
</route>

<!-- <style scoped>
.wrapper {
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
  color: white;
}

nav {
  display: flex;
  flex-direction: column;
  font-size: 2em;
  border-right: 4px solid black;
  height: 100%;
  padding-right: 0.4em;
  margin-right: 0.4em;
}

nav div {
  flex: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 0;
  flex-basis: 0;
  flex-shrink: 1;
  margin: 0.4em 0 0.4em 0;
  padding: 0.4em;
  border-radius: 0.4em;
  cursor: pointer;
  background-color: darkslategray;
}

nav div:hover {
  background-color: gray;
}

nav div.active {
  color: white;
  background-color: gray;
}
</style> -->
