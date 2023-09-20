<template>
  <section class="home-intro" ref="intro">
    <div class="container home-intro__container">
      <div class="home-intro__wrap">
        <h2 class="sr-only home-intro__title">{{ title }}</h2>
        <div class="home-intro__image-column">
          <OutlineImage
            v-if="image"
            class="home-intro__image-wrap overlay cursor-load"
            :asset-id="image.assetId"
            :alt="image.alt ? image.alt : 'Home Image'"
            :width="500"
            :height="400"
            :sizes="true"
          />
          <ul class="home-intro__contact" v-if="links">
            <li class="home-intro__contact-item" v-for="link in links">
              <a
                v-if="link.linkType === 'url'"
                :href="link.url"
                class="home-intro__contact-link"
              >
                <IconsNavItem :type="link.icon" class="home-intro__contact-icon" />
                <span class="home-intro__contact-text tooltip">{{ link.title }}</span>
              </a>
              <SanityFile
                v-else
                :asset-id="link.attachment?.asset._ref || 'null'"
                download="marlon-castillo-resume.pdf"
              >
                <template #default="{src}">
                  <a :href="src" class="home-intro__contact-link">
                    <IconsNavItem :type="link.icon" classes="home-intro__contact-icon" />
                    <span class="home-intro__contact-text tooltip">{{ link.title }}</span>
                  </a>
                </template>
              </SanityFile>
            </li>
          </ul>
        </div>
        <div class="home-intro__text-column" v-if="text">
          <Wysiwyg :body="text" class="home-intro__text-inner" />
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
  .home-intro {
    margin-top: clamp(2.688rem, 0.609rem + 8.867vw, 11.25rem);

    &__image-column {
      max-width: 22.5rem;
    }

    &__image-wrap {
      img {
        aspect-ratio: 420 / 534;
      }
    }

    &__contact {
      position: relative;
      display: flex;
      align-items: center;
      padding: 0;
      margin: 2rem 0 1.5625rem;
      gap: 1.125rem;
      list-style: none;

      &::before {
        content: '';
        display: block;
        width: 1rem;
        aspect-ratio: 16 / 24;
        background: var(--c-accent-3);
        mask: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 24"><path d="M4.01706 24 .147944 20.1777l8.125176-8.0983L0 3.83365 3.8464 0l12.1195 12.0794L4.01706 24Z"/></svg>') no-repeat center;
      }
    }

    &__contact-item {
      position: relative;
      margin: 0;
    }

    &__contact-link {
      transition: color .2s ease-out;

      &:hover {
        color: var(--c-foreground);
      }
    }

    &__contact-icon {
      width: 1.5rem;
      height: 1.5rem;
    }

    &__contact-text {
      position: absolute;
      top: 100%;
      left: 50%;
      z-index: 1;
      opacity: 0;
      transform: translate(-50%, 0);
      transition:
        opacity .2s ease-in-out,
        transform .2s ease-in-out;

      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 50%;
        width: 0;
        height: 0;
        border: .5rem solid transparent;
        border-top-width: 0;
        border-bottom-color: var(--c-action);
        transform: translate(-50%, -100%);
      }
    }

    &__contact-link:hover &__contact-text {
      opacity: 1;
      transform: translate(-50%, 1rem);
    }
  }

  @media screen and (min-width: c.$b-medium) {
    .home-intro {
      &__image-column {
        position: relative;

        &::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100%;
          height: 70%;
          border-top-right-radius: .5rem;
          border-top: .125rem dotted var(--c-accent-3);
          border-right: .125rem dotted var(--c-accent-3);
          animation-play-state: paused;
        }
      }

      .scrolled-in &__image-column::before {
        animation: tablet-path-fwd 2s ease-in-out 1;
        animation-play-state: running;
        animation-fill-mode: forwards;
      }

      .scrolled-back &__image-column::before {
        animation: tablet-path-bwd 2s ease-in-out 1;
        animation-play-state: running;
        animation-fill-mode: forwards;
      }

      @keyframes tablet-path-fwd {
        0% {
          clip-path: polygon(0 0, 0 .125rem, 0 .125rem, 0 .125rem, 0 0, 0 0);
        }
        50% {
          clip-path: polygon(0 0, 0 .125rem, calc(100% - .125rem) .125rem, calc(100% - .125rem) .125rem, 100% 0, 100% 0);
        }
        100% {
          clip-path: polygon(0 0, 0 .125rem, calc(100% - .125rem) .125rem, calc(100% - .125rem) 100%, 100% 100%, 100% 0);
        }
      }

      @keyframes tablet-path-bwd {
        0% {
          clip-path: polygon(0 0, 0 .125rem, calc(100% - .125rem) .125rem, calc(100% - .125rem) 100%, 100% 100%, 100% 0);
        }
        50% {
          clip-path: polygon(0 0, 0 .125rem, calc(100% - .125rem) .125rem, calc(100% - .125rem) .125rem, 100% 0, 100% 0);
        }
        100% {
          clip-path: polygon(0 0, 0 .125rem, 0 .125rem, 0 .125rem, 0 0, 0 0);
        }
      }

      &__text-column {
        position: relative;
        width: 85%;
        margin-right: auto;
        margin-left: auto;
      }

      &__text-inner {
        padding: clamp(1.75rem, 1.083rem + 2.846vw, 4rem) clamp(1.5rem, 1.055rem + 1.897vw, 3rem);
        background: #02223c;
        border-radius: .5rem;
      }

      .light-mode &__text-inner {
        background: #ededed;
      }
    }
  }

  @media screen and (min-width: c.$b-medium-large) {
    .home-intro {
      &__wrap {
        position: relative;
        display: grid;
        grid-template-columns: 2fr 3fr;
        align-items: center;
        gap: clamp(6.033rem, 8.537vw, 8.75rem);
        max-width: 71.625rem;
        margin: 0 auto;
      }

      &__image-column {
        position: static;
        max-width: 100%;

        &::before {
          top: 50%;
          left: 50%;
          width: 100%;
          height: .0625rem;
          border-radius: 0;
          border-top: .125rem dotted var(--c-accent-3);
          border-right: 0;
          transform: translate(-50%, 0);
          transform-origin: left center;
        }
      }

      .scrolled-in &__image-column::before {
        animation: desktop-path-fwd 2s ease-in-out 1 forwards;
      }

      .scrolled-back &__image-column::before {
        animation: desktop-path-bwd 2s ease-in-out 1 forwards;
      }

      @keyframes desktop-path-fwd {
        from {
          transform: translate(-50%, 0) scaleX(0);
        }
        to {
          transform: translate(-50%, 0) scaleX(1);
        }
      }

      @keyframes desktop-path-bwd {
        from {
          transform: translate(-50%, 0) scaleX(1);
        }
        to {
          transform: translate(-50%, 0) scaleX(0);
        }
      }

      &__text-column {
        margin-right: 0;
      }
    }
  }
