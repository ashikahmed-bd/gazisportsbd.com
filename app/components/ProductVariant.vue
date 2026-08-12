<script setup>
const props = defineProps({
  options: {
    type: Object,
    default: () => ({}),
  },

  variants: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["select"]);

const selected = reactive({
  size: "",
  color: "",
  sleeves: "",
  type: "",
});

const selectedVariant = computed(() => {
  const hasSelection = Object.values(selected).some(Boolean);

  if (!hasSelection) {
    return null;
  }

  const variant = props.variants.find((variant) => {
    return Object.entries(selected).every(([key, value]) => {
      if (!value) {
        return true;
      }

      return variant[key] === value;
    });
  });

  return variant || null;
});

const selectOption = (key, value) => {
  selected[key] = value;

  emit("select", selectedVariant.value);
};
</script>

<template>
  <div class="space-y-5">
    <div v-if="options.size?.length">
      <h3 class="mb-2 text-sm font-semibold">Size</h3>

      <div class="flex flex-wrap gap-2">
        <button
          v-for="size in options.size"
          :key="size"
          type="button"
          @click="selectOption('size', size)"
          :class="[
            'min-w-fit cursor-pointer rounded border px-3 py-1.5 text-xs font-medium transition',
            selected.size === size
              ? 'border-black bg-black text-white'
              : 'border-gray-300 bg-white text-gray-700 hover:border-black',
          ]"
        >
          {{ size }}
        </button>
      </div>
    </div>

    <div v-if="options.color?.length">
      <h3 class="mb-2 text-sm font-semibold">Color</h3>

      <div class="flex flex-wrap gap-2">
        <button
          v-for="color in options.color"
          :key="color"
          type="button"
          @click="selectOption('color', color)"
          :class="[
            'min-w-fit cursor-pointer rounded border px-3 py-1.5 text-xs font-medium transition',
            selected.color === color
              ? 'border-black bg-black text-white'
              : 'border-gray-300 bg-white text-gray-700 hover:border-black',
          ]"
        >
          {{ color }}
        </button>
      </div>
    </div>

    <div v-if="options.sleeves?.length">
      <h3 class="mb-2 text-sm font-semibold">Sleeves</h3>

      <div class="flex flex-wrap gap-2">
        <button
          v-for="sleeves in options.sleeves"
          :key="sleeves"
          type="button"
          @click="selectOption('sleeves', sleeves)"
          :class="[
            'min-w-fit cursor-pointer rounded border px-3 py-1.5 text-xs font-medium transition',
            selected.sleeves === sleeves
              ? 'border-black bg-black text-white'
              : 'border-gray-300 bg-white text-gray-700 hover:border-black',
          ]"
        >
          {{ sleeves }}
        </button>
      </div>
    </div>

    <div v-if="options.type?.length">
      <h3 class="mb-2 text-sm font-semibold">Type</h3>

      <div class="flex flex-wrap gap-2">
        <button
          v-for="type in options.type"
          :key="type"
          type="button"
          @click="selectOption('type', type)"
          :class="[
            'min-w-fit cursor-pointer rounded border px-3 py-1.5 text-xs font-medium transition',
            selected.type === type
              ? 'border-black bg-black text-white'
              : 'border-gray-300 bg-white text-gray-700 hover:border-black',
          ]"
        >
          {{ type }}
        </button>
      </div>
    </div>

    <div
      v-if="selectedVariant"
      class="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs"
    >
      <div class="flex items-center gap-1">
        <span class="text-gray-500">Price:</span>
        <span class="font-semibold">৳{{ selectedVariant.price }}</span>
      </div>

      <div class="h-4 w-px bg-gray-300"></div>

      <span v-if="selectedVariant.stock > 0" class="text-gray-600">
        {{ selectedVariant.stock }} in stock
      </span>

      <span v-else class="font-medium text-red-500"> Out of stock </span>
    </div>
  </div>
</template>
