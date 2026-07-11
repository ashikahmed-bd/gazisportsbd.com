<script setup>
defineProps({
  product: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <article
    class="group relative overflow-hidden rounded bg-white border border-border transition-all duration-300"
  >
    <div class="relative overflow-hidden bg-gray-50">
      <NuxtLink :to="`/product/${product.slug}`">
        <img
          :src="product.cover_url"
          :alt="product.name"
          class="h-auto w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </NuxtLink>

      <button
        class="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow transition hover:shadow-md"
      >
        <UIcon
          name="i-lucide-heart"
          class="h-4 w-4 text-gray-400 hover:text-red-500"
        />
      </button>

      <span
        v-if="product.discount_percentage"
        class="absolute top-3 left-3 rounded bg-red-500 px-2 py-1 text-[10px] font-semibold text-white"
      >
        -{{ product.discount_percentage }}%
      </span>
    </div>

    <div class="space-y-2 p-3">
      <p class="text-xs text-gray-500">
        {{ product.category?.name }}
      </p>

      <NuxtLink
        :to="`/product/${product.slug}`"
        class="block text-sm font-semibold text-gray-900 hover:text-primary line-clamp-2"
      >
        {{ product.name }}
      </NuxtLink>

      <div class="flex items-center gap-2">
        <span class="text-lg font-bold text-gray-900">
          ৳{{ product.price ?? product.base_price }}
        </span>

        <span
          v-if="product.price && product.price < product.base_price"
          class="text-sm text-gray-400 line-through"
        >
          ৳{{ product.base_price }}
        </span>

        <span
          v-if="product.discount_percentage"
          class="rounded bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-600"
        >
          -{{ product.discount_percentage }}%
        </span>
      </div>

      <a
        :href="`/product/${product.slug}`"
        class="cursor-pointer flex w-full items-center justify-center gap-2 rounded bg-primary px-4 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-primary-hover active:scale-95"
      >
        <UIcon name="i-lucide-shopping-cart" class="h-4 w-4" />
        <span>Add to Cart</span>
      </a>
    </div>
  </article>
</template>
