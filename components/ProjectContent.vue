<template>
  <section class="project-content" v-if="project">
    <div class="project-content__container container">
      <div class="project-content__wrap">
        <div class="project-content__head">
          <SanityImage
            v-if="project.mainImage"
            :asset-id="project.mainImage.assetId"
            :w="667"
            :h="500"
          >
            <template #default="{src}">
              <OutlineImage
                class="project-content__image reverse"
                :src="src"
                :alt="project.mainImage.alt ? project.mainImage.alt : project.title"
                :width="667"
                :height="500"
              />
            </template>
          </SanityImage>
          <Button
            v-if="project.link"
            element="a"
            external
            :href="project.link"
            class="project-content__button"
          >View Project</Button>
        </div>
        <ArticleMeta class="project-content__meta" :technologies="project.technologies" :content="project.body" />
        <div class="project-content__content">
          <div class="project-content__wysiwyg">
            <SanityContent :blocks="project.body" :serializers="serializers" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
  .project-content {
    &__wrap {
      margin-top: clamp(3.375rem, 2.893rem + 2.055vw, 5rem);
      max-width: 78.375rem;
    }

    &__image {
      margin-bottom: clamp(2.25rem, 1.731rem + 2.213vw, 3rem);
      max-width: 50rem;
    }

    &__content {
      max-width: 45rem;
      margin-top: 2.625rem;
    }

    &__wysiwyg {
      h2, h3, h4, h5, h6 {
        margin-bottom: 1rem;
        color: var(--c-foreground);
      }

      a {
        color: var(--c-action);
      }

      em {
        font-weight: 500;
      }

      ul,
      ol {
        margin: 1rem 0;
      }

      ul {
        list-style: none;
        padding: 0;
      }

      ul li {
        display: flex;
        align-items: center;
        gap: .6rem;

        &::before {
          content: '\FE61';
          display: block;
          color: var(--c-accent-2);
        }
      }

      ol {
        padding-left: 3.25rem;
        counter-reset: listCounter -1;
      }

      ol li {
        counter-increment: listCounter;

        &::marker {
          content: counter(listCounter, decimal) " => ";
          color: var(--c-accent-2);
        }
      }

      blockquote {
        position: relative;
        padding: 0;
        padding-left: 1rem;
        margin: 1.75rem 0;

        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: .25rem;
          height: 100%;
          background: var(--c-accent-2);
          border-radius: .5rem;
        }
      }
    }
  }

  @media screen and (min-width: c.$b-xlarge) {
    .project-content {
      &__wrap {
        display: grid;
        grid-template-columns: 3fr 2fr;
        grid-template-areas: 'head head' 'content meta';
        align-items: flex-start;
        column-gap: clamp(3.75rem, -4.773rem + 11.364vw, 6.875rem)
      }

      &__head {
        grid-area: head;
        margin-bottom: 5rem;
      }

      &__meta {
        position: sticky;
        top: 3rem;
        grid-area: meta;
      }

      &__content {
        grid-area: content;
        margin-top: 0;
      }
    }
  }
</style>

<script setup lang="ts">
  import type { Serializers } from '@nuxtjs/sanity/dist/runtime/components/sanity-content';
  import { resolveComponent } from 'vue';

  const serializers:Serializers = {
    types: {
      image: resolveComponent('ImageBlock'),
      code: resolveComponent('HighlightCodeBlock'),

    },
    styles: {
      h2: resolveComponent('InlineHeadingWithId'),
      h3: resolveComponent('InlineHeadingWithId'),
      h4: resolveComponent('InlineHeadingWithId'),
    }
  };

  defineProps<{
    project?: SanityProject;
  }>();
</script>