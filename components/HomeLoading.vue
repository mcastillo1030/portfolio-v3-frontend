<template>
  <div class="home-loading" :class="visibilityString === 'visible' ? '' : 'hidden'" ref="loading" :visibility="visibilityString">
    <div class="container home-loading__container">
      <h2 class="home-loading__title">
        <CliSpinner aria-hidden="true" />
        <!-- <div class="home-loading__text">{{phrase}}</div> -->
        <div class="home-loading__text" v-for="phrase in phrases">{{phrase}}</div>
      </h2>
    </div>
  </div>
</template>

<style lang="scss">
  .home-loading {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 100%;
    transform: translate(-50%, -50%);

    &.hidden {
      display: none;
    }

    &__title {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }

    &__text {
      display: none;

      &.active {
        display: block;
      }
    }
  }
</style>

<script setup lang="ts">
  import { onMounted, ref } from '#imports';
  import { gsap } from 'gsap';

  // const phrase = useLoadingPhrase();
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
  let ctx: gsap.Context;

  onMounted(() => {
    const event = new CustomEvent('spinner:complete');
    const idx = Math.floor(Math.random() * phrases.length);
    const texts = loading.value?.querySelectorAll('.home-loading__text') || [];
    // unhide a random phrase
    [...texts].forEach((text, i) => {
      if (i === idx) {
        text.classList.add('active');
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

  defineProps<{
    visibilityString: string;
  }>();
</script>