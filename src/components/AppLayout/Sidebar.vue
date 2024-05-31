<script setup lang="ts">
const activeItem = ref('overview')

const handleButtonClick = (item: string) => {
    activeItem.value = item;
};

const activeClass = ref(
    'bg-teal-1 text-white',
)
const inactiveClass = ref(
    'text-gray-6',
)
</script>

<template>
    <div class="h-screen w-300 bg-gray-5 pt-45 inline-flex flex-col items-center box_shadow">
        <img src="@/assets/image/sidebar_logo.svg" alt="sidebar_logo">
        <div class="mt-49 w-full px-12">
            <button class="w-full  rounded-50 px-28 py-18"
                :class="[activeItem === 'overview' ? activeClass : inactiveClass]"
                @click="() => handleButtonClick('overview')">
                <div class="text-18-20-600 flex gap-18">
                    <img src="@/assets/image/activity.svg" alt="overview"
                        :class="[activeItem === 'overview' ? 'active_svg' : 'deactive_svg']">
                    Overview
                </div>
            </button>
            <button class="w-full rounded-50 px-28 py-18" :class="[activeItem === 'control' ? activeClass : inactiveClass]"
                @click="() => handleButtonClick('control')">
                <div class="text-18-20-600 flex gap-18">
                    <img src="@/assets/image/chart.svg" alt="control"
                        :class="[activeItem === 'control' ? 'active_svg' : 'deactive_svg']">
                    Control Panel
                </div>
            </button>
            <button class="w-full rounded-50 px-28 py-18" :class="[activeItem === 'settings' ? activeClass : inactiveClass]"
                @click="() => handleButtonClick('settings')">
                <div class="text-18-20-600 flex gap-18">
                    <img src="@/assets/image/sidebar_setting.svg"
                        :class="[activeItem === 'overview' ? 'active_svg' : 'deactive_svg']" alt="overview">
                    Settings
                </div>
            </button>
        </div>
    </div>
</template>   
<style>
.active_svg {
    fill: white;
}

.deactive_svg {
    fill: #808191;
}
</style>