<template>
  <div class="outline-image">
    <OutlineImageWrap :is-link="!!link" :href="link">
      <figure v-if="caption" class="outline-image__figure">
        <NuxtImg
          :src="assetId"
          :width="width"
          :height="height"
          loading="lazy"
          class="outline-image__image"
        />
        <figcaption class="outline-image__caption" v-text="caption"></figcaption>
      </figure>
      <NuxtImg
        v-else
        :src="assetId"
        :width="width"
        :height="height"
        loading="lazy"
        class="outline-image__image"
      />
    </OutlineImageWrap>
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

    &.overlay::after {
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
      transition: opacity .2s ease-out;
    }

    &.overlay:hover::after {
      opacity: 0;
    }

    &.overlay.accent::after {
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
      // filter: grayscale(1);
    }

    .overlay &__image {
      filter: grayscale(1);
    }

    &.overlay:hover &__image {
      filter: grayscale(0);
    }
  }
</style>

<script setup lang="ts">
  defineProps<{
    assetId: string;
    link?: string;
    alt?: string;
    width?: number;
    height?: number;
    caption?: string;
    sizes?: boolean;
  }>();
</script>