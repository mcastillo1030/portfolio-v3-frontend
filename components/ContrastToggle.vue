<template>
  <button
    type="button"
    class="btn contrast-toggle"
    @click="toggleColorMode"
  >
    <span class="contrast-toggle__label sr-only">Toggle light mode</span>
    <icons-moon v-if="colorMode === 'dark'" />
    <icons-sun v-else />
  </button>
</template>

<style lang="scss">
  .contrast-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>

<script lang="ts" setup>
  const colorMode = useColorMode();
  const toggleColorMode = () => {
    colorMode.value = colorMode.value === 'dark' ? 'light' : 'dark';
    localStorage.setItem('color-mode', colorMode.value);
    document.querySelector('body')?.classList.toggle('light-mode', colorMode.value !== 'light');
  }
</script>