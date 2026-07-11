export const useBannerStore = defineStore("banner", {
  state: () => ({
    loading: false,
    errors: [],
    banners: [],
    banner: [],
  }),

  getters: {},

  actions: {
    async all() {
      const { $api } = useNuxtApp();
      try {
        const response = await $api.post("/api/v1/banners");
        return response;
      } catch (error) {
        this.errors = error?.response?._data?.errors;
        throw error;
      }
    },
  },
});
