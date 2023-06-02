<template>
  <svg
    class="icon menu-open"
    :class="classes"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
  >
    <title>Align Right Icon</title>
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M28 8H4m24 8H12m16 8H9.33333"/>
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
  .menu-open {
    width: 2rem;
    height: 2rem;
    stroke: var(--c-action);
  }
</style>