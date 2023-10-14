<template>
  <LazyOutlineImage
    v-if="asset._ref"
    class="project-content__image reverse"
    :asset-id="asset._ref"
    :alt="alt"
    :caption="caption"
    :sizes="true"
  />
</template>

<script setup lang="ts">
  defineProps<{
    caption?: string;
    alt?: string;
    asset: SanityField;
  }>();
</script>