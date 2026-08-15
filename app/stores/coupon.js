export const useCouponStore = defineStore("coupon", {
  state: () => ({
    loading: false,
    errors: [],
    coupons: [],
    coupon: {},
  }),

  getters: {},

  actions: {
    async all(page) {
      const { $api } = useNuxtApp();
      try {
        const response = await $api(`/api/v1/coupons`, {
          query: {
            page: page,
          },
        });
        this.coupons = response;
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
        const response = await $api(`/api/v1/coupons`, {
          method: "POST",
          body: payload,
        });
        toast.add({
          title: response.message,
        });
        setTimeout(() => {
          navigateTo("/admin/coupons");
        }, 2000);
      } catch (error) {
        this.errors = error?.response?._data?.errors;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async show(coupon) {
      const { $api } = useNuxtApp();
      try {
        const response = await $api(`/api/v1/coupons/${coupon}`);
        return response.data;
      } catch (error) {
        this.errors = error?.response?._data?.errors;
        throw error;
      }
    },

    async update(coupon, payload) {
      const { $api } = useNuxtApp();
      const toast = useToast();
      this.loading = true;
      try {
        const response = await $api(`/api/v1/coupons/${coupon}`, {
          method: "PUT",
          body: payload,
        });
        toast.add({
          title: response.message,
        });
        setTimeout(() => {
          navigateTo("/admin/coupons");
        }, 2000);
      } catch (error) {
        this.errors = error?.response?._data?.errors;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async delete(coupon) {
      const { $api } = useNuxtApp();
      try {
        const response = await $api(`/api/v1/coupons/${coupon}`, {
          method: "DELETE",
        });
        return response;
      } catch (error) {
        this.errors = error?.response?._data?.errors;
        throw error;
      }
    },

    async apply(payload) {
      const { $api } = useNuxtApp();
      const toast = useToast();
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
        toast.add({
          title: error?.response?._data?.message,
        });
        throw error;
      } finally {
        this.loading = false;
      }
    },
  },
});
