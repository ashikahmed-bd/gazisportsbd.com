<script setup>
const sidebarOpen = ref(false);
const authStore = useAuthStore();
</script>

<template>
  <div class="bg-gray-100">
    <header
      class="fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between border-b border-border bg-white px-4"
    >
      <div class="flex items-center gap-3">
        <button class="lg:hidden" @click="sidebarOpen = !sidebarOpen">
          <UIcon
            :name="sidebarOpen ? 'i-heroicons-x-mark' : 'i-heroicons-bars-3'"
            class="h-7 w-7"
          />
        </button>
        <NuxtLink to="/admin/dashboard">
          <NuxtImg src="/logo.png" alt="logo" class="h-10" />
        </NuxtLink>
      </div>
      <div class="flex items-center gap-3">
        <NuxtImg
          :src="authStore.user?.photo_url || '/images/avatar.png'"
          :alt="authStore.user?.name"
          class="h-10 w-10 rounded-full border border-dashed object-cover"
        />

        <div class="min-w-0">
          <h3 class="truncate text-sm font-semibold text-gray-900">
            {{ authStore.user?.name }}
          </h3>

          <p class="text-xs capitalize text-gray-500">
            {{ authStore.user?.role }}
          </p>
        </div>
      </div>
    </header>

    <div class="flex pt-16">
      <aside
        :class="[
          'fixed left-0 top-16 z-50 h-[calc(100vh-4rem)] w-64 border-r border-border bg-white transition-transform duration-300',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full',
          'lg:translate-x-0',
        ]"
      >
        <div class="h-full overflow-y-auto p-4">
          <nav class="space-y-2">
            <NuxtLink
              to="/admin/dashboard"
              active-class="bg-gray-100 text-primary font-medium"
              class="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-gray-100"
            >
              <UIcon name="i-heroicons-home" class="h-5 w-5" />
              Dashboard
            </NuxtLink>

            <NuxtLink
              to="/admin/categories"
              active-class="bg-gray-100 text-primary font-medium"
              class="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-gray-100"
            >
              <UIcon name="i-heroicons-list-bullet" class="h-5 w-5" />
              Categories
            </NuxtLink>

            <NuxtLink
              to="/admin/brands"
              active-class="bg-gray-100 text-primary font-medium"
              class="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-gray-100"
            >
              <UIcon name="i-heroicons-tag" class="h-5 w-5" />
              Brands
            </NuxtLink>

            <NuxtLink
              to="/admin/leagues"
              active-class="bg-gray-100 text-primary font-medium"
              class="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-gray-100"
            >
              <UIcon name="i-heroicons-trophy" class="h-5 w-5" />
              Leagues
            </NuxtLink>

            <NuxtLink
              to="/admin/clubs"
              active-class="bg-gray-100 text-primary font-medium"
              class="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-gray-100"
            >
              <UIcon name="i-heroicons-building-storefront" class="h-5 w-5" />
              Clubs
            </NuxtLink>

            <NuxtLink
              to="/admin/products"
              active-class="bg-gray-100 text-primary font-medium"
              class="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-gray-100"
            >
              <UIcon name="i-heroicons-shopping-bag" class="h-5 w-5" />
              Products
            </NuxtLink>

            <NuxtLink
              to="/admin/orders"
              active-class="bg-gray-100 text-primary font-medium"
              class="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-gray-100"
            >
              <UIcon
                name="i-heroicons-clipboard-document-list"
                class="h-5 w-5"
              />
              Orders
            </NuxtLink>

            <NuxtLink
              to="/admin/settings"
              active-class="bg-gray-100 text-primary font-medium"
              class="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-gray-100"
            >
              <UIcon name="i-heroicons-cog-6-tooth" class="h-5 w-5" />
              Settings
            </NuxtLink>

            <button
              class="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-red-600 hover:bg-red-50"
            >
              <UIcon
                name="i-heroicons-arrow-right-on-rectangle"
                class="h-5 w-5"
              />
              Logout
            </button>
          </nav>
        </div>
      </aside>

      <main class="min-h-[calc(100vh-4rem)] min-w-0 flex-1 p-6 lg:ml-64">
        <slot />
      </main>
    </div>
  </div>
</template>
