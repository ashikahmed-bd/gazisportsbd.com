<script setup></script>

<template>
  <main class="py-10">
    <div
      class="max-w-3xl mx-auto rounded-2xl border border-border bg-white px-6 py-12 text-center"
    >
      <div
        class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100"
      >
        <UIcon name="i-lucide-shopping-cart" class="h-7 w-7 text-gray-400" />
      </div>

      <h2 class="mt-5 text-xl font-bold text-gray-900">Your cart is empty</h2>

      <p class="mt-2 text-sm text-gray-500">
        Add some products before proceeding to checkout.
      </p>

      <NuxtLink
        to="/shop"
        class="mt-6 inline-flex h-11 items-center justify-center rounded-xl bg-primary px-6 font-medium text-white transition hover:opacity-90"
      >
        Continue Shopping
      </NuxtLink>
    </div>
  </main>
</template>
