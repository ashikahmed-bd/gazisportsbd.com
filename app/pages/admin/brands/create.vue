<script setup>
definePageMeta({
  layout: "admin",
});

const form = reactive({
  name: "",
  slug: "",
  logo: null,
  country: "",
  meta_title: "",
  meta_keywords: "",
  meta_description: "",
  active: true,
});

const submit = () => {
  console.log(form);
  // API Call
};
</script>

<template>
  <main class="max-w-5xl mx-auto space-y-6">
    <!-- Header -->
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

    <!-- Form -->
    <form
      @submit.prevent="submit"
      class="rounded-xl border border-gray-200 bg-white p-6"
    >
      <div class="grid gap-6 md:grid-cols-2">
        <!-- Brand Name -->
        <div>
          <label class="mb-2 block text-sm font-medium"> Brand Name </label>

          <input
            v-model="form.name"
            type="text"
            class="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            placeholder="Nike"
          />
        </div>

        <!-- Slug -->
        <div>
          <label class="mb-2 block text-sm font-medium"> Slug </label>

          <input
            v-model="form.slug"
            type="text"
            class="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            placeholder="nike"
          />
        </div>

        <!-- Country -->
        <div>
          <label class="mb-2 block text-sm font-medium"> Country </label>

          <input
            v-model="form.country"
            type="text"
            class="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            placeholder="USA"
          />
        </div>

        <!-- Logo -->
        <div>
          <label class="mb-2 block text-sm font-medium"> Logo </label>

          <input
            type="file"
            accept="image/*"
            @change="form.logo = $event.target.files[0]"
            class="block w-full rounded-lg border border-gray-300 p-2 file:mr-4 file:rounded-md file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-white hover:file:bg-blue-700"
          />
        </div>
      </div>

      <!-- SEO -->
      <div class="mt-8 border-t pt-6">
        <h2 class="mb-4 text-lg font-semibold">SEO Information</h2>

        <div class="space-y-5">
          <div>
            <label class="mb-2 block text-sm font-medium"> Meta Title </label>

            <input
              v-model="form.meta_title"
              type="text"
              class="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label class="mb-2 block text-sm font-medium">
              Meta Keywords
            </label>

            <input
              v-model="form.meta_keywords"
              type="text"
              class="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
              placeholder="nike,sports,football"
            />
          </div>

          <div>
            <label class="mb-2 block text-sm font-medium">
              Meta Description
            </label>

            <textarea
              v-model="form.meta_description"
              rows="5"
              class="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      <!-- Status -->
      <div class="mt-8 flex items-center gap-3">
        <input
          id="active"
          v-model="form.active"
          type="checkbox"
          class="h-5 w-5"
        />

        <label for="active" class="text-sm font-medium"> Active </label>
      </div>

      <!-- Buttons -->
      <div class="mt-8 flex justify-end gap-3">
        <NuxtLink
          to="/admin/brands"
          class="rounded-lg border border-gray-300 px-5 py-3 hover:bg-gray-100"
        >
          Cancel
        </NuxtLink>

        <button
          type="submit"
          class="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
        >
          Save Brand
        </button>
      </div>
    </form>
  </main>
</template>
