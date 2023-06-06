<template>
  <div id="wrapper">
    <LayoutHeader />
    <slot />
    <LayoutFooter />
  </div>
</template>

<script lang="ts" setup>
  const colorMode = useColorMode();

  const changeColorMode = (newMode:string) => {
    const currentMode = document.querySelector('body')?.classList.contains('light-mode') ? 'light' : 'dark';

    if ( newMode !== 'system' && currentMode === newMode ) {
      return;
    }

    if ( 'system' === newMode )  {
      document.querySelector('body')?.classList.remove('light-mode');
    } else {
      document.querySelector('body')?.classList.toggle('light-mode', newMode === 'light');
    }

    colorMode.value = newMode;
    localStorage.setItem('color-mode', newMode);
  };

  watch(colorMode, changeColorMode);

  onMounted(() => {
    const hasColorMode = typeof localStorage !== 'undefined' && localStorage.getItem('color-mode') !== null;
    const wantsMode = hasColorMode ? String(localStorage.getItem('color-mode')) : 'dark';

    changeColorMode(wantsMode);
  });
</script>