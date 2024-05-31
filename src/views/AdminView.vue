<script setup lang="ts">
import { ROUTE_PATHS } from '@/router'
import { api } from '@/modules/api'
import { ref } from 'vue'

const is_admin = ref(api.is_admin())
</script>

<template>
  <!-- TODO: Put a login landing page -->
  <div v-if="is_admin" class="wrapper">
    <nav aria-label="Main">
      <RouterLink :to="ROUTE_PATHS.ACTIVE">Active</RouterLink>
      <RouterLink :to="ROUTE_PATHS.BOARDS">Boards</RouterLink>
      <RouterLink :to="ROUTE_PATHS.TABLE">Table</RouterLink>
      <!-- <RouterLink to="/"> -->
      <!-- <img alt="Peto logo" class="logo" src="@/assets/image/logo.svg"/> -->
      <!-- </RouterLink> -->
      <!-- <div class="spacer"></div>
      <RouterLink v-if="api.is_admin()" to="/admin" aria-label="Login">
        <font-awesome-icon :icon="['fas', 'heart-pulse']"/>
      </RouterLink> -->
      <!-- <RouterLink to="/about" aria-label="Help">
        <font-awesome-icon :icon="['fas', 'question-circle']"/>
      </RouterLink> -->
    </nav>
    <RouterView />
  </div>
  <div v-else>You must be logged in to see this page</div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
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
</style>
