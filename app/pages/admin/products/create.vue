<script setup>
definePageMeta({
  layout: "admin",
});

const toast = useToast();
const productStore = useProductStore();
const categoryStore = useCategoryStore();
const brandStore = useBrandStore();
const clubStore = useClubStore();

const { categories } = storeToRefs(categoryStore);
const { brands } = storeToRefs(brandStore);
const { clubs } = storeToRefs(clubStore);

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
  category_id: null,
  brand_id: null,
  club_id: null,

  name: "",
  slug: "",

  highlights: null,
  description: null,

  base_price: 0,
  price: 0,

  gender: "unisex",

  featured: true,
  active: true,

  meta_title: "",
  meta_keywords: "",
  meta_description: "",
});

const submit = async () => {
  const response = await productStore.store(form);
  toast.add({
    title: response.message,
  });

  navigateTo("/admin/products");
};

onMounted(() => {
  loadCategories();
  loadBrands();
  loadClubs();
});

useSeoMeta({
  title: "Create Product",
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

        <a
          href="/admin/products"
          class="bg-accent text-white rounded px-4 py-2"
        >
          Back
        </a>
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
                :required="true"
                placeholder="Enter name"
              />

              <BaseInput
                label="Slug"
                v-model="form.slug"
                error=""
                :required="true"
                placeholder="Enter slug"
              />

              <BaseTextarea
                label="Highlights"
                v-model="form.highlights"
                error=""
                :required="true"
                placeholder="Enter highlights"
                :rows="6"
              />

              <BaseEditor
                label="Description"
                v-model="form.description"
                error=""
                :required="true"
              />
            </div>

            <div class="w-full">
              <h2 class="mb-5 text-lg font-semibold">SEO</h2>

              <div class="space-y-5">
                <BaseInput
                  label="Meta Title"
                  v-model="form.meta_title"
                  error=""
                  :required="true"
                  placeholder="Meta Title"
                />

                <BaseTextarea
                  label="Meta Description"
                  v-model="form.meta_description"
                  error=""
                  :required="true"
                  placeholder="Meta Description"
                />

                <BaseInput
                  label="Meta Keywords"
                  v-model="form.meta_keywords"
                  error=""
                  :required="true"
                  placeholder="Meta Keywords"
                />
              </div>
            </div>
          </div>

          <div class="space-y-5">
            <h2 class="mb-3 text-lg font-semibold">Pricing</h2>

            <div class="block">
              <BaseInput
                type="number"
                label="Base Price"
                v-model="form.base_price"
                error=""
                placeholder="Base Price"
              />

              <BaseInput
                type="number"
                label="Selling Price"
                v-model="form.price"
                error=""
                placeholder="Selling Price"
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
                  categories.map((category) => ({
                    label: category.name,
                    id: category.id,
                  }))
                "
              />

              <BaseSelect
                label="Brands"
                v-model="form.brand_id"
                :items="
                  brands.map((brand) => ({
                    label: brand.name,
                    value: brand.id,
                  }))
                "
              />

              <BaseSelect
                label="Clubs"
                v-model="form.club_id"
                :items="
                  clubs.map((club) => ({
                    label: club.name,
                    value: club.id,
                  }))
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
                <BaseButton :loading="productStore.loading" class="w-full"
                  >Save Changes</BaseButton
                >
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>
