<script setup>
definePageMeta({
  layout: "admin",
});

const productStore = useProductStore();
const { products } = storeToRefs(productStore);

const loadProducts = async () => {
  await productStore.all();
};

onMounted(() => {
  loadProducts();
});
</script>

<template>
  <main class="space-y-6">
    <div class="card">
      <div class="card__header">
        <div>
          <h1 class="text-2xl font-bold tracking-tight text-gray-900">
            Products
          </h1>

          <p class="mt-1 text-sm text-gray-500">Manage your store products.</p>
        </div>

        <div class="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
          <div class="relative">
            <input
              type="text"
              placeholder="Search products..."
              class="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 pr-10 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 sm:w-72"
            />

            <svg
              class="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <NuxtLink to="/admin/products/create" class="base__button">
            Add Product
          </NuxtLink>
        </div>
      </div>

      <div class="card__body">
        <div class="rounded-xl border border-border overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Brand</th>
                <th>Price</th>
                <th>Status</th>
                <th class="text-right">Action</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="product in products.data" :key="product.id">
                <td class="truncate">
                  <div class="flex items-center gap-4">
                    <img
                      :src="product.cover_url"
                      class="size-12 rounded object-cover"
                    />

                    <div>
                      <h3 class="font-semibold text-title truncate">
                        {{ product.name }}
                      </h3>

                      <p class="text-xs text-gray-500">
                        {{ product.slug }}
                      </p>
                    </div>
                  </div>
                </td>

                <td>
                  {{ product.category?.name }}
                </td>
                <td>
                  {{ product.brand?.name }}
                </td>
                <td>
                  {{ product.price }}
                </td>
                <td>
                  <span
                    :class="
                      product.active
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    "
                    class="rounded-full px-3 py-1 text-xs font-semibold"
                  >
                    {{ product.active ? "Active" : "Inactive" }}
                  </span>
                </td>

                <td>
                  <div class="flex justify-end gap-2">
                    <NuxtLink
                      :to="`/admin/products/${product.id}`"
                      class="action__edit"
                      >Edit</NuxtLink
                    >
                    <button class="action__delete">Delete</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </main>
</template>
