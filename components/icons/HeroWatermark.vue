<template>
  <svg
    class="hero-watermark"
    :class="classes"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 424 246"
  >
    <path d="M423.936 190.804H205.164v54.483h218.772v-54.483ZM41.0557 245.288 1.51204 206.223l83.04206-82.767L0 39.1812 39.3116 0 163.177 123.456 41.0557 245.288Z"/>
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