<script setup>
definePageMeta({
  layout: "admin",
});

const appStore = useAppStore();

const general = reactive({
  site_name: "",
  tagline: "",
  theme_color: "#2e7d46",
  language: "en",
  timezone: "Asia/Dhaka",
  website_url: "",
});

const contact = reactive({
  phone: "",
  email: "",
  address: "",
  whatsapp: "",
  facebook: "",
  instagram: "",
  youtube: "",
  tiktok: "",
  twitter: "",
  linkedin: "",
});

const popup = reactive({
  enabled: false,
  title: "",
  subtitle: "",
  description: "",
  coupon_code: "",
  button_text: "",
});

const loading = ref(false);

const loadSettings = async () => {
  const response = await appStore.getSettings();

  if (response?.general) {
    Object.assign(general, response.general);
  }

  if (response?.contact) {
    Object.assign(contact, response.contact);
  }

  if (response?.popup) {
    Object.assign(popup, {
      ...response.popup,
      enabled:
        response.popup.enabled === true ||
        response.popup.enabled === 1 ||
        response.popup.enabled === "1",
    });
  }
};

const saveGeneral = async () => {
  await appStore.updateGeneral(general);
};

const saveContact = async () => {
  await appStore.updateContact(contact);
};

const savePopup = async () => {
  await appStore.updatePopup(popup);
};

onMounted(() => {
  loadSettings();
});

useSeoMeta({
  title: "Settings",
});
</script>

