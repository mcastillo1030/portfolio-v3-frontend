<template>
  <NuxtLayout>
    <div class="c-main">
      <TextHero subtitle="Error" :title="error.statusCode.toString()" />
      <section class="error-section">
        <div class="container error-section__container">
          <h2 class="error-section__title">These are not the <s>droids</s> pages you're looking for...</h2>
          <p class="error-section__message">{{ error.message }}</p>
          <NuxtLink to="/" class="error-section__cta button">Go back home</NuxtLink>
        </div>
      </section>
    </div>
  </NuxtLayout>
</template>

<style lang="scss">
  .error-section {
    margin: clamp(3.375rem, 2.893rem + 2.055vw, 5rem) 0;
    max-width: 68rem;

    &__message {
      margin-bottom: 2rem;
    }
  }
</style>

<script setup lang="ts">
  defineProps<{
    error: {
      statusCode: number;
      message: string;
    };
  }>();
</script>