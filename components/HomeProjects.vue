<template>
  <section class="home-projects" ref="hpProjects">
    <div class="container home-projects__container">
      <header class="home-projects__header">
        <h2 v-if="title" class="home-projects__title">{{ title }}</h2>
        <NuxtLink to="/projects" class="home-projects__listing-link">View More</NuxtLink>
      </header>
      <ul class="home-projects__list" v-if="projects">
        <li class="home-projects__item" v-for="(project, index) in projects">
          <LazyOutlineImage
            v-if="project.mainImage"
            class="home-projects__image accent"
            :link="`/projects/${project.slug.current}`"
            :asset-id="project.mainImage.assetId"
            :class="index % 2 === 0 ? 'reverse' : ''"
            :alt="project.mainImage.alt ? project.mainImage.alt : project.title"
            :width="380"
            :height="380"
            :sizes="true"
          />
          <div class="home-projects__content">
            <h3 class="home-projects__project-title epsilon">{{ project.title }}</h3>
            <p class="home-projects__project-excerpt">{{ project.excerpt }}</p>
            <NuxtLink :to="`/projects/${project.slug.current}`" class="home-projects__project-link">Read about this project</NuxtLink>
            <LazyButton v-if="project.link" element="a" :href="project.link" external class="home-projects__button">View Project Site</LazyButton>
          </div>
        </li>
      </ul>
      <div class="home-projects__none" v-else>
        <h3 class="home-projects__none-title delta">Nothing to see here...yet</h3>
        <p class="home-projects__none-sub">Still working on getting you &#x2728;fresh&#x2728; content.</p>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
  .home-projects {
    margin-top: clamp(5rem, 2.777rem + 9.486vw, 12.5rem);

    &__header {
      display: flex;
      align-items: baseline;
      column-gap: 1.5rem;
      margin-bottom: 2.375rem;
    }

    &__title {
      margin: 0;
    }

    &__listing-link {
      font-size: clamp(0.875rem, 0.814rem + 0.259vw, 1.125rem);
      text-transform: lowercase;
    }

    &__list {
      padding: 0;
      margin: 0;
      list-style: none;
    }

    &__item {
      --outline-offset: 1.125rem;
      position: relative;
      width: calc(100% - var(--outline-offset));
      max-width: 23.75rem;
      margin: 0;

      & + & {
        margin-top: clamp(4rem, 4.16666667vw, 5rem);
      }

      &::before {
        content: '';
        display: block;
        position: absolute;
        top: 25%;
        right: calc(var(--outline-offset) * -1);
        width: 50%;
        height: 50%;
        border-radius: .5rem;
        border-top: .125rem dotted var(--c-accent-1);
        border-right: .125rem dotted var(--c-accent-1);
        border-bottom: .125rem dotted var(--c-accent-1);
        transform: translate(0, -25%);
      }

      &:nth-child(even) {
        text-align: right;
        margin-left: auto;
      }

      &:nth-child(even)::before {
        right: auto;
        left: calc(var(--outline-offset) * -1);
        border-right: none;
        border-left: .125rem dotted var(--c-accent-1);
      }
    }

    &__image {
      max-width: 23.75rem;
      margin-bottom: clamp(2.25rem, 2.1875vw, 2.625rem);
    }

    &__content {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      position: relative;
      background: var(--c-background);
    }

    &__item:nth-child(even) &__content {
      align-items: flex-end;
    }

    &__project-title {
      margin-bottom: 1rem;
    }

    &__project-excerpt {
      margin-bottom: 1.75rem;
    }

    &__project-link {
      display: block;
      margin-bottom: 1.5rem;
      text-transform: lowercase;
      color: var(--c-accent-1);
    }
  }

  @media screen and (min-width: c.$b-medium) {
    .home-projects {
      &__list {
        --column-gap: clamp(3.125rem, 1.828rem + 5.534vw, 7.5rem);
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: var(--column-gap);
      }

      &__item {
        max-width: none;

        &::before {
          top: 50%;
          transform: translate(0, -50%);
        }

        &:nth-child(even) {
          justify-self: flex-end;
        }

        & + & {
          margin: 0;
        }
      }

      &__image {
        max-width: none;

        img {
          width: 100%;
          object-fit: cover;
        }
      }
    }
  }

  @media screen and (min-width: 1350px) {
    .home-projects {
      &__list {
        grid-template-columns: repeat(3, 1fr);
      }

      &__item {
        &::before {
          display: none;
        }

        &:nth-child(even) {
          justify-self: flex-start;
          text-align: left;
        }
      }

      &__item:nth-child(even) &__content {
        align-items: flex-start;
      }

      &__item:nth-child(even) &__image::before {
        left: auto;
        right: .5rem;
      }

      &__content {
        background: none;
      }
    }
  }
</style>

<script setup lang="ts">
  import { onMounted, onUnmounted, ref } from '#imports';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';

  gsap.registerPlugin(ScrollTrigger);
  const hpProjects = ref<HTMLElement>();
  let ctx: gsap.Context;

  onMounted(() => {
    ctx = gsap.context((self) => {
      if (!self.selector) {
        return;
      }

      const container = self.selector('.home-projects__container');
      gsap.from(container, {
        opacity: 0,
        yPercent: 10,
        scrollTrigger: {
          trigger: hpProjects.value,
          start: 'top bottom-=15%',
          end: '+=100px',
          scrub: true,
          toggleActions: 'play none none reverse',
        }
      })
    }, hpProjects.value);
  });

  onUnmounted(() => {
    ctx.revert();
  });

  defineProps<{
    title?: string;
    projects?: Array<ProjectLineItem>;
  }>();
</script>