<template>
  <section class="text-hero" v-if="title">
    <div class="container text-hero__container">
      <p class="text-hero__subtitle">Projects</p>
      <h1 class="text-hero__title">{{ title }}</h1>
    </div>
  </section>
</template>

<style lang="scss">
  .text-hero {
    margin-top: clamp(2.544rem, 10.854vw, 11.125rem);

    &__subtitle {
      margin: 0 0 1.5rem;
      color: var(--c-action);
      font-size: clamp(1rem, 0.704rem + 1.265vw, 2rem);
      text-transform: lowercase;
    }

    &__title {
      margin-top: 0;
    }
  }
</style>

<script setup lang="ts">
  defineProps<{
    title?: string;
  }>();
</script>