<template>
  <svg
    class="icon sun"
    :class="classes"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
  >
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 4v1.33333m0 21.33337V28M4 16h1.33333m21.33337 0H28m-3.5147-8.48533-.9426.94266M8.45733 23.5427l-.94266.9426m0-16.97063.94266.94266M23.5427 23.5427l.9426.9426M16 21.3333c1.4145 0 2.771-.5619 3.7712-1.5621S21.3333 17.4145 21.3333 16c0-1.4145-.5619-2.771-1.5621-3.7712S17.4145 10.6667 16 10.6667c-1.4145 0-2.771.5619-3.7712 1.5621S10.6667 14.5855 10.6667 16c0 1.4145.5619 2.771 1.5621 3.7712S14.5855 21.3333 16 21.3333Z"/>
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
    name: 'Sun',
    props,
  };
</script>

<style lang="scss">
  .sun {
    width: 2rem;
    height: 2rem;
    fill: none;
    stroke: #C792EA;
  }
</style>