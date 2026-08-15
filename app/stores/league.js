import { page } from "#build/ui";

export const useLeagueStore = defineStore("league", {
  state: () => ({
    loading: false,
    errors: {},
    leagues: [],
    league: {},
  }),

  getters: {},

  actions: {
    async all(page) {
      const { $api } = useNuxtApp();
      try {
        const response = await $api(`/api/v1/leagues`, {
          query: {
            page: page,
          },
        });
        this.leagues = response;
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
        const response = await $api(`/api/v1/leagues`, {
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

    async show(league) {
      const { $api } = useNuxtApp();
      try {
        const response = await $api(`/api/v1/leagues/${league}`);
        return response.data;
      } catch (error) {
        this.errors = error?.response?._data?.errors;
        throw error;
      }
    },

    async update(league, payload) {
      const { $api } = useNuxtApp();
      const toast = useToast();
      this.loading = true;
      try {
        const response = await $api(`/api/v1/leagues/${league}`, {
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

    async delete(league) {
      const { $api } = useNuxtApp();
      try {
        const response = await $api(`/api/v1/leagues/${league}`, {
          method: "DELETE",
        });
        return response;
      } catch (error) {
        this.errors = error?.response?._data?.errors;
        throw error;
      }
    },

    async logo(league, payload) {
      const { $api } = useNuxtApp();
      const toast = useToast();
      this.loading = true;
      try {
        const response = await $api(`/api/v1/leagues/${league}/logo`, {
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
        const response = await $api(`/api/v1/search/leagues`, {
          method: "GET",
          query: query,
        });
        this.leagues = response;
        return response;
      } catch (error) {
        this.errors = error?.response?._data?.errors;
        throw error;
      }
    },
  },
});
