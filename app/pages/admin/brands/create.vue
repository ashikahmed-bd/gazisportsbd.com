<script setup>
definePageMeta({
  layout: "admin",
});

const brandStore = useBrandStore();

const form = reactive({
  name: "",
  slug: "",
  logo_url: null,
  meta_title: "",
  meta_keywords: "",
  meta_description: "",
  active: true,
});

const submit = async () => {
  await brandStore.store(form);
  Object.assign(form, {
    name: "",
    slug: "",
    logo_url: null,
    meta_title: "",
    meta_keywords: "",
    meta_description: "",
    active: true,
  });
};

useSeoMeta({
  title: "Create Brands",
});
</script>

<template>
  <main class="max-w-5xl mx-auto space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Create Brand</h1>
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
          placeholder="Enter country"
          error=""
        />

        <BaseInput
          label="Meta Description"
          v-model="form.meta_description"
          placeholder="Enter country"
          error=""
        />

        <BaseInput
          label="Meta Keywords"
          v-model="form.meta_keywords"
          placeholder="Enter country"
          error=""
        />

        <BaseButton :loading="brandStore.loading">Submit</BaseButton>
      </form>
    </div>
  </main>
</template>
