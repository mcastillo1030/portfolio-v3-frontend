export default defineAppConfig({
  siteTitle: 'Marlon Castillo',
  imageSizes: [375, 640, 960, 1200, 1800],
  baseUrl: process.env.NODE_ENV || 'development' === 'development' ? 'http://v3.marloncastillo.dev' : 'https://marloncastillo.dev',
})