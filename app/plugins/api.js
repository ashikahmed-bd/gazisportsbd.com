export default defineNuxtPlugin(() => {
  const api = $fetch.create({
    baseURL: "https://sports.buyzin.com", // https://sports.buyzin.com http://127.0.0.1:8000

    onRequest({ options }) {
      const authToken = useCookie("auth_token");
      const cartToken = useCartToken();

      options.headers = new Headers(options.headers);

      options.headers.set("X-Source", "Web");
      options.headers.set("Accept", "application/json");
      options.headers.set("X-Cart-Token", cartToken.value);

      if (authToken.value) {
        options.headers.set("Authorization", `Bearer ${authToken.value}`);
      }
    },

    async onResponseError({ response }) {
      if (response?.status === 401) {
        const authStore = useAuthStore();
        const authToken = useCookie("auth_token");

        authToken.value = null;
        authStore.$reset();

        navigateTo("/auth/login", { replace: true });
      }
    },
  });

  return {
    provide: {
      api,
    },
  };
});
