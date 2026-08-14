// https://nuxt.com/docs/api/configuration/nuxt-config

import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  
  devtools: { enabled: true },

  modules: ['@nuxt/ui', '@nuxt/image', '@pinia/nuxt', 'pinia-plugin-unstorage/nuxt', '@nuxtjs/mdc'],

  css: ['./app/assets/css/main.css'],

  mdc: {
    components: {
      prose: true,
    }
  },

  components: [
    {
      path: '~/components',
      global: true
    },
    {
      path: '~/components/prose',
      global: true
    }
  ],

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  runtimeConfig: {
    public: {
      apiBase: "http://127.0.0.1:8000", // http://127.0.0.1:8000 https://gazisportsbd.com
      siteUrl: 'https://gazisportsbd.com'
    },
  },


  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
      htmlAttrs: {
        lang: 'en',
      },
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
      meta: [
        { name: 'google-site-verification', content: '' },
      ],

      bodyAttrs: {
        class: 'antialiased bg-background min-h-screen',
      },
    },
  },
})