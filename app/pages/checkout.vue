<script setup>
const toast = useToast();
const cartStore = useCartStore();

const { data, error, pending, refresh } = await useAsyncData("cart", () => {
  return cartStore.getItems();
});

const updateShipping = async () => {
  if (!form.state) return;

  await cartStore.shipping({
    zone: form.state,
  });

  await refresh();
};

const paymentMethods = [
  {
    label: "Cash on Delivery",
    value: "cod",
    description: "Pay when you receive your order.",
    icon: "i-lucide-banknote",
  },
  {
    label: "Online Payment",
    value: "online_payment",
    description: "Pay securely using mobile banking or card.",
    icon: "i-lucide-credit-card",
  },
];

const form = reactive({
  name: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  postcode: "",
  country: "BD",
  note: "",
  payment_method: "cod",
});

const submit = async () => {
  if (!form.name) {
    toast.add({
      title: "Please enter your name.",
    });
    return;
  }

  if (!form.phone) {
    toast.add({
      title: "Please enter your phone number.",
    });
    return;
  }

  if (!form.address) {
    toast.add({
      title: "Please enter your address.",
    });
    return;
  }

  if (!form.city) {
    toast.add({
      title: "Please enter your city.",
    });
    return;
  }

  if (!form.state) {
    toast.add({
      title: "Please enter your State / Province.",
    });
    return;
  }

  if (!form.payment_method) {
    toast.add({
      title: "Please select a payment method.",
    });
    return;
  }

  const payload = {
    name: form.name.trim(),
    phone: form.phone.trim(),
    address: form.address.trim(),
    city: form.city.trim(),
    state: form.state.trim(),
    postcode: form.postcode.trim(),
    country: form.country,
    note: form.note.trim(),
    payment_method: form.payment_method,
  };

  const response = await cartStore.checkout(payload);

  toast.add({
    title: "Order placed successfully",
    description: "Your order has been received.",
    color: "success",
    icon: "i-lucide-circle-check",
  });

  if (response?.payment_url) {
    await navigateTo(response.payment_url, {
      external: true,
    });

    return;
  }

  if (response?.order_id) {
    await navigateTo(`/order-success/${response.order_id}`);
  }
};
</script>

