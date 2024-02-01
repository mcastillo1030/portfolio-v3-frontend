<template>
  <div id="wrapper">
    <Header />
    <slot />
    <Footer />
    <Pointer />
  </div>
</template>

<script lang="ts" setup>
  import {
    useColorMode,
    useMenuAccordionState,
    useGtag,
    useRoute,
    watch,
    useHead,
    onMounted,
    computed,
  } from '#imports';
  const colorMode = useColorMode();
  const accordionState = useMenuAccordionState();
  const { gtag } = useGtag();
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
    link: () => {
      const rels = [
        'apple-touch-icon',
        'favicon-32x32',
        'favicon-16x16',
        'manifest',
        'mask-icon',
      ];
      const links = [
        {
          rel: 'preconnect',
          href: 'https://www.google-analytics.com',
        },
        {
          rel: 'preconnect',
          href: 'https://www.googletagmanager.com',
        }
      ];

      return links.concat(
        rels.map((r) => {
          const rel = r.includes('favicon') ? 'icon' : r;
          const hasSizes = r !== 'manifest' && r !== 'mask-icon';
          let href = getFaviDir() + '/' + r + '.png';

          if ('mask-icon' === r) {
            href = `${getFaviDir()}/safari-pinned-tab.svg`;
          } else if ('manifest' === r){
            href = `${getFaviDir()}/site.webmanifest`;
          }

          const link = {
            rel,
            href,
          };

          if (hasSizes) {
            Object.defineProperty(link, 'sizes', {
              value: r === 'apple-touch-icon' ? '180x180' : r.slice(-5),
              writable: false,
            });
          }

          if (rel === 'icon') {
            Object.defineProperty(link, 'type', {
              value: 'image/png',
              writable: false,
            });
          }

          if (rel === 'mask-icon') {
            Object.defineProperty(link, 'color', {
              value: parseColorMode() === 'light' ? '#fbfbfb' : '#011627',
              writable: false,
            });
          }

          return link;
        })
      );
    },
    meta: [
      computed(() => {
        return {
          name: 'msapplication-TileColor',
          content: parseColorMode() === 'light' ? '#fbfbfb' : '#011627',
        };
      }),
      computed(() => {
        let content = parseColorMode() === 'light' ? '#fbfbfb' : '#011627';

        if (accordionState.value === 'open') {
          content = parseColorMode() === 'light' ? '#e0e0e0' : '#1d3b53';
        }

        return {
          name: 'theme-color',
          content,
        };
      }),
    ],
  });

  onMounted(() => {
    const hasColorMode = typeof localStorage !== 'undefined' && localStorage.getItem('color-mode') !== null;
    const systemMode = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    const wantsMode = hasColorMode ? String(localStorage.getItem('color-mode')) : systemMode;

    changeColorMode(wantsMode);
    gtag('event', 'screen_view', { 'name': route.name as string, 'path': route.path});
  });
</script>