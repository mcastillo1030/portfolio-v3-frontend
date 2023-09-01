import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('page:transition:finish', () => {
    console.log('here');
    ScrollTrigger.refresh();
  });
});