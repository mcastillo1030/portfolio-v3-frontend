<template>
  <section class="article-content">
    <div class="article-content__container container">
      <div class="article-content__wrap">
        <div class="article-content__head">
          <OutlineImage
            v-if="image"
            class="article-content__image reverse"
            :asset-id="image.assetId"
            :alt="image.alt ? image.alt : 'Article Image'"
            :width="800"
            :height="600"
            :sizes="true"
          />
          <Button
            v-if="link"
            element="a"
            external
            :href="link"
            class="article-content__button"
          >View Project</Button>
        </div>
        <ArticleMeta
          v-if="body || technologies"
          class="article-content__meta"
          :technologies="technologies"
          :categories="categories"
          :content="body"
        />
        <div class="article-content__content" v-if="body">
          <Wysiwyg class="v-article-content__wysiwyg" :body="body" />
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
  .article-content {
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
  }

  @media screen and (min-width: c.$b-xlarge) {
    .article-content {
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
  import type { PortableTextBlock } from '@portabletext/types';

  defineProps<{
    // project?: SanityProject;
    image?: CustomSanityImage;
    body?: Array<PortableTextBlock>;
    link?: string;
    technologies?: Array<ProjectTechnology>;
    categories?: Array<{_id: string, title: string}>;
  }>();
</script>