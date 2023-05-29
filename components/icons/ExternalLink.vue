<script lang="ts">
  const props = {
    classes: {
      type: String,
      default: ''
    },
  };

  export default {
    name: 'ExternalLink',
    props,
  };
</script>

<template>
  <svg :class="`icon ${classes}`" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11v6a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h6m4-3h6m0 0v6m0-6L8 12"/>
  </svg>
</template>