export const useOrderStore = defineStore("order", {
  state: () => ({
    loading: false,
    errors: [],
    orders: [],
    order: {},
  }),

  getters: {},

  actions: {
    async all(page) {
      const { $api } = useNuxtApp();
      try {
        const response = await $api("/api/v1/orders", {
          query: {
            page: page,
          },
        });
        this.orders = response;
        return response;
      } catch (error) {
        this.errors = error?.response?._data?.errors;
        throw error;
      }
    },

    async show(order) {
      const { $api } = useNuxtApp();
      try {
        const response = await $api(`/api/v1/orders/${order}`);
        this.order = response.data;
        return response;
      } catch (error) {
        this.errors = error?.response?._data?.errors;
        throw error;
      }
    },

    async update(order, status) {
      const { $api } = useNuxtApp();
      this.loading = true;
      try {
        const response = await $api(`/api/v1/orders/${order}`, {
          method: "PUT",
          body: {
            status: status,
          },
        });
        this.order = response.data;
        return response;
      } catch (error) {
        this.errors = error?.response?._data?.errors;
        throw error;
      } finally {
        this.loading = false;
      }
    },
  },
});
