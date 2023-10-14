<template>
  <a v-if="href" :href="href" :target="!href.includes(baseUrl) ? '_blank' : ''" class="internal-link">
    <slot />
  </a>
</template>

<script setup lang="ts">
  import { useRuntimeConfig } from 'nuxt/app';

  const runtimeConfig = useRuntimeConfig();
  const { baseUrl } = runtimeConfig.public as { baseUrl: string };

  defineProps<{
    href?: string;
  }>();
</script>