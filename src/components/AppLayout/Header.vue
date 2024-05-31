<script setup lang="ts">
import AppHeader from './AppHeader.vue'
const dropdownOpen = ref(false)

defineProps<{
    userLayout: Boolean
}>()
</script>

<template>
    <div class="px-40 flex justify-end" :class="userLayout ? 'py-20 bg-white' : 'pt-20 pb-10 bg-gray-5'">
        <div class="max-md:hidden h-56 inline-flex items-center rounded-50 box_shadow">
            <div class="w-56 h-56 rounded-50 overflow-hidden">
                <img src="@/assets/image/avatar.png" alt="avatar" class="w-56 h-56" />
            </div>
            <div class="ml-10 mr-20">
                <div class="text-14-20-400 text-gray-2 italic">Career</div>
                <div class="text-16-20-400 text-black">Sarah Migel</div>
            </div>
            <div class="flex gap-5">
                <Dropdown />
                <Button>
                    <img src="@/assets/image/bell.svg" alt="bell" />
                </Button>
                <Button>
                    <img src="@/assets/image/setting.svg" alt="setting" />
                </Button>
            </div>
        </div>
        <div class="md:hidden">
            <img src="@/assets/image/mobile_menu.svg" alt="">
        </div>
    </div>
</template>
