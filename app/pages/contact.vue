<script setup>
const contactInfo = {
  phone: "880 1955-213569",
  email: "gazisports07@gmail.com",
  address: [
    "Shop No. 202, 203 & 204",
    "Somobay Twin Tower Market (1st Floor)",
    "Ramna, Gulistan, Dhaka-1000",
  ],
};

useSeoMeta({
  title: "Contact Us",
  description:
    "Get in touch with us for any questions, support, or assistance.",
});
</script>

<template>
  <main>
    <section class="bg-white">
      <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div class="max-w-2xl">
          <p
            class="text-sm font-semibold uppercase tracking-wider text-gray-500"
          >
            Get in touch
          </p>

          <h1
            class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
          >
            Contact Us
          </h1>

          <p class="mt-4 text-base leading-7 text-gray-600">
            Have a question or need assistance? Feel free to contact us. Our
            team will be happy to help you.
          </p>
        </div>
      </div>
    </section>

    <section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div class="grid gap-6 lg:grid-cols-3">
        <a
          :href="`tel:${contactInfo.phone.replace(/\s/g, '')}`"
          class="group rounded-2xl border border-border bg-white p-6 transition hover:border-primary"
        >
          <div
            class="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100"
          >
            <UIcon name="i-lucide-phone" class="h-6 w-6 text-gray-900" />
          </div>

          <h2 class="mt-5 text-lg font-semibold text-gray-900">Phone</h2>

          <p class="mt-2 text-sm text-gray-600">Give us a call</p>

          <p class="mt-3 font-medium text-gray-900 group-hover:underline">
            {{ contactInfo.phone }}
          </p>
        </a>

        <a
          :href="`mailto:${contactInfo.email}`"
          class="group rounded-2xl border border-border bg-white p-6 transition hover:border-primary"
        >
          <div
            class="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100"
          >
            <UIcon name="i-lucide-mail" class="h-6 w-6 text-gray-900" />
          </div>

          <h2 class="mt-5 text-lg font-semibold text-gray-900">Email</h2>

          <p class="mt-2 text-sm text-gray-600">Send us an email</p>

          <p
            class="mt-3 break-all font-medium text-gray-900 group-hover:underline"
          >
            {{ contactInfo.email }}
          </p>
        </a>

        <div
          class="rounded-2xl border border-border bg-white p-6 transition hover:border-primary"
        >
          <div
            class="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100"
          >
            <UIcon name="i-lucide-map-pin" class="h-6 w-6 text-gray-900" />
          </div>

          <h2 class="mt-5 text-lg font-semibold text-gray-900">Visit Us</h2>

          <p class="mt-2 text-sm text-gray-600">Our store address</p>

          <address
            class="mt-3 text-sm font-medium not-italic leading-6 text-gray-900"
          >
            <span v-for="line in contactInfo.address" :key="line" class="block">
              {{ line }}
            </span>
          </address>
        </div>
      </div>

      <div
        class="mt-8 overflow-hidden rounded-2xl border border-gray-200 bg-white"
      >
        <div class="grid lg:grid-cols-2">
          <div class="p-6 sm:p-8 lg:p-10">
            <p
              class="text-sm font-semibold uppercase tracking-wider text-gray-500"
            >
              We're here to help
            </p>

            <h2 class="mt-2 text-2xl font-bold text-gray-900">
              Need assistance?
            </h2>

            <p class="mt-4 leading-7 text-gray-600">
              Whether you have questions about a product, your order, shipping,
              or anything else, don't hesitate to reach out.
            </p>

            <div class="mt-6 flex flex-wrap gap-3">
              <a
                :href="`tel:${contactInfo.phone.replace(/\s/g, '')}`"
                class="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
              >
                <UIcon name="i-lucide-phone" class="h-4 w-4" />
                Call Us
              </a>

              <a
                :href="`mailto:${contactInfo.email}`"
                class="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-900 transition hover:bg-gray-50"
              >
                <UIcon name="i-lucide-mail" class="h-4 w-4" />
                Email Us
              </a>
            </div>
          </div>

          <div class="min-h-80 bg-gray-100">
            <iframe
              class="h-full min-h-80 w-full border-0"
              src="https://www.google.com/maps?q=Gulistan,Dhaka,Bangladesh&output=embed"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              title="Our Location"
            />
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
