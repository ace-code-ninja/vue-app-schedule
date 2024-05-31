<script setup lang="ts">
defineProps<{
  title: string
  icon: string
  use_solid?: boolean
  pressed?: boolean
}>()

defineEmits<{ clicked: [] }>()
</script>

<template>
  <div class="item" :class="{ active: pressed }" @click="() => $emit('clicked')">
    <div class="icon">
      <font-awesome-icon :icon="[use_solid ? 'fas' : 'fa', icon]" />
    </div>
    <div class="text-center">
      {{ title }}
    </div>
  </div>
</template>

<style scoped>
.item {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px solid black;
  border-radius: 1em;
  margin: 1em;
  height: 10em;
  width: 10em;
  cursor: pointer;
}

.item:hover {
  background-color: color-mix(in srgb, var(--vt-c-indigo) 20%, transparent);
}
.active {
  background-color: var(--vt-c-indigo);
}
.active:hover {
  background-color: color-mix(in srgb, var(--vt-c-white) 10%, var(--vt-c-indigo));
}
.item div {
  display: block;
  flex: auto;
}
.icon {
  font-size: 4em;
}
.label {
  text-align: center;
}
</style>
