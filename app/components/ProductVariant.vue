<script setup>
const props = defineProps({
  variants: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["select"]);

const selectedSize = ref("");
const selectedColor = ref("");

const sizes = computed(() => [...new Set(props.variants.map((v) => v.size))]);
const colors = computed(() => [...new Set(props.variants.map((v) => v.color))]);

const selectedVariant = computed(() =>
  props.variants.find(
    (v) => v.size === selectedSize.value && v.color === selectedColor.value,
  ),
);

watch(selectedVariant, (variant) => {
  emit("select", variant ?? null);
});

const isSizeDisabled = (size) => {
  return !props.variants.some(
    (v) =>
      v.size === size &&
      (!selectedColor.value || v.color === selectedColor.value) &&
      v.stock > 0,
  );
};

const isColorDisabled = (color) => {
  return !props.variants.some(
    (v) =>
      v.color === color &&
      (!selectedSize.value || v.size === selectedSize.value) &&
      v.stock > 0,
  );
};
</script>

<template>
  <div class="space-y-4">
    <h3 class="font-semibold">Size</h3>
    <div class="flex flex-wrap gap-2">
      <button
        v-for="size in sizes"
        :key="size"
        @click="selectedSize = size"
        :disabled="isSizeDisabled(size)"
        class="rounded border px-4 py-2"
        :class="[
          selectedSize === size
            ? 'border-primary bg-primary text-white'
            : 'border-gray-300',
          isSizeDisabled(size)
            ? 'cursor-not-allowed opacity-50 line-through'
            : '',
        ]"
      >
        {{ size }}
      </button>
    </div>
  </div>

  <div class="space-y-4">
    <h3 class="font-semibold">Color</h3>
    <div class="flex flex-wrap gap-2">
      <button
        v-for="color in colors"
        :key="color"
        @click="selectedColor = color"
        :disabled="isColorDisabled(color)"
        class="rounded border px-4 py-2"
        :class="[
          selectedColor === color
            ? 'border-primary bg-primary text-white'
            : 'border-gray-300',
          isColorDisabled(color)
            ? 'cursor-not-allowed opacity-50 line-through'
            : '',
        ]"
      >
        {{ color }}
      </button>
    </div>
  </div>

  <div v-if="selectedVariant" class="rounded-xl border border-border p-4">
    <p><strong>SKU:</strong> {{ selectedVariant.sku }}</p>
    <p><strong>Price:</strong> ৳{{ selectedVariant.price }}</p>
    <p><strong>Stock:</strong> {{ selectedVariant.stock }}</p>
  </div>
</template>
