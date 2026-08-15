export default defineNuxtPlugin(async () => {
  const settings = useSettings();

  if (settings.value.general && Object.keys(settings.value.general).length) {
    return;
  }

  const { $api } = useNuxtApp();

  try {
    const response = await $api("/api/settings");

    settings.value = response;
  } catch (error) {
    console.error("Failed to load settings:", error);
  }
});
