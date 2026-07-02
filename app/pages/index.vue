<script setup>
const appStore = useAppStore();

const {
  data: home,
  pending,
  error,
  refresh,
} = await useAsyncData("home", async () => {
  return await appStore.getHome();
});

const instagram = [
  "https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/2385477/pexels-photo-2385477.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/2385477/pexels-photo-2385477.jpeg?auto=compress&cs=tinysrgb&w=400",
];
</script>

<template>
  <main>
    <template v-if="pending">
      <LoadingState />
    </template>
    <template v-else-if="error">
      <ErrorState :retry="refresh" />
    </template>
    <template v-else-if="home">
      <section class="relative overflow-hidden">
        <UCarousel
          v-slot="{ item }"
          :items="home?.banners"
          class="w-full mx-auto"
        >
          <NuxtImg
            :src="item.image_url"
            :alt="item.title"
            class="w-full h-full object-cover"
            loading="lazy"
          />
        </UCarousel>
      </section>

      <section class="py-6">
        <div class="max-w-7xl mx-auto px-4">
          <div class="bg-white rounded-2xl border border-gray-200">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              <div class="flex items-center gap-4 p-6 group">
                <div
                  class="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-white"
                >
                  <UIcon name="i-lucide-shirt" class="w-7 h-7" />
                </div>

                <div>
                  <h4 class="font-semibold text-gray-900">Premium Quality</h4>
                  <p class="mt-1 text-sm text-gray-500">
                    100% Original & High Quality
                  </p>
                </div>
              </div>

              <div class="flex items-center gap-4 p-6 group">
                <div
                  class="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-white"
                >
                  <UIcon name="i-lucide-truck" class="w-7 h-7" />
                </div>

                <div>
                  <h4 class="font-semibold text-gray-900">Free Shipping</h4>
                  <p class="mt-1 text-sm text-gray-500">On orders over ৳1999</p>
                </div>
              </div>

              <div class="flex items-center gap-4 p-6 group">
                <div
                  class="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-white"
                >
                  <UIcon name="i-lucide-refresh-ccw" class="w-7 h-7" />
                </div>

                <div>
                  <h4 class="font-semibold text-gray-900">Easy Returns</h4>
                  <p class="mt-1 text-sm text-gray-500">7 Days Return Policy</p>
                </div>
              </div>

              <div class="flex items-center gap-4 p-6 group">
                <div
                  class="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-white"
                >
                  <UIcon name="i-lucide-shield-check" class="w-7 h-7" />
                </div>

                <div>
                  <h4 class="font-semibold text-gray-900">Secure Payment</h4>
                  <p class="mt-1 text-sm text-gray-500">100% Secure Checkout</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="py-6 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4">
          <div class="flex items-center justify-between mb-6">
            <h2
              class="text-xl font-black uppercase tracking-wide text-gray-900"
            >
              Shop By Category
            </h2>

            <NuxtLink
              :to="{
                path: '/shop',
              }"
              class="text-primary text-sm font-semibold flex items-center gap-1 hover:underline"
            >
              View All

              <UIcon name="i-lucide-chevron-right" class="w-4 h-4" />
            </NuxtLink>
          </div>

          <UCarousel
            v-slot="{ item }"
            :items="home?.categories"
            loop
            wheel-gestures
            :autoplay="{ delay: 3000 }"
            :ui="{
              item: 'basis-1/2 md:basis-1/3 lg:basis-1/5',
            }"
          >
            <NuxtLink
              :to="{
                path: '/shop',
                query: {
                  category: item.slug,
                },
              }"
              class="relative block overflow-hidden rounded-2xl aspect-[4/5] bg-gray-100 shadow-sm transition-all duration-300 hover:shadow-xl"
            >
              <img
                :src="item.image_url"
                :alt="item.name"
                class="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-110"
              />

              <div
                class="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"
              />

              <div class="absolute inset-x-0 bottom-0 p-5">
                <h3
                  class="text-lg font-bold uppercase tracking-wide text-white line-clamp-2"
                >
                  {{ item.name }}
                </h3>

                <span
                  class="mt-2 inline-flex items-center gap-1 text-sm font-medium text-white/80 transition group-hover:text-primary"
                >
                  Shop Now
                  <UIcon
                    name="i-lucide-arrow-right"
                    class="h-4 w-4 transition-transform group-hover:translate-x-1"
                  />
                </span>
              </div>
            </NuxtLink>
          </UCarousel>
        </div>
      </section>

      <section class="bg-white py-6">
        <div class="max-w-7xl mx-auto px-4">
          <div class="mb-6 flex items-center justify-between">
            <h2
              class="text-xl font-black uppercase tracking-wide text-gray-900"
            >
              Featured Jerseys
            </h2>

            <NuxtLink
              to="/shop"
              class="flex items-center gap-1 text-sm font-semibold text-primary transition hover:underline"
            >
              View All

              <UIcon name="i-lucide-chevron-right" class="h-4 w-4" />
            </NuxtLink>
          </div>

          <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            <ProductCard
              v-for="product in home?.featured"
              :key="product.id"
              :product="product"
            />
          </div>
        </div>
      </section>

      <section class="py-12 bg-white">
        <div class="max-w-7xl mx-auto px-4">
          <div class="flex items-center justify-between mb-6">
            <h2
              class="text-xl font-black uppercase tracking-wide text-gray-900"
            >
              Trending Now
            </h2>
            <a
              href="/shop"
              class="text-red-600 text-sm font-semibold flex items-center gap-1 hover:underline"
            >
              View All
              <UIcon name="i-lucide-arrow-right" class="size-5" />
            </a>
          </div>
          <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            <ProductCard
              v-for="product in home?.trending"
              :key="product.id"
              :product="product"
            />
          </div>
        </div>
      </section>

      <section class="py-6 bg-white">
        <div class="max-w-7xl mx-auto px-4">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h2
                class="text-xl font-black uppercase tracking-wide text-gray-900"
              >
                Top Brands
              </h2>
              <p class="text-sm text-gray-500 mt-1">
                Official partners & popular sports brands
              </p>
            </div>
          </div>

          <UCarousel
            v-slot="{ item }"
            :items="home?.brands"
            loop
            wheel-gestures
            :autoplay="{ delay: 3000 }"
            :ui="{
              item: 'basis-1/2 md:basis-1/4 lg:basis-1/6',
            }"
          >
            <a
              href="#"
              class="group flex items-center justify-center rounded-xl border border-gray-100 bg-white p-3 transition"
            >
              <NuxtImg
                :src="item.logo_url"
                :alt="item.name"
                class="w-full object-contain grayscale group-hover:grayscale-0 transition"
              />
            </a>
          </UCarousel>
        </div>
      </section>

      <section class="py-6">
        <div class="max-w-7xl mx-auto px-4">
          <div class="flex items-center justify-between py-4">
            <div>
              <h2 class="text-xl font-black uppercase tracking-wide text-title">
                Top Leagues
              </h2>
              <p class="text-sm text-gray-500 mt-1">
                Explore official football leagues and their clubs
              </p>
            </div>
          </div>

          <UCarousel
            v-slot="{ item }"
            :items="home?.leagues"
            loop
            wheel-gestures
            :autoplay="{ delay: 3000 }"
            :ui="{
              item: 'basis-1/2 md:basis-1/4 lg:basis-1/6',
            }"
          >
            <div
              class="group cursor-pointer rounded-2xl border border-gray-100 bg-white p-4 text-center transition"
            >
              <div class="flex items-center justify-center mb-3">
                <NuxtImg
                  :src="item.logo_url"
                  :alt="item.name"
                  class="w-full object-cover transition group-hover:scale-110"
                />
              </div>

              <h3
                class="text-sm font-bold text-gray-900 uppercase tracking-wide"
              >
                {{ item.name }}
              </h3>
              <p class="mt-1 text-xs text-gray-500">
                {{ item.country }}
              </p>
            </div>
          </UCarousel>
        </div>
      </section>

      <section class="py-6">
        <div class="max-w-7xl mx-auto px-4">
          <div class="flex items-center justify-between py-4">
            <div>
              <h2 class="text-xl font-black uppercase tracking-wide text-title">
                Top Clubs
              </h2>
              <p class="text-sm text-gray-500 mt-1">
                Choose your favorite football teams and explore jerseys
              </p>
            </div>
          </div>
          <UCarousel
            v-slot="{ item }"
            :items="home?.clubs"
            loop
            wheel-gestures
            :autoplay="{ delay: 3000 }"
            :ui="{
              item: 'basis-1/2 md:basis-1/6 lg:basis-1/8',
            }"
          >
            <NuxtLink
              :to="`/clubs/${item.slug}`"
              class="group block rounded-2xl border border-gray-100 bg-white p-2.5 text-center transition"
            >
              <div class="flex items-center justify-center mb-3">
                <NuxtImg
                  :src="item.logo_url"
                  :alt="item.name"
                  class="w-full object-cover transition group-hover:scale-110"
                />
              </div>

              <h3
                class="text-sm font-bold uppercase tracking-wide text-title truncate"
              >
                {{ item.name }}
              </h3>

              <p v-if="item.country" class="mt-1 text-xs text-gray-500">
                {{ item.country }}
              </p>
              <p v-if="item.stadium" class="mt-1 text-[11px] text-gray-400">
                🏟 {{ item.stadium }}
              </p>
              <p v-if="item.founded_year" class="text-[11px] text-gray-400">
                Founded {{ item.founded_year }}
              </p>
            </NuxtLink>
          </UCarousel>
        </div>
      </section>

      <section class="bg-accent py-8">
        <div
          class="max-w-7xl mx-auto px-4 flex flex-col items-center justify-between gap-8 lg:flex-row"
        >
          <!-- Left -->
          <div class="flex items-center gap-4">
            <div
              class="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white/30"
            >
              <UIcon name="i-lucide-mail" class="h-6 w-6 text-white" />
            </div>

            <div>
              <h3 class="text-lg font-black uppercase text-white">
                Get The Latest Updates
              </h3>

              <p class="mt-1 max-w-sm text-sm text-white/80">
                Subscribe to get special offers, free giveaways and
                once-in-a-lifetime deals.
              </p>
            </div>
          </div>

          <form class="relative w-full max-w-xl">
            <input
              type="email"
              placeholder="Enter your email address..."
              class="h-12 w-full rounded-lg border border-white/20 bg-white pl-4 pr-32 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-white"
            />

            <button
              type="submit"
              class="absolute right-1 top-1 flex h-10 items-center gap-2 rounded-md bg-gray-900 px-4 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-black"
            >
              <UIcon name="i-lucide-send" class="h-4 w-4" />
              <span class="hidden md:inline">Subscribe</span>
            </button>
          </form>
        </div>
      </section>
    </template>

    <template v-else>
      <EmptyState />
    </template>
  </main>
</template>
