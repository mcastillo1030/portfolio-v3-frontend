<template>
  <svg
    class="icon menu-close"
    :class="classes"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 486 486"
  >
    <title>X Icon</title>
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="40.5" d="m364.5 121.5-243 243m0-243 243 243"/>
  </svg>
</template>

<script lang="ts">
  const props = {
    classes: {
      type: String,
      default: ''
    },
  };

  export default {
    name: 'Menu',
    props,
  };
</script>

<style lang="scss">
  .menu-close {
    stroke: var(--c-action);
  }
</style>