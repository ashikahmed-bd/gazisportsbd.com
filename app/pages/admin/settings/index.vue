<script setup>
definePageMeta({
  layout: "admin",
});

const form = reactive({
  site_name: "Gazi Sports",
  site_email: "info@gazisportsbd.com",
  site_phone: "+8801912345678",
  address: "Dhaka, Bangladesh",

  currency: "BDT",
  shipping_fee: 120,

  facebook: "https://www.facebook.com/profile.php?id=61567802019081",
  instagram: "https://www.instagram.com/omarfarukomi_500",
  youtube: "",

  maintenance_mode: false,

  meta_title: "Buyzin",
  meta_description: "",
});

const popup = reactive({
  title: "New Customer Offer",
  heading: "Get 20% OFF Your First Order",
  description:
    "Use the coupon code below during checkout and enjoy an exclusive discount on your first purchase.",
  coupon_code: "WELCOME20",
  discount: 20,
  button_text: "Shop Now",
  button_url: "/shop",
  active: true,
});
</script>

<template>
  <main class="space-y-6">
    <div class="card">
      <div class="card__header">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Website Settings</h1>
          <p class="mt-1 text-sm text-gray-500">
            Manage your website configuration and preferences.
          </p>
        </div>
      </div>
      <div class="card__body">
        <UTabs
          :items="[
            {
              label: 'General',
              slot: 'general',
              icon: 'i-lucide-settings',
            },
            {
              label: 'Popup',
              slot: 'popup',
              icon: 'i-lucide-panels-top-left',
            },
          ]"
          variant="link"
        >
          <template #general>
            <div class="grid gap-6 p-6 md:grid-cols-2">
              <div>
                <label class="mb-2 block text-sm font-medium text-gray-700">
                  Website Name
                </label>

                <input
                  v-model="form.site_name"
                  type="text"
                  class="h-11 w-full rounded-xl border border-gray-300 px-4 outline-none transition focus:border-primary"
                />
              </div>

              <div>
                <label class="mb-2 block text-sm font-medium text-gray-700">
                  Email Address
                </label>

                <input
                  v-model="form.site_email"
                  type="email"
                  class="h-11 w-full rounded-xl border border-gray-300 px-4 outline-none transition focus:border-primary"
                />
              </div>

              <div>
                <label class="mb-2 block text-sm font-medium text-gray-700">
                  Phone Number
                </label>

                <input
                  v-model="form.site_phone"
                  type="text"
                  class="h-11 w-full rounded-xl border border-gray-300 px-4 outline-none transition focus:border-primary"
                />
              </div>

              <div>
                <label class="mb-2 block text-sm font-medium text-gray-700">
                  Currency
                </label>

                <select
                  v-model="form.currency"
                  class="h-11 w-full rounded-xl border border-gray-300 bg-white px-4 outline-none transition focus:border-primary"
                >
                  <option>BDT</option>
                  <option>USD</option>
                </select>
              </div>

              <div>
                <label class="mb-2 block text-sm font-medium text-gray-700">
                  Shipping Fee
                </label>

                <input
                  v-model="form.shipping_fee"
                  type="number"
                  class="h-11 w-full rounded-xl border border-gray-300 px-4 outline-none transition focus:border-primary"
                />
              </div>

              <div>
                <label class="mb-2 block text-sm font-medium text-gray-700">
                  Address
                </label>

                <input
                  v-model="form.address"
                  class="h-11 w-full rounded-xl border border-gray-300 px-4 outline-none transition focus:border-primary"
                />
              </div>
            </div>

            <div class="grid gap-6 p-6 md:grid-cols-3">
              <div>
                <label class="mb-2 block text-sm font-medium text-gray-700">
                  Facebook
                </label>

                <input
                  v-model="form.facebook"
                  type="text"
                  placeholder="https://facebook.com/..."
                  class="h-11 w-full rounded-xl border border-gray-300 px-4 outline-none transition focus:border-primary"
                />
              </div>

              <div>
                <label class="mb-2 block text-sm font-medium text-gray-700">
                  Instagram
                </label>

                <input
                  v-model="form.instagram"
                  type="text"
                  placeholder="https://instagram.com/..."
                  class="h-11 w-full rounded-xl border border-gray-300 px-4 outline-none transition focus:border-primary"
                />
              </div>

              <div>
                <label class="mb-2 block text-sm font-medium text-gray-700">
                  YouTube
                </label>

                <input
                  v-model="form.youtube"
                  type="text"
                  placeholder="https://youtube.com/..."
                  class="h-11 w-full rounded-xl border border-gray-300 px-4 outline-none transition focus:border-primary"
                />
              </div>
            </div>

            <div class="flex items-center justify-between p-6">
              <div>
                <h3 class="font-semibold text-gray-900">Maintenance Mode</h3>
                <p class="mt-1 text-sm text-gray-500">
                  Enable maintenance mode to temporarily disable public access.
                </p>
              </div>

              <label class="relative inline-flex cursor-pointer items-center">
                <input
                  v-model="form.maintenance_mode"
                  type="checkbox"
                  class="peer sr-only"
                />

                <div
                  class="peer h-6 w-11 rounded-full bg-gray-300 transition peer-checked:bg-primary after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-5"
                />
              </label>
            </div>
          </template>

          <template #popup>
            <div class="max-w-2xl space-y-6">
              <div>
                <h3 class="text-base font-semibold text-gray-900">
                  Popup Settings
                </h3>
                <p class="mt-1 text-sm text-gray-500">
                  Configure the promotional popup shown to customers.
                </p>
              </div>

              <div class="grid gap-5 sm:grid-cols-2">
                <UFormField label="Popup Title" class="sm:col-span-2">
                  <UInput
                    v-model="form.title"
                    placeholder="New Customer Offer"
                    icon="i-lucide-megaphone"
                    class="w-full"
                  />
                </UFormField>

                <UFormField label="Heading" class="sm:col-span-2">
                  <UInput
                    v-model="form.heading"
                    placeholder="Get 20% OFF Your First Order"
                    icon="i-lucide-heading"
                    class="w-full"
                  />
                </UFormField>

                <UFormField label="Description" class="sm:col-span-2">
                  <UTextarea
                    v-model="form.description"
                    placeholder="Use the coupon code below during checkout and enjoy an exclusive discount on your first purchase."
                    :rows="4"
                    class="w-full"
                  />
                </UFormField>

                <UFormField label="Coupon Code">
                  <UInput
                    v-model="form.coupon_code"
                    placeholder="WELCOME20"
                    icon="i-lucide-ticket-percent"
                    class="w-full"
                  />
                </UFormField>

                <UFormField label="Discount">
                  <UInput
                    v-model="form.discount"
                    type="number"
                    placeholder="20"
                    trailing="%"
                    icon="i-lucide-percent"
                    class="w-full"
                  />
                </UFormField>

                <UFormField label="Button Text">
                  <UInput
                    v-model="form.button_text"
                    placeholder="Shop Now"
                    icon="i-lucide-mouse-pointer-click"
                    class="w-full"
                  />
                </UFormField>

                <UFormField label="Button URL">
                  <UInput
                    v-model="form.button_url"
                    placeholder="/shop"
                    icon="i-lucide-link"
                    class="w-full"
                  />
                </UFormField>

                <div
                  class="sm:col-span-2 flex items-center justify-between rounded-lg border border-gray-200 dark:border-gray-800 p-4"
                >
                  <div>
                    <p
                      class="text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Enable Popup
                    </p>
                    <p class="text-xs text-gray-500">
                      Show this promotional popup to customers.
                    </p>
                  </div>

                  <USwitch v-model="form.active" />
                </div>
              </div>

              <div
                class="flex justify-end gap-3 border-t border-gray-200 dark:border-gray-800 pt-5"
              >
                <UButton color="neutral" variant="outline" icon="i-lucide-x">
                  Cancel
                </UButton>

                <UButton color="primary" icon="i-lucide-save">
                  Save Changes
                </UButton>
              </div>
            </div>
          </template>
        </UTabs>
      </div>
    </div>
  </main>
</template>
