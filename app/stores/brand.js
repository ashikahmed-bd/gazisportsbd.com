export const useBrandStore = defineStore("brand", {
  state: () => ({
    loading: false,
    errors: {},
    brands: [],
    brand: {},
  }),

  getters: {},

  actions: {
    async all() {
      const { $api } = useNuxtApp();
      try {
        const response = await $api(`/api/v1/brands`);
        this.brands = response;
        return response;
      } catch (error) {
        this.errors = error?.response?._data?.errors;
        throw error;
      }
    },

    async store(payload) {
      const { $api } = useNuxtApp();
      const toast = useToast();
      this.loading = true;
      try {
        const response = await $api(`/api/v1/brands`, {
          method: "POST",
          body: payload,
        });
        toast.add({
          title: response.message,
        });
        return response;
      } catch (error) {
        this.errors = error?.response?._data?.errors;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async show(brand) {
      const { $api } = useNuxtApp();
      try {
        const response = await $api(`/api/v1/brands/${brand}`);
        return response.data;
      } catch (error) {
        this.errors = error?.response?._data?.errors;
        throw error;
      }
    },

    async update(brand, payload) {
      const { $api } = useNuxtApp();
      const toast = useToast();
      this.loading = true;
      try {
        const response = await $api(`/api/v1/brands/${brand}`, {
          method: "PUT",
          body: payload,
        });
        toast.add({
          title: response.message,
        });
        return response;
      } catch (error) {
        this.errors = error?.response?._data?.errors;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async delete(brand) {
      const { $api } = useNuxtApp();
      try {
        const response = await $api(`/api/v1/brands/${brand}`, {
          method: "DELETE",
        });
        return response;
      } catch (error) {
        this.errors = error?.response?._data?.errors;
        throw error;
      }
    },

    async search() {
      const { $api } = useNuxtApp();
      try {
        const response = await $api(`/api/v1/search/brands`);
        this.brands = response;
        return response;
      } catch (error) {
        this.errors = error?.response?._data?.errors;
        throw error;
      }
    },

    async getBrands() {
      const { $api } = useNuxtApp();
      try {
        const response = await $api(`/api/brands`);
        this.brands = response;
        return response;
      } catch (error) {
        this.errors = error?.response?._data?.errors;
        throw error;
      }
    },

    async getProducts(brand, params = {}) {
      this.loading = true;
      const { $api } = useNuxtApp();
      try {
        const response = await $api(`/api/brands/${brand}/products`, {
          params: {
            page: params.page,
            limit: params.limit,
            sort: params.sort,
          },
        });

        return response;
      } catch (error) {
        this.errors = error?.response?._data?.errors;
        throw error;
      }
    },
  },
});
