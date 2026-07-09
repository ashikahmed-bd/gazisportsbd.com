<script setup>
definePageMeta({
  layout: "admin",
});

const brandStore = useBrandStore();
const { brands } = storeToRefs(brandStore);

const loadBrands = async () => {
  await brandStore.all();
};

onMounted(() => {
  loadBrands();
});
</script>

<template>
  <main class="space-y-6">
    <div class="card">
      <div class="card__header">
        <div>
          <h1 class="text-2xl font-bold tracking-tight text-gray-900">
            Brands
          </h1>

          <p class="mt-1 text-sm text-gray-500">
            Manage your product brands and their information.
          </p>
        </div>

        <div
          class="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between"
        >
          <div class="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
            <div class="relative">
              <input
                type="text"
                placeholder="Search brands..."
                class="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 pr-10 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 sm:w-72"
              />

              <UIcon
                name="i-lucide-search"
                class="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
              />
            </div>

            <NuxtLink to="/admin/brands/create" class="base__button">
              <span class="text-lg">+</span>
              Add Brand
            </NuxtLink>
          </div>
        </div>
      </div>

      <div class="card__body">
        <div
          class="overflow-hidden rounded-xl border border-border overflow-x-auto"
        >
          <table>
            <thead>
              <tr>
                <th>Logo</th>
                <th>Brand</th>
                <th>Slug</th>
                <th>Country</th>
                <th>Status</th>
                <th>Created</th>
                <th class="text-right">Action</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="brand in brands.data" :key="brand.id">
                <td>
                  <NuxtImg
                    :src="brand.logo_url"
                    :alt="brand.name"
                    class="size-12 rounded object-cover"
                  />
                </td>

                <td>
                  <h3 class="font-semibold text-gray-900">
                    {{ brand.name }}
                  </h3>
                </td>
                <td>
                  <span
                    class="rounded-md bg-gray-100 px-3 py-1 text-xs font-medium"
                  >
                    {{ brand.slug }}
                  </span>
                </td>

                <td c>
                  {{ brand.country || "-" }}
                </td>
                <td>
                  <span
                    :class="
                      brand.active
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    "
                    class="rounded-full px-3 py-1 text-xs font-semibold"
                  >
                    {{ brand.active ? "Active" : "Inactive" }}
                  </span>
                </td>
                <td>
                  {{ brand.created_at }}
                </td>

                <td>
                  <div class="flex justify-end gap-2">
                    <button class="action__edit">Edit</button>
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
