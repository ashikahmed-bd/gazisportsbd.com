<script setup>
const route = useRoute();
const cartStore = useCartStore();
const categoryStore = useCategoryStore();

const mobileMenuOpen = ref(false);

watch(
  () => route.fullPath,
  () => {
    mobileMenuOpen.value = false;
  },
);

const {
  data: categories,
  error,
  pending,
} = useAsyncData("categories", async () => {
  return categoryStore.getCategories();
});
</script>

<template>
  <div class="hidden md:block bg-accent text-white text-xs">
    <div class="max-w-7xl mx-auto flex h-10 items-center justify-between px-4">
      <span>Free Shipping on orders over ৳1999</span>
      <span class="font-semibold text-yellow-400">
        Get 10% OFF on your first order
        <span class="text-white">WELCOME20</span>
      </span>

      <div class="flex items-center gap-5">
        <NuxtLink to="/" class="hover:text-primary"> Support </NuxtLink>

        <NuxtLink to="/" class="hover:text-primary"> Track Order </NuxtLink>

        <button class="hover:text-primary">EN</button>
      </div>
    </div>
  </div>

  <header class="sticky top-0 z-50 border-b border-border bg-white">
    <div class="max-w-7xl mx-auto flex h-18 items-center justify-between px-4">
      <button
        type="button"
        class="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-primary transition-colors duration-200"
        @click="mobileMenuOpen = !mobileMenuOpen"
      >
        <UIcon
          :name="mobileMenuOpen ? 'i-lucide-x' : 'i-lucide-menu'"
          class="size-6"
        />
      </button>
      <a href="/" class="shrink-0">
        <NuxtImg src="/logo.png" class="h-10 w-auto" />
      </a>

      <nav class="hidden lg:flex items-center gap-6">
        <template v-for="item in categories?.data" :key="item.id">
          <UDropdownMenu
            v-if="item.children?.length"
            :items="[
              [
                {
                  label: 'All ' + item.name,
                  icon: 'i-lucide-folder',
                  to: {
                    path: '/shop',
                    query: {
                      category: item.slug,
                    },
                  },
                },
              ],
              item.children.map((child) => ({
                label: child.name,
                icon: 'i-lucide-tag',
                to: {
                  path: '/shop',
                  query: {
                    category: child.slug,
                  },
                },
              })),
            ]"
          >
            <UButton
              variant="link"
              color="neutral"
              trailing-icon="i-lucide-chevron-down"
              class="text-body"
            >
              {{ item.name }}
            </UButton>
          </UDropdownMenu>

          <NuxtLink
            v-else
            :to="{
              path: '/shop',
              query: {
                category: item.slug,
              },
            }"
            class="text-sm font-medium transition hover:text-primary"
            :class="
              route.query.category === item.slug ? 'text-primary' : 'text-body'
            "
          >
            {{ item.name }}
          </NuxtLink>
        </template>
      </nav>

      <div class="flex items-center gap-4">
        <button class="hover:text-primary">
          <UIcon name="i-lucide-search" class="h-5 w-5" />
        </button>
        <a href="/cart" class="relative hover:text-primary">
          <UIcon name="i-lucide-shopping-cart" class="h-5 w-5" />
          <span
            class="absolute -right-2 -top-2 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white"
          >
            {{ cartStore.cart?.items_count ?? 0 }}
          </span>
        </a>
        <a href="/auth/login" class="relative hover:text-primary">
          <UIcon name="i-lucide-user" class="h-5 w-5" />
        </a>
      </div>
    </div>

    <MobileNavigation
      :categories="categories"
      v-if="mobileMenuOpen"
      :open="mobileMenuOpen"
      @close="mobileMenuOpen = false"
    />
  </header>
</template>
