export default defineNuxtPlugin(() => {
  const api = $fetch.create({
    baseURL: "http://127.0.0.1:8000",

    async onRequest({ options }) {
      const authStore = useAuthStore();
      const cartToken = useCartToken();

      options.headers = {
        ...options.headers,

        Accept: "application/json",
        "X-Source": "Web",
        "X-Cart-Token": cartToken.value,

        ...(authStore.token && {
          Authorization: `Bearer ${authStore.token}`,
        }),
      };
    },

    async onResponseError({ response }) {
      if (response.status === 401) {
        const authStore = useAuthStore();

        authStore.$reset();

        return navigateTo("/auth/login");
      }
    },
  });

  return {
    provide: {
      api,
    },
  };
});
