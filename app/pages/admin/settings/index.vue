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

  facebook: "",
  instagram: "",
  youtube: "",

  maintenance_mode: false,

  meta_title: "Buyzin",
  meta_description: "",
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
      </div>
    </div>
  </main>
</template>
