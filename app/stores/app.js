export const useAppStore = defineStore("app", {
  state: () => ({
    errors: null,
    loading: false,
    dashboard: {},
  }),

  getters: {},

  actions: {
    async getHome() {
      const { $api } = useNuxtApp();
      try {
        return await $api("/api/home");
      } catch (error) {
        this.errors = error?.response?._data?.errors;
        throw error;
      }
    },

    async getDashboard() {
      const { $api } = useNuxtApp();
      try {
        const response = await $api("/api/v1/dashboard");
        this.dashboard = response;
        return response;
      } catch (error) {
        this.errors = error?.response?._data?.errors;
        throw error;
      }
    },
  },
});
