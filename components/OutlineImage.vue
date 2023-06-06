<template>
  <div class="outline-image">
    <nuxt-img
      :src="`http://placekitten.com/${image.width}/${image.height}`"
      :alt="image.alt"
      :width="idealWidth"
      :height="idealHeight"
      loading="lazy"
      class="outline-image__image"
    />
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

    &__image {
      position: relative;
      display: block;
      border-radius: .5rem;
      filter: grayscale(1);
    }
  }
</style>

<script setup lang="ts">
  defineProps<{
    image: Asset;
    idealWidth?: number;
    idealHeight?: number;
  }>();
</script>