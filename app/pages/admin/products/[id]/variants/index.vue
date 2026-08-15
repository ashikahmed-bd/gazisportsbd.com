<script setup>
definePageMeta({
  layout: "admin",
});

const route = useRoute();
const productStore = useProductStore();

const form = reactive({
  variants: [
    {
      size: "",
      color: "",
      sleeves: "",
      type: "",
      price: 0,
      stock: 0,
    },
  ],
});

const addVariant = () => {
  form.variants.push({
    size: "",
    color: "",
    sleeves: "",
    type: "",
    price: 0,
    stock: 0,
  });
};

const removeVariant = (index) => {
  form.variants.splice(index, 1);
};

const submit = async () => {
  await productStore.variants(route.params.id, form);
};

onMounted(async () => {
  const response = await productStore.show(route.params.id);
  form.variants = response.variants;
});

useSeoMeta({
  title: "Product Variants",
});
</script>

<template>
  <main class="space-y-6">
    <div class="card">
      <div class="card__header flex justify-between">
        <div>
          <h1 class="text-2xl font-bold">Add Variants</h1>

          <p class="text-sm text-gray-500">Product ID: {{ route.params.id }}</p>
        </div>

        <button type="button" @click="addVariant" class="base__button">
          Add Variant
        </button>
      </div>

      <div class="card__body space-y-3">
        <div
          v-for="(variant, index) in form.variants"
          :key="index"
          class="grid items-end gap-3 rounded-xl border border-border p-3 lg:grid-cols-7"
        >
          <!-- Size -->
          <div class="form__group">
            <label class="form__label">Size</label>

            <input
              v-model="variant.size"
              type="text"
              placeholder="Size"
              class="form__input"
            />
          </div>

          <!-- Color -->
          <div class="form__group">
            <label class="form__label">Color</label>

            <input
              v-model="variant.color"
              type="text"
              placeholder="Color"
              class="form__input"
            />
          </div>

          <!-- Sleeves -->
          <div class="form__group">
            <label class="form__label">Sleeves</label>

            <select v-model="variant.sleeves" class="form__input">
              <option value="">Select</option>
              <option value="Half Sleeve">Half Sleeve</option>
              <option value="Full Sleeve">Full Sleeve</option>
            </select>
          </div>

          <!-- Type -->
          <div class="form__group">
            <label class="form__label">Type</label>

            <select v-model="variant.type" class="form__input">
              <option value="">Select</option>
              <option value="Home">Home</option>
              <option value="Away">Away</option>
            </select>
          </div>

          <!-- Price -->
          <div class="form__group">
            <label class="form__label">Price</label>

            <input
              v-model.number="variant.price"
              type="number"
              min="0"
              step="0.01"
              placeholder="Price"
              class="form__input"
            />
          </div>

          <!-- Stock -->
          <div class="form__group">
            <label class="form__label">Stock</label>

            <input
              v-model.number="variant.stock"
              type="number"
              min="0"
              placeholder="Stock"
              class="form__input"
            />
          </div>

          <!-- Remove -->
          <button
            v-if="form.variants.length > 1"
            type="button"
            @click="removeVariant(index)"
            class="flex h-10 items-center justify-center rounded-xl border border-red-200 text-red-500 transition hover:bg-red-50"
            title="Remove variant"
          >
            <UIcon name="i-lucide-trash-2" class="size-5" />
          </button>
        </div>

        <div class="flex justify-end pt-2">
          <BaseButton :loading="productStore.loading" @click="submit"
            >Save Variants</BaseButton
          >
        </div>
      </div>
    </div>
  </main>
</template>
