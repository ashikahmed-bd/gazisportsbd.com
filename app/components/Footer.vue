<script setup>
const quickLinks = [
  { name: "Home", to: "/" },
  { name: "Shop", to: "/shop" },
  { name: "About Us", to: "/about" },
  { name: "Contact", to: "/contact" },
  { name: "FAQ", to: "/faq" },
];

const customerLinks = [
  { name: "Track Order", to: "/track-order" },
  { name: "Shipping Policy", to: "/shipping-policy" },
  { name: "Return & Refund", to: "/return-policy" },
  { name: "Privacy Policy", to: "/privacy-policy" },
  { name: "Terms & Conditions", to: "/terms" },
];

const socials = [
  {
    icon: "i-simple-icons-facebook",
    url: "https://www.facebook.com/share/19AcrviF4q/",
  },
  {
    icon: "i-simple-icons-instagram",
    url: "https://www.instagram.com/omarfarukomi_500",
  },
];
</script>

<template>
  <footer class="bg-gray-900">
    <div class="max-w-7xl mx-auto px-4">
      <div class="grid gap-10 pb-12 md:grid-cols-2 lg:grid-cols-4 py-12">
        <div>
          <NuxtImg
            src="/logo.png"
            alt="Gazi Sports BD"
            class="mb-5 h-12 w-auto"
          />
          <p class="text-sm">
            Gazi Sports BD is your trusted destination for premium football
            jerseys, sportswear and accessories. We provide authentic products
            with fast delivery all over Bangladesh.
          </p>
          <div class="mt-6 flex gap-3">
            <a
              v-for="social in socials"
              :key="social.icon"
              :href="social.url"
              target="_blank"
              class="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 transition hover:bg-primary"
            >
              <UIcon :name="social.icon" class="h-5 w-5 text-white" />
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h3
            class="mb-5 text-sm font-bold uppercase tracking-wider text-white"
          >
            Quick Links
          </h3>

          <ul class="space-y-3">
            <li v-for="link in quickLinks" :key="link.name">
              <NuxtLink
                :to="link.to"
                class="text-sm transition hover:text-primary"
              >
                {{ link.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Customer Service -->
        <div>
          <h3
            class="mb-5 text-sm font-bold uppercase tracking-wider text-white"
          >
            Customer Service
          </h3>

          <ul class="space-y-3">
            <li v-for="link in customerLinks" :key="link.name">
              <NuxtLink
                :to="link.to"
                class="text-sm transition hover:text-primary"
              >
                {{ link.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h3
            class="mb-5 text-sm font-bold uppercase tracking-wider text-white"
          >
            Contact Information
          </h3>

          <ul class="space-y-5 text-sm">
            <li class="flex gap-3">
              <UIcon
                name="i-lucide-phone"
                class="mt-0.5 h-5 w-5 shrink-0 text-primary"
              />

              <a href="tel:+8801955213569" class="hover:text-white">
                +880 1955-213569
              </a>
            </li>

            <li class="flex gap-3">
              <UIcon
                name="i-lucide-mail"
                class="mt-0.5 h-5 w-5 shrink-0 text-primary"
              />

              <a
                href="mailto:gazisports07@gmail.com"
                class="break-all hover:text-white"
              >
                gazisports07@gmail.com
              </a>
            </li>

            <li class="flex gap-3">
              <UIcon
                name="i-lucide-map-pin"
                class="mt-0.5 h-5 w-5 shrink-0 text-primary"
              />

              <address class="not-italic leading-6">
                Shop No. 202, 203 &amp; 204<br />
                Somobay Twin Tower Market (1st Floor)<br />
                Ramna, Gulistan, Dhaka-1000
              </address>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom -->
      <div
        class="flex flex-col items-center justify-between gap-4 border-t border-gray-800 py-6 text-center md:flex-row"
      >
        <p class="text-sm text-gray-500">
          © {{ new Date().getFullYear() }} Gazi Sports BD. All rights reserved.
        </p>

        <div class="flex flex-wrap items-center gap-2">
          <NuxtImg
            src="/logo/visa.png"
            alt="Visa"
            class="h-7 rounded border bg-white p-1"
          />

          <NuxtImg
            src="/logo/mastercard.png"
            alt="MasterCard"
            class="h-7 rounded border bg-white p-1"
          />

          <NuxtImg
            src="/logo/bkash.png"
            alt="bKash"
            class="h-7 rounded border bg-white p-1"
          />

          <NuxtImg
            src="/logo/nagad.png"
            alt="Nagad"
            class="h-7 rounded border bg-white p-1"
          />
        </div>
      </div>
    </div>
  </footer>
</template>
