<script setup>
const showPopup = ref(false);
const copied = ref(false);

const popupCookie = useCookie("popup", {
  maxAge: 60 * 60 * 24,
  sameSite: "lax",
  path: "/",
});

const openPopup = () => {
  showPopup.value = true;
  document.body.style.overflow = "hidden";
};

const closePopup = () => {
  showPopup.value = false;
  document.body.style.overflow = "";

  popupCookie.value = "seen";
};

const copyCoupon = async () => {
  try {
    await navigator.clipboard.writeText("WELCOME20");
    copied.value = true;

    setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch (error) {
    console.error("Coupon copy failed:", error);
  }
};

onMounted(() => {
  if (!popupCookie.value) {
    setTimeout(() => {
      openPopup();
    }, 800);
  }
});

onBeforeUnmount(() => {
  document.body.style.overflow = "";
});
</script>

<template>
  <Teleport to="body">
    <Transition name="popup">
      <div
        v-if="showPopup"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
        role="dialog"
        aria-modal="true"
        aria-labelledby="offer-popup-title"
        @click.self="closePopup"
      >
        <div
          class="relative w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl"
        >
          <button
            type="button"
            aria-label="Close popup"
            class="absolute right-4 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-black/30 text-white transition duration-300 hover:rotate-90 hover:bg-black/60"
            @click="closePopup"
          >
            <UIcon name="i-lucide-x" class="size-5" />
          </button>

          <div class="grid md:grid-cols-2">
            <div
              class="relative hidden bg-cover bg-center md:block"
              style="background-image: url(&quot;/newsletter.png&quot;)"
            ></div>

            <div
              class="relative flex flex-col justify-center overflow-y-auto bg-white px-6 py-10"
            >
              <div class="relative z-10">
                <div
                  class="mb-5 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-wide text-primary"
                >
                  <UIcon name="i-lucide-gift" class="h-4 w-4" />
                  New Customer Offer
                </div>

                <h2
                  id="offer-popup-title"
                  class="text-3xl font-black leading-tight text-gray-950 sm:text-4xl"
                >
                  Get
                  <span class="text-primary">20% OFF</span>
                  Your First Order
                </h2>

                <p class="mt-4 text-sm leading-6 text-gray-600 sm:text-base">
                  Use the coupon code below during checkout and enjoy an
                  exclusive discount on your first purchase.
                </p>

                <div
                  class="mt-7 flex items-center justify-between gap-3 rounded-2xl border-2 border-dashed border-primary/40 bg-primary/5 p-3"
                >
                  <div class="px-2">
                    <p
                      class="text-[11px] font-semibold uppercase tracking-widest text-gray-500"
                    >
                      Coupon Code
                    </p>

                    <p
                      class="mt-1 text-xl font-black tracking-wide text-primary"
                    >
                      WELCOME20
                    </p>
                  </div>

                  <button
                    type="button"
                    class="flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-gray-200 transition hover:bg-gray-50"
                    @click="copyCoupon"
                  >
                    <UIcon
                      :name="copied ? 'i-lucide-check' : 'i-lucide-copy'"
                      class="h-4 w-4"
                    />

                    {{ copied ? "Copied" : "Copy" }}
                  </button>
                </div>

                <!-- Shop button -->
                <NuxtLink
                  to="/products"
                  class="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 text-base font-bold text-white shadow-lg shadow-primary/25 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30"
                  @click="closePopup"
                >
                  Shop Now

                  <UIcon name="i-lucide-arrow-right" class="h-5 w-5" />
                </NuxtLink>

                <button
                  type="button"
                  class="mt-4 w-full text-center text-sm font-medium text-gray-500 transition hover:text-gray-900"
                  @click="closePopup"
                >
                  No thanks, maybe later
                </button>

                <p class="mt-5 text-center text-xs text-gray-400">
                  Offer terms and conditions may apply.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.popup-enter-active,
.popup-leave-active {
  transition: all 0.35s ease;
}

.popup-enter-active > div,
.popup-leave-active > div {
  transition: all 0.35s ease;
}

.popup-enter-from,
.popup-leave-to {
  opacity: 0;
}

.popup-enter-from > div {
  opacity: 0;
  transform: translateY(30px) scale(0.95);
}

.popup-leave-to > div {
  opacity: 0;
  transform: translateY(20px) scale(0.97);
}
</style>
