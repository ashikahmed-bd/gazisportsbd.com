<script setup>
const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },

  categories: {
    type: Object,
    default: {},
  },
});

const emit = defineEmits(["close"]);
</script>

<template>
  <Transition name="slide-fade">
    <aside v-if="open" class="bg-white">
      <nav class="overflow-y-auto h-[calc(100dvh-64px)] px-2 py-4">
        <ul class="space-y-2">
          <CategoryItem
            v-for="category in props.categories.data"
            :key="category.id"
            :item="category"
          />
        </ul>
      </nav>
    </aside>
  </Transition>
</template>
