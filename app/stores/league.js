export const useLeagueStore = defineStore("league", {
  state: () => ({
    loading: false,
    errors: {},
    leagues: [],
    league: {},
  }),

  getters: {},

  actions: {
    async all() {
      const { $api } = useNuxtApp();
      try {
        const response = await $api(`/api/v1/leagues`);
        this.leagues = response;
        return response;
      } catch (error) {
        this.errors = error?.response?._data?.errors;
        throw error;
      }
    },
  },
});
