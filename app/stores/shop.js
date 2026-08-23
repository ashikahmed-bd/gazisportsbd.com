export const useShopStore = defineStore("shop", {
  state: () => ({
    loading: false,
    errors: null,
  }),

  getters: {},

  actions: {
    async search(keyword) {
      const { $api } = useNuxtApp();
      this.loading = true;
      try {
        const response = await $api("/api/search", {
          query: {
            keyword: keyword,
          },
        });
        return response;
      } catch (error) {
        this.errors = error?.response?._data;
        throw error;
      } finally {
        this.loading = false;
      }
    },
  },
});
