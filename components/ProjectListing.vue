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
                class="project-listing__title-link"
                @click="gtag('event', 'click', { 'value': project.title })">
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
              @click="gtag('event', 'click', { 'value': project.title })"
            >Read about this project</NuxtLink>
            <LazyButton
              v-if="project.link"
              element="a"
              :href="project.link"
              external
              class="project-listing__button"
              @click="gtag('event', 'click', { 'value': project.title, 'target': project.link })"
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
      }
    }

    &__image-wrap {
      // (d)dark-mode / (l)light-mode (t)ransparent & (a)ccent
      --c-dt: rgba(128, 164, 194, .5);
      --c-lt: rgba(144, 167, 178, .5);
      --icon-width: clamp(1.125rem, 7%, 2.5rem);
      --icon-offset-v: clamp(0.75rem, 4%, 3.25rem);
      position: relative;
      margin-bottom: 2.25rem;

      &::before {
        content: '';
        position: absolute;
        inset-inline-start: 0;
        inset-block-end: 0;
        width: 100%;
        height: calc(var(--icon-width) + (2 * var(--icon-offset-v)));
        border-bottom-left-radius: .5rem;
        border-bottom-right-radius: .5rem;
        transition: opacity .2s ease-out;
        mix-blend-mode: screen;
      }

      &::before {
        z-index: 1;
        background: var(--c-lt);
      }
    }

    &__image-wrap:hover::before {
      opacity: .3;
    }

    .dark-mode &__image-wrap::before {
      background: var(--c-dt);
    }

    &__image-icon {
      position: absolute;
      inset-inline-start: var(--icon-offset-v);
      inset-block-end: var(--icon-offset-v);
      z-index: 3;
      width: var(--icon-width);
      aspect-ratio: 1 / 1;
      color: var(--c-background);
      transition: opacity .2s ease-out;
    }

    &__image-wrap:hover &__image-icon {
      opacity: .3;
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
    ref,
    onUpdated,
    useGtag,
    broadcastPagination,
    smoothScroll as scrollTo
  } from '#imports';
  const { gtag } = useGtag();
  const scroller = ref<NodeJS.Timeout|false>(false);

  onUpdated(() => {
    broadcastPagination();

    if (scroller.value) {
      clearTimeout(scroller.value);
    }

    scroller.value = setTimeout(() => {
      scrollTo('.project-listing');
      scroller.value = false;
    }, 650);
  });

  defineProps<{
    projects?: ProjectLineItem[];
    loading?: boolean;
  }>();
</script>