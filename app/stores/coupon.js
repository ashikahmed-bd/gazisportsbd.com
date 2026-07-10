export const useCouponStore = defineStore("coupon", {
  state: () => ({
    loading: false,
    errors: [],
  }),

  getters: {},

  actions: {
    async apply(payload) {
      const { $api } = useNuxtApp();
      this.loading = true;
      try {
        const response = await $api("/api/cart/coupon/apply", {
          method: "POST",
          body: {
            code: payload.code,
          },
        });
        return response;
      } catch (error) {
        this.errors = error?.response?._data?.errors;
        throw error;
      } finally {
        this.loading = false;
      }
    },
  },
});
