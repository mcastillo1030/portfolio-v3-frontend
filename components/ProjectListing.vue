<template>
  <section class="project-listing">
    <div class="container project-listing__container">
      <ul v-if="projects" class="project-listing__projects">
        <li class="project-listing__project" v-for="project in projects">
          <h2 class="project-listing__title gamma">{{ project.title }}</h2>
          <SanityImage
            v-if="project.mainImage"
            :asset-id="project.mainImage.assetId"
            :w="525"
            :h="353"
          >
            <template #default="{src}">
              <OutlineImage
                class="project-listing__image reverse"
                :src="src"
                :alt="project.mainImage.alt ? project.mainImage.alt : project.title"
                :width="525"
                :height="353"
              />
            </template>
          </SanityImage>
          <p class="project-listing__excerpt">{{ project.excerpt }}</p>
          <NuxtLink :to="`/projects/${project.slug.current}`" class="project-listing__link">Read about this project</NuxtLink>
          <Button element="a" href="https://google.com" external class="project-listing__button">View Project Site</Button>
        </li>
      </ul>
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
  const projects = useProjectsList();
</script>