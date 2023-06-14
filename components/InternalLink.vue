<template>
  <NuxtLink v-if="href" :to="href" class="internal-link">
    <slot />
  </NuxtLink>
</template>

<script setup lang="ts">
  defineProps<{
    href?: string;
  }>();
</script>