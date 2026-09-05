<script setup>
definePageMeta({
  layout: "admin",
});

const route = useRoute();
const toast = useToast();

const attributeStore = useAttributeStore();
const productStore = useProductStore();
const variantStore = useVariantStore();

const { attributes } = storeToRefs(attributeStore);
const { product } = storeToRefs(productStore);
const { errors } = storeToRefs(variantStore);

const selectedOptions = ref({});
const variants = ref([]);

const attributeList = computed(() => {
  return attributes.value?.data ?? [];
});

const selectedOptionCount = computed(() => {
  return Object.values(selectedOptions.value).reduce(
    (total, options) => total + options.length,
    0,
  );
});

const isSelected = (attributeId, optionId) => {
  return (
    selectedOptions.value[attributeId]?.some(
      (option) => option.id === optionId,
    ) ?? false
  );
};

const toggleOption = (attribute, option) => {
  const attributeId = attribute.id;

  if (!selectedOptions.value[attributeId]) {
    selectedOptions.value[attributeId] = [];
  }

  const options = selectedOptions.value[attributeId];

  const index = options.findIndex((item) => item.id === option.id);

  if (index === -1) {
    options.push(option);
  } else {
    options.splice(index, 1);
  }

  if (!options.length) {
    delete selectedOptions.value[attributeId];
  }
};

const cartesian = (groups) => {
  return groups.reduce(
    (result, group) => {
      return result.flatMap((previous) =>
        group.map((item) => [...previous, item]),
      );
    },
    [[]],
  );
};

const generateSku = (combination) => {
  const parts = combination.map((item) =>
    item.option.slug
      .toUpperCase()
      .replace(/[^A-Z0-9]+/g, "-")
      .replace(/^-|-$/g, ""),
  );

  return `PRD-${parts.join("-")}`;
};

const generateVariantName = (combination) => {
  return combination.map((item) => item.option.name).join(" / ");
};

const generateVariants = () => {
  if (!selectedOptionCount.value) {
    alert("Please select options first.");
    return;
  }

  const groups = Object.entries(selectedOptions.value).map(
    ([attributeId, options]) => {
      return options.map((option) => ({
        attribute_id: Number(attributeId),
        attribute_option_id: option.id,
        option,
      }));
    },
  );

  const combinations = cartesian(groups);

  variants.value = combinations.map((combination, index) => ({
    id: index + 1,
    name: generateVariantName(combination),
    sku: generateSku(combination),
    price: product.value?.price ?? 0,
    base_price: product.value?.base_price ?? 0,
    stock: 0,
    low_stock_threshold: 5,
    is_active: true,
    options: combination.map((item) => ({
      attribute_id: item.attribute_id,
      attribute_option_id: item.attribute_option_id,
    })),
  }));
};

const clearOptions = () => {
  selectedOptions.value = {};
  variants.value = [];
};

const removeVariants = () => {
  variants.value = [];
};

const saveVariants = async () => {
  if (!variants.value.length) {
    toast.add({
      title: "Error",
      description: "Please generate variants first.",
      type: "error",
    });
    return;
  }

  const payload = {
    options: Object.entries(selectedOptions.value).flatMap(
      ([attributeId, options]) =>
        options.map((option) => ({
          attribute_id: Number(attributeId),
          attribute_option_id: Number(option.id),
        })),
    ),

    variants: variants.value.map((variant) => ({
      sku: variant.sku,
      name: variant.name,
      price: Number(variant.price),
      base_price: Number(variant.base_price),
      stock: Number(variant.stock),
      low_stock_threshold: Number(variant.low_stock_threshold),
      is_active: Boolean(variant.is_active),

      options: variant.options.map((option) => ({
        attribute_id: Number(option.attribute_id),
        attribute_option_id: Number(option.attribute_option_id),
      })),
    })),
  };

  await variantStore.store(route.params.id, payload);
};

onMounted(async () => {
  await productStore.show(route.params.id);
  await attributeStore.all("");
});

useSeoMeta({
  title: "Product Variants",
});
</script>

