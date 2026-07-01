<script setup>
const route = useRoute();
const cartStore = useCartStore();
const productStore = useProductStore();

const {
  data: product,
  pending,
  error,
  refresh,
} = await useAsyncData(
  `product-${route.params.slug}`,
  () => productStore.getProduct(route.params.slug),
  {
    watch: [() => route.params.slug],
  },
);

const selectedOptions = reactive({});

const addToCart = async (product) => {
  await cartStore.add({
    product_id: product.id,
    quantity: 1,
    options: { ...selectedOptions },
  });

  navigateTo("/cart");
};
</script>

<template>
  <main>
    <template v-if="pending">
      <LoadingState />
    </template>
    <template v-else-if="error">
      <ErrorState :retry="refresh" />
    </template>
    <template v-else-if="product">
      <div class="bg-gray-50">
        <div class="bg-white border-b border-gray-200">
          <div class="max-w-7xl mx-auto px-4 py-3 overflow-x-auto">
            <nav
              class="flex items-center gap-2 text-xs sm:text-sm text-gray-500 whitespace-nowrap"
            >
              <a href="#" class="hover:text-gray-800 transition-colors">Home</a>
              <span class="text-gray-300">&rsaquo;</span>
              <a href="#" class="hover:text-gray-800 transition-colors">{{
                product.category?.name
              }}</a>
              <span class="text-gray-300">&rsaquo;</span>
              <a href="#" class="hover:text-gray-800 transition-colors">{{
                product.club?.name
              }}</a>
              <span class="text-gray-300">&rsaquo;</span>
              <span class="text-gray-800 font-medium truncate max-w-none">{{
                product.name
              }}</span>
            </nav>
          </div>
        </div>

        <div class="max-w-7xl mx-auto px-4 py-6 sm:py-8">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10">
            <div class="w-full">
              <ProductGallery
                :images="
                  [product.cover_url, ...(product.gallery || [])].filter(
                    Boolean,
                  )
                "
              />
            </div>

            <div class="flex flex-col gap-4 sm:gap-5">
              <div class="block">
                <h1
                  class="text-xl sm:text-2xl font-bold text-title leading-snug"
                >
                  {{ product.name }}
                </h1>
                <p class="text-xs sm:text-sm text-body">
                  {{ product.brand?.name }} &middot; {{ product.club?.name }}
                </p>
              </div>

              <div class="flex items-center gap-3 flex-wrap">
                <span class="text-2xl sm:text-3xl font-bold text-body">
                  ৳{{ product.price }}
                </span>

                <span
                  v-if="product.has_discount"
                  class="text-lg text-gray-400 line-through"
                >
                  ৳{{ product.base_price }}
                </span>

                <span
                  v-if="product.has_discount"
                  class="bg-red-100 text-red-600 text-xs font-semibold px-2 py-1 rounded"
                >
                  -{{ product.discount_percentage }}%
                </span>

                <span
                  v-if="product.stock > 0"
                  class="bg-green-100 text-green-700 text-xs sm:text-sm font-semibold px-2 py-1 rounded"
                >
                  In Stock
                </span>

                <span
                  v-else
                  class="bg-red-100 text-red-700 text-xs sm:text-sm font-semibold px-2 py-1 rounded"
                >
                  Out of Stock
                </span>
              </div>

              <div
                v-if="product.highlights"
                class="text-xs sm:text-sm text-gray-600 leading-relaxed prose-ul:list-disc prose-ul:pl-5"
                v-html="product.highlights"
              />

              <div
                class="flex items-center gap-4 sm:gap-5 text-xs text-gray-500 flex-wrap"
              >
                <div class="flex items-center gap-1.5">
                  <svg
                    class="w-4 h-4 text-gray-400 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                  100% Original
                </div>
                <div class="flex items-center gap-1.5">
                  <svg
                    class="w-4 h-4 text-gray-400 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  7 Days Returns
                </div>
                <div class="flex items-center gap-1.5">
                  <svg
                    class="w-4 h-4 text-gray-400 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                    />
                  </svg>
                  Free Shipping over &#x0E3F;1999
                </div>
              </div>

              <div
                v-if="product.options && Object.keys(product.options).length"
                class="space-y-6"
              >
                <div v-for="(values, name) in product.options" :key="name">
                  <div class="flex items-center justify-between mb-3">
                    <span
                      class="text-xs font-semibold tracking-widest text-gray-500 uppercase"
                    >
                      Select {{ name }}
                    </span>
                  </div>

                  <div class="flex flex-wrap gap-2">
                    <button
                      v-for="value in values"
                      :key="value"
                      type="button"
                      @click="selectedOptions[name] = value"
                      :class="[
                        'px-4 py-2 rounded-lg border text-sm font-medium transition-all',
                        selectedOptions[name] === value
                          ? 'bg-gray-900 text-white border-gray-900'
                          : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400',
                      ]"
                    >
                      {{ value }}
                    </button>
                  </div>
                </div>
              </div>

              <div class="flex flex-col sm:flex-row gap-3">
                <button
                  @click="addToCart(product)"
                  :disabled="!product.in_stock"
                  class="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 active:bg-red-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl transition-colors shadow-sm"
                >
                  <svg
                    class="w-5 h-5 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  ADD TO CART
                </button>
                <button
                  :disabled="!product.in_stock"
                  class="flex-1 bg-gray-900 hover:bg-gray-800 active:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl transition-colors"
                >
                  BUY NOW
                </button>
              </div>
            </div>
          </div>

          <div
            v-if="product.description"
            class="mt-10 bg-white rounded-xl border border-gray-100 p-4 sm:p-6"
          >
            <h2 class="text-lg font-bold text-gray-900 mb-3">Description</h2>
            <div
              class="text-sm text-body leading-relaxed"
              v-html="product.description"
            />
          </div>

          <!-- You May Also Like -->
          <div v-if="false" class="mt-10">
            <div class="flex items-center justify-between mb-5">
              <h2 class="text-lg font-bold text-gray-900">You May Also Like</h2>
              <a
                href="#"
                class="text-sm font-medium text-red-600 hover:underline"
                >View all</a
              >
            </div>
            <div
              class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4"
            >
              <div
                v-for="related in relatedProducts"
                :key="related.name"
                class="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow group cursor-pointer"
              >
                <div class="relative aspect-square bg-gray-50 overflow-hidden">
                  <img
                    :src="related.img"
                    :alt="related.name"
                    class="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                  />
                  <button
                    class="absolute top-2 right-2 w-7 h-7 bg-white rounded-full shadow flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <svg
                      class="w-3.5 h-3.5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </button>
                </div>
                <div class="p-2.5 sm:p-3">
                  <p class="text-xs text-gray-500">{{ related.club }}</p>
                  <p
                    class="text-xs sm:text-sm font-semibold text-gray-800 mt-0.5 leading-tight"
                  >
                    {{ related.name }}
                  </p>
                  <div class="flex items-center gap-2 mt-2 flex-wrap">
                    <span class="text-sm font-bold text-gray-900">
                      &#x0E3F;{{ related.price.toLocaleString() }}
                    </span>
                    <span
                      v-if="related.original"
                      class="text-xs text-gray-400 line-through"
                    >
                      &#x0E3F;{{ related.original.toLocaleString() }}
                    </span>
                    <span
                      v-if="related.discount"
                      class="bg-red-100 text-red-600 text-xs font-medium px-1.5 py-0.5 rounded"
                    >
                      -{{ related.discount }}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <EmptyState />
    </template>
  </main>
</template>
