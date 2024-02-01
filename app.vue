<template>
  <NuxtLayout>
    <NuxtPage
      :transition="{ onBeforeLeave: beforeLeave, onEnter: enterPage }"
    />
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
  import { useMenuState, onMounted, ElementPointers } from '#imports';
  const elemPointersManager = ref<ElementPointers|null>(null);
  const menuState = useMenuState();

  const closeMenu = () => {
    menuState.value = 'closed';
  };

  const resetCursor = () => {
    const pointer = document.querySelector('.pointer');
    pointer?.setAttribute('data-type', 'cursor');
    pointer?.classList.remove('down');
  };

  const beforeLeave = () => {
    closeMenu();
    resetCursor();
    elemPointersManager.value?.resetAllListeners();
  };

  const enterPage = () => {
    console.log('here');
    elemPointersManager.value?.initListeners();
  };

  const reinitCursors = () => {
    // console.log('here');
    resetCursor();
    elemPointersManager.value?.resetAllListeners();
    elemPointersManager.value?.initListeners();
  };

  onMounted(() => {
    elemPointersManager.value = new ElementPointers();
    elemPointersManager.value?.initListeners();
    document.addEventListener('listing-paginate', reinitCursors);
  });
</script>