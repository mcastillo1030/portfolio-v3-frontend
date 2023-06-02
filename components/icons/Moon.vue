<template>
  <svg
    class="icon moon"
    :class="classes"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
  >
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 4c-1.5821 1.59322-2.4682 3.74855-2.4643 5.99385.0039 2.24535.8976 4.39755 2.4853 5.98515 1.5876 1.5877 3.7399 2.4814 5.9852 2.4853 2.2453.004 4.4006-.8822 5.9938-2.4643 0 2.3734-.7038 4.6935-2.0224 6.6668-1.3185 1.9734-3.1927 3.5115-5.3854 4.4198-2.1927.9082-4.6055 1.1458-6.9333.6828-2.3278-.463-4.46595-1.6059-6.14418-3.2841-1.67823-1.6783-2.82112-3.8164-3.28414-6.1442-.46302-2.3278-.22538-4.7406.68287-6.9333.90825-2.19271 2.44632-4.06686 4.41971-5.38544C11.3066 4.70379 13.6266 4 16 4Z"/>
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
    name: 'Moon',
    props,
  };
</script>

<style lang="scss">
  .moon {
    width: 2rem;
    height: 2rem;
    fill: none;
    stroke: #994CC3;
  }
</style>