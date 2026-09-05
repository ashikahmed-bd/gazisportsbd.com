export const useAttributeStore = defineStore("attribute", {
  state: () => ({
    loading: false,
    errors: {},
    attributes: {},
  }),

  getters: {},

  actions: {
    async all() {
      const { $api } = useNuxtApp();
      try {
        const response = await $api("/api/v1/attributes");
        this.attributes = response;
        return response;
      } catch (error) {
        throw error;
      }
    },
  },
});
