<script setup lang="ts">
const values = ref<string[]>([]);
const generateValues = () => {
    for (let i = 0; i <= 8; i++) {
        values.value.push(`011${i}`);
    }
};
onMounted(generateValues);
</script>
<template>
    <div class="flex flex-wrap gap-20">
        <div v-for="value in values" :key="value"
            class="w-360 h-136 rounded-20 bg-gray-8 border-2 border-gray-7 box-border">
            <div class="pt-18 pb-10">
                <div class="px-25 text-gray-6 text-18-20-600">Ward</div>
                <div class="px-25 text-black text-30-36-700">{{ value }}</div>
                <div class="mt-5 px-10 w-full">
                    <div class="h-40 bg-teal-1 rounded-10 px-15 py-10 flex justify-end gap-20 text-18-20-600 text-white">
                        <div>last visit:</div>
                        <div>11:55</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>