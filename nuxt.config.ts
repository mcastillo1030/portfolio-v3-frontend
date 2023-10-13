// https://nuxt.com/docs/api/configuration/nuxt-config
import localStorageDriver from "unstorage/drivers/localstorage";

export default defineNuxtConfig({
  app: {
    pageTransition: {
      name: 'page',
      mode: 'out-in',
    },
  },
  build: {
    transpile: ['gsap'],
  },
  css: ['@/assets/scss/global.scss'],
  devtools: {
    enabled: false,
  },
  gtm: {
    id: 'GTM-5L4X6GD',
    defer: true,
  },
  modules: [
    '@nuxtjs/sanity',
    '@zadigetvoltaire/nuxt-gtm',
    'nuxt-simple-sitemap',
  ],
  nitro: {
    prerender: {
      crawlLinks: true,
    },
    storage: {
      cache: {
        driver: localStorageDriver({ base: 'mcdev:'}),
      },
    }
  },
  routeRules: {
    '/index': {
      swr: 3600,
    },
    '/about': {
      swr: 3600,
    },
    '/rants': {
      swr: 3600,
    },
    '/rants/:id': {
      swr: 3600,
    },
    '/projects': {
      swr: 3600,
    },
    '/projects/:id': {
      swr: 3600,
    },
    '/img/**': {
      swr: 3600,
    },
    '/_nuxt/**': {
      swr: 3600,
    }
  },
  runtimeConfig: {
    public: {
      baseUrl: 'https://marloncastillo.dev',
    }
  },
  sanity: {
    projectId: 'hcfjxht8',
    apiVersion: '2023-06-07',
  },
  ssr: true,
  typescript: {
    shim: false,
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/scss/_bootstrap.scss" as c;'
        }
      }
    }
  },
})
