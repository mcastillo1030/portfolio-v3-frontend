<template>
  <section class="about-intro">
    <div class="container about-intro__container">
      <div class="about-intro__wrap">
        <div class="about-intro__text-column">
          <h2 v-if="title" class="about-intro__title">{{ title }}</h2>
          <div v-if="text" class="about-intro__text">{{ text }}</div>
        </div>
        <div class="about-intro__graphic-column">
          <IconsPeepMarlon class="about-intro__graphic" />
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
  .about-intro {
    margin-top: clamp(4rem, 0.739rem + 13.913vw, 15rem);

    &__wrap {
      max-width: 64.25rem;
      margin: 0 auto;
    }

    &__text-column {
      max-width: 53.375rem;
      margin-right: auto;
      margin-bottom: clamp(4.063rem, 2.932rem + 4.822vw, 7.875rem);
    }

    &__title {
      color: var(--c-accent-2);
      margin-bottom: 1.75rem;
    }

    &__text {
      padding-left: 1rem;
    }

    &__graphic-column {
      position: relative;
      width: 90%;
      max-width: 26.875rem;
      margin-left: 0;
      padding:
        clamp(1.5rem, 2.07317073vw, 2.125rem)
        clamp(2.1875rem, 2.80487805vw, 2.875rem)
        clamp(2.5rem, 3.53658537vw, 3.625rem)
        clamp(3.625rem, 5.06097561vw, 5.1875rem);
      background: var(--c-accent-4);
      border-radius: .5rem;

      &::after {
        content: '';
        position: absolute;
        top: .5rem;
        left: .5rem;
        z-index: -1;
        width: 100%;
        height: 100%;
        background: var(--c-background);
        border-radius: .5rem;
        border: .125rem solid var(--c-accent-3);
      }
    }

    &__graphic {
      position: relative;
    }
  }

  @media screen and (min-width: c.$b-medium) {
    .about-intro {
      &__text-column {
        position: relative;
        padding:
          3.125rem
          clamp(2.438rem, -0.48rem + 6.078vw, 5.75rem)
          3.125rem
          clamp(2.438rem, 1.942rem + 1.032vw, 3rem);
        background: var(--c-accent-4);
        border-radius: .5rem;

        &::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 25%;
          z-index: -1;
          width: 50%;
          height: 100%;
          border-bottom-left-radius: .5rem;
          border-bottom: .125rem dotted var(--c-accent-3);
          border-left: .125rem dotted var(--c-accent-3);
        }
      }

      &__graphic-column {
        margin-left: auto;
      }
    }
  }
</style>

<script setup lang="ts">
  defineProps<{
    title?: string
    text?: string
  }>();
</script>