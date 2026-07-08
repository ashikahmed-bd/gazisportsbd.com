<script setup>
definePageMeta({
  layout: "admin",
});

const stats = [
  {
    title: "Total Orders",
    value: "1,248",
    color: "bg-blue-100 text-blue-600",
    icon: "📦",
  },
  {
    title: "Revenue",
    value: "৳ 4,85,250",
    color: "bg-green-100 text-green-600",
    icon: "💰",
  },
  {
    title: "Products",
    value: "325",
    color: "bg-purple-100 text-purple-600",
    icon: "🛍️",
  },
  {
    title: "Customers",
    value: "1,032",
    color: "bg-orange-100 text-orange-600",
    icon: "👥",
  },
];

const recentOrders = [
  {
    id: "ORD-1001",
    customer: "John Doe",
    total: "৳ 2,850",
    status: "Pending",
  },
  {
    id: "ORD-1002",
    customer: "Rahim Uddin",
    total: "৳ 4,200",
    status: "Completed",
  },
  {
    id: "ORD-1003",
    customer: "Alex Smith",
    total: "৳ 1,650",
    status: "Processing",
  },
];

const lowStocks = [
  {
    name: "Barcelona Home Jersey",
    stock: 2,
  },
  {
    name: "Liverpool Away Jersey",
    stock: 1,
  },
  {
    name: "Argentina Home Kit",
    stock: 0,
  },
];
</script>

<template>
  <main class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p class="mt-1 text-gray-500">
          Welcome back! Here's what's happening today.
        </p>
      </div>
    </div>

    <!-- Stats -->
    <div class="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      <div
        v-for="item in stats"
        :key="item.title"
        class="rounded-xl border border-gray-200 bg-white p-6"
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-500">
              {{ item.title }}
            </p>

            <h2 class="mt-2 text-3xl font-bold">
              {{ item.value }}
            </h2>
          </div>

          <div
            :class="item.color"
            class="flex h-14 w-14 items-center justify-center rounded-xl text-2xl"
          >
            {{ item.icon }}
          </div>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="grid gap-6 lg:grid-cols-3">
      <!-- Recent Orders -->
      <div class="lg:col-span-2 rounded-xl border border-gray-200 bg-white">
        <div class="flex items-center justify-between border-b px-6 py-4">
          <h2 class="font-semibold">Recent Orders</h2>

          <NuxtLink
            to="/admin/orders"
            class="text-sm text-indigo-600 hover:underline"
          >
            View All
          </NuxtLink>
        </div>

        <div class="overflow-x-auto">
          <table class="min-w-full">
            <thead class="bg-gray-50">
              <tr class="text-left text-sm text-gray-600">
                <th class="px-6 py-3">Order</th>
                <th class="px-6 py-3">Customer</th>
                <th class="px-6 py-3">Amount</th>
                <th class="px-6 py-3">Status</th>
              </tr>
            </thead>

            <tbody class="divide-y">
              <tr
                v-for="order in recentOrders"
                :key="order.id"
                class="hover:bg-gray-50"
              >
                <td class="px-6 py-4 font-medium">
                  {{ order.id }}
                </td>

                <td class="px-6 py-4">
                  {{ order.customer }}
                </td>

                <td class="px-6 py-4 font-semibold">
                  {{ order.total }}
                </td>

                <td class="px-6 py-4">
                  <span
                    :class="{
                      'bg-yellow-100 text-yellow-700':
                        order.status === 'Pending',
                      'bg-blue-100 text-blue-700':
                        order.status === 'Processing',
                      'bg-green-100 text-green-700':
                        order.status === 'Completed',
                    }"
                    class="rounded-full px-3 py-1 text-xs font-semibold"
                  >
                    {{ order.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Right Sidebar -->
      <div class="space-y-6">
        <!-- Low Stock -->
        <div class="rounded-xl border border-gray-200 bg-white">
          <div class="border-b px-6 py-4">
            <h2 class="font-semibold">Low Stock Products</h2>
          </div>

          <div class="divide-y">
            <div
              v-for="item in lowStocks"
              :key="item.name"
              class="flex items-center justify-between px-6 py-4"
            >
              <div>
                <p class="font-medium">
                  {{ item.name }}
                </p>

                <p class="text-sm text-gray-500">Remaining Stock</p>
              </div>

              <span
                class="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-600"
              >
                {{ item.stock }}
              </span>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="rounded-xl border border-gray-200 bg-white p-6">
          <h2 class="mb-4 font-semibold">Quick Actions</h2>

          <div class="grid gap-3">
            <NuxtLink
              to="/admin/products/create"
              class="rounded-lg border px-4 py-3 text-center hover:bg-gray-50"
            >
              + Add Product
            </NuxtLink>

            <NuxtLink
              to="/admin/orders"
              class="rounded-lg border px-4 py-3 text-center hover:bg-gray-50"
            >
              View Orders
            </NuxtLink>

            <NuxtLink
              to="/admin/categories"
              class="rounded-lg border px-4 py-3 text-center hover:bg-gray-50"
            >
              Manage Categories
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
