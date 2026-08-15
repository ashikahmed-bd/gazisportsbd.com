<script setup>
definePageMeta({
  layout: "admin",
});

const pageStore = usePageStore();
const { pages } = storeToRefs(pageStore);

const loadPages = async () => {
  await pageStore.all();
};

onMounted(() => {
  loadPages();
});

useSeoMeta({
  title: "All Pages",
});
</script>

<template>
  <main class="space-y-6">
    <div class="card">
      <div class="card__header">
        <div>
          <h1 class="text-2xl font-bold tracking-tight text-gray-900">Pages</h1>

          <p class="mt-1 text-sm text-gray-500">
            Manage website pages and their SEO content.
          </p>
        </div>
      </div>

      <div class="card__body">
        <div
          class="overflow-hidden overflow-x-auto rounded-xl border border-border"
        >
          <table class="min-w-full">
            <thead>
              <tr>
                <th>Page</th>
                <th>Slug</th>
                <th>Status</th>
                <th>Updated</th>
                <th class="text-right">Action</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="item in pages?.data" :key="item.id">
                <td>
                  <div class="flex items-center gap-3">
                    <div
                      class="flex size-10 items-center justify-center rounded-lg bg-primary/10"
                    >
                      <UIcon
                        name="i-lucide-file-text"
                        class="size-5 text-primary"
                      />
                    </div>

                    <div class="min-w-0">
                      <h3 class="truncate font-semibold text-gray-900">
                        {{ item.title }}
                      </h3>

                      <span class="text-xs text-gray-500">
                        Page #{{ item.id }}
                      </span>
                    </div>
                  </div>
                </td>

                <td>
                  <span
                    class="rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600"
                  >
                    /{{ item.slug }}
                  </span>
                </td>

                <td>
                  <span
                    class="rounded-full px-3 py-1 text-xs font-semibold"
                    :class="
                      item.active
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    "
                  >
                    {{ item.active ? "Active" : "Inactive" }}
                  </span>
                </td>

                <td>
                  <span class="text-sm text-gray-600">
                    {{ new Date(item.updated_at).toDateString() }}
                  </span>
                </td>

                <td>
                  <div class="flex justify-end gap-2">
                    <NuxtLink
                      :to="`/admin/pages/${item.slug}`"
                      class="action__edit"
                    >
                      Edit
                    </NuxtLink>
                  </div>
                </td>
              </tr>

              <tr v-if="!pages?.data?.length">
                <td colspan="6" class="py-12 text-center">
                  <div class="flex flex-col items-center">
                    <UIcon
                      name="i-lucide-file-x"
                      class="size-10 text-gray-300"
                    />

                    <h3 class="mt-3 font-semibold text-gray-700">
                      No pages found
                    </h3>

                    <p class="mt-1 text-sm text-gray-400">
                      Create your first page to get started.
                    </p>

                    <NuxtLink
                      to="/admin/pages/create"
                      class="mt-4 text-sm font-semibold text-primary hover:underline"
                    >
                      Create Page
                    </NuxtLink>
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
