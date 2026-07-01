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
        <span class="text-white">JERSEY10</span>
      </span>

      <div class="flex items-center gap-5">
        <NuxtLink to="/support" class="hover:text-primary"> Support </NuxtLink>

        <NuxtLink to="/track-order" class="hover:text-primary">
          Track Order
        </NuxtLink>

        <button class="hover:text-primary">EN</button>
      </div>
    </div>
  </div>

  <header class="sticky top-0 z-50 border-b border-border bg-white">
    <div class="max-w-7xl mx-auto flex h-18 items-center justify-between px-4">
      <a href="/" class="shrink-0">
        <NuxtImg src="/logo.png" class="h-10 w-auto" />
      </a>
      <nav class="hidden lg:flex items-center gap-5">
        <NuxtLink
          v-for="item in categories?.data"
          :key="item.slug"
          :to="{
            path: '/shop',
            query: { category: item.slug },
          }"
          class="text-sm font-medium transition hover:text-primary"
          :class="
            route.query.category === item.slug
              ? 'text-primary'
              : 'text-gray-700'
          "
        >
          {{ item.name }}
        </NuxtLink>
      </nav>

      <div class="flex items-center gap-4">
        <button class="hover:text-primary">
          <UIcon name="i-lucide-search" class="h-5 w-5" />
        </button>

        <a href="/auth/login" class="hidden sm:block hover:text-primary">
          <UIcon name="i-lucide-user" class="h-5 w-5" />
        </a>

        <a href="/cart" class="relative hover:text-primary">
          <UIcon name="i-lucide-shopping-cart" class="h-5 w-5" />

          <span
            class="absolute -right-2 -top-2 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white"
          >
            {{ cartStore.cart?.items_count ?? 0 }}
          </span>
        </a>

        <button class="lg:hidden" @click="mobileMenuOpen = !mobileMenuOpen">
          <UIcon
            :name="mobileMenuOpen ? 'i-lucide-x' : 'i-lucide-menu'"
            class="h-6 w-6"
          />
        </button>
      </div>
    </div>

    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="-translate-y-2 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="-translate-y-2 opacity-0"
    >
      <div
        v-if="mobileMenuOpen"
        class="lg:hidden border-t border-border bg-white"
      >
        <div class="px-4 py-4">
          <nav class="space-y-1">
            <NuxtLink
              v-for="item in categories?.data"
              :key="item.slug"
              :to="{
                path: '/shop',
                query: { category: item.slug },
              }"
              class="block rounded-lg px-3 py-2 text-sm font-medium transition hover:bg-gray-100"
              :class="
                route.query.category === item.slug
                  ? 'text-primary bg-primary/5'
                  : 'text-gray-700'
              "
            >
              {{ item.name }}
            </NuxtLink>
          </nav>
        </div>
      </div>
    </Transition>
  </header>
</template>
