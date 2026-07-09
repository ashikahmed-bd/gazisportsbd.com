<script setup>
definePageMeta({
  layout: "admin",
});

const toast = useToast();
const route = useRoute();
const orderStore = useOrderStore();
const { order } = storeToRefs(orderStore);

const form = reactive({
  status: order.value?.status ?? "pending",
});

const updateStatus = async () => {
  const response = await orderStore.update(route.params.id, form.status);

  toast.add({
    title: response.message,
  });
};

onMounted(async () => {
  await orderStore.show(route.params.id);
});
</script>

<template>
  <main class="space-y-6">
    <div class="card">
      <div class="card__header">
        <div>
          <h1 class="text-2xl font-bold tracking-tight text-title">
            Order #{{ order.order_no }}
          </h1>

          <p class="mt-1 text-sm text-gray-500">Manage your store orders.</p>
        </div>
      </div>

      <div class="card__body">
        <div class="grid lg:grid-cols-3 gap-4">
          <div class="space-y-4 lg:col-span-2">
            <div class="rounded-xl border border-border bg-white">
              <div class="border-b border-border p-5">
                <h2 class="text-lg font-semibold">Ordered Products</h2>
              </div>

              <div class="overflow-x-auto">
                <table class="min-w-full">
                  <thead class="bg-gray-50">
                    <tr>
                      <th class="px-6 py-4 text-left">Product</th>
                      <th class="px-6 py-4 text-center">Qty</th>
                      <th class="px-6 py-4 text-right">Price</th>
                      <th class="px-6 py-4 text-right">Total</th>
                    </tr>
                  </thead>

                  <tbody class="divide-y">
                    <tr v-for="item in order.items" :key="item.id">
                      <td class="px-6 py-4">
                        <div class="flex items-center gap-4">
                          <NuxtImg
                            :src="item.cover_url"
                            :alt="item.name"
                            class="size-14 rounded object-cover"
                          />
                          <div>
                            <h3 class="font-semibold">
                              {{ item.name }}
                            </h3>

                            <div v-if="item.options">
                              <p
                                v-for="(value, key) in item.options"
                                :key="key"
                                class="text-sm text-gray-500 capitalize"
                              >
                                {{ key }}: {{ value }}
                              </p>
                            </div>
                          </div>
                        </div>
                      </td>

                      <td class="px-6 py-4 text-center">
                        {{ item.quantity }}
                      </td>

                      <td class="px-6 py-4 text-right">৳ {{ item.price }}</td>

                      <td class="px-6 py-4 text-right font-semibold">
                        ৳ {{ item.price * item.quantity }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div class="rounded-2xl border border-border bg-white p-5">
              <div
                class="flex items-center justify-between border-b border-gray-100 pb-4"
              >
                <h2 class="text-lg font-semibold text-gray-900">
                  Customer Information
                </h2>

                <div
                  class="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary"
                >
                  <UIcon name="i-lucide-user" class="h-5 w-5" />
                </div>
              </div>

              <div class="space-y-4 text-sm">
                <div class="grid gap-3 sm:grid-cols-2">
                  <div class="rounded-xl bg-gray-50 p-4">
                    <p
                      class="mb-1 text-xs font-medium uppercase tracking-wide text-gray-500"
                    >
                      Name
                    </p>
                    <p class="font-semibold text-gray-900">
                      {{ order.name }}
                    </p>
                  </div>

                  <div class="rounded-xl bg-gray-50 p-4">
                    <p
                      class="mb-1 text-xs font-medium uppercase tracking-wide text-gray-500"
                    >
                      Phone
                    </p>
                    <p class="font-semibold text-gray-900">
                      {{ order.phone }}
                    </p>
                  </div>
                </div>

                <div class="rounded-xl bg-gray-50 p-4">
                  <div class="mb-2 flex items-center gap-2">
                    <UIcon
                      name="i-lucide-map-pin"
                      class="h-4 w-4 text-gray-500"
                    />
                    <p
                      class="text-xs font-medium uppercase tracking-wide text-gray-500"
                    >
                      Shipping Address
                    </p>
                  </div>

                  <p class="leading-6 text-gray-700">
                    {{ order.address }}, {{ order.city }}, {{ order.state }},
                    {{ order.postcode }},
                    {{ order.country }}
                  </p>
                </div>

                <div class="rounded-xl bg-gray-50 p-4">
                  <div class="mb-2 flex items-center gap-2">
                    <UIcon
                      name="i-lucide-sticky-note"
                      class="h-4 w-4 text-gray-500"
                    />
                    <p
                      class="text-xs font-medium uppercase tracking-wide text-gray-500"
                    >
                      Customer Note
                    </p>
                  </div>

                  <p class="leading-6 text-gray-700">
                    {{ order.note ?? "No note provided." }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="space-y-4">
            <div class="rounded-xl border border-border bg-white p-5">
              <h2 class="mb-5 text-lg font-semibold">Order Information</h2>
              <div class="space-y-3 text-sm">
                <div class="flex justify-between">
                  <span>Order No</span>
                  <strong>{{ order.order_no }}</strong>
                </div>

                <div class="flex justify-between">
                  <span>Payment</span>
                  <span
                    class="rounded bg-blue-100 px-2 py-1 text-xs text-blue-700"
                  >
                    {{ order.payment_method }}
                  </span>
                </div>

                <div class="flex justify-between">
                  <span>Status</span>
                  <span
                    class="rounded px-2 py-1 text-xs capitalize"
                    :class="{
                      'bg-yellow-100 text-yellow-700':
                        order.status === 'pending',
                      'bg-blue-100 text-blue-700':
                        order.status === 'processing',
                      'bg-green-100 text-green-700':
                        order.status === 'completed',
                      'bg-red-100 text-red-700': order.status === 'cancelled',
                    }"
                  >
                    {{ order.status }}
                  </span>
                </div>
              </div>
            </div>

            <div class="rounded-xl border border-border bg-white p-5">
              <h2 class="mb-5 text-lg font-semibold">Order Summary</h2>
              <div class="space-y-3 text-sm">
                <div class="flex justify-between">
                  <span>Subtotal</span>
                  <span>৳ {{ order.subtotal }}</span>
                </div>

                <div class="flex justify-between">
                  <span>Shipping</span>
                  <span>৳ {{ order.shipping }}</span>
                </div>

                <div class="flex justify-between">
                  <span>Tax</span>
                  <span>৳ {{ order.tax }}</span>
                </div>

                <div class="flex justify-between text-red-500">
                  <span>Discount</span>
                  <span>- ৳ {{ order.discount }}</span>
                </div>

                <div class="border-t border-border pt-4">
                  <div class="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span class="text-primary"> ৳ {{ order.total }} </span>
                  </div>
                </div>
              </div>
            </div>

            <div class="space-y-4 rounded-xl border border-border bg-white p-5">
              <h2 class="text-lg font-semibold text-gray-900">Order Status</h2>

              <select
                v-model="form.status"
                class="w-full rounded border border-border bg-white px-4 py-2 text-sm text-gray-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              >
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
                <option value="returned">Returned</option>
              </select>

              <BaseButton :loading="orderStore.loading" @click="updateStatus"
                >Update</BaseButton
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
