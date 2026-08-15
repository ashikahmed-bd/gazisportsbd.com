<script setup>
const orderNumber = ref("");

const trackOrder = () => {
  if (!orderNumber.value.trim()) return;

  // API integration এখানে করবে
  console.log("Tracking:", orderNumber.value);
};

useSeoMeta({
  title: "Track Order",
  description: "Track your order and check the latest delivery status.",
});
</script>

<template>
  <main>
    <section class="bg-white">
      <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-2xl text-center">
          <div
            class="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-100"
          >
            <UIcon
              name="i-lucide-package-search"
              class="h-7 w-7 text-gray-900"
            />
          </div>

          <h1
            class="mt-5 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
          >
            Track Your Order
          </h1>

          <p class="mt-4 text-base leading-7 text-gray-600">
            Enter your order number below to check your order status and
            delivery progress.
          </p>
        </div>
      </div>
    </section>

    <section class="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <div
        class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
      >
        <form @submit.prevent="trackOrder">
          <label
            for="order-number"
            class="block text-sm font-semibold text-gray-900"
          >
            Order Number
          </label>

          <div class="mt-2 flex flex-col gap-3 sm:flex-row">
            <div class="relative flex-1">
              <UIcon
                name="i-lucide-hash"
                class="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
              />

              <input
                id="order-number"
                v-model="orderNumber"
                type="text"
                placeholder="Enter your order number"
                class="h-12 w-full rounded-lg border border-gray-300 bg-white pl-10 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
              />
            </div>

            <button
              type="submit"
              class="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-gray-900 px-6 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
              :disabled="!orderNumber.trim()"
            >
              <UIcon name="i-lucide-search" class="h-4 w-4" />
              Track Order
            </button>
          </div>

          <p class="mt-3 text-xs text-gray-500">
            You can find your order number in your order confirmation email.
          </p>
        </form>
      </div>

      <div class="mt-8 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
        <h2 class="text-lg font-semibold text-gray-900">
          How to track your order
        </h2>

        <div class="mt-6 space-y-6">
          <!-- Step 1 -->
          <div class="flex gap-4">
            <div
              class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-900 text-sm font-semibold text-white"
            >
              1
            </div>

            <div>
              <h3 class="font-medium text-gray-900">Find your order number</h3>

              <p class="mt-1 text-sm leading-6 text-gray-600">
                Check your order confirmation email or order details to find
                your order number.
              </p>
            </div>
          </div>

          <div class="flex gap-4">
            <div
              class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-900 text-sm font-semibold text-white"
            >
              2
            </div>

            <div>
              <h3 class="font-medium text-gray-900">Enter your order number</h3>

              <p class="mt-1 text-sm leading-6 text-gray-600">
                Enter the order number in the tracking field above.
              </p>
            </div>
          </div>

          <div class="flex gap-4">
            <div
              class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-900 text-sm font-semibold text-white"
            >
              3
            </div>

            <div>
              <h3 class="font-medium text-gray-900">View your order status</h3>

              <p class="mt-1 text-sm leading-6 text-gray-600">
                We'll show you the latest status and delivery information for
                your order.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-8 rounded-2xl bg-gray-900 p-6 text-white sm:p-8">
        <div
          class="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <h2 class="text-lg font-semibold">Can't find your order?</h2>

            <p class="mt-1 text-sm text-gray-300">
              Contact our support team and we'll be happy to help.
            </p>
          </div>

          <NuxtLink
            to="/contact"
            class="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-gray-900 transition hover:bg-gray-100"
          >
            Contact Us
            <UIcon name="i-lucide-arrow-right" class="h-4 w-4" />
          </NuxtLink>
        </div>
      </div>
    </section>
  </main>
</template>
