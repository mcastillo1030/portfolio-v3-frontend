<template>
  <div class="outline-image">
    <figure v-if="caption" class="outline-image__figure">
      <img
        :src="buildSrc(assetId, width, height)"
        :alt="alt"
        :width="width"
        :height="height"
        :sizes="buildSizes(assetId, sizes)"
        :srcset="buildSrcset(assetId, sizes, width, height)"
        loading="lazy"
        class="outline-image__image"
      >
      <figcaption class="outline-image__caption" v-text="caption"></figcaption>
    </figure>
    <img
      v-else
      :src="buildSrc(assetId, width, height)"
      :alt="alt"
      :width="width"
      :height="height"
      :sizes="buildSizes(assetId, sizes)"
      :srcset="buildSrcset(assetId, sizes, width, height)"
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
  const { $urlFor } = useNuxtApp();
  const { imageSizes } = useAppConfig();

  const buildSrc = (id: string, width: number|undefined, height: number|undefined) => {
    return width && height ? $urlFor(id).size(width, height).dpr(2).url() : $urlFor(id).auto('format').dpr(2).url()
  };

  const buildSrcset = (
    id: string,
    shouldBuild: boolean = false,
    width: number|undefined,
    height: number|undefined
  ) => {
    if (!shouldBuild) {
      return;
    }

    let w = 0;
    let h = 0;

    if (width &&  height) {
      w = width;
      h = height;
    } else {
      const dimensions = id.match(/image-(.*)-((.*)x(.*))-/);
      const hasDimensions = dimensions && dimensions.length > 3;
      w = hasDimensions ? parseInt(dimensions[3], 10) : 0;
      h = hasDimensions ? parseInt(dimensions[4], 10) : 0;
    }

    if (w && h) {
      const aspectRatio = h / w;
      const availableSizes = imageSizes.filter((size) => size <= w);
      const sources = availableSizes.map((size) => {
        const url = $urlFor(id).size(size, Math.ceil(size * aspectRatio)).dpr(2).url();
        return `${url} ${size}w`;
      }).join(', ');
      return `${buildSrc(id, w, h)} ${w}w, ${sources}`;
    } else {
      return '';
    }
  };

  const buildSizes = (
    id: string,
    shouldBuild: boolean = false,
  ) => {
    if (!shouldBuild) {
      return;
    }

    const dimensions = id.match(/image-(.*)-((.*)x(.*))-/);
    const hasDimensions = dimensions && dimensions.length > 3;
    const w = hasDimensions ? parseInt(dimensions[3], 10) : 0;

    if (w) {
      return `(min-width: ${w}px) ${w}px, 100vw`;
    } else {
      return '';
    }
  };

  defineProps<{
    assetId: string;
    alt?: string;
    width?: number;
    height?: number;
    caption?: string;
    sizes?: boolean;
  }>();
</script>