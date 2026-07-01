<script setup>
const route = useRoute();
const { $api } = useNuxtApp();

// ✅ filters form
const form = reactive({
  search: "",
  sort: "latest",
  page: 1,
  min_price: null,
  max_price: null,
});

// ✅ reset page when category changes
watch(
  () => route.query.category,
  () => {
    form.page = 1;
  },
);

// ✅ API fetch
const fetchProducts = () =>
  $api("/api/shop", {
    query: {
      category: route.query.category,
      search: form.search,
      sort: form.sort,
      page: form.page,
      min_price: form.min_price,
      max_price: form.max_price,
    },
  });

const {
  data: products,
  pending,
  error,
  refresh,
} = await useAsyncData("products", fetchProducts, {
  watch: [
    () => route.query.category,
    () => form.search,
    () => form.sort,
    () => form.page,
    () => form.min_price,
    () => form.max_price,
  ],
});
</script>

<template>
  <main class="bg-gray-50">
    <section class="py-10">
      <div class="max-w-7xl mx-auto px-4">
        <p class="text-sm text-gray-500">Home / Shop</p>
        <h1 class="mt-3 text-4xl font-bold text-gray-900">Shop</h1>
        <p class="mt-2 text-gray-500">
          Premium football jerseys with fast delivery.
        </p>
      </div>
    </section>

    <section class="max-w-7xl mx-auto px-4 py-6 bg-white">
      <div class="mb-6">
        <div
          class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
        >
          <div class="relative w-full lg:w-80">
            <UIcon
              name="i-heroicons-magnifying-glass"
              class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5"
            />

            <input
              v-model="form.search"
              type="text"
              placeholder="Search jerseys..."
              class="h-11 w-full rounded-xl bg-gray-50 pl-11 pr-4 text-sm outline-none focus:bg-white focus:ring-2 focus:ring-black/10 transition"
            />
          </div>

          <div
            class="flex flex-col gap-3 sm:flex-row sm:items-center w-full lg:w-auto"
          >
            <input
              v-model="form.min_price"
              type="number"
              placeholder="Min price"
              class="h-11 w-full sm:w-32 rounded-xl bg-gray-50 px-4 text-sm outline-none focus:bg-white focus:ring-2 focus:ring-black/10 transition"
            />

            <input
              v-model="form.max_price"
              type="number"
              placeholder="Max price"
              class="h-11 w-full sm:w-32 rounded-xl bg-gray-50 px-4 text-sm outline-none focus:bg-white focus:ring-2 focus:ring-black/10 transition"
            />

            <select
              v-model="form.sort"
              class="h-11 w-full sm:w-48 rounded-xl bg-gray-50 px-4 text-sm outline-none focus:bg-white focus:ring-2 focus:ring-black/10 transition"
            >
              <option value="latest">Newest</option>
              <option value="price_low">Price: Low → High</option>
              <option value="price_high">Price: High → Low</option>
              <option value="popular">Popular</option>
            </select>
          </div>
        </div>
      </div>
    </section>

    <LoadingState v-if="pending" />
    <ErrorState v-else-if="error" :retry="refresh" />

    <template v-else-if="products?.data?.length">
      <section class="max-w-7xl mx-auto px-4 py-6">
        <div class="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
          <ProductCard
            v-for="product in products.data"
            :key="product.id"
            :product="product"
          />
        </div>
      </section>
    </template>
    <EmptyState v-else />
  </main>
</template>
