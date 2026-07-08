<script setup>
definePageMeta({
  layout: "admin",
});

const form = reactive({
  league_id: "",
  name: "",
  slug: "",
  logo: null,
  country: "",
  founded_year: "",
  stadium: "",
  sort_order: 0,
  status: true,
  meta_title: "",
  meta_keywords: "",
  meta_description: "",
});

const leagues = [
  { id: 1, name: "Premier League" },
  { id: 2, name: "La Liga" },
  { id: 3, name: "Serie A" },
];

const preview = ref(null);

const handleLogo = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  form.logo = file;
  preview.value = URL.createObjectURL(file);
};

const submit = () => {
  console.log(form);
};
</script>

<template>
  <main class="mx-auto max-w-6xl space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Create Club</h1>

        <p class="mt-1 text-sm text-gray-500">Add a new football club.</p>
      </div>

      <NuxtLink
        to="/admin/clubs"
        class="rounded-lg border border-gray-300 px-4 py-2 text-sm hover:bg-gray-100"
      >
        Back
      </NuxtLink>
    </div>

    <form
      @submit.prevent="submit"
      class="rounded-xl border border-gray-200 bg-white p-6"
    >
      <!-- Basic Information -->
      <h2 class="mb-5 text-lg font-semibold">Basic Information</h2>

      <div class="grid gap-6 md:grid-cols-2">
        <!-- League -->
        <div>
          <label class="mb-2 block text-sm font-medium"> League </label>

          <select
            v-model="form.league_id"
            class="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500"
          >
            <option value="">Select League</option>

            <option
              v-for="league in leagues"
              :key="league.id"
              :value="league.id"
            >
              {{ league.name }}
            </option>
          </select>
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

        <!-- Club Name -->
        <div>
          <label class="mb-2 block text-sm font-medium"> Club Name </label>

          <input
            v-model="form.name"
            type="text"
            placeholder="Manchester United"
            class="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500"
          />
        </div>

        <!-- Slug -->
        <div>
          <label class="mb-2 block text-sm font-medium"> Slug </label>

          <input
            v-model="form.slug"
            type="text"
            placeholder="manchester-united"
            class="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500"
          />
        </div>

        <!-- Founded -->
        <div>
          <label class="mb-2 block text-sm font-medium"> Founded Year </label>

          <input
            v-model="form.founded_year"
            type="number"
            placeholder="1878"
            class="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500"
          />
        </div>

        <!-- Stadium -->
        <div>
          <label class="mb-2 block text-sm font-medium"> Stadium </label>

          <input
            v-model="form.stadium"
            type="text"
            placeholder="Old Trafford"
            class="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500"
          />
        </div>

        <!-- Sort -->
        <div>
          <label class="mb-2 block text-sm font-medium"> Sort Order </label>

          <input
            v-model="form.sort_order"
            type="number"
            class="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500"
          />
        </div>

        <!-- Logo -->
        <div>
          <label class="mb-2 block text-sm font-medium"> Club Logo </label>

          <input
            type="file"
            accept="image/*"
            @change="handleLogo"
            class="block w-full rounded-lg border border-gray-300 p-2 file:mr-4 file:rounded-md file:border-0 file:bg-indigo-600 file:px-4 file:py-2 file:text-white hover:file:bg-indigo-700"
          />

          <img
            v-if="preview"
            :src="preview"
            class="mt-4 h-24 w-24 rounded-lg border object-cover"
          />
        </div>
      </div>

      <!-- SEO -->
      <div class="mt-10 border-t pt-8">
        <h2 class="mb-5 text-lg font-semibold">SEO Information</h2>

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
              placeholder="football,club,manchester"
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
          id="status"
          v-model="form.status"
          type="checkbox"
          class="h-5 w-5"
        />

        <label for="status" class="text-sm font-medium"> Active </label>
      </div>

      <!-- Buttons -->
      <div class="mt-10 flex justify-end gap-3">
        <NuxtLink
          to="/admin/clubs"
          class="rounded-lg border border-gray-300 px-5 py-3 hover:bg-gray-100"
        >
          Cancel
        </NuxtLink>

        <button
          type="submit"
          class="rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white hover:bg-indigo-700"
        >
          Save Club
        </button>
      </div>
    </form>
  </main>
</template>
