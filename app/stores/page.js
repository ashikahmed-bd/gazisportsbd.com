export const usePageStore = defineStore("page", {
  state: () => ({
    loading: false,
    errors: [],
  }),

  getters: {},

  actions: {
    async getPage(slug) {
      const { $api } = useNuxtApp();
      try {
        const response = await $api(`/api/pages/${slug}`);
        return response.data;
      } catch (error) {
        this.errors = error?.response?._data?.errors;
        throw error;
      }
    },
  },
});
