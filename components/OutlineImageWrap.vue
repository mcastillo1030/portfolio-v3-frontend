<template>
  <LazyNuxtLink v-if="isLink" :to="href" class="oiwrap">
    <slot />
  </LazyNuxtLink>
  <div  v-else class="oiwrap">
    <slot />
  </div>
</template>

<style lang="scss">
  .oiwrap {
    display: block;
    aspect-ratio: var(--oi-width) / var(--oi-height);

    &:focus {
      outline: 0;
    }
  }
</style>

<script setup lang="ts">
  defineProps<{
    isLink?: boolean;
    href?: string;
  }>();
</script>