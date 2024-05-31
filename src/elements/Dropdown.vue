<script setup lang="ts">
import { isAbsolute } from 'path';

const dropdownOpen = ref(false)
</script>
<template>
    <button class="relative w-46 h-46 flex justify-center items-center gap-3 bg-gray-3"
        :class="dropdownOpen ? 'rounded-t-50' : 'rounded-50'" @click="dropdownOpen = !dropdownOpen">
        <div class="text-gray-4 text-14-20-500">EN</div>
        <img src="@/assets/image/dropdown-arrow.svg" alt="dropdown_arrow">
        <transition enter-active-class="transition duration-150 ease-out transform" enter-from-class="scale-95 opacity-0"
            enter-to-class="scale-100 opacity-100" leave-active-class="transition duration-150 ease-in transform"
            leave-from-class="scale-100 opacity-100" leave-to-class="scale-95 opacity-0">
            <div v-show="dropdownOpen"
                class="absolute left-0 top-36 w-46 flex flex-col gap-10 rounded-b-50 py-12 bg-gray-3 text-14-20-500 text-gray-9">
                <button class="">Fr</button>
                <button class="">Esp</button>
                <button class="">It</button>
            </div>
        </transition>
    </button>

    <div v-show="dropdownOpen" class="fixed inset-0 z-10 w-full h-full" @click="dropdownOpen = false" />
</template>