<template>
  <svg
    class="mark"
    :class="classes"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 23 23"
  >
    <title>Marlon Castillo Logo</title>
    <path class="mark__foreground" d="M19.018 0H3.58355C1.6044 0 0 1.5991 0 3.57169V18.955c0 1.9726 1.6044 3.5717 3.58355 3.5717H19.018c1.9792 0 3.5836-1.5991 3.5836-3.5717V3.57169C22.6016 1.5991 20.9972 0 19.018 0Z"/>
    <path class="mark__background" d="M22.6015 14.3932H12.5558v2.5018h10.0457v-2.5018ZM5.02018 16.895l-1.8158-1.7938 3.81319-3.8006-3.88262-3.86976 1.80514-1.79916 5.68781 5.66892-5.60772 5.5944Z"/>
  </svg>
</template>

<style lang="scss">
  .mark {
    &__foreground {
      fill: var(--c-foreground);
    }

    &__background {
      fill: var(--c-background);
    }
  }
</style>

<script lang="ts">
  const props = {
    classes: {
      type: String,
      default: ''
    },
  };

  export default {
    name: 'Mark',
    props,
  };
</script>