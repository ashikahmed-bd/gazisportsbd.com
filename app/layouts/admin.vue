<script setup>
import { ref } from "vue";

const sidebarOpen = ref(false);

const menus = [
  {
    name: "Dashboard",
    icon: "i-heroicons-home",
    to: "/admin/dashboard",
  },
  {
    name: "Brands",
    icon: "i-heroicons-tag",
    to: "/admin/brands",
  },
  {
    name: "Leagues",
    icon: "i-heroicons-trophy",
    to: "/admin/leagues",
  },
  {
    name: "Clubs",
    icon: "i-heroicons-building-storefront",
    to: "/admin/clubs",
  },
  {
    name: "Products",
    icon: "i-heroicons-shopping-bag",
    to: "/admin/products",
  },
  {
    name: "Orders",
    icon: "i-heroicons-clipboard-document-list",
    to: "/admin/orders",
  },
];
</script>

<template>
  <div class="h-screen">
    <header
      class="sticky top-0 bg-white border-b border-border flex items-center justify-between px-4 py-3.5 z-50"
    >
      <div class="flex items-center gap-3">
        <button class="lg:hidden" @click="sidebarOpen = true">
          <UIcon name="i-heroicons-bars-3" class="w-7 h-7" />
        </button>

        <a href="/admin/dashboard">
          <NuxtImg src="/logo.png" alt="logo" class="h-10" />
        </a>
      </div>

      <div class="flex items-center gap-2">
        <div class="w-9 h-9 rounded-full bg-gray-300"></div>
      </div>
    </header>

    <Transition name="fade">
      <div
        v-if="sidebarOpen"
        class="fixed inset-0 bg-black/40 z-40 lg:hidden"
        @click="sidebarOpen = false"
      />
    </Transition>

    <aside
      :class="[
        'fixed top-16 z-40 left-0 h-[calc(100vh-4rem)] w-64 bg-white transition-transform duration-300',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full',
        'lg:translate-x-0',
      ]"
    >
      <div class="flex-1 overflow-y-auto p-4">
        <nav class="space-y-2">
          <NuxtLink
            href="/admin/dashboard"
            active-class="bg-gray-100 font-medium text-primary"
            class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100"
          >
            <UIcon name="i-heroicons-home" class="w-5 h-5" />
            Dashboard
          </NuxtLink>

          <NuxtLink
            href="/admin/brands"
            active-class="bg-gray-100 font-medium text-primary"
            class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100"
          >
            <UIcon name="i-heroicons-tag" class="w-5 h-5" />
            Brands
          </NuxtLink>

          <NuxtLink
            href="/admin/leagues"
            active-class="bg-gray-100 font-medium text-primary"
            class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100"
          >
            <UIcon name="i-heroicons-trophy" class="w-5 h-5" />
            Leagues
          </NuxtLink>

          <NuxtLink
            href="/admin/clubs"
            active-class="bg-gray-100 font-medium text-primary"
            class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100"
          >
            <UIcon name="i-heroicons-building-storefront" class="w-5 h-5" />
            Clubs
          </NuxtLink>

          <NuxtLink
            href="/admin/products"
            active-class="bg-gray-100 font-medium text-primary"
            class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100"
          >
            <UIcon name="i-heroicons-shopping-bag" class="w-5 h-5" />
            Products
          </NuxtLink>

          <NuxtLink
            href="/admin/orders"
            active-class="bg-gray-100 font-medium text-primary"
            class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100"
          >
            <UIcon name="i-heroicons-clipboard-document-list" class="w-5 h-5" />
            Orders
          </NuxtLink>

          <NuxtLink
            to="/admin/settings"
            active-class="bg-gray-100 font-medium text-primary"
            class="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-gray-100 transition"
          >
            <UIcon name="i-heroicons-cog-6-tooth" class="w-5 h-5" />
            Settings
          </NuxtLink>

          <button
            class="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-red-600 hover:bg-red-50 transition"
          >
            <UIcon
              name="i-heroicons-arrow-right-on-rectangle"
              class="w-5 h-5"
            />
            Logout
          </button>
        </nav>
      </div>
    </aside>

    <div class="bg-gray-100 lg:ml-64 overflow-y-auto p-6">
      <slot />
    </div>
  </div>
</template>

<style scoped></style>
