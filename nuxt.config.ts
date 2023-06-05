// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  build: {
    transpile: ['gsap'],
  },
  css: ['@/assets/scss/global.scss'],
  image: {
    domains: ['portfolio-v3-backend.test']
  },
  modules: [
    '@nuxt/image-edge',
  ],
  nitro: {
    prerender: {
      crawlLinks: true,
    }
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
