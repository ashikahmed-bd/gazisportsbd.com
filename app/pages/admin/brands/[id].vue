<script setup>
definePageMeta({
  layout: "admin",
});

const brandStore = useBrandStore();
const route = useRoute();

const form = reactive({
  name: "",
  slug: "",
  logo_url: null,
  meta_title: "",
  meta_keywords: "",
  meta_description: "",
  active: true,
});

const media = reactive({
  logo: null,
});

const logoUpload = async () => {
  if (!media.logo) return;

  const formData = new FormData();
  formData.append("logo", media.logo);

  await brandStore.logo(route.params.id, formData);
};

const loadBrand = async () => {
  const response = await brandStore.show(route.params.id);

  Object.assign(form, {
    name: response.name ?? "",
    slug: response.slug ?? "",
    logo_url: response.logo_url ?? null,
    meta_title: response.meta_title ?? "",
    meta_keywords: response.meta_keywords ?? "",
    meta_description: response.meta_description ?? "",
    active: response.active ?? true,
  });
};

const submit = async () => {
  await brandStore.update(route.params.id, form);
};

onMounted(() => {
  loadBrand();
});

useSeoMeta({
  title: "Edit Brands",
});
</script>

<template>
  <main class="max-w-5xl mx-auto space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Update Brand</h1>
        <p class="mt-1 text-sm text-gray-500">Add a new brand to your store.</p>
      </div>

      <NuxtLink
        to="/admin/brands"
        class="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-100"
      >
        Back
      </NuxtLink>
    </div>

    <div class="grid grid-cols-3 gap-4">
      <form
        @submit.prevent="submit"
        class="rounded-xl border border-gray-200 bg-white p-6 col-span-2"
      >
        <BaseInput
          label="Name"
          v-model="form.name"
          placeholder="Enter name"
          error=""
        />

        <BaseInput
          label="Slug"
          v-model="form.slug"
          placeholder="Enter slug"
          error=""
        />

        <BaseSelect
          label="Active"
          v-model="form.active"
          :items="[
            { label: 'Yes', id: true },
            { label: 'No', id: false },
          ]"
        />

        <BaseInput
          label="Meta Title"
          v-model="form.meta_title"
          placeholder="Enter meta title"
          error=""
        />

        <BaseInput
          label="Meta Description"
          v-model="form.meta_description"
          placeholder="Enter meta description"
          error=""
        />

        <BaseInput
          label="Meta Keywords"
          v-model="form.meta_keywords"
          placeholder="Enter meta keywords"
          error=""
        />

        <BaseButton :loading="brandStore.loading">Submit</BaseButton>
      </form>

      <form @submit.prevent="logoUpload">
        <BaseFile v-model="media.logo" label="Logo" />
        <BaseButton :loading="brandStore.loading" class="w-full">
          Upload
        </BaseButton>
      </form>
    </div>
  </main>
</template>
