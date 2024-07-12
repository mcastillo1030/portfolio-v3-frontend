<style lang="scss">
  .outline-text {
    color: var(--c-background);
    text-shadow:
      calc(var(--stroke-width) * -1) calc(var(--stroke-width) * -1) 0 var(--c-foreground),
      var(--stroke-width) calc(var(--stroke-width) * -1) 0 var(--c-foreground),
      calc(var(--stroke-width) * -1) var(--stroke-width) 0 var(--c-foreground),
      var(--stroke-width) var(--stroke-width) 0 var(--c-foreground);

    @supports (-webkit-text-stroke: var(--stroke-width) var(--c-foreground)) {
      color: var(--c-foreground);
      text-shadow: none;
      -webkit-text-stroke: var(--stroke-width) var(--c-foreground);
      transition:
        color .2s ease-out,
        -webkit-text-stroke .2s ease-out;

      &::before {
        content: attr(data-content);
        position: absolute;
        -webkit-text-fill-color: var(--c-background);
        -webkit-text-stroke: 0;
      }
    }
  }
</style>

<script lang="ts">
  const props = {
    classes: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    },
    isH1: {
      type: Boolean,
      default: true,
    },
  };

  export default {
    name: 'OutlineTitle',
    props,
  };
</script>

<template>
  <h1 v-if="isH1" :class="`outline-text ${classes}`" :data-content="text">{{ text }}</h1>
  <p v-else :class="`outline-text alpha ${classes}`" :data-content="text">{{ text }}</p>
</template>