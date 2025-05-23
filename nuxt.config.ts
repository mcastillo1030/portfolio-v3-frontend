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

  gtag: {
    id: 'GTM-5L4X6GD',
  },

  image: {
    provider: 'sanity',
    sanity: {
      projectId: 'hcfjxht8',
    },
  },

  modules: ['@nuxt/image', 'nuxt-gtag', '@nuxtjs/sitemap', '@nuxtjs/sanity'],

  nitro: {
    prerender: {
      crawlLinks: true,
    },
  },

  routeRules: {
    '/img/**': { headers: { 'cache-control': `public,max-age=${365 * 24 * 60 * 60},s-maxage=${365 * 24 * 60 * 60}` } },
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

  compatibilityDate: '2025-05-23',

  devtools: {
    enabled: true
  }
})