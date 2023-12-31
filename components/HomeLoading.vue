<template>
  <div class="home-loading" :class="visibilityString === 'visible' ? '' : 'hidden'" ref="loading" :visibility="visibilityString">
    <div class="container home-loading__container">
      <h2 class="home-loading__title">
        <CliSpinner aria-hidden="true" />
        <div class="home-loading__text-grid">
          <div class="home-loading__text" inert visibility="hidden" aria-hidden="true" v-for="phrase in phrases">{{phrase}}</div>
        </div>
      </h2>
    </div>
  </div>
</template>

<style lang="scss">
  .home-loading {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 100;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 100vh;
    background: var(--c-background);
    transform: translate(-50%, -50%);

    &.hidden {
      display: none;
    }

    &__title {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }

    &__text-grid {
      display: grid;
      grid-template-columns: 100%;
      grid-template-rows: 100%;
    }

    &__text {
      grid-column: 1 / -1;
      grid-row: 1 / -1;
      opacity: 0;
      z-index: -1;

      &.active {
        opacity: 1;
        z-index: 1;
      }
    }
  }
</style>

<script setup lang="ts">
  import {
    onMounted,
    onUnmounted,
    ref,
    useLoadingVisibility,
    useHead,
  } from '#imports';
  import { gsap } from 'gsap';

  const phrases = [
    'Please hold while I finish my coffee...',
    'Loading the loading screen...',
    'Generating witty dialog...',
    'Keep calm and wait...',
    'Fixing the flux capacitor...',
    'Wait, do you smell something burning?',
    'Whatever you do, don\'t look behind you...',
    'Feel free to spin in circles until I\'m done...',
    'Updating to Windows Vista...',
    'You seem like a nice person...',
    'You are number 2843684714 in the queue...',
    'TODO: Insert elevator music...',
  ];
  const loading = ref<HTMLElement>();
  const visibilityString = useLoadingVisibility();
  let ctx: gsap.Context;

  onMounted(() => {
    const event = new CustomEvent('spinner:complete');
    const idx = Math.floor(Math.random() * phrases.length);
    const texts = loading.value?.querySelectorAll('.home-loading__text') || [];

    // unhide a random phrase
    [...texts].forEach((text, i) => {
      if (i === idx) {
        text.classList.add('active');
        text.removeAttribute('inert');
        text.removeAttribute('visibility');
        text.setAttribute('aria-hidden', 'false');
      }
    });

    ctx = gsap.context((self) => {
      if (!self.selector) {
        return;
      }

      if (loading.value?.classList.contains('hidden')) {
        document.dispatchEvent(event);
        return;
      }

      const wrap = self.selector('.home-loading__container')[0];

      gsap.timeline({
        delay: 2,
        onComplete: () => {
          document.dispatchEvent(event);
          loading.value?.classList.add('hidden');
          gsap.set(wrap, {
            clearProps: 'all',
          });
          visibilityString.value = 'hidden';
        },
      })
        .to(wrap, {
          opacity: 0,
        });
    }, loading.value);
  });

  onUnmounted(() => {
    ctx.revert();
  });

  // add loading class to body
  useHead({
    bodyAttrs: {
      class: computed(() => {
        return visibilityString.value === 'visible' ? 'loading' : '';
      }),
    },
  });
</script>