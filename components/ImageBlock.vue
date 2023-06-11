<template>
  <SanityImage
    v-if="asset._ref"
    :asset-id="asset._ref"
  >
    <template #default="{src}">
      <OutlineImage
        class="project-content__image reverse"
        :src="src"
        :alt="alt"
        :caption="caption"
      />
    </template>
  </SanityImage>
</template>

<script setup lang="ts">
  defineProps<{
    caption?: string;
    alt?: string;
    asset: SanityField;
  }>();
</script>