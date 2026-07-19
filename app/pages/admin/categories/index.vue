<script setup>
definePageMeta({
  layout: "admin",
});

const categoryStore = useCategoryStore();
const { categories } = storeToRefs(categoryStore);

const loadCategories = async () => {
  await categoryStore.all();
};

const deleteCategory = async (category) => {
  await categoryStore.delete(category);
  await loadCategories();
};

onMounted(() => {
  loadCategories();
});
</script>

<template>
  <main class="space-y-6">
    <div class="card">
      <div class="card__header">
        <div>
          <h1 class="text-2xl font-bold tracking-tight text-gray-900">
            Categories
          </h1>

          <p class="mt-1 text-sm text-gray-500">
            Manage your product categories and their information.
          </p>
        </div>

        <div
          class="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between"
        >
          <div class="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
            <div class="relative">
              <input
                type="text"
                placeholder="Search categories..."
                class="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 pr-10 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 sm:w-72"
              />

              <UIcon
                name="i-lucide-search"
                class="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
              />
            </div>

            <NuxtLink to="/admin/categories/create" class="base__button">
              Add Category
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
                <th>Name</th>
                <th>Slug</th>
                <th>Parent</th>
                <th>Status</th>
                <th class="text-right">Action</th>
              </tr>
            </thead>

            <tbody>
              <template v-for="category in categories.data" :key="category.id">
                <tr class="border-b bg-white">
                  <td>
                    <NuxtImg
                      :src="category.image_url"
                      :alt="category.name"
                      class="size-12 rounded object-cover"
                    />
                  </td>

                  <td>
                    <h3 class="font-semibold text-gray-900">
                      {{ category.name }}
                    </h3>

                    <span
                      v-if="category.children?.length"
                      class="text-xs text-gray-500"
                    >
                      {{ category.children.length }} children
                    </span>
                  </td>

                  <td>{{ category.slug }}</td>

                  <td>
                    <span
                      class="rounded-md bg-gray-100 px-3 py-1 text-xs font-medium"
                    >
                      {{ category.parent?.name ?? "N/A" }}
                    </span>
                  </td>

                  <td>
                    <span
                      :class="
                        category.active
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      "
                      class="rounded-full px-3 py-1 text-xs font-semibold"
                    >
                      {{ category.active ? "Active" : "Inactive" }}
                    </span>
                  </td>

                  <td>
                    <div class="flex justify-end gap-2">
                      <NuxtLink
                        :to="`/admin/categories/${category.id}`"
                        class="action__edit"
                      >
                        Edit
                      </NuxtLink>

                      <button
                        class="action__delete"
                        @click="deleteCategory(category.id)"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>

                <tr
                  v-for="child in category.children || []"
                  :key="`child-${child.id}`"
                  class="border-b bg-gray-50"
                >
                  <td>
                    <div class="ml-6 flex items-center gap-2">
                      <UIcon
                        name="i-heroicons-arrow-turn-down-right"
                        class="size-4 shrink-0 text-gray-400"
                      />

                      <NuxtImg
                        :src="child.image_url"
                        :alt="child.name"
                        class="size-10 rounded object-cover"
                      />
                    </div>
                  </td>

                  <td>
                    <div class="pl-6">
                      <h3 class="font-medium text-gray-800">
                        {{ child.name }}
                      </h3>

                      <span class="text-xs text-gray-500">
                        Child category
                      </span>
                    </div>
                  </td>

                  <td>{{ child.slug }}</td>

                  <td>
                    <span
                      class="rounded-md bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700"
                    >
                      {{ category.name }}
                    </span>
                  </td>

                  <td>
                    <span
                      :class="
                        child.active
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      "
                      class="rounded-full px-3 py-1 text-xs font-semibold"
                    >
                      {{ child.active ? "Active" : "Inactive" }}
                    </span>
                  </td>

                  <td>
                    <div class="flex justify-end gap-2">
                      <NuxtLink
                        :to="`/admin/categories/${child.id}`"
                        class="action__edit"
                      >
                        Edit
                      </NuxtLink>

                      <button
                        class="action__delete"
                        @click="deleteCategory(child.id)"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </main>
</template>
