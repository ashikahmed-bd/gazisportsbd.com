<script setup></script>

<template>
  <main class="bg-slate-50 py-10 px-4">
    <Head>
      <Title>Order Successful | Thank You</Title>
      <Meta
        name="description"
        content="Your order has been placed successfully."
      />
      <Meta name="robots" content="noindex,nofollow" />
    </Head>

    <div class="max-w-3xl mx-auto overflow-hidden rounded-3xl bg-white">
      <div class="px-8 pt-10 text-center">
        <div
          class="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-primary shadow-lg shadow-primary/20"
        >
          <UIcon name="i-lucide-check" class="h-12 w-12 text-white" />
        </div>

        <h1 class="text-3xl font-bold text-slate-900">
          Order Placed Successfully
        </h1>

        <p class="mt-3 text-slate-600">Thank you for your purchase.</p>

        <p class="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-500">
          We've received your order successfully. Our support team will contact
          you shortly to confirm your order details before processing.
        </p>
      </div>

      <div class="grid gap-4 px-8 py-8 md:grid-cols-3">
        <div
          class="rounded-2xl border border-green-100 bg-green-50 p-5 text-center transition hover:-translate-y-1 hover:shadow-md"
        >
          <div
            class="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100"
          >
            <UIcon name="i-lucide-package-check" class="text-green-600" />
          </div>

          <h3 class="font-semibold text-slate-900">Order Received</h3>

          <p class="mt-1 text-sm text-slate-500">
            Your order has been received successfully.
          </p>
        </div>

        <div
          class="rounded-2xl border border-blue-100 bg-blue-50 p-5 text-center transition hover:-translate-y-1 hover:shadow-md"
        >
          <div
            class="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100"
          >
            <UIcon name="i-lucide-phone-call" class="text-blue-600" />
          </div>

          <h3 class="font-semibold text-slate-900">Phone Confirmation</h3>

          <p class="mt-1 text-sm text-slate-500">
            We'll call you within 24 hours.
          </p>
        </div>

        <div
          class="rounded-2xl border border-cyan-100 bg-cyan-50 p-5 text-center transition hover:-translate-y-1 hover:shadow-md"
        >
          <div
            class="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-cyan-100"
          >
            <UIcon name="i-lucide-truck" class="text-cyan-600" />
          </div>

          <h3 class="font-semibold text-slate-900">Delivery</h3>

          <p class="mt-1 text-sm text-slate-500">
            Estimated delivery in 3-5 business days.
          </p>
        </div>
      </div>

      <div class="px-8">
        <div class="rounded-2xl border border-amber-200 bg-amber-50 p-5">
          <div class="flex items-start gap-3">
            <UIcon name="i-lucide-info" class="mt-0.5 text-amber-600" />

            <div>
              <h4 class="font-semibold text-slate-900">
                Important Information
              </h4>

              <p class="mt-1 text-sm leading-6 text-slate-600">
                Please keep your phone available. Our support team will call to
                confirm your order. Kindly check your package before accepting
                delivery.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="px-8 py-6 text-center">
        <p class="text-sm text-slate-500">
          Need help?
          <a href="/contact" class="font-medium text-primary hover:underline">
            Contact Support
          </a>
        </p>
      </div>
    </div>
  </main>
</template>
