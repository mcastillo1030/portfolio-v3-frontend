<template>
  <button
    type="button"
    class="btn contrast-toggle"
    @click="toggleColorMode"
  >
    <span class="contrast-toggle__label sr-only">Toggle light mode</span>
    <IconsMoon v-if="colorMode === 'dark'" />
    <IconsSun v-else />
  </button>
</template>

<style lang="scss">
  .contrast-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--c-action);
    cursor: pointer;
    transition: color .2s ease-out;

    &:hover {
      color: var(--c-foreground);
    }
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