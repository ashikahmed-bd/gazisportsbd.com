<script setup>
definePageMeta({
  layout: "admin",
});

const route = useRoute();

const pageStore = usePageStore();
const { errors } = storeToRefs(pageStore);

const form = reactive({
  title: "",
  slug: "",
  content: "",
  meta_title: "",
  meta_description: "",
  meta_keywords: "",
  active: true,
});

const loadPage = async () => {
  const page = await pageStore.show(route.params.slug);

  form.title = page.title ?? "";
  form.slug = page.slug ?? "";
  form.content = page.content ?? "";
  form.meta_title = page.meta_title ?? "";
  form.meta_description = page.meta_description ?? "";
  form.meta_keywords = page.meta_keywords ?? "";
  form.active = Boolean(page.active);
};

const submit = async () => {
  await pageStore.update(route.params.slug, form);
};

onMounted(() => {
  loadPage();
});

useSeoMeta({
  title: "Update Pages",
});
</script>

<template>
  <main class="space-y-6">
    <div class="card">
      <div class="card__header">
        <div>
          <h1 class="text-2xl font-bold tracking-tight text-gray-900">
            Edit Page
          </h1>

          <p class="mt-1 text-sm text-gray-500">
            Update page content, SEO information and visibility.
          </p>
        </div>

        <NuxtLink to="/admin/pages" class="base__button">
          Back to Pages
        </NuxtLink>
      </div>

      <div class="card__body space-y-5">
        <form @submit.prevent="submit" class="space-y-6">
          <BaseInput
            label="Title"
            v-model="form.title"
            placeholder="Enter page title"
            :error="errors?.title"
          />

          <BaseInput
            label="Slug"
            v-model="form.slug"
            placeholder="Enter page slug"
            :error="errors?.slug"
          />

          <BaseEditor
            label="Content"
            v-model="form.content"
            placeholder="Enter page content"
            :error="errors?.content"
          />

          <div
            class="flex items-center justify-between rounded-xl border border-gray-200 p-4"
          >
            <div>
              <h3 class="text-sm font-semibold text-gray-900">Page Status</h3>

              <p class="mt-1 text-xs text-gray-500">
                Make this page visible on the website.
              </p>
            </div>

            <USwitch v-model="form.active" />
          </div>

          <div class="card__header">
            <div>
              <h2 class="text-lg font-semibold text-gray-900">SEO Settings</h2>

              <p class="mt-1 text-sm text-gray-500">
                Optimize this page for search engines.
              </p>
            </div>

            <UIcon name="i-lucide-search" class="size-5 text-gray-400" />
          </div>
          <div class="card__body space-y-5">
            <BaseInput
              label="Meta Title"
              v-model="form.meta_title"
              placeholder="Enter meta title"
              :error="errors?.meta_title"
            />

            <BaseInput
              label="Meta Description"
              v-model="form.meta_description"
              placeholder="Enter meta description"
              :error="errors?.meta_description"
            />

            <BaseInput
              label="Meta Keywords"
              v-model="form.meta_keywords"
              placeholder="Enter meta keywords"
              :error="errors?.meta_keywords"
            />
          </div>

          <BaseButton :loading="pageStore.loading">Save Changes</BaseButton>
        </form>
      </div>
    </div>
  </main>
</template>
