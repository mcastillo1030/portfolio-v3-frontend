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

  const enterPage = (el: HTMLElement, done: CallableFunction): void => {
    elemPointersManager.value?.initListeners();
    done();
  };

  const reinitCursors = () => {
    resetCursor();
    elemPointersManager.value?.resetAllListeners();
    elemPointersManager.value?.initListeners();
  };

  onMounted(() => {
    // prevents window to scrollTop then returns to savedPosition
    window.history.scrollRestoration = 'auto';

    // but restore manual scrollRestoration at the first navigation
    const unwatch = useRouter().beforeEach(() => {
        window.history.scrollRestoration = 'manual';
        unwatch();
    });

    // and restore auto scrollRestoration when leaving the page
    window.addEventListener('unload', () => {
        window.history.scrollRestoration = 'auto';
    });

    elemPointersManager.value = new ElementPointers();
    elemPointersManager.value?.initListeners();
    document.addEventListener('listing-paginate', reinitCursors);
  });
</script>