<template>
  <div id="wrapper">
    <Header />
    <slot />
    <Footer />
  </div>
</template>

<script lang="ts" setup>
  const colorMode = useColorMode();
  const gtm = useGtm();
  const route = useRoute();

  const parseColorMode = () => {
    return colorMode.value === 'light' ?
      'light' :
      (
        (
          colorMode.value === 'system' &&
          window.matchMedia('(prefers-color-scheme: light)').matches
        ) ?
        'light' :
        'dark'
      );
  };

  const getFaviDir = () => {
    return `/favicon/${parseColorMode()}`;
  };

  const changeColorMode = (newMode:string) => {
    const currentMode = document.querySelector('body')?.classList.contains('light-mode') ? 'light' : 'dark';

    if ( newMode !== 'system' && currentMode === newMode ) {
      return;
    }

    if ( 'system' === newMode )  {
      const systemMode = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
      document.querySelector('body')?.classList.toggle('light-mode', systemMode === 'light');
    } else {
      document.querySelector('body')?.classList.toggle('light-mode', newMode === 'light');
    }

    colorMode.value = newMode;
    localStorage.setItem('color-mode', newMode);
  };

  watch(colorMode, changeColorMode);

  useHead({
    htmlAttrs: {
      lang: 'en',
    },
    link: [
      computed(() => {
        return {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: getFaviDir() + '/apple-touch-icon.png',
        };
      }),
      computed(() => {
        return {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: getFaviDir() + '/favicon-32x32.png',
        };
      }),
      computed(() => {
        return {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: getFaviDir() + '/favicon-16x16.png',
        };
      }),
      computed(() => {
        return {
          rel: 'manifest',
          href: getFaviDir() + '/site.webmanifest',
        };
      }),
      computed(() => {
        return {
          rel: 'mask-icon',
          href: getFaviDir() + '/safari-pinned-tab.svg',
          color: parseColorMode() === 'light' ? '#fbfbfb' : '#011627',
        };
      }),
    ],
    meta: [
      computed(() => {
        return {
          name: 'msapplication-TileColor',
          content: parseColorMode() === 'light' ? '#fbfbfb' : '#011627',
        };
      }),
      computed(() => {
        return {
          name: 'theme-color',
          content: parseColorMode() === 'light' ? '#fbfbfb' : '#011627',
        };
      }),
    ],
  });

  onMounted(() => {
    const hasColorMode = typeof localStorage !== 'undefined' && localStorage.getItem('color-mode') !== null;
    const systemMode = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    const wantsMode = hasColorMode ? String(localStorage.getItem('color-mode')) : systemMode;

    changeColorMode(wantsMode);
    gtm?.trackView(route.name as string, route.path);
  });
</script>