<script setup>
definePageMeta({
  layout: "admin",
});

useSeoMeta({
  title: "Dashboard",
});

const appStore = useAppStore();
const { dashboard } = storeToRefs(appStore);

onMounted(async () => {
  await appStore.getDashboard();
});
</script>

<template>
  <main class="space-y-6">
    <div class="card">
      <div class="card__header">
        <div>
          <h1 class="text-2xl font-bold tracking-tight text-gray-900">
            Dashboard
          </h1>

          <p class="mt-1 text-sm text-gray-500">
            Overview of your store's performance and recent activities.
          </p>
        </div>
      </div>

      <div class="card__body space-y-6">
        <div class="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <div class="rounded-xl border border-border bg-white p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-500">Total Orders</p>
                <h2 class="mt-2 text-3xl font-bold">
                  {{ dashboard.stats?.total_orders }}
                </h2>
              </div>

              <div
                class="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 text-blue-600"
              >
                <UIcon name="i-lucide-package" class="h-7 w-7" />
              </div>
            </div>
          </div>

          <div class="rounded-xl border border-border bg-white p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-500">Revenue</p>
                <h2 class="mt-2 text-3xl font-bold">
                  ৳ {{ dashboard.stats?.revenue?.toLocaleString() }}
                </h2>
              </div>

              <div
                class="flex h-14 w-14 items-center justify-center rounded-xl bg-green-100 text-green-600"
              >
                <UIcon name="i-lucide-banknote" class="h-7 w-7" />
              </div>
            </div>
          </div>

          <div class="rounded-xl border border-border bg-white p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-500">Products</p>
                <h2 class="mt-2 text-3xl font-bold">
                  {{ dashboard.stats?.products }}
                </h2>
              </div>

              <div
                class="flex h-14 w-14 items-center justify-center rounded-xl bg-purple-100 text-purple-600"
              >
                <UIcon name="i-lucide-shopping-bag" class="h-7 w-7" />
              </div>
            </div>
          </div>

          <div class="rounded-xl border border-border bg-white p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-500">Customers</p>
                <h2 class="mt-2 text-3xl font-bold">
                  {{ dashboard.stats?.customers }}
                </h2>
              </div>

              <div
                class="flex h-14 w-14 items-center justify-center rounded-xl bg-orange-100 text-orange-600"
              >
                <UIcon name="i-lucide-users" class="h-7 w-7" />
              </div>
            </div>
          </div>
        </div>
        <div class="grid gap-6 lg:grid-cols-3">
          <div class="lg:col-span-2 rounded-xl border border-border bg-white">
            <div
              class="flex items-center justify-between border-b border-border px-6 py-4"
            >
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
                    v-for="order in dashboard.recent_orders"
                    :key="order.id"
                    class="hover:bg-gray-50"
                  >
                    <!-- Order No -->
                    <td class="px-6 py-4 font-medium">#{{ order.order_no }}</td>

                    <!-- Customer -->
                    <td class="px-6 py-4">
                      {{ order.name }}
                    </td>

                    <!-- Total -->
                    <td class="px-6 py-4 font-semibold">
                      ৳{{ Number(order.total).toLocaleString() }}
                    </td>

                    <!-- Status -->
                    <td class="px-6 py-4">
                      <span
                        :class="{
                          'bg-yellow-100 text-yellow-700':
                            order.status === 'pending',
                          'bg-blue-100 text-blue-700':
                            order.status === 'processing',
                          'bg-green-100 text-green-700':
                            order.status === 'completed',
                          'bg-red-100 text-red-700':
                            order.status === 'cancelled',
                        }"
                        class="inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize"
                      >
                        {{ order.status }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="space-y-6">
            <div class="rounded-xl border border-gray-200 bg-white">
              <div class="border-b border-border px-6 py-4">
                <h2 class="font-semibold">Low Stock Products</h2>
              </div>

              <div class="divide-y">
                <div
                  v-for="item in dashboard.lowStocks"
                  :key="item.id"
                  class="p-2.5"
                >
                  <h3 class="font-medium">
                    {{ item.name }}
                  </h3>
                  <span class="text-danger">{{ item.stock }} left</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
