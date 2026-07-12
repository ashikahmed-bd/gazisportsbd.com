<script setup>
definePageMeta({
  layout: "admin",
});

const route = useRoute();
const router = useRouter();

const bannerStore = useBannerStore();
const { banner, loading } = storeToRefs(bannerStore);

const form = reactive({
  title: "",
  subtitle: "",
  description: "",
  image_url: "",
  sort_order: 1,
  starts_at: "",
  ends_at: "",
  active: true,
});

const formatDate = (date) => {
  if (!date) return "";
  return date.split("T")[0];
};

onMounted(async () => {
  const response = await bannerStore.show(route.params.id);

  Object.assign(form, {
    title: response.title,
    subtitle: response.subtitle,
    description: response.description,
    image_url: response.image_url,
    sort_order: response.sort_order,
    starts_at: formatDate(response.starts_at),
    ends_at: formatDate(response.ends_at),
    active: response.active,
  });
});

const submit = async () => {
  await bannerStore.update(route.params.id, {
    ...form,
    starts_at: form.starts_at ? new Date(form.starts_at).toISOString() : null,
    ends_at: form.ends_at ? new Date(form.ends_at).toISOString() : null,
  });
};

const media = reactive({
  image: null,
});

const bannerUpload = async () => {
  const payload = new FormData();

  if (media.image) {
    payload.append("image", media.image);
  }

  await bannerStore.image(route.params.id, payload);
};
</script>

<template>
  <main class="bg-gray-50">
    <div class="p-6">
      <div class="mb-6 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Edit Banner</h1>
          <p class="mt-1 text-sm text-gray-500">Update banner information.</p>
        </div>

        <button
          @click="router.back()"
          class="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-100"
        >
          Back
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <form @submit.prevent="submit" class="rounded-2xl bg-white col-span-2">
          <div class="grid gap-6 p-8">
            <div>
              <label class="mb-2 block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                v-model="form.title"
                type="text"
                class="w-full rounded border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
                placeholder="Banner title"
              />
            </div>

            <div>
              <label class="mb-2 block text-sm font-medium text-gray-700">
                Subtitle
              </label>

              <input
                v-model="form.subtitle"
                type="text"
                class="w-full rounded border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
                placeholder="Banner subtitle"
              />
            </div>

            <div>
              <label class="mb-2 block text-sm font-medium text-gray-700">
                Description
              </label>

              <textarea
                v-model="form.description"
                rows="5"
                class="w-full rounded border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
                placeholder="Description"
              />
            </div>

            <div class="grid gap-6 md:grid-cols-2">
              <div>
                <label class="mb-2 block text-sm font-medium text-gray-700">
                  Starts At
                </label>

                <input
                  v-model="form.starts_at"
                  type="date"
                  class="w-full rounded border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label class="mb-2 block text-sm font-medium text-gray-700">
                  Ends At
                </label>

                <input
                  v-model="form.ends_at"
                  type="date"
                  class="w-full rounded border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div class="grid gap-6 md:grid-cols-2">
              <div>
                <label class="mb-2 block text-sm font-medium text-gray-700">
                  Sort Order
                </label>

                <input
                  v-model="form.sort_order"
                  type="number"
                  class="w-full rounded border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label class="mb-2 block text-sm font-medium text-gray-700">
                  Status
                </label>

                <select
                  v-model="form.active"
                  class="w-full rounded border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
                >
                  <option :value="true">Active</option>

                  <option :value="false">Inactive</option>
                </select>
              </div>
            </div>
          </div>

          <BaseButton :loading="bannerStore.loading">Submit</BaseButton>
        </form>

        <form @submit.prevent="bannerUpload" class="rounded-2xl bg-white">
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

            <div class="space-y-3">
              <UFileUpload
                v-model="media.image"
                icon="i-lucide-image"
                label="Cover"
                accept="image/*"
                class="w-full"
              />
              <div
                class="flex justify-center rounded border border-dashed border-border"
              >
                <NuxtImg
                  :src="form.image_url"
                  alt="Cover image"
                  class="w-full rounded bg-white object-cover"
                />
              </div>
              <BaseButton :loading="bannerStore.loading" class="w-full">
                Upload
              </BaseButton>
            </div>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>
