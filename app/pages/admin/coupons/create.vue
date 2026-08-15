<script setup>
definePageMeta({
  layout: "admin",
});

const couponStore = useCouponStore();
const { errors } = storeToRefs(couponStore);

const form = reactive({
  code: "",
  type: "percent",
  discount: "",
  minimum_amount: 0,
  expires_at: "",
  active: true,
});

const submit = async () => {
  await couponStore.store(form);
};
</script>

<template>
  <main class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold tracking-tight text-gray-900">
        Create Coupon
      </h1>

      <p class="mt-1 text-sm text-gray-500">
        Create a discount coupon for your customers.
      </p>
    </div>

    <form @submit.prevent="submit" class="space-y-6">
      <div class="card">
        <div class="card__header">
          <div>
            <h2 class="text-lg font-semibold text-gray-900">
              Coupon Information
            </h2>

            <p class="mt-1 text-sm text-gray-500">
              Set the coupon code and discount details.
            </p>
          </div>
        </div>

        <div class="card__body space-y-6">
          <!-- Code -->
          <div>
            <label class="mb-2 block text-sm font-medium text-gray-700">
              Coupon Code
            </label>

            <div class="relative">
              <UIcon
                name="i-lucide-ticket"
                class="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-gray-400"
              />

              <input
                v-model="form.code"
                type="text"
                placeholder="e.g. WELCOME20"
                class="h-11 w-full rounded-xl border border-gray-200 bg-white pl-10 pr-4 text-sm font-medium uppercase text-gray-700 outline-none transition placeholder:normal-case placeholder:text-gray-400 focus:border-primary focus:ring-4 focus:ring-primary/10"
                :class="errors.code && 'border-red-400'"
                @input="form.code = form.code.toUpperCase()"
              />
            </div>

            <p v-if="errors.code" class="mt-1 text-xs text-red-500">
              {{ errors.code[0] }}
            </p>
          </div>

          <!-- Type + Discount -->
          <div class="grid gap-5 md:grid-cols-2">
            <!-- Type -->
            <div>
              <label class="mb-2 block text-sm font-medium text-gray-700">
                Discount Type
              </label>

              <select
                v-model="form.type"
                class="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-700 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
                :class="errors.type && 'border-red-400'"
              >
                <option value="percent">Percentage (%)</option>
                <option value="fixed">Fixed Amount (৳)</option>
              </select>

              <p v-if="errors.type" class="mt-1 text-xs text-red-500">
                {{ errors.type[0] }}
              </p>
            </div>

            <!-- Discount -->
            <div>
              <label class="mb-2 block text-sm font-medium text-gray-700">
                Discount
              </label>

              <div class="relative">
                <input
                  v-model="form.discount"
                  type="number"
                  min="0"
                  :max="form.type === 'percent' ? 100 : undefined"
                  step="0.01"
                  :placeholder="form.type === 'percent' ? '20' : '500'"
                  class="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 pr-12 text-sm text-gray-700 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
                  :class="errors.discount && 'border-red-400'"
                />

                <span
                  class="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-400"
                >
                  {{ form.type === "percent" ? "%" : "৳" }}
                </span>
              </div>

              <p v-if="errors.discount" class="mt-1 text-xs text-red-500">
                {{ errors.discount[0] }}
              </p>
            </div>

            <!-- Minimum Amount -->
            <div>
              <label class="mb-2 block text-sm font-medium text-gray-700">
                Minimum Order Amount
              </label>

              <div class="relative">
                <span
                  class="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-400"
                >
                  ৳
                </span>

                <input
                  v-model="form.minimum_amount"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="2000"
                  class="h-11 w-full rounded-xl border border-gray-200 bg-white pl-10 pr-4 text-sm text-gray-700 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
                  :class="errors.minimum_amount && 'border-red-400'"
                />
              </div>

              <p class="mt-1 text-xs text-gray-400">
                Set 0 if there is no minimum order requirement.
              </p>

              <p v-if="errors.minimum_amount" class="mt-1 text-xs text-red-500">
                {{ errors.minimum_amount[0] }}
              </p>
            </div>

            <!-- Expiry -->
            <div>
              <label class="mb-2 block text-sm font-medium text-gray-700">
                Expiration Date
              </label>

              <div class="relative">
                <UIcon
                  name="i-lucide-calendar"
                  class="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-gray-400"
                />

                <input
                  v-model="form.expires_at"
                  type="date"
                  class="h-11 w-full rounded-xl border border-gray-200 bg-white pl-10 pr-4 text-sm text-gray-700 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
                  :class="errors.expires_at && 'border-red-400'"
                />
              </div>

              <p class="mt-1 text-xs text-gray-400">
                Leave empty if this coupon never expires.
              </p>

              <p v-if="errors.expires_at" class="mt-1 text-xs text-red-500">
                {{ errors.expires_at[0] }}
              </p>
            </div>
          </div>

          <!-- Active -->
          <div
            class="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 p-4"
          >
            <div>
              <h3 class="text-sm font-semibold text-gray-900">Coupon Status</h3>

              <p class="mt-1 text-xs text-gray-500">
                Enable this coupon immediately after creation.
              </p>
            </div>

            <button
              type="button"
              @click="form.active = !form.active"
              class="relative h-6 w-11 rounded-full transition"
              :class="form.active ? 'bg-primary' : 'bg-gray-300'"
            >
              <span
                class="absolute top-0.5 size-5 rounded-full bg-white shadow-sm transition"
                :class="form.active ? 'left-5' : 'left-0.5'"
              />
            </button>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex items-center justify-end gap-3">
        <NuxtLink to="/admin/coupons" class="base__button_secondary">
          Cancel
        </NuxtLink>

        <button
          type="submit"
          class="base__button"
          :disabled="couponStore.loading"
        >
          <UIcon
            v-if="couponStore.loading"
            name="i-lucide-loader-circle"
            class="size-4 animate-spin"
          />

          {{ couponStore.loading ? "Creating..." : "Create Coupon" }}
        </button>
      </div>
    </form>
  </main>
</template>
