<template>
  <section class="text-hero" v-if="title">
    <div class="container text-hero__container">
      <p class="text-hero__subtitle">{{ subtitle }}</p>
      <h1 class="text-hero__title">{{ title }}</h1>
      <div class="text-hero__meta" v-if="author || publishedAt">
        <p class="text-hero__date" v-if="publishedAt">Published {{ dateFormatter(publishedAt) }}</p>
        <div class="text-hero__author">
          <LazySanityImage
            v-if="author"
            :asset-id="author.image.assetId"
            :w="80"
            :h="80"
          >
            <template #default="{src}">
              <img
                :src="src"
                :alt="author.image.alt ? author.image.alt : author.name + 'Avatar'"
                class="text-hero__author-image"
                width="80"
                height="80"
              />
            </template>
          </LazySanityImage>
          <p class="text-hero__author-name" v-if="author">by {{ author.name }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
  .text-hero {
    margin-top: clamp(2.544rem, 10.854vw, 11.125rem);

    &__subtitle {
      margin: 0;
      color: var(--c-action);
      font-size: clamp(1rem, 0.704rem + 1.265vw, 2rem);
      text-transform: lowercase;
    }

    &__title {
      margin-top: 0;
    }

    &__date {
      margin-bottom: .75rem;
      color: var(--c-accent-2);
    }

    &__author {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    &__author-image {
      width: clamp(2rem, 1.852rem + 0.632vw, 2.5rem);
      border-radius: 50%;
      background: var(--c-accent-4);
      border: .0625rem solid var(--c-accent-2);
    }

    &__author-name {
      margin: 0;
    }
  }
</style>

<script setup lang="ts">
  import { dateFormatter } from '#imports';

  defineProps<{
    title?: string;
    subtitle: string;
    author?: {
      name: string;
      image: CustomSanityImage;
    };
    publishedAt?: string;
  }>();
</script>