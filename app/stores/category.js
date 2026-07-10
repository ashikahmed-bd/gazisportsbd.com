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

    async store(payload) {
      const { $api } = useNuxtApp();
      this.loading = true;
      try {
        const response = await $api(`/api/v1/categories`, {
          method: "POST",
          body: payload,
        });
        return response;
      } catch (error) {
        this.errors = error?.response?._data?.errors;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async show(category) {
      const { $api } = useNuxtApp();
      try {
        const response = await $api(`/api/v1/categories/${category}`);
        this.category = response.data;
        return response.data;
      } catch (error) {
        this.errors = error?.response?._data?.errors;
        throw error;
      }
    },

    async update(category, payload) {
      const { $api } = useNuxtApp();
      try {
        const response = await $api(`/api/v1/categories/${category}`, {
          method: "PUT",
          body: payload,
        });
        return response;
      } catch (error) {
        this.errors = error?.response?._data?.errors;
        throw error;
      }
    },

    async delete(category) {
      const { $api } = useNuxtApp();
      try {
        const response = await $api(`/api/v1/categories/${category}`, {
          method: "DELETE",
        });

        return response;
      } catch (error) {
        this.errors = error?.response?._data?.errors;
        throw error;
      }
    },

    async media(category, payload) {
      const { $api } = useNuxtApp();
      this.loading = true;
      try {
        const response = await $api(`/api/v1/categories/${category}/media`, {
          method: "POST",
          body: payload,
        });
        return response;
      } catch (error) {
        this.errors = error?.response?._data?.errors;
        throw error;
      } finally {
        this.loading = false;
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
