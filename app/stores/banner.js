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
        const response = await $api("/api/v1/banners");
        this.banners = response;
        return response;
      } catch (error) {
        this.errors = error?.response?._data?.errors;
        throw error;
      }
    },

    async show(banner) {
      const { $api } = useNuxtApp();
      try {
        const response = await $api(`/api/v1/banners/${banner}`);
        return response.data;
      } catch (error) {
        this.errors = error?.response?._data?.errors;
        throw error;
      }
    },

    async update(banner, payload) {
      const { $api } = useNuxtApp();
      this.loading = true;
      const toast = useToast();
      try {
        const response = await $api(`/api/v1/banners/${banner}`, {
          method: "PUT",
          body: payload,
        });
        toast.add({
          title: response.message,
        });
        return response.data;
      } catch (error) {
        this.errors = error?.response?._data?.errors;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async image(banner, payload) {
      const { $api } = useNuxtApp();
      this.loading = true;
      const toast = useToast();
      try {
        const response = await $api(`/api/v1/banners/${banner}/image`, {
          method: "POST",
          body: payload,
        });
        toast.add({
          title: response.message,
        });
        return response.data;
      } catch (error) {
        this.errors = error?.response?._data?.errors;
        throw error;
      } finally {
        this.loading = false;
      }
    },
  },
});
