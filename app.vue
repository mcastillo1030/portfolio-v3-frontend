<template>
  <NuxtLayout>
    <NuxtPage :transition="{
      onBeforeLeave: closeMenu,
    }" />
  </NuxtLayout>
</template>

<style lang="scss">
  .page-enter-active,
  .page-leave-active {
    transition:
      opacity .4s,
      filter .4s;
  }

  .page-enter-from,
  .page-leave-to {
    opacity: 0;
    filter: blur(1rem);
  }
</style>

<script setup lang="ts">
  const menuState = useMenuState();

  const closeMenu = () => {
    menuState.value = 'closed';
  };
</script>