</style>

<script setup lang="ts">
  import { PortableTextBlock } from '@portabletext/types';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';

  gsap.registerPlugin(ScrollTrigger);
  const intro = ref<HTMLElement>();
  let ctx: gsap.Context;

  onMounted(() => {
    ctx = gsap.context((self) => {
      if (!self.selector) {
        return;
      }

      const container = self.selector('.home-intro__container');
      const image = self.selector('.home-intro__image-wrap');
      const text = self.selector('.home-intro__text-inner');
      gsap.timeline({
        scrollTrigger: {
          trigger: container[0],
          start: 'top bottom-=15%',
          end: '+=1px',
          toggleActions: 'play none none reverse',
          onEnter: () => {
            container[0].classList.remove('scrolled-back');
            container[0].classList.add('scrolled-in');
          },
          onLeaveBack: () => {
            container[0].classList.remove('scrolled-in');
            container[0].classList.add('scrolled-back');
          },
        }
      }).from(image, {
        opacity: 0,
        yPercent: 15,
      })
      .from(text, {
        opacity: 0,
        yPercent: 15,
      });

      return () => {
        gsap.set([container, image, text], { clearProps: 'all' });
      };
    }, intro.value);
  });

  onUnmounted(() => {
    ctx.revert();
  });

  defineProps<{
    title?: string;
    image?: CustomSanityImage;
    links?: Array<ContactLink>;
    text?: Array<PortableTextBlock>;
  }>();
</script>