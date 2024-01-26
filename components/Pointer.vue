<template>
  <div class="pointer" id="pointer" ref="pointer" :data-mobile="isMobile" data-type="cursor">
    <div class="pointer__square"></div>
    <div class="pointer__dot"></div>
  </div>
</template>

<style lang="scss">
  .pointer {
    --square-x: 50%;
    --square-y: 50%;
    --square-width: 1.5rem;
    --square-height: 1.5rem;
    --dot-x: 50%;
    --dot-y: 50%;
    --dot-width: .25rem;
    --dot-height: .25rem;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    pointer-events: none;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.125s ease-out;
    mix-blend-mode: difference;

    &.visible {
      opacity: 1;
    }

    &[data-mobile='true'] {
      display: none;
    }

    &__square {
      position: absolute;
      inset-block-start: var(--square-y);
      inset-inline-start: var(--square-x);
      width: var(--square-width);
      height: var(--square-height);
      border-radius: 0.1875rem;
      outline: 2px solid var(--c-foreground);
      pointer-events: none;
      transform: translate(calc(var(--square-height) / -2), calc(var(--square-width) / -2));
      transition: transform 0.125s ease-out;
    }

    &.down &__square {
      transform: translate(calc(var(--square-height) / -2), calc(var(--square-width) / -2)) scale(2);
    }

    [data-type='action'] &__square {
      background: var(--c-foreground);
      outline: none;
      transition: transform 0.125s ease-out, outline 0.125s ease-out;
      transform: translate(calc(var(--square-height) / -2), calc(var(--square-width) / -2)) scale(1.5);
    }

    [data-type='other'] &__square {
      outline: 2px dashed var(--c-foreground);
    }

    &__dot {
      position: absolute;
      inset-block-start: calc(var(--dot-y) - (var(--dot-height) / 2));
      inset-inline-start: calc(var(--dot-x) - (var(--dot-width) / 2));
      width: var(--dot-width);
      height: var(--dot-height);
      border-radius: 50%;
      background-color: var(--c-foreground);
      pointer-events: none;
    }

    [data-type='action'] &__dot,
    [data-type='other'] &__dot {
      display: none;
    }

  }
</style>

<script lang="ts" setup>
  import {
    ref,
    onMounted,
    onUnmounted,
    watch,
    ElementPointers
  } from '#imports';
  import debounce from 'just-debounce';
  import { gsap } from 'gsap';

  const pointer = ref<HTMLElement>();
  const isMobile = ref<boolean>(true);
  const isInPage = ref<boolean>(false);
  const elemPointersManager = ref<ElementPointers|null>(null);
  let ctx: gsap.Context;

  /* ---------- */
  // Watchers
  /* ---------- */
  watch(isInPage, (newVal) => {
    pointer.value?.classList.toggle('visible', newVal)
  });

  watch(isMobile, (newVal) => {
    pointer.value?.setAttribute('data-mobile', newVal ? 'true' : 'false');
  });

  /* ---------- */
  // Methods
  /* ---------- */
  const checkMobile = () => {
    isMobile.value = window.innerWidth < 768;
  };

  const setPointerPosition = (e: PointerEvent) => {
    if (!pointer.value) {
      return;
    }

    const { clientX, clientY } = e;
    const dot = pointer.value.querySelector('.pointer__dot');
    const square = pointer.value.querySelector('.pointer__square');

    gsap.set(dot, {
      '--dot-x': `${clientX}px`,
      '--dot-y': `${clientY}px`,
    });
    gsap.set(square, {
      '--square-x': `${clientX}px`,
      '--square-y': `${clientY}px`,
      delay: 0.075,
      ease: 'power2.out',
    });
  };

  const movePointer = (e: PointerEvent) => {
    if (isMobile.value || !isInPage.value) {
      return;
    }

    setPointerPosition(e);
  };

  const setInPage = () => {
    isInPage.value = true;
  };

  const setOutPage = () => {
    isInPage.value = false;
  };

  const addDownClass = () => {
    pointer.value?.classList.add('down');
  };

  const removeDownClass = () => {
    pointer.value?.classList.remove('down');
  };

  const debouncedCheckMobile = debounce(checkMobile, 250);

  /* ---------- */
  // Lifecycle
  /* ---------- */
  onMounted(() => {
    elemPointersManager.value = new ElementPointers();

    ctx = gsap.context((self) => {
      if (!self.selector) {
        return;
      }

      self.add('onMouseMove', movePointer);
    }, pointer.value);

    checkMobile();
    window.addEventListener('pointerover', setInPage);
    window.addEventListener('pointerout', setOutPage);
    window.addEventListener('resize', debouncedCheckMobile);
    window.addEventListener('pointerdown', addDownClass);
    window.addEventListener('pointerup', removeDownClass);
    elemPointersManager.value?.initListeners();
    document.addEventListener('pointermove', (e) => ctx.onMouseMove(e));
  });

  onUnmounted(() => {
    ctx.revert();
    window.removeEventListener('pointerover', setInPage);
    window.removeEventListener('pointerout', setOutPage);
    window.removeEventListener('resize', debouncedCheckMobile);
    window.removeEventListener('pointerdown', addDownClass);
    window.removeEventListener('pointerup', removeDownClass);
    elemPointersManager.value?.destroyListeners();
  });
</script>