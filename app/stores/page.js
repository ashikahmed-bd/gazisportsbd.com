export const usePageStore = defineStore("page", {
  state: () => ({
    loading: false,
    errors: [],
    pages: [],
    page: null,
  }),

  getters: {},

  actions: {
    async all() {
      const { $api } = useNuxtApp();
      try {
        const response = await $api(`/api/v1/pages`);
        this.pages = response;
        return response;
      } catch (error) {
        this.errors = error?.response?._data?.errors;
        throw error;
      }
    },

    async show(page) {
      const { $api } = useNuxtApp();
      try {
        const response = await $api(`/api/v1/pages/${page}`);
        return response.data;
      } catch (error) {
        this.errors = error?.response?._data?.errors;
        throw error;
      }
    },

    async update(page, payload) {
      const { $api } = useNuxtApp();
      const toast = useToast();
      this.loading = true;
      try {
        const response = await $api(`/api/v1/pages/${page}`, {
          method: "PUT",
          body: payload,
        });
        toast.add({
          title: response.message,
        });
        setTimeout(() => {
          navigateTo("/admin/pages");
        }, 2000);
      } catch (error) {
        this.errors = error?.response?._data?.errors;
        throw error;
      } finally {
        this.loading = false;
      }
    },

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
