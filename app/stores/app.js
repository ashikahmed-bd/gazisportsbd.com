export const useAppStore = defineStore("app", {
  state: () => ({
    errors: null,
    loading: false,
    dashboard: {},
  }),

  getters: {},

  actions: {
    async getSettings() {
      const { $api } = useNuxtApp();
      try {
        const response = await $api("/api/v1/settings");
        return response;
      } catch (error) {
        this.errors = error?.response?._data?.errors;
        throw error;
      }
    },

    async updateGeneral(payload) {
      const { $api } = useNuxtApp();
      const toast = useToast();
      this.loading = true;
      try {
        const response = await $api("/api/v1/settings/general", {
          method: "POST",
          body: payload,
        });
        toast.add({
          title: "Settings updated successfully.",
        });
        return response;
      } catch (error) {
        this.errors = error?.response?._data?.errors;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async updateContact(payload) {
      const { $api } = useNuxtApp();
      const toast = useToast();
      this.loading = true;
      try {
        const response = await $api("/api/v1/settings/contact", {
          method: "POST",
          body: payload,
        });
        toast.add({
          title: "Settings updated successfully.",
        });
        return response;
      } catch (error) {
        this.errors = error?.response?._data?.errors;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async updatePopup(payload) {
      const { $api } = useNuxtApp();
      const toast = useToast();
      this.loading = true;
      try {
        const response = await $api("/api/v1/settings/popup", {
          method: "POST",
          body: payload,
        });
        toast.add({
          title: "Settings updated successfully.",
        });
        return response;
      } catch (error) {
        this.errors = error?.response?._data?.errors;
        throw error;
      } finally {
        this.loading = false;
      }
    },

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
