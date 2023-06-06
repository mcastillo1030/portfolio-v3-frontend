<template>
  <svg
    class="hero-watermark"
    :class="classes"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 424 246"
  >
    <path class="hero-watermark__cursor" d="M423.936 190.804H205.164V245.287H423.936V190.804Z"/>
    <path class="hero-watermark__caret" d="M41.0557 245.288L1.51204 206.223L84.5541 123.456L0 39.1812L39.3116 0L163.177 123.456L41.0557 245.288Z"/>
  </svg>
</template>

<style lang="scss">
  .hero-watermark {
    fill: var(--c-action);
  }
</style>

<script lang="ts">
  const props = {
    classes: {
      type: String,
      default: '',
    },
  };
  export default {
    name: 'HeroWatermark',
    props,
  };
</script>