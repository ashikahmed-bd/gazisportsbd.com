export const useProductStore = defineStore("product", {
  state: () => ({
    loading: false,
    errors: null,
    products: [],
    product: null,
    related: null,
  }),

  getters: {},

  actions: {
    async all() {
      const { $api } = useNuxtApp();
      try {
        const response = await $api("/api/v1/products");
        this.products = response;
        return response;
      } catch (error) {
        this.errors = error?.response?._data?.errors;
        throw error;
      }
    },

    async store(payload) {
      const { $api } = useNuxtApp();
      this.loading = true;
      try {
        return await $api("/api/v1/products", {
          method: "POST",
          body: payload,
        });
      } catch (error) {
        this.errors = error?.response?._data?.errors;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async getProduct(slug) {
      const { $api } = useNuxtApp();
      try {
        const response = await $api(`/api/products/${slug}`);
        return response.data;
      } catch (error) {
        this.errors = error?.response?._data?.errors;
        throw error;
      }
    },
  },
});
