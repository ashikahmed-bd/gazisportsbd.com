export const usePromoStore = defineStore("promo", {
  state: () => ({
    loading: false,
    errors: null,
  }),

  getters: {},

  actions: {
    async getByPosition(position) {
      const { $api } = useNuxtApp();
      this.loading = true;
      try {
        const response = await $api("/api/promos", {
          query: {
            position: position,
          },
        });
        return response.data;
      } catch (error) {
        this.errors = error?.response?._data;
        throw error;
      } finally {
        this.loading = false;
      }
    },
  },
});
