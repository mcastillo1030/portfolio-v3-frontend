<template>
  <LazyNuxtLink v-if="href" :to="href" class="internal-link">
    <slot />
  </LazyNuxtLink>
</template>

<script setup lang="ts">
  defineProps<{
    href?: string;
  }>();
</script>