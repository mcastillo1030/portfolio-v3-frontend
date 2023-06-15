<template>
  <code class="inline-code">
    <slot />
  </code>
</template>

<script setup lang="ts">
  defineProps<{
    code?: string;
  }>();
</script>