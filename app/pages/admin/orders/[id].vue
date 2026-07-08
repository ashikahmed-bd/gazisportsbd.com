<script setup>
definePageMeta({
  layout: "admin",
});

const order = {
  id: 1,
  order_no: "ORD-100001",
  status: "Pending",
  payment_method: "Cash on Delivery",

  customer: {
    name: "John Doe",
    phone: "+8801712345678",
    address: "House 25, Road 5",
    city: "Dhaka",
    postcode: "1207",
    country: "Bangladesh",
    note: "Please call before delivery.",
  },

  items: [
    {
      id: 1,
      name: "Manchester United Home Jersey 25/26",
      image: "https://placehold.co/80",
      size: "L",
      qty: 2,
      price: 1200,
      total: 2400,
    },
    {
      id: 2,
      name: "Real Madrid Away Jersey",
      image: "https://placehold.co/80",
      size: "XL",
      qty: 1,
      price: 1450,
      total: 1450,
    },
  ],

  subtotal: 3850,
  shipping: 80,
  tax: 0,
  discount: 100,
  total: 3830,
};
</script>

<template>
  <main class="mx-auto max-w-7xl space-y-6">
    <!-- Header -->
    <div
      class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
    >
      <div>
        <h1 class="text-2xl font-bold">Order {{ order.order_no }}</h1>

        <p class="text-sm text-gray-500">Order Details</p>
      </div>

      <div class="flex gap-3">
        <button class="rounded-lg border px-4 py-2 hover:bg-gray-100">
          Print Invoice
        </button>

        <button
          class="rounded-lg bg-indigo-600 px-5 py-2 text-white hover:bg-indigo-700"
        >
          Update Status
        </button>
      </div>
    </div>

    <div class="grid gap-6 lg:grid-cols-3">
      <!-- Left -->
      <div class="space-y-6 lg:col-span-2">
        <!-- Products -->
        <div class="rounded-xl border bg-white">
          <div class="border-b p-5">
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
                      <img
                        :src="item.image"
                        class="h-14 w-14 rounded-lg border"
                      />

                      <div>
                        <h3 class="font-semibold">
                          {{ item.name }}
                        </h3>

                        <p class="text-sm text-gray-500">
                          Size: {{ item.size }}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td class="px-6 py-4 text-center">
                    {{ item.qty }}
                  </td>

                  <td class="px-6 py-4 text-right">৳ {{ item.price }}</td>

                  <td class="px-6 py-4 text-right font-semibold">
                    ৳ {{ item.total }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Notes -->
        <div class="rounded-xl border bg-white p-6">
          <h2 class="mb-3 text-lg font-semibold">Customer Note</h2>

          <p class="text-gray-600">
            {{ order.customer.note || "No note provided." }}
          </p>
        </div>
      </div>

      <!-- Right -->
      <div class="space-y-6">
        <!-- Customer -->
        <div class="rounded-xl border bg-white p-6">
          <h2 class="mb-5 text-lg font-semibold">Customer Information</h2>

          <div class="space-y-3 text-sm">
            <div class="flex justify-between">
              <span>Name</span>
              <strong>{{ order.customer.name }}</strong>
            </div>

            <div class="flex justify-between">
              <span>Phone</span>
              <strong>{{ order.customer.phone }}</strong>
            </div>

            <div>
              <p class="font-medium mb-1">Shipping Address</p>

              <p class="text-gray-500">
                {{ order.customer.address }}, {{ order.customer.city }},
                {{ order.customer.postcode }},
                {{ order.customer.country }}
              </p>
            </div>
          </div>
        </div>

        <!-- Order Info -->
        <div class="rounded-xl border bg-white p-6">
          <h2 class="mb-5 text-lg font-semibold">Order Information</h2>

          <div class="space-y-3 text-sm">
            <div class="flex justify-between">
              <span>Order No</span>
              <strong>{{ order.order_no }}</strong>
            </div>

            <div class="flex justify-between">
              <span>Payment</span>

              <span class="rounded bg-blue-100 px-2 py-1 text-xs text-blue-700">
                {{ order.payment_method }}
              </span>
            </div>

            <div class="flex justify-between">
              <span>Status</span>

              <span
                class="rounded bg-yellow-100 px-2 py-1 text-xs text-yellow-700"
              >
                {{ order.status }}
              </span>
            </div>
          </div>
        </div>

        <!-- Summary -->
        <div class="rounded-xl border bg-white p-6">
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

            <div class="border-t pt-4">
              <div class="flex justify-between text-lg font-bold">
                <span>Total</span>

                <span class="text-indigo-600"> ৳ {{ order.total }} </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
