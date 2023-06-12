<template>
  <header class="header" ref="header">
    <div class="container header__container">
      <div class="header__inner">
        <NuxtLink to="/" class="header__logo-link" :class="loading ? 'header__logo-link--loading' : ''">
          <IconsLogo classes="header__logo" />
          <IconsMark classes="header__mark" />
        </NuxtLink>
        <nav class="header__nav" aria-label="Main Menu">
          <ul v-if="data !== null" class="header__list">
            <li v-for="item in data.links" class="header__item">
              <NuxtLink
                v-if="item.type === 'link'"
                class="header__link"
                :to="`/${item.link.slug.current}`"
              >
                <IconsNavItem :type="item.icon" classes="header__link-icon" />
                <span class="header__link-text tooltip">{{ item.title }}</span>
              </NuxtLink>
              <SanityFile
                v-else
                :asset-id="item.attachment?.asset._ref || 'null'"
                download="marlon-castillo-resume.pdf"
              >
                <template #default="{src}">
                  <a :href="src" class="header__link">
                    <IconsNavItem :type="item.icon" classes="header__link-icon" />
                    <span class="header__link-text tooltip">{{ item.title }}</span>
                  </a>
                </template>
              </SanityFile>
            </li>
          </ul>
        </nav>

        <ul class="header__util">
          <li class="header__util-item header__util-item--contrast">
            <ContrastToggle class="header__util-btn" />
          </li>
          <li class="header__util-item header__util-item--menu">
            <MenuToggle class="header__util-btn" />
          </li>
        </ul>
      </div>
    </div>
    <div class="header__menu">
      <nav class="header__menu-nav" aria-label="Mobile Menu">
        <ul class="header__menu-list" v-if="data !== null">
          <li v-for="item in data.links" class="header__menu-item">
            <NuxtLink
              v-if="item.type === 'link'"
              class="header__item-link"
              :to="`/${item.link.slug.current}`"
            >
              <IconsNavItem :type="item.icon" classes="header__item-icon" />
              <span class="header__item-text">{{ item.title }}</span>
            </NuxtLink>
            <SanityFile
              v-else
              :asset-id="item.attachment?.asset._ref || 'null'"
              download="marlon-castillo-resume.pdf"
            >
              <template #default="{src}">
                <a :href="src" target="_blank" class="header__item-link" @click="menuState = 'closed'">
                  <IconsNavItem :type="item.icon" classes="header__item-icon" />
                  <span class="header__item-text">{{ item.title }}</span>
                </a>
              </template>
            </SanityFile>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style lang="scss">
  :root {
    --header-height: 4rem;
  }

  .header {
    position: sticky;
    top: 0;
    z-index: 100;
    background: var(--c-header-bg);

    &__inner {
      position: relative;
      z-index: 1;
      display: flex;
      gap: 4.5rem 3.625rem;
      align-items: center;
      padding: 1rem 0;
    }

    &__logo-link {
      width: 50%;
      max-width: 9.5rem;

      &--loading {
        animation: loading 1.5s ease-in-out infinite;
      }
    }

    @keyframes loading {
      0% {
        opacity: 1;
      }
      50% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }

    &__logo {
      vertical-align: middle;
    }

    &__mark {
      display: none;
    }

    &__nav {
      display: none;
      padding: 0;
      margin: 0;
      list-style: none;
    }

    &__util {
      display: flex;
      padding: 0;
      margin: 0 0 0 auto;
      list-style: none;
      column-gap: .625rem;
    }

    &__util-item {
      margin: 0;
    }

    &__menu {
      position: absolute;
      top: 0;
      left: 0;
      padding: var(--header-height) 0 1rem;
      width: 100%;
      background: var(--c-menu-bg);
      transform: translateY(-100%);
      transition: background-color .2s ease-out;
    }

    &__menu-list {
      padding: 0;
      margin: 0;
      list-style: none;
    }

    &__menu-item {
      padding: 1.125rem var(--s-gutter-right);
      margin: 0;
      text-transform: lowercase;
    }

    &__item-link {
      display: flex;
      align-items: center;
      column-gap: 1rem;
      transition: color .2s ease-out;

      &:hover {
        color: var(--c-accent-1);
      }
    }
  }

  @media screen and (min-width: 768px) {
    :root {
      --header-height: 4.75rem;
    }

    .header {
      &__inner {
        --inner-gap: 5.25rem;
        padding-top: 1.375rem;
        padding-bottom: 1.375rem;
        column-gap: var(--inner-gap);
      }

      &__logo-link {
        position: relative;

        &::after {
          content: '';
          position: absolute;
          top: 50%;
          right: 0;
          width: .1875rem;
          height: 100%;
          background: var(--c-accent-2);
          transform: translate(calc(var(--inner-gap) / 2), -50%);
        }
      }

      &__nav {
        display: block;
      }

      &__list {
        display: flex;
        align-items: center;
        padding: 0;
        margin: 0;
        list-style: none;
        column-gap: 2.625rem;
      }

      &__item {
        margin: 0;
      }

      &__link {
        position: relative;
        transition: color .2s ease-out;

        &:hover {
          color: var(--c-foreground);
        }

        &.router-link-active {
          color: var(--c-selection);
        }

        &.router-link-active {
          display: inline-block;
          position: relative;
          color: var(--c-selection);
        }

        &.router-link-active::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: .125rem;
          background: var(--c-selection);
          transform: translateY(.5rem);
        }
      }

      &__link-icon {
        max-width: 1.5rem;
        max-height: 1.5rem;
        vertical-align: middle;
      }

      &__link-text {
        position: absolute;
        top: 100%;
        left: 50%;
        z-index: 2;
        opacity: 0;
        transform: translate(-50%, 0);
        transition:
          opacity .2s ease-out,
          transform .3s ease-out;

        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 0 .5rem .5rem .5rem;
          border-color: transparent transparent var(--c-action) transparent;
          transform: translate(-50%, -.5rem);
        }
      }

      &__link.router-link-active &__link-text {
        background: var(--c-selection);

        &::before {
          border-color: transparent transparent var(--c-selection) transparent;
        }
      }

      &__link:hover &__link-text {
        opacity: 1;
        transform: translate(-50%, 1rem);
      }

      &__util-item--menu {
        display: none;
      }

      &__menu {
        display: none;
      }
    }
  }

  @media screen and (min-width: 1200px) {
    .header {
      position: fixed;
      top: 0;
      left: 0;
      width: 10%;
      max-width: 6.2rem;
      height: 100dvh;
      min-height: 37.5rem;
      background: none;

      .light-mode & {
        background: none;
      }

      &__container {
        height: 100%;
        padding: 3.5rem 2rem;
      }

      &__inner {
        flex-direction: column;
        padding: 0;
        height: 100%;

        &::before {
          content: '';
          position: absolute;
          top: -1rem;
          right: 0;
          width: 1px;
          height: calc(100% + 2rem);
          background: var(--c-accent-2);
          transform: translateX(2rem);
        }

        &::after {
          content: '';
          position: absolute;
          top: -1rem;
          right: 0;
          width: 3px;
          height: calc(var(--scroll-progress) * (100% + 2rem));
          background: var(--c-accent-2);
          transform: translateX(calc(2rem + 25%));
          border-radius: 3px;
        }
      }

      &__logo-link {
        display: block;
        position: absolute;
        bottom: 0;
        left: 50%;
        width: 2rem;
        transform: translateX(-50%);

        &::after {
          display: none;
        }
      }

      &__logo {
        display: none;
      }

      &__mark {
        display: inline-block;
        width: 100%;
        vertical-align: middle;
      }

      &__list {
        flex-direction: column;
        row-gap: 3.5rem;
      }

      &__link-text {
        top: 50%;
        left: 100%;
        transform: translate(0, -50%);

        &::before {
          top: 50%;
          left: 0;
          border-width: .5rem .5rem .5rem 0;
          border-color: transparent var(--c-action) transparent transparent;
          transform: translate(-.35rem, -50%);
        }
      }

      &__link.router-link-active &__link-text::before {
        border-color: transparent var(--c-selection) transparent transparent;
      }

      &__link:hover &__link-text {
        transform: translate(.75rem, -50%);
      }

      &__util {
        margin: auto auto 6rem;
      }
    }
  }
