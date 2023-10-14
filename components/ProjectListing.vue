<template>
  <section class="project-listing">
    <div class="container project-listing__container">
      <LazyCliSpinner v-if="loading" class="project-listing__spinner" />
      <div v-else class="project-listing__wrap">
        <ul v-if="projects" class="project-listing__projects">
          <li class="project-listing__project" v-for="project in projects">
            <h2 class="project-listing__title delta">
              <LazyNuxtLink
                :to="`/projects/${project.slug.current}`"
                class="project-listing__title-link cursor-pointer cursor-pointer--reversed"
                @click="gtm?.trackEvent({ action: 'click', event: 'project-listing-link', value: project.title })">
                {{ project.title }}
              </LazyNuxtLink>
            </h2>
            <div class="project-listing__image-wrap">
              <IconsNavItem type="code" classes="project-listing__image-icon" />
              <OutlineImage
                v-if="project.mainImage"
                class="project-listing__image reverse"
                :link="`/projects/${project.slug.current}`"
                :asset-id="project.mainImage.assetId"
                :alt="project.mainImage.alt ? project.mainImage.alt : project.title"
                :width="525"
                :height="438"
              />
            </div>
            <p class="project-listing__excerpt">{{ project.excerpt }}</p>
            <NuxtLink
              :to="`/projects/${project.slug.current}`"
              class="project-listing__link"
              @click="gtm?.trackEvent({ action: 'click', event: 'project-listing-link', value: project.title })"
            >Read about this project</NuxtLink>
            <LazyButton
              v-if="project.link"
              element="a"
              :href="project.link"
              external
              class="project-listing__button"
              @click="gtm?.trackEvent({ action: 'click', event: 'project-listing-button', value: project.title, target: project.link })"
            >View Project Site</LazyButton>
          </li>
        </ul>
        <div class="project-listing__no-results" v-else>
          <h2 class="project-listing__no-results-title">Nothing to see here...yet</h2>
          <p class="project-listing__no-results-sub">Still working on getting you &#x2728;fresh&#x2728; content.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
  .project-listing {
    --column-gap: clamp(2.915rem, 12.439vw, 12.75rem);
    margin-top: clamp(4rem, 0.739rem + 13.913vw, 15rem);

    &__projects {
      display: flex;
      flex-direction: column;
      gap: clamp(3.5rem, 2.5rem + 4.269vw, 6.875rem) var(--column-gap);
      padding: 0;
      margin: 0;
      list-style: none;
    }

    &__project {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      max-width: 35.375rem;
      margin: 0;
    }

    &__title {
      margin: 0 0 clamp(1rem, 2.561vw, 2.625rem);
    }

    &__title-link {
      color: var(--c-accent-2);
      text-decoration: none;
      transition: color .2s ease-out;

      &:hover {
        color: var(--c-foreground);
        text-decoration: 1px underline var(--c-foreground);
        cursor: url('/img/cursors/pointer-dark.png') 0 0, auto;
        cursor: -webkit-image-set(
            url('/img/cursors/pointer-dark.png') 1x,
            url('/img/cursors/pointer-dark@2x.png') 2x
          ) 0 0, auto;
      }
    }

    .light-mode & &__title-link {
      cursor: url('/img/cursors/pointer-light.png') 0 0, auto;
      cursor: -webkit-image-set(
          url('/img/cursors/pointer-light.png') 1x,
          url('/img/cursors/pointer-light@2x.png') 2x
        ) 0 0, auto;
    }

    &__image-wrap {
      // (d)dark-mode / (l)light-mode (t)ransparent & (a)ccent
      --c-dt: rgba(128, 164, 194, .5);
      --c-lt: rgba(144, 167, 178, .5);
      position: relative;
      margin-bottom: 2.25rem;

      &::before,
      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: .5rem;
        transform-origin: top left;
      }

      &::before {
        z-index: 1;
        background: var(--c-dt);
        clip-path: polygon(0 0, 0 71%, 71% 0);
        transition: clip-path .2s ease-in-out;
      }

      &::after {
        z-index: 2;
        background: var(--c-selection);
        clip-path: polygon(0 0, 0 40%, 40% 0);
        transition: clip-path .3s ease-in-out;
      }

      &:hover::before {
        clip-path: polygon(0 0, 0 40%, 40% 0);
      }

      &:hover::after {
        clip-path: polygon(0 0, 0 20%, 20% 0);
      }
    }

    &__image-icon {
      position: absolute;
      top: clamp(0.75rem, 4%, 3.25rem);
      left: clamp(0.75rem, 4%, 3.25rem);
      z-index: 3;
      width: clamp(1.125rem, 7%, 2.5rem);
      width: auto;
      aspect-ratio: 1 / 1;
      color: var(--c-background);
      transform-origin: top left;
      transition: transform .3s ease-in-out;
    }

    &__image-wrap:hover &__image-icon {
      transform: scale(.6);
    }

    &__image::before {
      border-color: var(--c-accent-2);
    }

    &__excerpt {
      margin-bottom: 1.75rem;
    }

    &__link {
      // display: block;
      margin-bottom: 1.5rem;
      text-transform: lowercase;
      color: var(--c-accent-2);
    }
  }

  @media screen and (min-width: c.$b-medium) {
    .project-listing {
      &__project:nth-child(even) {
        align-items: flex-end;
        margin-left: auto;
        text-align: right;
      }
    }
  }

  @media screen and (min-width: c.$b-medium-large) {
    .project-listing {
      &__projects {
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
      }

      &__project {
        width: calc((100% - var(--column-gap)) / 2);
      }
    }
  }
</style>

<script setup lang="ts">
  import {
    useGtm,
    ref,
    onUpdated,
    smoothScroll as scrollTo
  } from '#imports';

  const gtm = useGtm();
  const scroller = ref<NodeJS.Timeout|false>(false);

  onUpdated(() => {
    if (scroller.value) {
      clearTimeout(scroller.value);
    }

    scroller.value = setTimeout(() => {
      scrollTo('.project-listing');
      scroller.value = false;
    }, 650);
  });

  defineProps<{
    projects?: Array<ProjectLineItem>;
    loading?: boolean;
  }>();
</script>