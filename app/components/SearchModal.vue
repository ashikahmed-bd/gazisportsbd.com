<script setup>
const shopStore = useShopStore();

const open = ref(false);
const search = ref("");
const products = ref([]);
const loading = ref(false);

let searchTimeout;

watch(search, (value) => {
  clearTimeout(searchTimeout);

  const keyword = value.trim();

  if (!keyword) {
    products.value = [];
    return;
  }

  searchTimeout = setTimeout(async () => {
    loading.value = true;

    try {
      const response = await shopStore.search(keyword);

      products.value = response?.data ?? [];
    } finally {
      loading.value = false;
    }
  }, 400);
});

const closeModal = () => {
  open.value = false;
  search.value = "";
  products.value = [];
  loading.value = false;

  clearTimeout(searchTimeout);
};

onBeforeUnmount(() => {
  clearTimeout(searchTimeout);
});
</script>

<template>
  <UModal
    v-model:open="open"
    title="Search"
    description="Search products"
    :ui="{
      content: 'w-full sm:max-w-2xl',
    }"
  >
    <!-- Search Button -->
    <UButton
      icon="i-lucide-search"
      color="neutral"
      variant="ghost"
      aria-label="Search"
    />

    <template #body>
      <div class="space-y-4">
        <!-- Search Input -->
        <div class="relative">
          <UIcon
            name="i-lucide-search"
            class="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-gray-400"
          />

          <input
            v-model="search"
            type="search"
            placeholder="Search products..."
            autofocus
            class="h-12 w-full rounded-lg border border-gray-300 pl-10 pr-4 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
          />
        </div>

        <!-- Loading -->
        <div v-if="loading" class="py-8 text-center">
          <UIcon
            name="i-lucide-loader-circle"
            class="size-6 animate-spin text-gray-400"
          />
        </div>

        <!-- Products -->
        <div
          v-else-if="products.length"
          class="max-h-96 divide-y divide-gray-100 overflow-y-auto"
        >
          <NuxtLink
            v-for="product in products"
            :key="product.id"
            :to="`/product/${product.slug}`"
            class="flex items-center gap-3 p-3 transition hover:bg-gray-50"
            @click="closeModal"
          >
            <!-- Product Image -->
            <NuxtImg
              :src="product.cover_url"
              :alt="product.name"
              class="size-14 shrink-0 rounded-lg object-cover"
            />

            <!-- Product Info -->
            <div class="min-w-0 flex-1">
              <p class="truncate font-medium text-gray-900">
                {{ product.name }}
              </p>

              <div class="mt-1 flex items-center gap-2">
                <!-- Current Price -->
                <span class="font-semibold text-gray-900">
                  ৳{{ product.price }}
                </span>

                <!-- Base Price -->
                <span
                  v-if="product.has_discount"
                  class="text-sm text-gray-400 line-through"
                >
                  ৳{{ product.base_price }}
                </span>

                <!-- Discount -->
                <span
                  v-if="product.has_discount"
                  class="text-xs font-medium text-red-500"
                >
                  -{{ product.discount_percentage }}%
                </span>
              </div>
            </div>

            <!-- Arrow -->
            <UIcon
              name="i-lucide-chevron-right"
              class="size-5 shrink-0 text-gray-400"
            />
          </NuxtLink>
        </div>

        <!-- No Results -->
        <div
          v-else-if="search.trim()"
          class="py-8 text-center text-sm text-gray-500"
        >
          No products found.
        </div>
      </div>
    </template>
  </UModal>
</template>
