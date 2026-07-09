<script setup>
definePageMeta({
  layout: "admin",
});

const orderStore = useOrderStore();
const { orders } = storeToRefs(orderStore);

onMounted(async () => {
  await orderStore.all();
});
</script>

<template>
  <main class="space-y-6">
    <div class="card">
      <div class="card__header">
        <div>
          <h1 class="text-2xl font-bold tracking-tight text-gray-900">
            Orders
          </h1>

          <p class="mt-1 text-sm text-gray-500">Manage your store orders.</p>
        </div>

        <div class="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
          <div class="relative">
            <input
              type="text"
              placeholder="Search orders..."
              class="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 pr-10 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 sm:w-72"
            />

            <svg
              class="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <NuxtLink to="/admin/orders/create" class="base__button">
            Add Order
          </NuxtLink>
        </div>
      </div>

      <div class="card__body">
        <div class="overflow-x-auto rounded-xl border border-border">
          <table>
            <thead>
              <tr>
                <th>Order No</th>
                <th>Customer</th>
                <th>Phone</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Status</th>
                <th class="text-right">Action</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="order in orders.data" :key="order.id">
                <td>
                  <span class="font-semibold text-gray-900">
                    #{{ order.order_no }}
                  </span>
                </td>

                <td>
                  <div>
                    <p class="font-medium text-gray-900">
                      {{ order.name }}
                    </p>
                    <p class="text-xs text-gray-500">
                      {{ order.city }}, {{ order.state }}
                    </p>
                  </div>
                </td>

                <td>
                  {{ order.phone }}
                </td>

                <td>
                  <span class="font-semibold text-gray-900">
                    ৳{{ order.total }}
                  </span>
                </td>

                <td>
                  <span class="uppercase text-gray-700">
                    {{ order.payment_method }}
                  </span>
                </td>

                <td>
                  <span
                    class="rounded-full px-3 py-1 text-xs font-semibold capitalize"
                    :class="
                      order.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-700'
                        : order.status === 'processing'
                          ? 'bg-blue-100 text-blue-700'
                          : order.status === 'completed'
                            ? 'bg-green-100 text-green-700'
                            : order.status === 'cancelled'
                              ? 'bg-red-100 text-red-700'
                              : 'bg-gray-100 text-gray-700'
                    "
                  >
                    {{ order.status }}
                  </span>
                </td>

                <td>
                  <div class="flex justify-end gap-2">
                    <NuxtLink
                      :to="`/admin/orders/${order.order_no}/view`"
                      class="action__edit"
                    >
                      View
                    </NuxtLink>

                    <button class="action__delete">Delete</button>
                  </div>
                </td>
              </tr>

              <tr v-if="!orders.data || orders.data.length === 0">
                <td colspan="8" class="py-8 text-center text-gray-500">
                  No orders found.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </main>
</template>
