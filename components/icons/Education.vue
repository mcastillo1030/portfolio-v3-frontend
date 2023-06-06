<template>
  <svg
    class="icon education"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 52 52"
  >
    <g v-if="type === 'degree'" class="education__stroke">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M26 30.3335c7.1797 0 13-5.8203 13-13s-5.8203-13-13-13-13 5.8203-13 13 5.8203 13 13 13Z"/>
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="m33.5336 27.9287 3.2998 19.7383-10.8333-6.5-10.8334 6.5 3.2999-19.7383"/>
    </g>
    <g v-else class="education__stroke">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M33.5833 6.5h-22.75c-1.14924 0-2.25144.45655-3.0641 1.2692C6.95655 8.58186 6.5 9.68406 6.5 10.8333v30.3334C6.5 43.55 8.45 45.5 10.8333 45.5h30.3334c1.1492 0 2.2514-.4565 3.0641-1.2692.8127-.8127 1.2692-1.9149 1.2692-3.0641v-22.75L33.5833 6.5Z"/>
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M32.5 6.5v13h13"/>
    </g>
  </svg>
</template>

<style lang="scss">
  .education {
    width: clamp(2.75rem, 2.70833333vw, 3.25rem);
    aspect-ratio: 1 / 1;
    fill: none;

    &__stroke {
      stroke: currentColor;
    }
  }
</style>

<script lang="ts">
  const props = {
    type: {
      type: String,
      default: ''
    },
  };

  export default {
    name: 'Education',
    props,
  };
</script>