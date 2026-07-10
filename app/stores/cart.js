export const useCartStore = defineStore("cart", {
  state: () => ({
    loading: false,
    errors: {},
    cart: null,
  }),

  getters: {},

  actions: {
    async getItems() {
      const { $api } = useNuxtApp();
      try {
        const response = await $api("/api/cart");
        this.cart = response.data;
        return response.data;
      } catch (error) {
        this.errors = error?.response?._data?.errors;
        throw error;
      }
    },

    async add(payload) {
      this.loading = true;
      const { $api } = useNuxtApp();
      try {
        const response = await $api("/api/cart", {
          method: "POST",
          body: payload,
        });
        return response.data;
      } catch (error) {
        this.errors = error?.response?._data?.errors;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    /**
     * Increase item quantity
     */
    async increase(item) {
      const { $api } = useNuxtApp();

      try {
        const response = await $api(`/api/cart/items/${item.id}`, {
          method: "PUT",
          body: {
            quantity: Number(item.quantity) + 1,
          },
        });

        return response;
      } catch (error) {
        this.errors = error?.response?._data?.errors || {};

        throw error;
      }
    },

    /**
     * Decrease item quantity
     */
    async decrease(item) {
      const { $api } = useNuxtApp();

      try {
        if (item.quantity <= 1) {
          return this.remove(item.id);
        }

        const response = await $api(`/api/cart/items/${item.id}`, {
          method: "PUT",
          body: {
            quantity: Number(item.quantity) - 1,
          },
        });

        return response;
      } catch (error) {
        this.errors = error?.response?._data?.errors || {};
        throw error;
      }
    },

    /**
     * Remove item
     */
    async remove(item) {
      const { $api } = useNuxtApp();

      try {
        const response = await $api(`/api/cart/items/${item.id}`, {
          method: "DELETE",
        });

        return response;
      } catch (error) {
        this.errors = error?.response?._data?.errors || {};
        throw error;
      }
    },

    /**
     * Clear cart
     */
    async clear() {
      const { $api } = useNuxtApp();
      try {
        const response = await $api("/api/cart/clear", {
          method: "DELETE",
        });

        return response;
      } catch (error) {
        this.errors = error?.response?._data?.errors || {};
        throw error;
      }
    },

    async buyNow(payload) {
      const { $api } = useNuxtApp();
      this.loading = true;
      try {
        const response = await $api("/api/cart", {
          method: "POST",
          body: payload,
        });
        return response.data;
      } catch (error) {
        this.errors = error?.response?._data?.errors;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async checkout(payload) {
      const { $api } = useNuxtApp();
      this.loading = true;
      try {
        const response = await $api("/api/checkout", {
          method: "POST",
          body: payload,
        });
        this.$reset();
        return navigateTo(response.redirect_url, {
          external: true,
        });
      } catch (error) {
        this.errors = error?.response?._data?.errors;
        throw error;
      } finally {
        this.loading = false;
      }
    },
  },
});
