<script setup>
const pageStore = usePageStore();

const {
  data: page,
  pending,
  error,
  refresh,
} = await useAsyncData("return-policy", () =>
  pageStore.getPage("return-policy"),
);
</script>

<template>
  <main class="min-h-screen bg-white">
    <section class="mx-auto max-w-5xl px-4 py-12">
      <LoadingState v-if="pending" />

      <ErrorState v-else-if="error" :retry="refresh" />

      <template v-else-if="page">
        <article>
          <h1
            class="text-3xl font-bold tracking-tight text-title sm:text-4xl py-4"
          >
            {{ page.title }}
          </h1>

          <MDC :value="page.content" class="max-w-none" />
        </article>
      </template>

      <EmptyState v-else />
    </section>
  </main>
</template>
