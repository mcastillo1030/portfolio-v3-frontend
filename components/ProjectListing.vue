<template>
  <section class="project-listing">
    <div class="container project-listing__container">
      <CliSpinner v-if="loading" class="project-listing__spinner" />
      <div v-else class="project-listing__wrap">
        <ul v-if="projects" class="project-listing__projects">
          <li class="project-listing__project" v-for="project in projects">
            <h2 class="project-listing__title gamma">{{ project.title }}</h2>
            <OutlineImage
              v-if="project.mainImage"
              class="project-listing__image reverse"
              :asset-id="project.mainImage.assetId"
              :alt="project.mainImage.alt ? project.mainImage.alt : project.title"
              :width="525"
              :height="353"
            />
            <p class="project-listing__excerpt">{{ project.excerpt }}</p>
            <NuxtLink
              :to="`/projects/${project.slug.current}`"
              class="project-listing__link"
              @click="gtm?.trackEvent({ action: 'click', event: 'project-listing-link', value: project.title })"
            >Read about this project</NuxtLink>
            <Button
              v-if="project.link"
              element="a"
              :href="project.link"
              external
              class="project-listing__button"
              @click="gtm?.trackEvent({ action: 'click', event: 'project-listing-button', value: project.title, target: project.link })"
            >View Project Site</Button>
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
      max-width: 35.375rem;
      margin: 0;
    }

    &__title {
      margin: 0 0 clamp(1rem, 2.561vw, 2.625rem);
      color: var(--c-accent-2);
    }

    &__image {
      margin-bottom: 2.25rem;

      &::before {
        border-color: var(--c-accent-2);
      }
    }

    &__excerpt {
      margin-bottom: 1.75rem;
    }

    &__link {
      display: block;
      margin-bottom: 1.5rem;
      text-transform: lowercase;
      color: var(--c-accent-2);
    }
  }

  @media screen and (min-width: c.$b-medium) {
    .project-listing {
      &__project:nth-child(even) {
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
  const gtm = useGtm();

  defineProps<{
    projects?: Array<ProjectLineItem>;
    loading?: boolean;
  }>();
</script>