<template>
  <main class="bg-gray-50">
    <LoadingState v-if="pending" />

    <ErrorState v-else-if="error" :retry="refresh" />

    <template v-else-if="data?.items?.length">
      <Head>
        <Title> Checkout | Secure Payment & Fast Delivery in Bangladesh </Title>
        <Meta
          name="description"
          content="Complete your order securely. Review your shipping details and choose a payment method."
        />
        <Meta name="robots" content="noindex, nofollow" />
        <Meta name="referrer" content="no-referrer-when-downgrade" />
      </Head>

      <div class="mx-auto max-w-7xl px-4 py-8 space-y-4">
        <UBreadcrumb
          :items="[
            {
              label: 'Home',
              to: '/',
            },
            {
              label: 'Checkout',
              to: '/checkout',
            },
          ]"
        />

        <div
          class="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_380px]"
        >
          <div class="min-w-0 space-y-4">
            <div class="w-full">
              <h1 class="text-3xl font-bold text-gray-900">Checkout</h1>

              <p class="mt-2 text-sm text-gray-500">
                Complete your shipping and payment information.
              </p>
            </div>

            <section
              class="overflow-hidden rounded-2xl border border-gray-200 bg-white"
            >
              <div
                class="flex items-center gap-3 border-b border-gray-200 px-5 py-4"
              >
                <div
                  class="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary"
                >
                  <UIcon name="i-lucide-map-pin" class="h-5 w-5" />
                </div>

                <div>
                  <h2 class="text-lg font-semibold text-gray-900">
                    Shipping Address
                  </h2>

                  <p class="text-xs text-gray-500">
                    Enter the address where you want to receive your order.
                  </p>
                </div>
              </div>

              <div class="grid grid-cols-1 gap-5 p-5 md:grid-cols-2">
                <div>
                  <label
                    for="checkout-name"
                    class="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Full Name
                    <span class="text-red-500">*</span>
                  </label>

                  <input
                    id="checkout-name"
                    v-model="form.name"
                    type="text"
                    autocomplete="name"
                    placeholder="Enter your full name"
                    class="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/10"
                  />
                </div>

                <div>
                  <label
                    for="checkout-phone"
                    class="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Phone Number
                    <span class="text-red-500">*</span>
                  </label>

                  <input
                    id="checkout-phone"
                    v-model="form.phone"
                    type="tel"
                    inputmode="numeric"
                    autocomplete="tel"
                    maxlength="11"
                    placeholder="01XXXXXXXXX"
                    class="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/10"
                  />
                </div>

                <div class="md:col-span-2">
                  <label
                    for="checkout-address"
                    class="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Address
                    <span class="text-red-500">*</span>
                  </label>

                  <input
                    id="checkout-address"
                    v-model="form.address"
                    type="text"
                    autocomplete="street-address"
                    placeholder="House, road, area and thana"
                    class="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/10"
                  />
                </div>

                <div>
                  <label
                    for="checkout-city"
                    class="mb-2 block text-sm font-medium text-gray-700"
                  >
                    City
                    <span class="text-red-500">*</span>
                  </label>

                  <input
                    id="checkout-city"
                    v-model="form.city"
                    type="text"
                    autocomplete="address-level2"
                    placeholder="For example, Dhaka"
                    class="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/10"
                  />
                </div>

                <div>
                  <label
                    for="checkout-state"
                    class="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Division / Province
                    <span class="text-red-500">*</span>
                  </label>

                  <select
                    @change="
                      cartStore.shipping({ zone: form.state });
                      refresh();
                    "
                    id="checkout-state"
                    v-model="form.state"
                    class="h-11 w-full rounded-xl border border-gray-300 bg-white px-4 text-sm outline-none transition focus:border-primary"
                  >
                    <option value="" disabled>Select Division</option>
                    <option value="Dhaka">Dhaka</option>
                    <option value="Chattogram">Chattogram</option>
                    <option value="Rajshahi">Rajshahi</option>
                    <option value="Khulna">Khulna</option>
                    <option value="Barishal">Barishal</option>
                    <option value="Sylhet">Sylhet</option>
                    <option value="Rangpur">Rangpur</option>
                    <option value="Mymensingh">Mymensingh</option>
                  </select>
                </div>

                <div>
                  <label
                    for="checkout-postcode"
                    class="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Postal Code
                  </label>

                  <input
                    id="checkout-postcode"
                    v-model="form.postcode"
                    type="text"
                    inputmode="numeric"
                    autocomplete="postal-code"
                    placeholder="For example, 1207"
                    class="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/10"
                  />
                </div>

                <div>
                  <label
                    for="checkout-country"
                    class="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Country
                  </label>

                  <select
                    id="checkout-country"
                    v-model="form.country"
                    autocomplete="country"
                    class="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                  >
                    <option value="BD">Bangladesh</option>
                  </select>
                </div>

                <div class="md:col-span-2">
                  <label
                    for="checkout-note"
                    class="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Order Note
                    <span class="font-normal text-gray-400"> (Optional) </span>
                  </label>

                  <textarea
                    id="checkout-note"
                    v-model="form.note"
                    rows="3"
                    placeholder="Write additional delivery instructions"
                    class="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/10"
                  />
                </div>
              </div>
            </section>
          </div>

          <aside class="self-start">
            <div
              class="sticky top-24 rounded-2xl border border-border bg-white"
            >
              <div class="border-b border-gray-200 px-5 py-4">
                <h2 class="text-lg font-semibold">Order Summary</h2>

                <p class="mt-1 text-xs text-gray-500">
                  {{ data.items.length }}
                  {{ data.items.length === 1 ? "product" : "products" }}
                </p>
              </div>

              <div class="space-y-4 overflow-y-auto p-5">
                <article
                  v-for="item in data.items"
                  :key="item.id"
                  class="flex gap-3"
                >
                  <div class="relative shrink-0">
                    <NuxtImg
                      :src="item.product?.cover_url"
                      :alt="item.product?.name"
                      class="h-16 w-16 rounded border border-border object-cover"
                    />

                    <span
                      class="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-xs font-semibold text-white"
                    >
                      {{ item.quantity }}
                    </span>
                  </div>

                  <div class="min-w-0 flex-1">
                    <h3 class="line-clamp-2 text-sm font-medium">
                      {{ item.product?.name }}
                    </h3>

                    <div
                      v-if="item.options && Object.keys(item.options).length"
                      class="mt-1 flex flex-wrap gap-2"
                    >
                      <span
                        v-for="(value, key) in item.options"
                        :key="key"
                        class="text-xs text-gray-500"
                      >
                        {{ key }}:
                        <span class="font-semibold text-gray-800">{{
                          value
                        }}</span>
                      </span>
                    </div>
                  </div>

                  <div class="text-sm font-semibold">
                    {{ item.total_formatted }}
                  </div>
                </article>
              </div>

              <div class="space-y-5 p-5 border-t border-border">
                <div class="space-y-3">
                  <h3 class="mb-3 font-semibold">Payment Method</h3>

                  <label
                    v-for="method in paymentMethods"
                    :key="method.value"
                    class="relative flex cursor-pointer gap-4 rounded-xl border p-4 transition"
                    :class="
                      form.payment_method === method.value
                        ? 'border-primary bg-primary/5 ring-1 ring-primary'
                        : 'border-gray-200 hover:border-gray-300'
                    "
                  >
                    <input
                      v-model="form.payment_method"
                      type="radio"
                      name="payment-method"
                      :value="method.value"
                      class="sr-only"
                    />

                    <div
                      class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                      :class="
                        form.payment_method === method.value
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 text-gray-600'
                      "
                    >
                      <UIcon :name="method.icon" class="h-5 w-5" />
                    </div>

                    <div class="min-w-0">
                      <p class="font-semibold text-gray-900">
                        {{ method.label }}
                      </p>

                      <p class="mt-1 text-xs leading-5 text-gray-500">
                        {{ method.description }}
                      </p>
                    </div>

                    <UIcon
                      v-if="form.payment_method === method.value"
                      name="i-lucide-circle-check"
                      class="absolute right-3 top-3 h-5 w-5 text-primary"
                    />
                  </label>
                </div>

                <div class="space-y-3">
                  <div class="flex justify-between">
                    <span>Subtotal</span>
                    <span>{{ data.subtotal }}</span>
                  </div>

                  <div class="flex justify-between">
                    <span>Shipping</span>
                    <span>{{ data.shipping }}</span>
                  </div>

                  <div class="flex justify-between">
                    <span class="text-danger">Discount</span>
                    <span class="font-semibold text-danger">
                      -{{ data.discount }}
                    </span>
                  </div>

                  <div class="flex justify-between">
                    <span class="font-semibold">Total</span>

                    <span class="text-2xl font-bold text-primary">
                      {{ data.total }}
                    </span>
                  </div>
                </div>

                <BaseButton
                  @click="submit"
                  class="w-full"
                  :disabled="!data?.items?.length || cartStore.loading"
                  :loading="cartStore.loading"
                >
                  <UIcon
                    :name="
                      form.payment_method === 'online'
                        ? 'i-lucide-credit-card'
                        : 'i-lucide-lock-keyhole'
                    "
                    class="mr-2 size-4"
                  />

                  {{
                    form.payment_method === "online"
                      ? "Proceed to Payment"
                      : "Place Order"
                  }}
                </BaseButton>

                <div
                  class="flex items-center justify-center gap-2 rounded-xl bg-green-50 p-3 text-xs text-green-700"
                >
                  <UIcon name="i-lucide-shield-check" class="size-4" />
                  Secure SSL Encrypted Checkout
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </template>

    <EmptyCart v-else />
  </main>
</template>
