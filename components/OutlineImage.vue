<template>
  <div class="outline-image">
    <figure v-if="caption" class="outline-image__figure">
      <img
        :src="src"
        :alt="alt"
        :width="width"
        :height="height"
        loading="lazy"
        class="outline-image__image"
      >
      <figcaption class="outline-image__caption" v-text="caption"></figcaption>
    </figure>
    <img
      v-else
      :src="src"
      :alt="alt"
      :width="width"
      :height="height"
      loading="lazy"
      class="outline-image__image"
    >
  </div>
</template>

<style lang="scss">
  .outline-image {
    position: relative;

    &::before {
      content: '';
      position: absolute;
      top: .5rem;
      left: .5rem;
      width: 100%;
      height: 100%;
      background: var(--c-background);
      border-radius: .5rem;
      border: .125rem solid var(--c-accent-3);
    }

    &.reverse::before {
      left: auto;
      right: .5rem;
    }

    &.accent::before {
      border-color: var(--c-accent-1);
    }

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: .075;
      border-radius: .5rem;
      background: var(--c-accent-3);
      mix-blend-mode: multiply;
    }

    &.accent::after {
      background: var(--c-accent-1);
    }

    &__figure {
      position: relative;
    }

    &__caption {
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: 1;
      width: 100%;
      padding: .75rem 1rem;
      margin: 0;
      background: var(--c-header-bg);
      border-radius: 0 0 .5rem .5rem;
    }

    &__image {
      position: relative;
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: .5rem;
      filter: grayscale(1);
    }
  }
</style>

<script setup lang="ts">
  defineProps<{
    src: string;
    alt?: string;
    width?: number;
    height?: number;
    caption?: string;
  }>();
</script>