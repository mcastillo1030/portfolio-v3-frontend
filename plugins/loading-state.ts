export default defineNuxtPlugin((nuxtApp) => {
  const loadingState = useAppLoading();

  nuxtApp.hook('app:rendered', () => {
    loadingState.value = false;
  });

  nuxtApp.hook('app:mounted', () => {
    loadingState.value = false;
  });

  nuxtApp.hook('page:start', () => {
    loadingState.value = true;
  });

  nuxtApp.hook('page:finish', () => {
    loadingState.value = false;
  });
});