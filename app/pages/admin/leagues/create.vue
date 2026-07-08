<script setup>
definePageMeta({
  layout: "admin",
});

const form = reactive({
  brand_id: "",
  sport_id: "",
  country: "",
  name: "",
  slug: "",
  logo: null,
  meta_title: "",
  meta_keywords: "",
  meta_description: "",
  active: true,
});

const brands = [
  { id: 1, name: "Nike" },
  { id: 2, name: "Adidas" },
];

const sports = [
  { id: 1, name: "Football" },
  { id: 2, name: "Basketball" },
];

const submit = () => {
  console.log(form);
};
</script>

<template>
  <main class="mx-auto max-w-5xl space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Create League</h1>
        <p class="mt-1 text-sm text-gray-500">Add a new sports league.</p>
      </div>

      <NuxtLink
        to="/admin/leagues"
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
        <!-- Brand -->
        <div>
          <label class="mb-2 block text-sm font-medium"> Brand </label>

          <select
            v-model="form.brand_id"
            class="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500"
          >
            <option value="">Select Brand</option>

            <option v-for="brand in brands" :key="brand.id" :value="brand.id">
              {{ brand.name }}
            </option>
          </select>
        </div>

        <!-- Sport -->
        <div>
          <label class="mb-2 block text-sm font-medium"> Sport </label>

          <select
            v-model="form.sport_id"
            class="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500"
          >
            <option value="">Select Sport</option>

            <option v-for="sport in sports" :key="sport.id" :value="sport.id">
              {{ sport.name }}
            </option>
          </select>
        </div>

        <!-- League Name -->
        <div>
          <label class="mb-2 block text-sm font-medium"> League Name </label>

          <input
            v-model="form.name"
            type="text"
            placeholder="Premier League"
            class="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500"
          />
        </div>

        <!-- Slug -->
        <div>
          <label class="mb-2 block text-sm font-medium"> Slug </label>

          <input
            v-model="form.slug"
            type="text"
            placeholder="premier-league"
            class="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500"
          />
        </div>

        <!-- Country -->
        <div>
          <label class="mb-2 block text-sm font-medium"> Country </label>

          <input
            v-model="form.country"
            type="text"
            placeholder="England"
            class="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500"
          />
        </div>

        <!-- Logo -->
        <div>
          <label class="mb-2 block text-sm font-medium"> Logo </label>

          <input
            type="file"
            accept="image/*"
            @change="form.logo = $event.target.files[0]"
            class="block w-full rounded-lg border border-gray-300 p-2 file:mr-4 file:rounded-md file:border-0 file:bg-indigo-600 file:px-4 file:py-2 file:text-white hover:file:bg-indigo-700"
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
              class="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label class="mb-2 block text-sm font-medium">
              Meta Keywords
            </label>

            <input
              v-model="form.meta_keywords"
              type="text"
              placeholder="football,premier league,england"
              class="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label class="mb-2 block text-sm font-medium">
              Meta Description
            </label>

            <textarea
              v-model="form.meta_description"
              rows="5"
              class="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500"
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
          class="h-5 w-5 rounded"
        />

        <label for="active" class="text-sm font-medium"> Active </label>
      </div>

      <!-- Buttons -->
      <div class="mt-8 flex justify-end gap-3">
        <NuxtLink
          to="/admin/leagues"
          class="rounded-lg border border-gray-300 px-5 py-3 hover:bg-gray-100"
        >
          Cancel
        </NuxtLink>

        <button
          type="submit"
          class="rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white hover:bg-indigo-700"
        >
          Save League
        </button>
      </div>
    </form>
  </main>
</template>
