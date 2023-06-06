<template>
  <section class="home-projects">
    <div class="container home-projects__container">
      <header class="home-projects__header">
        <h2 class="home-projects__title">{{ title }}</h2>
        <a :href="`/projects`" class="home-projects__listing-link">View all</a>
      </header>
      <ul class="home-projects__list">
        <li class="home-projects__item" v-for="(project, index) in projects">
          <OutlineImage
            v-if="project.featured_image"
            class="home-projects__image accent"
            :class="index % 2 === 0 ? 'reverse' : ''"
            :image="project.featured_image"
            :ideal-width="380"
            :ideal-height="380"
          />
          <div class="home-projects__content">
            <h3 class="home-projects__project-title epsilon">{{ project.title }}</h3>
            <p class="home-projects__project-excerpt">{{ project.excerpt }}</p>
            <a :href="`/projects/${project.id}`" class="home-projects__project-link">Read about this project</a>
            <Button element="a" href="https://google.com" external class="home-projects__button">View Project Site</Button>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<style lang="scss">
  .home-projects {
    margin-top: clamp(5rem, 3.18rem + 7.767vw, 12.5rem);

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
      position: relative;
      background: var(--c-background);
    }

    &__project-title {
      margin-bottom: 1rem;
    }

    &__project-excerpt {
      margin-bottom: 1.25rem;
    }

    &__project-link {
      display: block;
      margin-bottom: 1.25rem;
      text-transform: lowercase;
    }
  }

  @media screen and (min-width: c.$b-medium) {
    .home-projects {
      &__list {
        --column-gap: clamp(3.125rem, 0.208rem + 6.076vw, 7.5rem);
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

  @media screen and (min-width: c.$b-xlarge) {
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
  defineProps<{
    title: string;
    projects: Array<ProjectPage>;
  }>();
</script>