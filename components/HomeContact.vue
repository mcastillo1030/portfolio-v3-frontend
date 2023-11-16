<template>
  <section class="home-contact" ref="contact">
    <div class="container home-contact__container">
      <div class="home-contact__wrap">
        <h2 v-if="title" class="home-contact__title">{{ title }}</h2>
        <div class="home-contact__columns">
          <div class="home-contact__list-wrap">
            <h3 v-if="subtitle" class="home-contact__subtitle">{{ subtitle }}</h3>
            <ul class="home-contact__list" v-if="items">
              <li class="home-contact__item" v-for="item in items">
                <a
                  v-if="item.linkType === 'url'"
                  :href="item.url"
                  target="_blank"
                  class="home-contact__link"
                >
                  <LazyIconsNavItem :type="item.icon" classes="home-contact__icon" />
                  <span class="home-contact__text">{{ item.title }}</span>
                </a>
                <LazySanityFile
                  v-else
                  :asset-id="item.attachment?.asset._ref || 'null'"
                  download="marlon-castillo-resume.pdf"
                >
                  <template #default="{src}">
                    <a :href="src" class="home-contact__link">
                      <IconsNavItem :type="item.icon" classes="home-contact__icon" />
                      <span class="home-contact__text">{{ item.title }}</span>
                    </a>
                  </template>
                </LazySanityFile>
              </li>
            </ul>
          </div>
          <IconsContactGraphic class="home-contact__graphic" />
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
  .home-contact {
    margin-top: clamp(6.125rem, 4.754rem + 5.85vw, 10.75rem);

    &__title {
      margin-top: 0;
      margin-bottom: 1.75rem;
    }

    &__subtitle {
      margin-top: 0;
      margin-bottom: clamp(1.125rem, 0.81rem + 1.344vw, 2.188rem);
      color: var(--c-accent-2);
    }

    &__list {
      padding-left: 1rem;
      margin: 0;
      list-style: none;
    }

    &__item {
      margin: 0;

      & + & {
        margin-top: 1.125rem;
      }
    }

    &__link {
      display: inline-flex;
      align-items: center;
      column-gap: 1.125rem;
      text-decoration-color: var(--c-foreground);
    }

    &__text {
      color: var(--c-foreground);
      transition: color 0.2s ease-out;
    }

    &__link:hover &__text {
      color: var(--c-action);
    }

    &__graphic {
      display: none;
    }
  }

  @media screen and (min-width: c.$b-medium) {
    .home-contact {
      &__list-wrap {
        max-width: 43.75rem;
        padding: 3.125rem clamp(2.625rem, 1.304rem + 2.752vw, 4.125rem);
        background: var(--c-accent-4);
        border-radius: .5rem;
      }
    }
  }

  @media screen and (min-width: c.$b-medium-large) {
    .home-contact {
      &__columns {
        display: grid;
        grid-template-columns: 2.5fr 2fr;
        align-items: flex-start;
        gap: clamp(6.03333333rem, 9.42708333vw, 11.3125rem);
        max-width: 71.625rem;
        margin: 4rem auto 0;
      }

      &__list-wrap {
        position: relative;

        &::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          z-index: -1;
          height: 1px;
          width: 100%;
          border-top: 0.125rem dotted var(--c-accent-1);
        }
      }

      &__graphic {
        display: block;
      }
    }
  }
</style>

<script setup lang="ts">
  import { onMounted, onUnmounted, ref } from '#imports';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';

  gsap.registerPlugin(ScrollTrigger);
  const contact = ref<HTMLElement>();
  let ctx: gsap.Context;

  onMounted(() => {
    ctx = gsap.context((self) => {
      if (!self.selector) {
        return;
      }

      const container = self.selector('.home-contact__container');
      const content = self.selector('.home-contact__wrap');
      gsap.from(content, {
        opacity: 0,
        yPercent: 10,
        scrollTrigger: {
          trigger: container[0],
          start: 'top bottom-=15%',
          end: '+=1px',
          toggleActions: 'play none none reverse',
        }
      })
    }, contact.value);
  });

  onUnmounted(() => {
    ctx.revert();
  });


  defineProps<{
    title?: string;
    subtitle?: string;
    items?: Array<ContactLink>;
  }>();
</script>