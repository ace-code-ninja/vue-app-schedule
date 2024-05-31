<script setup lang="ts">
import Header from '@/components/AppLayout/Header.vue'
</script>

<template>
    <div class="min-h-screen bg-white font-sans">
        <Header :user-layout="true" />
        <slot />
    </div>
</template>
