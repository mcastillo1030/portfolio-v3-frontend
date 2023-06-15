// https://nuxt.com/docs/api/configuration/nuxt-config
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
  gtm: {
    id: 'GTM-5L4X6GD',
    defer: true,
  },
  modules: [
    '@nuxtjs/sanity',
    '@zadigetvoltaire/nuxt-gtm',
  ],
  nitro: {
    prerender: {
      crawlLinks: true,
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
  devtools: {
    enabled: false,
  },
})
