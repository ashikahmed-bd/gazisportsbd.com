<script setup>
const cartStore = useCartStore();

const {
  data: cart,
  pending,
  error,
  refresh,
} = await useAsyncData("cart", () => {
  return cartStore.getItems();
});

const increase = async (item) => {
  await cartStore.increase(item);
  await refresh();
};

const decrease = async (item) => {
  await cartStore.decrease(item);
  await refresh();
};

const remove = async (item) => {
  await cartStore.remove(item);
  await refresh();
};

const clear = async () => {
  await cartStore.clear();
  await refresh();
};
</script>

<template>
  <main class="bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 py-10">
      <LoadingState v-if="pending" />

      <ErrorState v-else-if="error" :retry="refresh" />

      <template v-else-if="cart.items?.length">
        <div class="w-full">
          <div class="mb-8 text-sm text-gray-500">
            <NuxtLink to="/" class="transition hover:text-primary">
              Home
            </NuxtLink>
            <span class="mx-2">/</span>
            <span class="font-medium text-gray-900"> Shopping Cart </span>
          </div>

          <div class="grid items-start gap-8 lg:grid-cols-3">
            <section class="space-y-5 lg:col-span-2">
              <div class="flex items-center justify-between">
                <h1 class="text-3xl font-bold text-gray-900">Shopping Cart</h1>
                <span class="text-gray-500">
                  {{ cart.items.length }} Item{{
                    cart.items.length > 1 ? "s" : ""
                  }}
                </span>
              </div>

              <div
                v-for="item in cart.items"
                :key="item.id"
                class="rounded-2xl border border-gray-200 bg-white p-4 transition"
              >
                <div class="flex items-start gap-4">
                  <img
                    :src="item.product?.cover_url"
                    :alt="item.product?.name"
                    class="size-24 rounded-xl bg-gray-100 object-cover"
                  />

                  <div class="min-w-0 flex-1">
                    <div class="flex justify-between gap-4">
                      <div>
                        <h3 class="text-lg font-semibold text-gray-900">
                          {{ item.product?.name }}
                        </h3>

                        <div
                          v-if="
                            item.options && Object.keys(item.options).length
                          "
                          class="space-x-2"
                        >
                          <span
                            v-for="(value, key) in item.options"
                            :key="key"
                            class="text-sm"
                          >
                            {{ key }}:
                            <span class="font-semibold text-title">
                              {{ value }}
                            </span>
                          </span>
                        </div>
                        <p v-else class="text-sm text-gray-500">
                          No options selected
                        </p>
                      </div>

                      <button
                        type="button"
                        @click="remove(item)"
                        class="flex size-6 items-center justify-center text-danger"
                      >
                        <UIcon
                          name="i-lucide-trash-2"
                          class="size-5 cursor-pointer"
                        />
                      </button>
                    </div>

                    <div class="flex items-center justify-between py-2.5">
                      <div
                        class="flex items-center overflow-hidden rounded-lg border border-border"
                      >
                        <button
                          type="button"
                          class="flex size-9 items-center justify-center transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                          :disabled="item.quantity <= 1"
                          @click="decrease(item)"
                        >
                          <UIcon name="i-lucide-minus" class="size-4" />
                        </button>

                        <span
                          class="flex h-9 min-w-10 items-center justify-center border-x border-border px-3 text-sm font-semibold"
                        >
                          {{ item.quantity }}
                        </span>

                        <button
                          type="button"
                          class="flex size-9 items-center justify-center transition hover:bg-gray-100"
                          @click="increase(item)"
                        >
                          <UIcon
                            name="i-lucide-plus"
                            class="size-4 text-success"
                          />
                        </button>
                      </div>

                      <div class="text-right">
                        <p class="text-xs text-gray-400">
                          ৳{{ item.price }} x {{ item.quantity }}
                        </p>

                        <p class="text-xl font-bold text-primary">
                          ৳{{ Number(item.total).toLocaleString() }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                v-if="cart.items.length"
                class="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"
              >
                <NuxtLink
                  to="/shop"
                  class="inline-flex items-center justify-center rounded-xl border border-gray-200 px-6 py-3 font-medium hover:bg-gray-100"
                >
                  <UIcon name="i-lucide-arrow-left" class="mr-2 h-4 w-4" />
                  Continue Shopping
                </NuxtLink>

                <button
                  @click="clear"
                  class="inline-flex items-center font-medium text-red-500 hover:text-red-600"
                >
                  <UIcon name="i-lucide-trash-2" class="mr-2 h-4 w-4" />
                  Clear Cart
                </button>
              </div>
            </section>

            <aside class="self-start lg:sticky lg:top-24">
              <div
                class="rounded-2xl border border-gray-200 bg-white p-4 space-y-4"
              >
                <h2 class="mb-6 text-2xl font-bold text-gray-900">
                  Order Summary
                </h2>
                <form class="mb-6 flex">
                  <input
                    type="text"
                    placeholder="Coupon Code"
                    class="h-11 flex-1 rounded-l-xl border border-r-0 border-gray-200 px-4 outline-none focus:border-primary"
                  />

                  <button
                    class="rounded-r-xl bg-primary px-5 font-medium text-white hover:opacity-90"
                  >
                    Apply
                  </button>
                </form>

                <div class="space-y-4">
                  <div class="flex justify-between">
                    <span class="text-body">Subtotal</span>
                    <span class="font-semibold"> ৳{{ cart.subtotal }} </span>
                  </div>

                  <div class="flex justify-between">
                    <span class="text-body">Shipping</span>
                    <span class="font-semibold"> ৳{{ cart.shipping }} </span>
                  </div>

                  <div class="flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span class="text-primary"> ৳{{ cart.total }} </span>
                  </div>
                </div>

                <NuxtLink
                  to="/checkout"
                  class="flex items-center justify-center rounded bg-primary font-semibold text-white hover:opacity-90 py-2.5"
                >
                  Proceed to Checkout
                  <UIcon name="i-lucide-arrow-right" class="ml-2 size-4" />
                </NuxtLink>

                <div class="mt-6 rounded-xl bg-green-50 p-4">
                  <div class="flex items-center gap-3 text-sm text-green-700">
                    <UIcon name="i-lucide-shield-check" class="size-5" />
                    Secure SSL Encrypted Checkout
                  </div>
                </div>

                <div class="mt-6 flex justify-center gap-5 text-gray-400">
                  <UIcon name="i-simple-icons-visa" class="h-8 w-8" />
                  <UIcon name="i-simple-icons-mastercard" class="h-8 w-8" />
                  <UIcon name="i-simple-icons-paypal" class="h-8 w-8" />
                </div>
              </div>
            </aside>
          </div>
        </div>
      </template>

      <template v-else>
        <EmptyCart />
      </template>
    </div>
  </main>
</template>
