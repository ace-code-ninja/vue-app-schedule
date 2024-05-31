<script setup lang="ts">
import Header from '@/components/AppLayout/Header.vue'
import Sidebar from '@/components/AppLayout/Sidebar.vue'
</script>

<template>
  <div class="min-h-screen bg-white font-sans flex">
    <Sidebar />
    <div class="flex-1 flex flex-col">
      <Header :user-layout="false" />
      <main class="flex-1">
        <slot />
      </main>
    </div>

  </div>
</template>
