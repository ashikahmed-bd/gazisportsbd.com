export const useCategoryStore = defineStore("category", {
  state: () => ({
    errors: null,
    loading: false,
  }),

  getters: {},

  actions: {
    async getCategories() {
      const { $api } = useNuxtApp();
      try {
        const response = $api("/api/categories");
        return response;
      } catch (error) {
        this.errors = error?.response?._data?.errors;
        throw error;
      }
    },
  },
});
