export const useCategoryStore = defineStore("category", {
  state: () => ({
    errors: null,
    loading: false,
    categories: [],
    category: {},
  }),

  getters: {},

  actions: {
    async all() {
      const { $api } = useNuxtApp();
      try {
        const response = await $api(`/api/v1/categories`);
        this.categories = response;
        return response;
      } catch (error) {
        this.errors = error?.response?._data?.errors;
        throw error;
      }
    },

    async search() {
      const { $api } = useNuxtApp();
      try {
        const response = await $api(`/api/v1/search/categories`);
        this.categories = response;
        return response;
      } catch (error) {
        this.errors = error?.response?._data?.errors;
        throw error;
      }
    },

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
