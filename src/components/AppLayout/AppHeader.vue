<script setup lang="ts">
import { api } from '@/modules/api'
</script>

<template>
  <header>
    <nav aria-label="Main" class="flex justify-between">
      <RouterLink to="/user">
        <img alt="Peto logo" class="min-w-[35px] logo" src="@/assets/image/logo.svg" />
      </RouterLink>
      <div class="flex gap-3">
        <RouterLink v-if="api.is_admin()" to="/admin" aria-label="Login">
          <font-awesome-icon :icon="['fas', 'heart-pulse']" />
        </RouterLink>
        <RouterLink to="/about" aria-label="Help">
          <font-awesome-icon :icon="['fas', 'question-circle']" />
        </RouterLink>
      </div>
    </nav>
  </header>
</template>

<style scoped>
header {
  /* place-items: center; */
  /* padding-right: calc(var(--section-gap) / 2); */
  line-height: 1.5;
  max-height: 100vh;
  padding: 1em;
  border-bottom: solid black 0.2em;
}

.logo {
  display: block;
  /* margin: 0 auto 2rem; */
  max-height: 100%;
}

nav {
  display: flex;
  flex-direction: row;
  width: 100%;
  font-size: 2em;
}

nav a {
  flex: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 0;
  flex-basis: 0;
  flex-shrink: 1;
  padding: 0.4em;
  border-radius: 0.4em;
}

nav a.router-link-exact-active {
  color: color-mix(in srgb, var(--vt-c-white) 20%, var(--vt-c-indigo));
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

.spacer {
  flex: auto;
  flex-grow: 1;
}
</style>
