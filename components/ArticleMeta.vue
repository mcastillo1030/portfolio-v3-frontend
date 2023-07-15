<template>
  <div class="article-meta" ref="meta">
    <div class="article-meta__stack" v-if="technologies">
      <h2 class="article-meta__stack-title zeta">Stack</h2>
      <ul class="article-meta__technologies">
        <li class="article-meta__technology" v-for="technology in technologies">
          <IconsTaxonomy :type="technology.icon" class="article-meta__icon" />
          <span class="article-meta__technology-text tooltip">{{ technology.title }}</span>
        </li>
      </ul>
    </div>
    <div class="article-meta__categories" v-if="categories">
      <h2 class="article-meta__categories-title zeta">Tags</h2>
      <ul class="article-meta__tags">
        <li class="article-meta__tag" v-for="category in categories">
          <NuxtLink
            :to="`/rants?category=${category.title}`"
            class="article-meta__tag-link"
          >{{ category.title }}</NuxtLink>
        </li>
      </ul>
    </div>
    <div class="article-meta__toc" v-if="content" :data-open="open">
      <h2 class="article-meta__toc-title zeta" id="article-meta__toc-title">
        <span class="article-meta__title-text sr-only">Contents</span>
        <button
          class="article-meta__toc-toggle zeta"
          type="button"
          aria-label="Toggle TOC Menu"
          @click="toggleMenu"
        >
          <span class="article-meta__toggle-text">Contents</span>
          <IconsChevron class="article-meta__toggle-icon" />
        </button>
      </h2>
      <nav class="article-meta__toc-nav" aria-label="Table of Contents">
        <ul class="article-meta__toc-list" v-html="getBuiltTree(content)">
        </ul>
      </nav>
    </div>
  </div>
</template>

<style lang="scss">
  .article-meta {
    max-width: 38.75rem;
    padding: clamp(1.5rem, 1.731rem + 2.213vw, 2.25rem);
    margin: 3rem 0;
    background: var(--c-menu-bg);
    border-radius: .5rem;

    &__stack-title,
    &__categories-title {
      margin: 0 0 .25rem;
      color: var(--c-accent-2);
    }

    &__technologies,
    &__tags {
      padding: 0;
      margin: 0;
      list-style: none;
    }

    &__technologies {
      display: flex;
      gap: 1.125rem;
    }

    &__technology,
    &__tag {
      padding: 0;
    }

    &__technology {
      position: relative;

      &:hover {
        cursor: help;
      }
    }

    &__icon {
      width: 1.5rem;
      height: 1.5rem;
      color: var(--c-accent-1);

      &.taxonomy--php {
        width: 2rem;
        height: auto;
      }

      &.taxonomy--cf {
        width: 1.8rem;
        height: auto;
      }
    }

    &__technology-text {
      position: absolute;
      top: 100%;
      left: 50%;
      z-index: 2;
      color: var(--c-background);
      font-size: .75rem;
      opacity: 0;
      background: var(--c-foreground);
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
        border-color: transparent transparent var(--c-foreground) transparent;
        transform: translate(-50%, -.5rem);
      }
    }

    &__technology:hover &__technology-text {
      opacity: 1;
      transform: translate(-50%, 1rem);
    }

    &__tag-link {
      color: var(--c-accent-2);
      font-size: .875rem;
      text-decoration-style: dashed;
      text-transform: lowercase;
    }

    &__toc-nav {
      position: relative;
      overflow: hidden;
    }

    &__toc-title {
      margin-bottom: 0;
      color: var(--c-accent-2);
    }

    &__toc-toggle {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding: 0 0 .5rem;
      margin: 0;
      color: var(--c-accent-2);
      text-align: left;
      background: none;
      border: none;
      border-bottom: .0625rem solid var(--c-accent-2);
      column-gap: 2rem;
      cursor: pointer;
      transition:
        color .2s ease-out,
        border-color .2s ease-out,;

      &:hover {
        color: var(--c-accent-1);
        border-color: var(--c-accent-1);
      }

      &:focus {
        outline: 0.125rem dashed var(--c-action);
        outline-offset: .125rem;
      }
    }

    &__toggle-icon {
      transform-origin: center;
      transition: transform .2s ease-out;
    }

    [data-open='true'] &__toggle-icon {
      transform: rotate(180deg);
    }

    &__toc-nav {
      display: none;

      &--open {
        display: block;
      }
    }

    &__toc-list {
      margin: 0;
      padding: 0 0 0 .75rem;
      list-style: none;

      & > & {
        margin-left: 1rem;
      }
    }

    &__toc-item {
      margin: 0;
      opacity: 0; // gsap

      & + & {
        margin-top: 1.125rem;
      }

      & {
        margin-top: 1.125rem;
      }
    }

    &__toc-nav--open &__toc-item {
      opacity: 1;
    }
  }

  @media screen and (min-width: c.$b-xlarge) {
    .article-meta {
      margin: 0 0 1rem;

      &__title-text {
        @include c.a11y-show();
      }

      &__toc-toggle {
        display: none;
      }

      &__toc-nav {
        display: block;
      }

      &__toc-item {
        opacity: 1;
      }
    }
  }
