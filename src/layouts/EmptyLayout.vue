<script setup lang="ts">
import AppHeader from '@/components/AppLayout/AppHeader.vue';
</script>

<template>
    <div class="min-h-screen font-sans">
        <AppHeader />
        <slot />
    </div>
</template>
