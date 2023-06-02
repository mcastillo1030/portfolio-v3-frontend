<template>
  <div id="wrapper">
    <Header />
    <slot />
    <Footer />
  </div>
</template>

<script lang="ts" setup>
  const colorMode = useColorMode();
  onMounted(() => {
    const matchesPreference = window.matchMedia(`(prefers-color-scheme: ${colorMode.value})`).matches;

    if ( matchesPreference ) {
      return;
    }

    document.querySelector('body')?.classList.toggle('light-mode', colorMode.value !== 'light');
  });
</script>