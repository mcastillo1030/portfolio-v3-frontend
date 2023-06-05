<template>
  <svg
    class="icon computer-monitor"
    :class="classes"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 257 257"
  >
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="21.399" d="M213.992 32.099H42.799c-11.819 0-21.4 9.58-21.4 21.4v106.995c0 11.818 9.581 21.399 21.4 21.399h171.193c11.818 0 21.399-9.581 21.399-21.399V53.498c0-11.818-9.581-21.4-21.399-21.4ZM85.597 224.691h85.597m-42.798-42.798v42.798"/>
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
    name: 'ComputerMonitor',
    props,
  };
</script>

<style lang="scss">
  .computer-monitor {
    width: 2rem;
    // height: 2rem;
    aspect-ratio: 26 / 24;
    fill: none;
    stroke: currentColor;
  }
</style>