<template>
  <main class="space-y-4">
    <section class="rounded-xl border border-border bg-white">
      <div
        class="flex items-center justify-between border-b border-border px-6 py-4"
      >
        <div>
          <h2 class="text-base font-semibold text-slate-900">
            Product Options
          </h2>

          <p class="mt-1 text-sm text-slate-500">
            Select options to generate variants.
          </p>
        </div>

        <span
          v-if="selectedOptionCount"
          class="rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-600"
        >
          {{ selectedOptionCount }} Selected
        </span>
      </div>

      <div class="divide-y divide-slate-100">
        <div
          v-for="attribute in attributeList"
          :key="attribute.id"
          class="px-6 py-5"
        >
          <div class="flex items-center justify-between">
            <div>
              <div class="flex items-center gap-2">
                <h3 class="text-sm font-semibold text-slate-900">
                  {{ attribute.name }}
                </h3>

                <span
                  class="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-medium uppercase text-slate-500"
                >
                  {{ attribute.type }}
                </span>
              </div>

              <p class="mt-1 text-xs text-slate-400">
                {{ attribute.options.length }}
                options
              </p>
            </div>

            <span
              v-if="selectedOptions[attribute.id]?.length"
              class="text-xs font-semibold text-indigo-600"
            >
              {{ selectedOptions[attribute.id].length }}
              selected
            </span>
          </div>

          <div class="flex flex-wrap gap-2">
            <button
              v-for="option in attribute.options"
              :key="option.id"
              type="button"
              class="inline-flex items-center gap-2 rounded border px-2 py-1.5 text-sm font-medium transition"
              :class="
                isSelected(attribute.id, option.id)
                  ? 'border-slate-900 bg-slate-900 text-white'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-50'
              "
              @click="toggleOption(attribute, option)"
            >
              <span
                v-if="attribute.type === 'color' && option.hex"
                class="h-3.5 w-3.5 rounded-full border border-black/10"
                :style="{
                  backgroundColor: option.hex,
                }"
              />

              {{ option.name }}

              <UIcon
                v-if="isSelected(attribute.id, option.id)"
                name="i-lucide-check"
                class="size-4"
              />
            </button>
          </div>
        </div>
      </div>

      <div class="flex items-center justify-between px-6 py-4">
        <p class="text-xs text-slate-500">
          Select options and generate variants.
        </p>

        <div class="flex gap-2">
          <UButton
            v-if="selectedOptionCount"
            color="neutral"
            variant="ghost"
            icon="i-lucide-x"
            @click="clearOptions"
          >
            Clear
          </UButton>

          <UButton
            icon="i-lucide-layers-2"
            :disabled="!selectedOptionCount"
            @click="generateVariants"
          >
            Generate
          </UButton>
        </div>
      </div>
    </section>

    <section
      v-if="variants.length"
      class="rounded-xl border border-border bg-white"
    >
      <div
        class="flex items-center justify-between border-b border-border px-6 py-5"
      >
        <div class="block">
          <h2 class="text-base font-semibold text-slate-900">Variants</h2>
          <p class="mt-1 text-sm text-slate-500">
            {{ variants.length }} variants generated.
          </p>
        </div>

        <UButton
          color="neutral"
          variant="ghost"
          icon="i-lucide-trash-2"
          @click="removeVariants"
        >
          Remove All
        </UButton>
      </div>

      <div class="divide-y divide-border space-y-3 px-4 py-4">
        <div
          v-for="(variant, index) in variants"
          :key="variant.id"
          class="bg-slate-200 p-3 rounded"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div
                class="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-xs font-bold text-slate-600"
              >
                {{ index + 1 }}
              </div>

              <div>
                <h3 class="text-sm font-semibold text-slate-900">
                  {{ variant.name }}
                </h3>

                <p class="mt-1 text-xs text-slate-400">
                  {{ variant.sku }}
                </p>
              </div>
            </div>

            <USwitch v-model="variant.is_active" />
          </div>

          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <UFormField label="SKU">
              <UInput v-model="variant.sku" class="w-full" />
            </UFormField>

            <UFormField label="Price">
              <UInput
                v-model.number="variant.price"
                type="number"
                min="0"
                class="w-full"
              />
            </UFormField>

            <UFormField label="Base Price">
              <UInput
                v-model.number="variant.base_price"
                type="number"
                min="0"
                class="w-full"
              />
            </UFormField>

            <UFormField label="Stock">
              <UInput
                v-model.number="variant.stock"
                type="number"
                min="0"
                class="w-full"
              />
            </UFormField>

            <UFormField label="Low Stock">
              <UInput
                v-model.number="variant.low_stock_threshold"
                type="number"
                min="0"
                class="w-full"
              />
            </UFormField>
          </div>
        </div>
      </div>

      <div
        class="flex items-center justify-between border-t border-slate-200 bg-slate-50/50 px-6 py-4"
      >
        <span class="text-xs text-slate-500">
          {{ variants.length }} variants ready
        </span>

        <UButton @click="saveVariants" :loading="variantStore.loading">
          Save Variants
        </UButton>
      </div>
    </section>
  </main>
</template>
