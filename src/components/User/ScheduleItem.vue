<script setup lang="ts">
defineProps({
    imageSrc: String,
    title: String
});
</script>

<template>
    <div class="w-210 h-234 flex flex-col items-center gap-10 pt-20 pb-10 px-10 bg-white border-1 border-blue-1 rounded-37">
        <div class="w-120 h-120 rounded-64 bg-gray-10 flex justify-center items-center">
            <img :src="imageSrc" alt="entertainment">
        </div>
        <div class="text-20-24-400 text-gray-1">
            {{ title }}
        </div>
        <div class="h-40 w-full rounded-b-37 bg-gray-10">
        </div>
    </div>
</template>