</style>

<script setup lang="ts">
  import { gsap } from 'gsap';
  const loading = useAppLoading();

  // State setup
  const menuState = useMenuState();

  // API setup
  const query = groq`*[_type == 'nav'][0]{
    title,
    slug,
    links[]{
      title,
      type,
      icon,
      link->{title, slug},
      attachment
    }
  }`;
  const { data } = useSanityQuery<SanityNav>(query);

  // Gsap
  const header = ref<HTMLElement>();
  const tl = ref<GSAPTimeline>();
  let ctx: gsap.Context;

  /**
   * Toggle menu
   *
   * @param {string} state - The state of the menu
   */
  const toggleMenu = (state:string = 'open') => {
    if (!tl.value) {
      return;
    }

    if ('closed' === state) {
      tl.value.reversed( !tl.value.reversed() );
    } else {
      tl.value.play();
    }
  };

  watch(menuState, (newVal) => toggleMenu(newVal));

  onMounted(() => {
    const getScrollProgress = () => {
      const progress = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      return progress > 1 ? 1 : progress;
    }
    // Track scroll position.
    window.addEventListener('scroll', () => {
      document.documentElement.style.setProperty('--scroll-progress', `${getScrollProgress()}`);
    });

    ctx = gsap.context((self) => {
      if (!self.selector) {
        return;
      }

      const menu = self.selector('.header__menu');
      const list = self.selector('.header__menu-list');
      tl.value = gsap.timeline({
          paused: true,
          defaults: {
            duration: 0.5,
            ease: 'power2.inOut',
          },
        })
        .to(menu, {
          y: 0,
        })
        .from(list, {
          opacity: 0,
        });
    }, header.value);

    document.documentElement.style.setProperty('--scroll-progress', `${getScrollProgress()}`);
  });

  onUnmounted(() => {
    ctx.revert();
  })
</script>