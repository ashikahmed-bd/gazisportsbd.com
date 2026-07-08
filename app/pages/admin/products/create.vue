<script setup>
definePageMeta({
  layout: "admin",
});

const productStore = useProductStore();

const form = reactive({
  category_id: "1",
  brand_id: "1",
  club_id: "1",

  name: "Real Madrid Home Jersey 2025/26",
  slug: "real-madrid-home-jersey-2025-26",

  highlights: `Official home jersey design
Breathable moisture-wicking fabric
Lightweight and comfortable fit
Premium heat-pressed club crest
Suitable for match day and casual wear`,

  description: `Support Real Madrid in style with the official-inspired 2025/26 Home Jersey. Crafted from lightweight, breathable fabric, this jersey keeps you cool and comfortable whether you're playing football or cheering from the stands. Featuring the iconic white design with premium detailing, it's perfect for every Madridista.`,

  options: [],
  base_price: "1800",
  price: "1500",
  stock: "100",

  gender: "unisex",

  featured: true,
  active: true,

  meta_title: "Real Madrid Home Jersey 2025/26 | Buyzin Sports",

  meta_keywords:
    "Real Madrid Jersey, Football Jersey, Soccer Jersey, Home Kit 2025, Adidas Jersey, Buyzin Sports",

  meta_description:
    "Buy the Real Madrid Home Jersey 2025/26 at the best price in Bangladesh. Premium quality football jersey with breathable fabric, available in all sizes.",
});

const addOption = () => {
  form.options.push({
    name: "",
    values: "",
  });
};

const removeOption = (index) => {
  form.options.splice(index, 1);
};

const submit = async () => {
  const payload = {
    ...form,
    options: Object.fromEntries(
      form.options
        .filter((item) => item.name)
        .map((item) => [
          item.name,
          item.values
            .split(",")
            .map((v) => v.trim())
            .filter(Boolean),
        ]),
    ),
  };

  await productStore.store(payload);
};
</script>

<template>
  <main class="space-y-6">
    <div class="card">
      <div class="card__header">
        <div class="block">
          <h1 class="text-2xl font-bold">Create Product</h1>
          <p class="text-sm text-gray-500">Add a new product.</p>
        </div>

        <NuxtLink
          to="/admin/products"
          class="bg-accent text-white rounded px-4 py-2"
        >
          Back
        </NuxtLink>
      </div>

      <div class="card__body">
        <form @submit.prevent="submit" class="grid gap-6 lg:grid-cols-3">
          <div class="space-y-6 lg:col-span-2">
            <h2 class="mb-3 text-lg font-semibold">Product Information</h2>
            <div class="w-full">
              <BaseInput
                label="Name"
                v-model="form.name"
                error=""
                placeholder="Enter name"
              />

              <BaseInput
                label="Slug"
                v-model="form.slug"
                error=""
                placeholder="Enter slug"
              />

              <BaseTextarea
                label="Highlights"
                v-model="form.highlights"
                error=""
                placeholder="Enter highlights"
                :rows="6"
              />

              <BaseTextarea
                label="Description"
                v-model="form.description"
                error=""
                placeholder="Enter description"
                :rows="8"
              />
              <div class="space-y-6">
                <div class="flex items-center justify-between">
                  <h2 class="text-lg font-semibold">Product Options</h2>

                  <button
                    type="button"
                    @click="addOption"
                    class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white hover:opacity-90"
                  >
                    <UIcon name="i-lucide-plus" class="h-5 w-5" />
                  </button>
                </div>

                <div
                  v-for="(option, index) in form.options"
                  :key="index"
                  class="rounded-xl border border-gray-200 bg-white p-4"
                >
                  <div class="flex flex-wrap items-end gap-4">
                    <div class="w-56">
                      <label
                        class="mb-2 block text-sm font-medium text-gray-700"
                      >
                        Name
                      </label>

                      <select
                        v-model="option.name"
                        class="h-10 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none transition focus:border-primary"
                      >
                        <option value="">Select Option</option>
                        <option value="size">Size</option>
                        <option value="color">Color</option>
                        <option value="material">Material</option>
                        <option value="fit">Fit</option>
                      </select>
                    </div>

                    <div class="min-w-0 flex-1">
                      <label
                        class="mb-2 block text-sm font-medium text-gray-700"
                      >
                        Options
                        <span class="text-xs text-gray-500">
                          Separate values with commas.
                        </span>
                      </label>

                      <input
                        v-model="option.values"
                        type="text"
                        placeholder="S, M, L, XL"
                        class="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none transition focus:border-primary"
                      />
                    </div>

                    <!-- Delete -->
                    <button
                      type="button"
                      @click="removeOption(index)"
                      class="flex h-10 w-10 shrink-0 self-end items-center justify-center rounded-lg border border-red-200 text-red-500 transition hover:bg-red-50"
                    >
                      <UIcon name="i-lucide-trash-2" class="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div class="w-full">
              <h2 class="mb-5 text-lg font-semibold">SEO</h2>

              <div class="space-y-5">
                <BaseInput
                  label="Meta Title"
                  v-model="form.meta_title"
                  error=""
                  placeholder="Meta Title"
                />

                <BaseTextarea
                  label="Meta Description"
                  v-model="form.meta_description"
                  error=""
                  placeholder="Meta Description"
                />

                <BaseInput
                  label="Meta Keywords"
                  v-model="form.meta_keywords"
                  error=""
                  placeholder="Meta Keywords"
                />
              </div>
            </div>
          </div>

          <div class="space-y-5">
            <h2 class="mb-3 text-lg font-semibold">Pricing</h2>

            <div class="block">
              <BaseInput
                label="Base Price"
                v-model="form.base_price"
                error=""
                placeholder="Base Price"
              />

              <BaseInput
                label="Selling Price"
                v-model="form.price"
                error=""
                placeholder="Selling Price"
              />

              <BaseInput
                label="Stock"
                v-model="form.stock"
                error=""
                placeholder="Stock"
              />

              <BaseSelect
                label="Gender"
                v-model="form.gender"
                :items="[
                  {
                    label: 'Men',
                    value: 'men',
                  },
                  {
                    label: 'Women',
                    value: 'women',
                  },
                  {
                    label: 'Kids',
                    value: 'kids',
                  },
                  {
                    label: 'Unisex',
                    value: 'unisex',
                  },
                ]"
              />

              <BaseSelect
                label="Categories"
                v-model="form.category_id"
                :items="[
                  {
                    label: 'Size',
                    value: '1',
                  },
                ]"
              />

              <BaseSelect
                label="Brands"
                v-model="form.brand_id"
                :items="[
                  {
                    label: 'Size',
                    value: '1',
                  },
                ]"
              />

              <BaseSelect
                label="Clubs"
                v-model="form.club_id"
                :items="[
                  {
                    label: 'Size',
                    value: '1',
                  },
                ]"
              />

              <div class="space-y-4">
                <label class="flex items-center gap-3">
                  <input v-model="form.featured" type="checkbox" />
                  Featured Product
                </label>

                <label class="flex items-center gap-3">
                  <input v-model="form.active" type="checkbox" />
                  Active Product
                </label>
              </div>

              <div class="mt-5">
                <BaseButton class="w-full">Save Changes</BaseButton>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>
