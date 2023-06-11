<template>
  <section class="mark-hero">
    <div class="container mark-hero__container">
      <div class="mark-hero__wrap">
        <IconsTerminalMark class="mark-hero__mark" />
        <OutlineTitle v-if="title" :is-h1="true" :text="`${title}_`" class="mark-hero__title" />
      </div>
    </div>
  </section>
</template>

<style lang="scss">
  .mark-hero {
    margin-top: clamp(3rem, 1.666rem + 5.692vw, 7.5rem);

    &__wrap {
      display: flex;
      align-items: flex-end;
      column-gap: clamp(1.375rem, 0.967rem + 1.739vw, 2.75rem);
    }

    &__mark {
      width: 24.5%;
      max-width: 11.625rem;
      color: var(--c-selection);
    }

    &__title {
      margin-bottom: 0;
      transform: translateY(1rem);
    }
  }
</style>

<script lang="ts" setup>
import { clamp } from 'gsap';

  defineProps<{
    title?: string
  }>();
</script>