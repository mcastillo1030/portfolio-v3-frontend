// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['@/assets/scss/global.scss'],
  nitro: {
    prerender: {
      crawlLinks: true,
    }
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