</style>


<script setup lang="ts">
  import { PortableTextBlock } from '@portabletext/types';
  import gsap from 'gsap';
  import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { e } from 'ofetch/dist/error-04138797';

  gsap.registerPlugin(ScrollToPlugin);

  const meta = ref<HTMLElement>();
  const open = ref<Boolean>(false);
  const tl = ref<GSAPTimeline>();
  const isAnimating = ref<Boolean>(false);
  let ctx: gsap.Context;
  // let isAnimating: boolean = false;

  const getBuiltTree = (content: Array<PortableTextBlock>) => {
    const validHeadings = ['h2', 'h3', 'h4'];
    const headings = content.filter((block) => {
      if (!block.style) {
        return false;
      }

      return block._type === 'block' && validHeadings.includes(block.style);
    });

    const tree:Array<string> = [];

    headings.forEach((head, idx) => {
      const itemString = `<li class="article-meta__toc-item">
          <a
            href="#heading-${head.children[0]._key}"
            class="article-meta__toc-link"
          >${head.children[0].text}</a>
        </li>`;
      const isChild = idx > 0 &&
        validHeadings.indexOf(headings[idx - 1].style as string)
          < validHeadings.indexOf(head.style as string);
      const isLastChild = idx < headings.length - 1 ?
        (
          validHeadings.indexOf(headings[idx + 1].style as string)
            < validHeadings.indexOf(head.style as string)
        ) : true;


      if (isChild) {
        tree.push('<ul class="article-meta__toc-list">');
      }

      tree.push(itemString);

      if (isLastChild) {
        tree.push('</ul>');
      }
    });

    return tree.join('');
  };

  const toggleMenu = (e: MouseEvent) => {
    e.preventDefault();

    if (isAnimating.value) {
      return;
    }

    open.value = !open.value;
  };

  const buildTimeline = (menu: HTMLUListElement, items: HTMLLIElement[], isOpen:Boolean) => {
    const tl = gsap.timeline({
      paused: true,
      defaults: {
        ease: 'power2.out',
      },
      onStart: () => {
        isAnimating.value = true;
      },
      onComplete: () => {
        if (isOpen) {
          menu.classList.add('article-meta__toc-nav--open');
        } else {
          menu.classList.remove('article-meta__toc-nav--open');
        }

        gsap.set(menu, {clearProps: 'all'});
        gsap.set(items, {clearProps: 'all'});

        isAnimating.value = false;
      },
    });

    let height = 0;
    // const opacity = isOpen ? 1 : 0;

    if (isOpen) {
      menu.style.display = 'block';
      menu.getBoundingClientRect().height;
      height = menu.getBoundingClientRect().height;
      menu.style.height = '0';

      tl
        .to(menu, {
          height,
          duration: .3,
        })
        .to(
          items,
          {
            duration: .3,
            opacity: 1,
            stagger: .1,
          }
        );
    } else {
      tl
        .to(items, {
          opacity: 0,
          duration: .15,
          stagger: {
            each: .1,
            amount: 0,
            from: 'end',
          },
        })
        .to(menu, {
          height: 0,
          duration: .15,
        });
    }

    return tl;
  };

  const playTimeline = () => {
    const query = window.matchMedia('(max-width: 1440px)');

    if (!query.matches || !tl.value) {
      return;
    }

    tl.value.play();
  };

  onMounted(() => {
    ctx = gsap.context((self) => {
      if (!self.selector) {
          return;
        }

        const menu = self.selector('.article-meta__toc-nav');
        const items = self.selector('.article-meta__toc-item');
        const links = self.selector('.article-meta__toc-link');

        tl.value = buildTimeline(menu[0], items, open.value);

        [...links].forEach((link) => {
          link.addEventListener('click', (e: MouseEvent) => {
            e.preventDefault();

            const href = (e.target as HTMLAnchorElement).getAttribute('href');
            const target = document.querySelector(href as string);
            gsap.to(window, {
              duration: .5,
              scrollTo: {
                y: target as HTMLElement,
                offsetY: 100,
              },
              ease: 'power2.out',
            });
          });
        });
    }, meta.value);
  });

  onUnmounted(() => {
    ctx.revert();
  });

  watch(open, (val) => {
    if (!tl.value || !ctx || !ctx.selector) {
      return;
    }

    tl.value = buildTimeline(ctx.selector('.article-meta__toc-nav')[0], ctx.selector('.article-meta__toc-item'), val);
    playTimeline();
  });

  defineProps<{
    technologies?: Array<ProjectTechnology>,
    categories?: Array<{_id: string, title: string}>,
    content?: Array<PortableTextBlock>,
  }>();
</script>