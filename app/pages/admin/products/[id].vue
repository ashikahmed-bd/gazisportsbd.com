<script setup>
definePageMeta({
  layout: "admin",
});

const toast = useToast();
const route = useRoute();
const productStore = useProductStore();
const categoryStore = useCategoryStore();
const brandStore = useBrandStore();
const clubStore = useClubStore();

const { categories } = storeToRefs(categoryStore);
const { brands } = storeToRefs(brandStore);
const { clubs } = storeToRefs(clubStore);

const categoryItems = computed(() =>
  Array.isArray(categories.value)
    ? categories.value.map((category) => ({
        label: category.name,
        id: category.id,
      }))
    : [],
);

const loadCategories = async () => {
  await categoryStore.search();
};

const loadBrands = async () => {
  await brandStore.search();
};

const loadClubs = async () => {
  await clubStore.search();
};

const form = reactive({
  category_id: "",
  brand_id: "",
  club_id: "",

  name: "",
  slug: "",

  highlights: "",
  description: "",
  options: [],
  base_price: "",
  price: "",
  stock: "",

  gender: "",

  featured: true,
  active: true,

  meta_title: "",
  meta_keywords: "",
  meta_description: "",
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

  const response = await productStore.update(route.params.id, payload);

  toast.add({
    title: response.message,
  });
};

const media = reactive({
  cover: null,
  gallery: [],
});

const mediaUpload = async () => {
  const payload = new FormData();

  if (media.cover) {
    payload.append("cover", media.cover);
  }

  media.gallery.forEach((file) => {
    payload.append("gallery[]", file);
  });

  const response = await productStore.media(route.params.id, payload);

  toast.add({
    title: response.message,
  });

  loadProduct(route.params.id);
};

const loadProduct = async (id) => {
  const product = await productStore.show(id);

  console.log(product);

  form.category_id = product.category?.id ?? null;
  form.brand_id = product.brand?.id ?? null;
  form.club_id = product.club?.id ?? null;

  form.name = product.name ?? "";
  form.slug = product.slug ?? "";

  form.highlights = product.highlights ?? "";
  form.description = product.description ?? "";

  form.options = Object.entries(product.options ?? {}).map(
    ([name, values]) => ({
      name,
      values: Array.isArray(values) ? values.join(", ") : "",
    }),
  );

  form.base_price = product.base_price ?? null;
  form.price = product.price ?? null;
  form.stock = product.stock ?? null;
  form.gender = product.gender ?? null;
  form.meta_title = product.meta_title ?? "";
  form.meta_description = product.meta_description ?? "";
  form.meta_keywords = product.meta_keywords ?? "";
};

onMounted(async () => {
  loadProduct(route.params.id);
  loadCategories();
  loadBrands();
  loadClubs();
});
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
        <div class="grid gap-6 lg:grid-cols-3">
          <div class="space-y-6 lg:col-span-2">
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
                    id: 'men',
                  },
                  {
                    label: 'Women',
                    id: 'women',
                  },
                  {
                    label: 'Kids',
                    id: 'kids',
                  },
                  {
                    label: 'Unisex',
                    id: 'unisex',
                  },
                ]"
              />

              <BaseSelect
                label="Categories"
                v-model="form.category_id"
                :items="
                  (Array.isArray(categories)
                    ? categories
                    : categories?.data || []
                  ).map((category) => ({
                    label: category.name,
                    id: category.id,
                  }))
                "
              />

              <BaseSelect
                label="Brands"
                v-model="form.brand_id"
                :items="
                  (Array.isArray(brands) ? brands : brands?.data || []).map(
                    (brand) => ({
                      label: brand.name,
                      id: brand.id,
                    }),
                  )
                "
              />

              <BaseSelect
                label="Clubs"
                v-model="form.club_id"
                :items="
                  (Array.isArray(clubs) ? clubs : clubs?.data || []).map(
                    (club) => ({
                      label: club.name,
                      id: club.id,
                    }),
                  )
                "
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
                <BaseButton
                  @click.prevent="submit"
                  :loading="productStore.loading"
                  class="w-full"
                  >Save Changes</BaseButton
                >
              </div>
            </div>

            <div class="rounded-xl border border-border bg-white p-4">
              <div class="flex items-center justify-between py-2.5">
                <div>
                  <h2 class="text-lg font-semibold text-gray-900">
                    Product Images
                  </h2>
                  <p class="mt-1 text-sm text-gray-500">
                    Upload cover and gallery images for this product
                  </p>
                </div>
              </div>

              <div class="grid gap-6 lg:grid-cols-2">
                <div class="space-y-3">
                  <UFileUpload
                    v-model="media.cover"
                    icon="i-lucide-image"
                    label="Cover"
                    accept="image/*"
                    class="w-full"
                  />
                  <div
                    class="flex justify-center rounded border border-dashed border-border"
                  >
                    <img
                      :src="form.cover"
                      alt="Cover image"
                      class="w-full rounded bg-white object-cover"
                    />
                  </div>
                </div>

                <div class="space-y-3">
                  <UFileUpload
                    v-model="media.gallery"
                    multiple
                    label="Gallery"
                    icon="i-lucide-images"
                    accept="image/*"
                    class="w-full"
                  />

                  <div class="grid grid-cols-2 gap-2 rounded">
                    <img
                      v-for="(image, index) in form.gallery"
                      :key="index"
                      :src="image"
                      alt="Gallery image"
                      class="aspect-square w-full object-cover rounded border border-border border-dashed"
                    />
                  </div>
                </div>
              </div>

              <div class="mt-6 flex justify-end border-t border-border pt-4">
                <BaseButton
                  @click.prevent="mediaUpload"
                  :loading="productStore.loading"
                  class="min-w-40"
                >
                  Upload Media
                </BaseButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
