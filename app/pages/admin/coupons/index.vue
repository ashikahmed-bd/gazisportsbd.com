<script setup>
definePageMeta({
  layout: "admin",
});

const page = ref(1);

const couponStore = useCouponStore();
const { coupons } = storeToRefs(couponStore);

const loadCoupons = async () => {
  await couponStore.all(page.value);
};

watch(page, async () => {
  await loadCoupons();
});

onMounted(() => {
  loadCoupons();
});

const deleteCoupon = async (coupon) => {
  if (confirm("Are you sure you want to delete this coupon?")) {
    await couponStore.delete(coupon);
  }
  await loadCoupons();
};

useSeoMeta({
  title: "All Coupons",
});
</script>

<template>
  <main class="space-y-6">
    <div class="card">
      <div class="card__header">
        <div>
          <h1 class="text-2xl font-bold tracking-tight text-gray-900">
            Coupons
          </h1>

          <p class="mt-1 text-sm text-gray-500">
            Manage discount coupons and promotional offers.
          </p>
        </div>

        <div class="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
          <NuxtLink to="/admin/coupons/create" class="base__button">
            Add Coupon
          </NuxtLink>
        </div>
      </div>

      <div class="card__body">
        <div
          class="overflow-hidden overflow-x-auto rounded-xl border border-border"
        >
          <table class="min-w-full">
            <thead>
              <tr>
                <th>Code</th>
                <th>Type</th>
                <th>Discount</th>
                <th>Minimum Amount</th>
                <th>Expires</th>
                <th>Status</th>
                <th class="text-right">Action</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="coupon in coupons?.data" :key="coupon.id">
                <td>
                  <div class="flex items-center gap-3">
                    <div
                      class="flex size-10 items-center justify-center rounded-lg bg-primary/10"
                    >
                      <UIcon
                        name="i-lucide-ticket-percent"
                        class="size-5 text-primary"
                      />
                    </div>

                    <div>
                      <h3 class="font-semibold uppercase text-gray-900">
                        {{ coupon.code }}
                      </h3>

                      <span class="text-xs text-gray-500">
                        Coupon #{{ coupon.id }}
                      </span>
                    </div>
                  </div>
                </td>

                <td>
                  <span
                    class="rounded-full px-3 py-1 text-xs font-semibold capitalize"
                    :class="
                      coupon.type === 'percent'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-purple-100 text-purple-700'
                    "
                  >
                    {{ coupon.type }}
                  </span>
                </td>

                <td>
                  <span class="font-semibold text-gray-900">
                    {{
                      coupon.type === "percent"
                        ? `${coupon.discount}%`
                        : `৳${coupon.discount}`
                    }}
                  </span>
                </td>

                <td>
                  <span class="font-medium text-gray-700">
                    {{
                      Number(coupon.minimum_amount) > 0
                        ? `৳${coupon.minimum_amount}`
                        : "No minimum"
                    }}
                  </span>
                </td>

                <td>
                  <span
                    v-if="coupon.expires_at"
                    class="text-sm"
                    :class="
                      new Date(coupon.expires_at) < new Date()
                        ? 'font-medium text-red-600'
                        : 'text-gray-600'
                    "
                  >
                    {{ new Date(coupon.expires_at).toLocaleDateString() }}
                  </span>

                  <span v-else class="text-sm text-gray-400"> No expiry </span>
                </td>

                <td>
                  <span
                    class="rounded-full px-3 py-1 text-xs font-semibold"
                    :class="
                      coupon.active
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    "
                  >
                    {{ coupon.active ? "Active" : "Inactive" }}
                  </span>
                </td>

                <td>
                  <div class="flex justify-end gap-2">
                    <NuxtLink
                      :to="`/admin/coupons/${coupon.id}`"
                      class="action__edit"
                    >
                      Edit
                    </NuxtLink>

                    <button
                      @click="deleteCoupon(coupon.id)"
                      class="action__delete"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>

              <tr v-if="!coupons?.data?.length">
                <td colspan="7" class="py-12 text-center">
                  <div class="flex flex-col items-center">
                    <UIcon
                      name="i-lucide-ticket-x"
                      class="size-10 text-gray-300"
                    />

                    <h3 class="mt-3 font-semibold text-gray-700">
                      No coupons found
                    </h3>

                    <p class="mt-1 text-sm text-gray-400">
                      Create your first coupon to get started.
                    </p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="flex justify-center py-8">
          <UPagination
            v-model:page="page"
            show-edges
            :sibling-count="1"
            :total="coupons?.meta?.total"
            :items-per-page="coupons?.meta?.per_page"
          />
        </div>
      </div>
    </div>
  </main>
</template>
