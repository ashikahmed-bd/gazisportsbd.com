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

    async show(product) {
      const { $api } = useNuxtApp();
      try {
        const response = await $api(`/api/v1/products/${product}`);
        return response.data;
      } catch (error) {
        this.errors = error?.response?._data?.errors;
        throw error;
      }
    },

    async update(product, payload) {
      const { $api } = useNuxtApp();
      this.loading = true;
      try {
        const response = await $api(`/api/v1/products/${product}`, {
          method: "PUT",
          body: payload,
        });
        return response;
      } catch (error) {
        this.errors = error?.response?._data?.errors;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async delete(product) {
      const { $api } = useNuxtApp();
      const toast = useToast();
      try {
        const response = await $api(`/api/v1/products/${product}`, {
          method: "DELETE",
        });
        toast.add({
          title: response.message,
        });
        return response;
      } catch (error) {
        this.errors = error?.response?._data?.errors;
        throw error;
      }
    },

    async media(product, payload) {
      const { $api } = useNuxtApp();
      this.loading = true;
      try {
        const response = await $api(`/api/v1/products/${product}/media`, {
          method: "POST",
          body: payload,
        });
        return response;
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
