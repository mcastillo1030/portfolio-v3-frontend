export default defineAppConfig({
  // baseApiUrl: 'https://portfolio-v3-backend.test/api/',
  baseApiUrl: 'https://api.mocki.io/v2/b092f31d',
  apiEndpoints: {
    pages: '/collections/pages/entries',
    projects: '/collections/projects/entries',
    sections: '/collections/sections/entries',
    mainNav: '/navs/main_nav/tree',
    footerNav: '/navs/footer_nav/tree',
    socialNav: '/navs/social/tree',
    globals: '/globals',
  },
})