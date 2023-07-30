<template>
  <a v-if="href" :href="href" :target="!href.includes(baseUrl) ? '_blank' : ''" class="internal-link">
    <slot />
  </a>
</template>

<script setup lang="ts">
  const { baseUrl } = useAppConfig();

  defineProps<{
    href?: string;
  }>();
</script>