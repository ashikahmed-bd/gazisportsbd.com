<script setup>
definePageMeta({
  layout: "admin",
});

const toast = useToast();
const categoryStore = useCategoryStore();
const { categories } = storeToRefs(categoryStore);

const form = reactive({
  parent_id: null,
  name: "",
  slug: "",
  image_url: "",
  meta_title: "",
  meta_description: "",
  meta_keywords: "",
  active: true,
});

const submit = async () => {
  const response = await categoryStore.store(form);

  toast.add({
    title: response.message,
  });
};

onMounted(async () => {
  await categoryStore.search();
});
</script>

<template>
  <main class="card">
    <div class="card__header">
      <div class="block">
        <h1 class="text-2xl font-bold">Edit Category</h1>
        <p class="mt-1 text-sm text-gray-500">
          Update category information and SEO settings.
        </p>
      </div>
    </div>

    <div class="card__body">
      <form @submit.prevent="submit" class="max-w-xl">
        <div class="space-y-4">
          <BaseInput
            label="Name"
            v-model="form.name"
            placeholder="Club Jerseys"
          />

          <BaseInput
            label="Name"
            v-model="form.slug"
            placeholder="club-jerseys"
          />

          <BaseSelect
            label="Parent"
            v-model="form.parent_id"
            :items="
              (Array.isArray(categories)
                ? categories
                : categories?.data || []
              ).map((category) => ({
                label: category.name,
                id: category.id,
              }))
            "
          />

          <BaseInput
            label="Meta Title"
            v-model="form.meta_title"
            placeholder="club-jerseys"
          />

          <BaseInput
            label="Meta Description"
            v-model="form.meta_description"
            placeholder="Meta Description"
          />

          <BaseInput
            label="Meta Keywords"
            v-model="form.meta_keywords"
            placeholder="football, jersey, club"
          />

          <BaseSelect
            label="Active"
            v-model="form.active"
            :items="[
              {
                label: 'YES',
                id: true,
              },
              {
                label: 'No',
                id: false,
              },
            ]"
          />
        </div>
        <BaseButton :loading="categoryStore.loading">Submit</BaseButton>
      </form>
    </div>
  </main>
</template>
