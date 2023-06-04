<template>
  <section class="home-hero" ref="hero">
    <div class="container home-hero__container">
      <IconsHeroWatermark classes="home-hero__watermark" />
      <div class="home-hero__wrap">
        <ul class="home-hero__icons" v-if="icons">
          <li class="home-hero__icon-item" :class="index === 0 ? 'active' : ''" v-for="(item, index) in icons">
            <IconsTaxonomy :type="item.icon.value" class="home-hero__icon" />
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
    height: calc(100dvh - var(--header-height));
    min-height: 37.5rem;

    &__container {
      position: relative;
      height: 100%;
    }

    &__watermark {
      position: absolute;
      top: 13%;
      right: 0;
      width: 55%;
      max-width: 49.6875rem;
      opacity: .25;
    }

    &__wrap {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      height: 100%;
      padding-bottom: clamp(3.5rem, 2.529rem + 4.142vw, 7.5rem);
    }

    &__icons {
      --cursor-position: 100%;
      position: relative;
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: 1fr;
      width: clamp(3rem, 2.272rem + 3.107vw, 6rem);
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
        animation: hero-blink 1s steps(2) infinite;
      }
    }

    @keyframes hero-blink {
      0% {
        opacity: 0;
      }
    }

    &__icon-item {
      grid-column: 1;
      grid-row: 1;
      margin: 0;
      width: 100%;
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
      font-size: clamp(1rem, 0.757rem + 1.036vw, 2rem);
      text-transform: lowercase;
    }

    &__title {
      margin: 0;
      font-size: clamp(3rem, 2.788rem + 0.906vw, 3.875rem);
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
  const hero = ref<HTMLElement>();
  const tl   = ref<GSAPTimeline>();
  // let
  let ctx: gsap.Context;

  onMounted(() => {
    ctx = gsap.context((self) => {
      if (!self.selector) {
        return;
      }

      const wrap    = self.selector('.home-hero__icons');
      const icons   = self.selector('.home-hero__icon-item');
      const iconsTl = gsap.timeline({
        repeat: -1,
      });

      [...icons].forEach((icon, i) => {
        const isActive = icon.classList.contains('active');

        const iconTl = gsap.timeline({
          defaults: {
            duration: 0.125,
            ease: 'none',
          },
        });

        if (!isActive) {
          iconTl.to(wrap, {

          })
        }

        // if (isActive) {
        //   iconTl.to(icon, {
        //     opacity: 0,
        //     delay: 1,
        //     onComplete() {
        //       icon.classList.remove('active');
        //     },
        //   })
        //   .to(wrap, {
        //     '--cursor-position': '0%',
        //     duration: .125,
        //   });
        // } else {
        //   iconTl.to(wrap, {
        //     '--cursor-position': '100%',
        //     delay: 0.5,
        //     duration: .125,
        //   })
        //   .to(icon, {
        //     opacity: 1,
        //     onComplete() {
        //       icon.classList.add('active');
        //     },
        //   })
        //   .to(icon, {
        //     opacity: 0,
        //     delay: 1.5,
        //     onComplete() {
        //       icon.classList.remove('active');
        //     },
        //   })
        //   .to(wrap, {
        //     '--cursor-position': '0%',
        //     duration: .125,
        //   });
        // }

        iconsTl.add(iconTl);
      });

      tl.value = iconsTl;
    }, hero.value);
  });

  onUnmounted(() => {
    ctx.revert();
  });

  defineProps<{
    title?: string,
    subtitle?: string,
    icons?: Array<SkillIcon>,
  }>();
</script>