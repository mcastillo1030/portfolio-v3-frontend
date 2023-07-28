<template>
  <section class="home-hero" ref="hero">
    <div class="container home-hero__container home-hero__container--loading">
      <IconsHeroWatermark classes="home-hero__watermark" />
      <div class="home-hero__wrap">
        <ul class="home-hero__icons" v-if="icons">
          <li class="home-hero__icon-item" :class="index === 0 ? 'active' : ''" v-for="(item, index) in icons">
            <IconsTaxonomy :type="item" class="home-hero__icon" />
          </li>
        </ul>
        <p class="home-hero__subtitle">{{ subtitle }}</p>
        <OutlineTitle class="home-hero__title" :text="title" />
      </div>
    </div>
  </section>
</template>

<style lang="scss">
  .home-hero {
    height: calc(100svh - var(--header-height));
    min-height: 37.5rem;

    &__container {
      position: relative;
      height: 100%;

      &--loading {
        opacity: 0;
      }
    }

    &__watermark {
      position: absolute;
      top: 13%;
      right: 0;
      width: 55%;
      max-width: 49.6875rem;
      opacity: .25;
    }

    .light-mode &__watermark {
      opacity: .125;
    }

    @media (prefers-color-scheme: light) {
      &__watermark {
        opacity: .125;
      }
    }

    &__wrap {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      height: 100%;
      // padding-bottom: clamp(3.5rem, 2.529rem + 4.142vw, 7.5rem);
      padding-bottom: clamp(3.5rem, 2.314rem + 5.059vw, 7.5rem);
    }

    &__icons {
      --cursor-position: 100%;
      --icons-width: clamp(3rem, 2.272rem + 3.107vw, 6rem);
      position: relative;
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: 1fr;
      width: var(--icons-width);
      padding: 0;
      margin: 0 0 2rem;
      list-style: none;

      &::after {
        content: '';
        position: absolute;
        top: -.25rem;
        left: calc(var(--cursor-position) + .5rem);
        width: 1px;
        height: calc(100% + .5rem);
        background: #80a4c2;
        border-radius: .125rem;
        animation: hero-blink .75s steps(2) infinite;
      }

      &.typing::after {
        animation: none;
      }
    }

    @keyframes hero-blink {
      0% {
        opacity: 0;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      &__icons::after {
        animation: none;
      }
    }

    &__icon-item {
      grid-column: 1;
      grid-row: 1;
      margin: 0;
      width: clamp(3rem, 2.111rem + 3.794vw, 6rem);
      color: var(--c-accent-1);
      opacity: 0;
      vertical-align: middle;

      &.active {
        opacity: 1;
      }
    }

    &__subtitle {
      margin: 0;
      color: var(--c-action);
      font-size: clamp(1rem, 0.704rem + 1.265vw, 2rem);
      text-transform: lowercase;
    }

    &__title {
      margin: 0;
      font-size: clamp(3rem, 2.741rem + 1.107vw, 3.875rem);
    }
  }

  @media screen and (min-width: c.$b-large) {
    .home-hero {
      height: 100dvh;
    }
  }
</style>

<script setup lang="ts">
  import { gsap } from 'gsap';

  // gsap setup
  const hero     = ref<HTMLElement>();
  const skillsTl = ref<GSAPTimeline>();
  let ctx: gsap.Context;

  onMounted(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    ctx = gsap.context((self) => {
      if (!self.selector) {
        return;
      }

      const icons  = self.selector('.home-hero__icon-item');
      const container = self.selector('.home-hero__container');
      const mark = self.selector('.home-hero__watermark');
      const wrap = self.selector('.home-hero__wrap');
      const iconsTl = gsap.timeline({repeat: -1});
      const heroTl = gsap.timeline();

      heroTl
        .addLabel('start')
        .to(container, {
          delay: .3,
          opacity: 1,
          onComplete: () => {
            container[0].classList.remove('home-hero__container--loading');
          }
        })
        .from(mark, {
          opacity: 0,
          yPercent: 10,
        })
        .from(wrap, {
          opacity: 0,
          onComplete: () => {
            document.dispatchEvent(new Event('hero:complete'));
          }
        });

      [...icons].forEach((icon, i) => {
        const next = icon.nextElementSibling || icons[0];
        const wrap = icon.parentElement;

        const iconTl = gsap.timeline({
          defaults: {
            duration: 0.125,
            ease: 'none',
          },
        });

        iconTl.to(icon, {
          opacity: 0,
          delay: 2.5,
          onComplete: () => {
            icon.classList.remove('active');
          }
        })
        .to(wrap, {
          '--cursor-position': 0,
          duration: 0,
          delay: 0,
          onStart: () => {
            wrap.classList.add('typing');
          },
          onComplete: () => {
            wrap.classList.remove('typing');
          }
        })
        .add(gsap.set(wrap, {'--cursor-position': '105%'}), '+=1')
        .to(next, {
          opacity: 1,
          onStart: () => {
            wrap.classList.add('typing');
          },
          onComplete: () => {
            next.classList.add('active');
            wrap.classList.remove('typing');
          }
        });

        iconsTl.add(iconTl);
      });

      heroTl.add(iconsTl);
      skillsTl.value = heroTl;
    }, hero.value);

    if (motionQuery.matches) {
      skillsTl.value?.pause();
    }

    motionQuery.addEventListener('change', (e) => {
      if (e.matches) {
        skillsTl.value?.pause('start');
      } else {
        skillsTl.value?.play('start');
      }
    });
  });

  onUnmounted(() => {
    ctx.revert();
  });

  defineProps<{
    title?: string,
    subtitle?: string,
    icons?: Array<string>,
  }>();
</script>