<template>
  <main class="space-y-6">
    <div class="card">
      <div class="card__header">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Website Settings</h1>

          <p class="mt-1 text-sm text-gray-500">
            Manage your website configuration and preferences.
          </p>
        </div>
      </div>

      <div class="card__body">
        <UTabs
          :items="[
            {
              label: 'General',
              slot: 'general',
              icon: 'i-lucide-settings',
            },
            {
              label: 'Contact & Social',
              slot: 'contact',
              icon: 'i-lucide-phone',
            },
            {
              label: 'Popup',
              slot: 'popup',
              icon: 'i-lucide-panels-top-left',
            },
          ]"
          variant="link"
        >
          <!-- General -->
          <template #general>
            <div class="w-full">
              <div class="grid gap-5 p-6 md:grid-cols-2">
                <UFormField label="Website Name">
                  <UInput
                    v-model="general.site_name"
                    placeholder="Gazi Sports"
                    icon="i-lucide-globe"
                    class="w-full"
                  />
                </UFormField>

                <UFormField label="Tagline">
                  <UInput
                    v-model="general.tagline"
                    placeholder="Official Sports Store"
                    icon="i-lucide-text"
                    class="w-full"
                  />
                </UFormField>

                <UFormField label="Website URL">
                  <UInput
                    v-model="general.website_url"
                    type="url"
                    placeholder="https://gazisportsbd.com"
                    icon="i-lucide-link"
                    class="w-full"
                  />
                </UFormField>

                <UFormField label="Theme Color">
                  <div class="flex gap-2">
                    <input
                      v-model="general.theme_color"
                      type="color"
                      class="h-10 w-12 cursor-pointer rounded-lg border border-gray-300 p-1"
                    />

                    <UInput
                      v-model="general.theme_color"
                      placeholder="#111827"
                      class="flex-1"
                    />
                  </div>
                </UFormField>

                <UFormField label="Language">
                  <USelect
                    v-model="general.language"
                    :items="[
                      {
                        label: 'English',
                        value: 'en',
                      },
                      {
                        label: 'Bangla',
                        value: 'bn',
                      },
                    ]"
                    class="w-full"
                  />
                </UFormField>

                <UFormField label="Timezone">
                  <USelect
                    v-model="general.timezone"
                    :items="[
                      {
                        label: 'Asia/Dhaka',
                        value: 'Asia/Dhaka',
                      },
                      {
                        label: 'UTC',
                        value: 'UTC',
                      },
                    ]"
                    class="w-full"
                  />
                </UFormField>
              </div>
              <UButton
                color="primary"
                icon="i-lucide-save"
                :loading="appStore.loading"
                @click="saveGeneral"
              >
                Save Changes
              </UButton>
            </div>
          </template>

          <!-- Contact -->
          <template #contact>
            <div class="space-y-6 p-6">
              <div>
                <h3 class="text-base font-semibold text-gray-900">
                  Contact Information
                </h3>

                <p class="mt-1 text-sm text-gray-500">
                  Manage your business contact information.
                </p>
              </div>

              <div class="grid gap-5 md:grid-cols-2">
                <UFormField label="Phone">
                  <UInput
                    v-model="contact.phone"
                    type="tel"
                    placeholder="880 1955-213569"
                    icon="i-lucide-phone"
                    class="w-full"
                  />
                </UFormField>

                <UFormField label="Email">
                  <UInput
                    v-model="contact.email"
                    type="email"
                    placeholder="gazisports07@gmail.com"
                    icon="i-lucide-mail"
                    class="w-full"
                  />
                </UFormField>

                <UFormField label="WhatsApp">
                  <UInput
                    v-model="contact.whatsapp"
                    type="tel"
                    placeholder="8801955213569"
                    icon="i-lucide-message-circle"
                    class="w-full"
                  />
                </UFormField>

                <UFormField label="Address" class="md:col-span-2">
                  <UTextarea
                    v-model="contact.address"
                    :rows="3"
                    placeholder="Business address"
                    icon="i-lucide-map-pin"
                    class="w-full"
                  />
                </UFormField>
              </div>

              <div>
                <h3 class="text-base font-semibold text-gray-900">
                  Social Media
                </h3>

                <p class="mt-1 text-sm text-gray-500">
                  Add your social media profile links.
                </p>
              </div>

              <div class="grid gap-5 md:grid-cols-2">
                <UFormField label="Facebook">
                  <UInput
                    v-model="contact.facebook"
                    type="url"
                    placeholder="https://facebook.com/gazisports"
                    icon="i-lucide-facebook"
                    class="w-full"
                  />
                </UFormField>

                <UFormField label="Instagram">
                  <UInput
                    v-model="contact.instagram"
                    type="url"
                    placeholder="https://instagram.com/gazisports"
                    icon="i-lucide-instagram"
                    class="w-full"
                  />
                </UFormField>

                <UFormField label="YouTube">
                  <UInput
                    v-model="contact.youtube"
                    type="url"
                    placeholder="https://youtube.com/@gazisports"
                    icon="i-lucide-youtube"
                    class="w-full"
                  />
                </UFormField>

                <UFormField label="TikTok">
                  <UInput
                    v-model="contact.tiktok"
                    type="url"
                    placeholder="https://tiktok.com/@gazisports"
                    icon="i-lucide-music-2"
                    class="w-full"
                  />
                </UFormField>

                <UFormField label="Twitter / X">
                  <UInput
                    v-model="contact.twitter"
                    type="url"
                    placeholder="https://x.com/gazisports"
                    icon="i-lucide-twitter"
                    class="w-full"
                  />
                </UFormField>

                <UFormField label="LinkedIn">
                  <UInput
                    v-model="contact.linkedin"
                    type="url"
                    placeholder="https://linkedin.com/company/gazisports"
                    icon="i-lucide-linkedin"
                    class="w-full"
                  />
                </UFormField>
              </div>

              <UButton
                color="primary"
                icon="i-lucide-save"
                :loading="appStore.loading"
                @click="saveContact"
              >
                Save Changes
              </UButton>
            </div>
          </template>

          <!-- Popup -->
          <template #popup>
            <div class="max-w-3xl space-y-6 p-6">
              <div>
                <h3 class="text-base font-semibold text-gray-900">
                  Popup Settings
                </h3>

                <p class="mt-1 text-sm text-gray-500">
                  Configure the promotional popup shown to customers.
                </p>
              </div>

              <div class="grid gap-5 sm:grid-cols-2">
                <UFormField label="Title" class="sm:col-span-2">
                  <UInput
                    v-model="popup.title"
                    placeholder="Get 20% OFF Your First Order"
                    icon="i-lucide-megaphone"
                    class="w-full"
                  />
                </UFormField>

                <UFormField label="Subtitle" class="sm:col-span-2">
                  <UInput
                    v-model="popup.subtitle"
                    placeholder="Spend ৳2,000 or more and enjoy 20% OFF"
                    icon="i-lucide-heading"
                    class="w-full"
                  />
                </UFormField>

                <UFormField label="Description" class="sm:col-span-2">
                  <UTextarea
                    v-model="popup.description"
                    placeholder="Enjoy 20% OFF your first purchase. Use the code below at checkout."
                    :rows="4"
                    class="w-full"
                  />
                </UFormField>

                <UFormField label="Coupon Code">
                  <UInput
                    v-model="popup.coupon_code"
                    placeholder="WELCOME20"
                    icon="i-lucide-ticket-percent"
                    class="w-full"
                  />
                </UFormField>

                <UFormField label="Button Text">
                  <UInput
                    v-model="popup.button_text"
                    placeholder="Copy Code"
                    icon="i-lucide-copy"
                    class="w-full"
                  />
                </UFormField>

                <div
                  class="flex items-center justify-between rounded-lg border border-gray-200 p-4 sm:col-span-2"
                >
                  <div>
                    <p class="text-sm font-medium text-gray-900">
                      Enable Popup
                    </p>

                    <p class="mt-1 text-xs text-gray-500">
                      Show this promotional popup to customers.
                    </p>
                  </div>

                  <USwitch v-model="popup.enabled" />
                </div>
              </div>

              <UButton
                color="primary"
                icon="i-lucide-save"
                :loading="appStore.loading"
                @click="savePopup"
              >
                Save Changes
              </UButton>
            </div>
          </template>
        </UTabs>
      </div>
    </div>
  </main>
</template>
