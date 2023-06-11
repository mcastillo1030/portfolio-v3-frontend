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
  modules: [
    '@nuxtjs/sanity',
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
