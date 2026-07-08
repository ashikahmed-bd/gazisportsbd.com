<script setup>
definePageMeta({
  layout: "admin",
});

const orders = ref([
  {
    id: 1,
    order_no: "ORD-100001",
    name: "John Doe",
    phone: "+8801712345678",
    city: "Dhaka",
    total: 2850,
    payment_method: "COD",
    status: "Pending",
    created_at: "07 Jul 2026",
  },
  {
    id: 2,
    order_no: "ORD-100002",
    name: "Rahim Uddin",
    phone: "+8801811122233",
    city: "Chattogram",
    total: 4650,
    payment_method: "SSLCommerz",
    status: "Completed",
    created_at: "06 Jul 2026",
  },
]);
</script>

<template>
  <main class="space-y-6">
    <!-- Header -->
    <div
      class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
    >
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Orders</h1>

        <p class="mt-1 text-sm text-gray-500">Manage customer orders.</p>
      </div>
    </div>

    <!-- Filters -->
    <div class="rounded-xl border border-gray-200 bg-white p-5">
      <div class="grid gap-4 lg:grid-cols-6">
        <input
          type="text"
          placeholder="Order No / Customer / Phone"
          class="rounded-lg border border-gray-300 px-4 py-2.5 focus:border-indigo-500 focus:outline-none"
        />

        <select class="rounded-lg border border-gray-300 px-4 py-2.5">
          <option>All Status</option>
          <option>Pending</option>
          <option>Processing</option>
          <option>Shipped</option>
          <option>Completed</option>
          <option>Cancelled</option>
        </select>

        <select class="rounded-lg border border-gray-300 px-4 py-2.5">
          <option>Payment Method</option>
          <option>COD</option>
          <option>SSLCommerz</option>
          <option>Stripe</option>
        </select>

        <input
          type="date"
          class="rounded-lg border border-gray-300 px-4 py-2.5"
        />

        <button class="rounded-lg bg-gray-900 py-2.5 text-white hover:bg-black">
          Search
        </button>
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div class="overflow-x-auto">
        <table class="min-w-full">
          <thead class="bg-gray-50">
            <tr class="text-left text-sm font-semibold text-gray-600">
              <th class="px-6 py-4">Order</th>
              <th class="px-6 py-4">Customer</th>
              <th class="px-6 py-4">Location</th>
              <th class="px-6 py-4">Amount</th>
              <th class="px-6 py-4">Payment</th>
              <th class="px-6 py-4">Status</th>
              <th class="px-6 py-4">Date</th>
              <th class="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody class="divide-y divide-gray-100">
            <tr
              v-for="order in orders"
              :key="order.id"
              class="hover:bg-gray-50"
            >
              <!-- Order -->
              <td class="px-6 py-4">
                <div>
                  <h3 class="font-semibold text-gray-900">
                    {{ order.order_no }}
                  </h3>

                  <p class="text-xs text-gray-500">#{{ order.id }}</p>
                </div>
              </td>

              <!-- Customer -->
              <td class="px-6 py-4">
                <div>
                  <h3 class="font-medium">
                    {{ order.name }}
                  </h3>

                  <p class="text-sm text-gray-500">
                    {{ order.phone }}
                  </p>
                </div>
              </td>

              <!-- City -->
              <td class="px-6 py-4">
                {{ order.city }}
              </td>

              <!-- Total -->
              <td class="px-6 py-4 font-semibold text-indigo-600">
                ৳ {{ order.total }}
              </td>

              <!-- Payment -->
              <td class="px-6 py-4">
                <span
                  class="rounded-lg bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700"
                >
                  {{ order.payment_method }}
                </span>
              </td>

              <!-- Status -->
              <td class="px-6 py-4">
                <span
                  :class="{
                    'bg-yellow-100 text-yellow-700': order.status === 'Pending',
                    'bg-blue-100 text-blue-700': order.status === 'Processing',
                    'bg-purple-100 text-purple-700': order.status === 'Shipped',
                    'bg-green-100 text-green-700': order.status === 'Completed',
                    'bg-red-100 text-red-700': order.status === 'Cancelled',
                  }"
                  class="rounded-full px-3 py-1 text-xs font-semibold"
                >
                  {{ order.status }}
                </span>
              </td>

              <!-- Date -->
              <td class="px-6 py-4 text-sm text-gray-500">
                {{ order.created_at }}
              </td>

              <!-- Actions -->
              <td class="px-6 py-4">
                <div class="flex justify-end gap-2">
                  <NuxtLink
                    :to="`/admin/orders/${order.id}`"
                    class="rounded-lg border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-100"
                  >
                    View
                  </NuxtLink>

                  <button
                    class="rounded-lg border border-indigo-200 px-3 py-1.5 text-sm text-indigo-600 hover:bg-indigo-50"
                  >
                    Invoice
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>
