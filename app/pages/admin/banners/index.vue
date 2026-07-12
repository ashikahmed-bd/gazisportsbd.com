<script setup>
definePageMeta({
  layout: "admin",
});

const bannerStore = useBannerStore();
const { banners } = storeToRefs(bannerStore);

onMounted(async () => {
  await bannerStore.all();
});
</script>

<template>
  <main class="space-y-6">
    <div class="card">
      <div class="card__header">
        <div>
          <h1 class="text-2xl font-bold tracking-tight text-gray-900">
            Banners
          </h1>

          <p class="mt-1 text-sm text-gray-500">
            Manage your banners and their information.
          </p>
        </div>

        <div
          class="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between"
        >
          <div class="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
            <div class="relative">
              <input
                type="text"
                placeholder="Search banners..."
                class="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 pr-10 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 sm:w-72"
              />

              <UIcon
                name="i-lucide-search"
                class="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
              />
            </div>

            <NuxtLink to="/admin/brands/create" class="base__button">
              Add Banner
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
                <th>Image</th>
                <th>Title</th>
                <th>Subtitle</th>
                <th>Status</th>
                <th class="text-right">Action</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="banner in banners.data" :key="banner.id">
                <td>
                  <NuxtImg
                    :src="banner.image_url"
                    :alt="banner.title"
                    class="h-14 w-auto rounded object-cover"
                  />
                </td>

                <td class="font-medium">
                  {{ banner.title }}
                </td>

                <td>
                  {{ banner.subtitle || "—" }}
                </td>

                <td>
                  <span
                    :class="
                      banner.active
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    "
                    class="inline-flex rounded-full px-3 py-1 text-xs font-medium"
                  >
                    {{ banner.active ? "Active" : "Inactive" }}
                  </span>
                </td>

                <td>
                  <div class="flex justify-end gap-2">
                    <NuxtLink
                      :to="`/admin/banners/${banner.id}/edit`"
                      class="action__edit"
                      >Edit</NuxtLink
                    >

                    <button
                      type="button"
                      class="action__delete"
                      @click="deleteBanner(banner.id)"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>

              <tr v-if="!banners.data?.length">
                <td colspan="10" class="py-8 text-center text-gray-500">
                  No banners found.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </main>
</template>
