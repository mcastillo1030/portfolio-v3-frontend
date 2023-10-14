<template>
  <LazyNuxtLink v-if="isLink" :to="href" class="oiwrap cursor-pointer cursor-pointer--reversed">
    <slot />
  </LazyNuxtLink>
  <div  v-else class="oiwrap">
    <slot />
  </div>
</template>

<style lang="scss">
  .oiwrap {
    display: block;

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