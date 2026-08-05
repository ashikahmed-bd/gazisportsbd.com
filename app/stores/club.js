export const useClubStore = defineStore("club", {
  state: () => ({
    loading: false,
    errors: {},
    clubs: [],
    club: {},
  }),

  getters: {},

  actions: {
    async all() {
      const { $api } = useNuxtApp();
      try {
        const response = await $api(`/api/v1/clubs`);
        this.clubs = response;
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
        const response = await $api(`/api/v1/clubs`, {
          method: "POST",
          body: payload,
        });
        toast.add({
          title: response.message,
        });
        setTimeout(() => {
          navigateTo("/admin/clubs");
        }, 2000);
      } catch (error) {
        this.errors = error?.response?._data?.errors;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async show(club) {
      const { $api } = useNuxtApp();
      try {
        const response = await $api(`/api/v1/clubs/${club}`);
        return response.data;
      } catch (error) {
        this.errors = error?.response?._data?.errors;
        throw error;
      }
    },

    async update(club, payload) {
      const { $api } = useNuxtApp();
      const toast = useToast();
      this.loading = true;
      try {
        const response = await $api(`/api/v1/clubs/${club}`, {
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

    async delete(club) {
      const { $api } = useNuxtApp();
      try {
        const response = await $api(`/api/v1/clubs/${club}`, {
          method: "DELETE",
        });
        return response;
      } catch (error) {
        this.errors = error?.response?._data?.errors;
        throw error;
      }
    },

    async logo(club, payload) {
      const { $api } = useNuxtApp();
      const toast = useToast();
      this.loading = true;
      try {
        const response = await $api(`/api/v1/clubs/${club}/logo`, {
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

    async search(query) {
      const { $api } = useNuxtApp();
      try {
        const response = await $api(`/api/v1/search/clubs`, {
          method: "GET",
          query: query,
        });
        this.clubs = response;
        return response;
      } catch (error) {
        this.errors = error?.response?._data?.errors;
        throw error;
      }
    },
  },
});
