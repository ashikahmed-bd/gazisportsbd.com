export const useAuthStore = defineStore("auth", {
  state: () => ({
    loading: false,
    user: null,
    token: null,
    errors: {},
  }),

  unstorage: {
    pick: ["user", "token"],
  },

  getters: {
    loggedIn: (state) => !!state.token,
  },

  actions: {
    async login(payload) {
      this.loading = true;
      const { $api } = useNuxtApp();
      try {
        const response = await $api("/api/auth/login", {
          method: "POST",
          body: payload,
        });

        const authToken = useCookie("auth_token", {
          maxAge: 60 * 60 * 24 * 7,
          sameSite: "lax",
        });

        authToken.value = response.token;
        this.token = response.token;
        this.user = response.user;

        return response;
      } catch (error) {
        this.errors = error?.response?._data?.errors;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async getProfile() {
      const { $api } = useNuxtApp();

      if (this.user) return this.user;
      try {
        const token = this.token;
        if (!token) throw new Error("No token found");
        const response = await $api("/api/profile");
        return response;
      } catch (error) {
        this.errors = error?.response?._data?.errors;
        throw error;
      }
    },

    async register(formData) {
      const { $api } = useNuxtApp();
      this.loading = true;
      try {
        const response = await $api("/api/auth/register", formData);
        return response;
      } catch (error) {
        this.errors = error?.response?._data?.errors;
        throw error;
      }
    },

    async logout() {
      const { $api } = useNuxtApp();
      try {
        const response = await $api("/api/auth/logout");
        return response;
      } catch (error) {
        this.errors = error?.response?._data?.errors;
        throw error;
      }
    },
  },
});
