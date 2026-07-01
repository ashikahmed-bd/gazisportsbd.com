<script setup>
const props = defineProps({
    images: {
        type: Array,
        default: () => []
    },
});

const carousel = useTemplateRef('carousel')
const activeIndex = ref(0)

function onClickPrev() {
    activeIndex.value--
}
function onClickNext() {
    activeIndex.value++
}
function onSelect(index) {
    activeIndex.value = index
}

function select(index) {
    activeIndex.value = index

    carousel.value?.emblaApi?.scrollTo(index)
}
</script>

<template>
    <div class="group">
        <div class="w-full space-y-4">
            <div class="relative overflow-hidden rounded-2xl border border-border bg-white">
                <UCarousel ref="carousel" v-slot="{ item }" :items="props.images" :prev="{ onClick: onClickPrev }"
                    :next="{ onClick: onClickNext }" class="w-full" @select="onSelect">
                    <div class="aspect-square overflow-hidden bg-gray-50">
                        <NuxtImg :src="item"
                            class="h-full w-full object-contain transition duration-300 hover:scale-105"
                            loading="lazy" />
                    </div>
                </UCarousel>
            </div>

            <div class="flex gap-3 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-gray-300">
                <button v-for="(img, index) in props.images" :key="index" @click="select(index)"
                    class="relative size-20 shrink-0 overflow-hidden rounded-xl border-2 bg-white transition-all"
                    :class="activeIndex === index
                        ? 'border-primary ring-2 ring-primary/20'
                        : 'border-gray-200 hover:border-gray-300'
                        ">
                    <NuxtImg :src="img" alt="" class="h-full w-full object-cover" loading="lazy" />

                    <div v-if="activeIndex === index" class="absolute inset-0 bg-primary/10" />
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
