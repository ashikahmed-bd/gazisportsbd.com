export const useVariantStore = defineStore("variant", {
  state: () => ({
    loading: false,
    errors: {},
  }),

  getters: {},

  actions: {
    async all(product) {
      const { $api } = useNuxtApp();
      try {
        return await $api(`/api/v1/products/${product}/variants`);
      } catch (error) {
        throw error;
      }
    },

    async store(product, payload) {
      const { $api } = useNuxtApp();
      const toast = useToast();
      this.loading = true;
      try {
        const response = await $api(`/api/v1/products/${product}/variants`, {
          method: "POST",
          body: payload,
        });
        toast.add({
          title: "Success",
          description: response.message,
          color: "success",
        });
        return response;
      } catch (error) {
        this.errors = error?.response?._data?.errors;
        toast.add({
          title: "Error",
          description: error?.response?._data.message,
          color: "error",
        });
        throw error;
      } finally {
        this.loading = false;
      }
    },
  },
});
