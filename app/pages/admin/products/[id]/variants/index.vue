<script setup>
definePageMeta({
  layout: "admin",
});

const route = useRoute();

const variants = ref([
  {
    size: "",
    color: "",
    price: 0,
    stock: 0,
    sku: "",
  },
]);

const addVariant = () => {
  variants.value.push({
    size: "",
    color: "",
    price: 0,
    stock: 0,
    sku: "",
  });
};

const removeVariant = (index) => {
  variants.value.splice(index, 1);
};

const submit = async () => {
  const payload = {
    variants: variants.value,
  };

  console.log(payload);
};
</script>

<template>
  <main class="space-y-6">
    <div class="card">
      <div class="card__header flex justify-between">
        <div>
          <h1 class="text-2xl font-bold">Add Product Variants</h1>

          <p class="text-sm text-gray-500">Product ID: {{ route.params.id }}</p>
        </div>

        <button type="button" @click="addVariant" class="base__button">
          Add Variant
        </button>
      </div>

      <div class="card__body space-y-4">
        <div
          v-for="(variant, index) in variants"
          :key="index"
          class="grid gap-4 rounded border border-border p-2.5 md:grid-cols-6"
        >
          <div>
            <label class="form__label"> Size </label>
            <input
              v-model="variant.size"
              placeholder="Enter size"
              class="form__input"
            />
          </div>

          <div>
            <label class="form__label"> Color </label>
            <input
              v-model="variant.color"
              placeholder="Enter color"
              class="form__input"
            />
          </div>

          <div>
            <label class="form__label"> Price </label>
            <input
              v-model.number="variant.price"
              type="number"
              placeholder="Enter price"
              class="form__input"
            />
          </div>

          <div>
            <label class="form__label"> Stock </label>
            <input
              v-model.number="variant.stock"
              type="number"
              placeholder="Enter stock"
              class="form__input"
            />
          </div>

          <div>
            <label class="form__label"> SKU </label>
            <input
              v-model="variant.sku"
              placeholder="Enter SKU"
              class="form__input"
            />
          </div>

          <div class="flex items-end">
            <button
              v-if="variants.length > 1"
              @click="removeVariant(index)"
              type="button"
              class="flex h-11 w-11 items-center justify-center rounded-xl border border-red-200 text-red-500 transition hover:bg-red-50"
              title="Remove"
            >
              <UIcon name="i-lucide-trash-2" class="size-5" />
            </button>
          </div>
        </div>

        <div class="flex justify-end">
          <button @click="submit" class="base__button">Save Variants</button>
        </div>
      </div>
    </div>
  </main>
</template>
