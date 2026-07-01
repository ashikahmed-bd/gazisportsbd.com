<script setup>
const stats = [
  { title: "Total Sales", value: "$12,450", icon: "💰", change: "+12%" },
  { title: "Products", value: "320", icon: "📦", change: "+5%" },
  { title: "Orders", value: "1,240", icon: "🛒", change: "+18%" },
  { title: "Users", value: "850", icon: "👤", change: "+7%" },
];

const orders = [
  { id: 1, name: "Real Madrid Jersey", price: "$120", status: "Paid" },
  { id: 2, name: "Barcelona Jersey", price: "$95", status: "Pending" },
  { id: 3, name: "Man United Jersey", price: "$110", status: "Paid" },
];
</script>

<template>
  <div class="bg-gray-100">
    <header
      class="bg-white border-b border-border px-6 py-4 flex justify-between items-center sticky top-0 z-50"
    >
      <a href="/admin/dashboard">
        <NuxtImg src="/logo.png" alt="logo" class="h-10" />
      </a>

      <div class="flex items-center gap-2">
        <div class="w-9 h-9 bg-gray-300 rounded-full"></div>
      </div>
    </header>

    <div class="flex bg-gray-100">
      <aside class="w-64 bg-white flex flex-col sticky top-0">
        <div class="p-4 flex-1 overflow-y-auto">
          <nav class="space-y-2">
            <a
              href="/admin/dashboard"
              class="flex items-center gap-3 px-3 py-2 rounded-lg bg-gray-100 font-medium"
            >
              <UIcon name="i-heroicons-home" class="w-5 h-5" />
              Dashboard
            </a>

            <a
              href="/admin/brands"
              class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100"
            >
              <UIcon name="i-heroicons-tag" class="w-5 h-5" />
              Brands
            </a>

            <a
              href="/admin/leagues"
              class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100"
            >
              <UIcon name="i-heroicons-trophy" class="w-5 h-5" />
              Leagues
            </a>

            <a
              href="/admin/clubs"
              class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100"
            >
              <UIcon name="i-heroicons-building-storefront" class="w-5 h-5" />
              Clubs
            </a>

            <a
              href="/admin/products"
              class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100"
            >
              <UIcon name="i-heroicons-shopping-bag" class="w-5 h-5" />
              Products
            </a>

            <a
              href="/admin/orders"
              class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100"
            >
              <UIcon
                name="i-heroicons-clipboard-document-list"
                class="w-5 h-5"
              />
              Orders
            </a>
          </nav>
        </div>

        <div class="p-4 border-t border-border space-y-2">
          <a
            href="/admin/settings"
            class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100"
          >
            <UIcon name="i-heroicons-cog-6-tooth" class="w-5 h-5" />
            Settings
          </a>

          <button
            class="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-50 text-red-600"
          >
            <UIcon
              name="i-heroicons-arrow-right-on-rectangle"
              class="w-5 h-5"
            />
            Logout
          </button>
        </div>
      </aside>

      <!-- MAIN CONTENT -->
      <main class="flex-1 p-6 space-y-6 overflow-y-auto">
        <!-- Stats -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div
            v-for="s in stats"
            :key="s.title"
            class="bg-white p-5 rounded-xl shadow flex items-center justify-between"
          >
            <div>
              <p class="text-gray-500 text-sm">{{ s.title }}</p>
              <h3 class="text-2xl font-bold">{{ s.value }}</h3>
              <p class="text-green-500 text-sm">{{ s.change }}</p>
            </div>
            <div class="text-3xl">{{ s.icon }}</div>
          </div>
        </div>

        <!-- Table -->
        <div class="bg-white rounded-xl shadow p-5">
          <h3 class="text-lg font-bold mb-4">Recent Orders</h3>

          <table class="w-full text-left">
            <thead>
              <tr class="text-gray-500 border-b">
                <th class="py-2">ID</th>
                <th>Product</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="o in orders"
                :key="o.id"
                class="border-b hover:bg-gray-50"
              >
                <td class="py-2">{{ o.id }}</td>
                <td>{{ o.name }}</td>
                <td>{{ o.price }}</td>
                <td>
                  <span
                    :class="
                      o.status === 'Paid'
                        ? 'text-green-600 font-semibold'
                        : 'text-yellow-600 font-semibold'
                    "
                  >
                    {{ o.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  </div>
</template>
