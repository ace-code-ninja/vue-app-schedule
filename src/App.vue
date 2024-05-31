<script setup lang="ts">
const defaultLayout = 'user'

const { currentRoute } = useRouter()

const layout = computed(() => `${currentRoute.value.meta.layout || defaultLayout}-layout`)
</script>

<template>
  <component :is="layout">
    <router-view />
  </component>
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

main {
  /* TODO: Make this latch to page height on landscape mode */
  padding: 1em;
}
</style>
