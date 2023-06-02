// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['@/assets/scss/global.scss'],
  nitro: {
    prerender: {
      crawlLinks: true,
    }
  },
  typescript: {
    shim: false,
  },
  build: {
    transpile: ['gsap'],
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
