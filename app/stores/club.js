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
  },
});
