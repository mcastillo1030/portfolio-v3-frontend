<template>
  <NuxtLink v-if="isLink" :to="href" class="oiwrap is-link">
    <slot />
  </NuxtLink>
  <div  v-else class="oiwrap">
    <slot />
  </div>
</template>

<style lang="scss">
  .oiwrap {
    display: block;

    &:focus {
      outline: 0;
    }

    &.is-link {
      cursor: url('/img/cursors/pointer-dark-reversed.png') 0 0, auto;
      cursor: -webkit-image-set(
          url('/img/cursors/pointer-dark-reversed.png') 1x,
          url('/img/cursors/pointer-dark-reversed@2x.png') 2x
        ) 0 0, auto;
    }

    .light-mode &.is-link {
      cursor: url('/img/cursors/pointer-light-reversed.png') 0 0, auto;
      cursor: -webkit-image-set(
          url('/img/cursors/pointer-light-reversed.png') 1x,
          url('/img/cursors/pointer-light-reversed@2x.png') 2x
        ) 0 0, auto;
    }
  }
</style>

<script setup lang="ts">
  defineProps<{
    isLink?: boolean;
    href?: string;
  }>();
</script>