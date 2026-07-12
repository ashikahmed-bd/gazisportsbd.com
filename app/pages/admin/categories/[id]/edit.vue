<script setup>
definePageMeta({
  layout: "admin",
});

const route = useRoute();
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

const loadCategory = async () => {
  const category = await categoryStore.show(route.params.id);

  Object.assign(form, {
    parent: category.parent,
    name: category.name,
    slug: category.slug,
    image_url: category.image_url,
    meta_title: category.meta_title,
    meta_description: category.meta_description,
    meta_keywords: category.meta_keywords,
    active: category.active,
  });
};

const loadCategories = async () => {
  await categoryStore.search();
};

const submit = async () => {
  await categoryStore.update(route.params.id, form);
};

const image = ref(null);

const imageUpload = async () => {
  const payload = new FormData();
  payload.append("image", image.value);

  await categoryStore.media(route.params.id, payload);
};

onMounted(() => {
  loadCategory();
  loadCategories();
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
      <div class="grid md:grid-cols-3 gap-8">
        <form @submit.prevent="submit" class="col-span-2">
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
                categories.map((category) => ({
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
          <BaseButton>Submit</BaseButton>
        </form>
        <form @submit.prevent="imageUpload">
          <BaseFile
            v-model="image"
            label="Image"
            accept="image/*"
            :preview="form.image_url"
            error=""
          />

          <BaseButton>Submit</BaseButton>
        </form>
      </div>
    </div>
  </main>
</template>
