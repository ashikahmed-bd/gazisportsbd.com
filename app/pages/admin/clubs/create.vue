<script setup>
definePageMeta({
  layout: "admin",
});

const leagueStore = useLeagueStore();
const clubStore = useClubStore();
const route = useRoute();

const { leagues } = storeToRefs(leagueStore);

const form = reactive({
  league_id: "",
  name: "",
  slug: "",
  country: "",
  founded_year: "",
  stadium: "",
  active: true,
  meta_title: "",
  meta_keywords: "",
  meta_description: "",
});

const submit = async () => {
  await clubStore.store(form);
};

const loadLeagues = async () => {
  await leagueStore.search("");
};

onMounted(() => {
  loadLeagues();
});

useSeoMeta({
  title: "Create Clubs",
});
</script>

<template>
  <main class="max-w-5xl mx-auto space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Update Club</h1>
        <p class="mt-1 text-sm text-gray-500">Add a new club to your store.</p>
      </div>

      <NuxtLink
        to="/admin/clubs"
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
        <div class="grid grid-cols-2 gap-4">
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

          <BaseInput
            label="Country"
            v-model="form.country"
            placeholder="Enter country"
            error=""
          />

          <BaseInput
            label="Stadium"
            v-model="form.stadium"
            placeholder="Enter stadium"
            error=""
          />
        </div>

        <div class="grid grid-cols-3 gap-4">
          <BaseInput
            label="Founded Year"
            v-model="form.founded_year"
            placeholder="Enter founded year"
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

          <BaseSelect
            label="League"
            v-model="form.league_id"
            :items="
              (leagues || []).map((item) => ({
                label: item.name,
                id: item.id,
              }))
            "
          />
        </div>

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

        <BaseButton :loading="clubStore.loading">Submit</BaseButton>
      </form>
    </div>
  </main>
</template>
