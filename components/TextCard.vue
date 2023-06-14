<template>
  <section class="text-card">
    <div class="container">
      <div class="text-card__wrap">
        <h2 class="text-card__title">{{ title }}</h2>
        <!-- <div class="text-card__text">{{ text }}</div> -->
        <!-- <div class="text-card__text wysiwyg">
          <SanityContent :blocks="text" />
        </div> -->
        <Wysiwyg class="text-card__text" :body="text" v-if="text" />
      </div>
    </div>
  </section>
</template>

<style lang="scss">
  .text-card {
    margin-top: 3.375rem;

    &__wrap {
      max-width: 53.375rem;
    }

    &__title {
      color: var(--c-accent-2);
      margin-bottom: 1.125rem;
    }

    &__text {
      padding-left: 1rem;
    }
  }

  @media screen and (min-width: c.$b-medium) {
    .text-card {
      .container {
        height: 100%;
      }

      &__wrap {
        height: 100%;
        padding: 3.125rem 2.5rem 3.125rem 3.125rem;
        background: var(--c-accent-4);
        border-radius: .5rem;
      }
    }
  }

  @media screen and (min-width: c.$b-medium-large) {
    .text-card {
      &__wrap {
        padding: 3.875rem 3rem;
      }
    }
  }
</style>

<script setup lang="ts">
import type { PortableTextBlock } from '@portabletext/types';
import Wysiwyg from './Wysiwyg.vue';

  defineProps<{
    title?: string;
    text?: Array<PortableTextBlock>;
  }>();
</script>