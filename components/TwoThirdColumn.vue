<template>
  <article class="two-third-column">
    <div class="container two-third-column__container">
      <div class="two-third-column__wrap">
        <slot />
      </div>
    </div>
  </article>
</template>

<style lang="scss">
  .two-third-column {
    margin-top: clamp(2.813rem, 0.311rem + 10.672vw, 11.25rem);

    :first-child {
      margin-top: 0;
    }

    &__wrap {
      max-width: 64.25rem;
      margin: 0 auto;

      .container {
        padding: 0;
      }
    }
  }

  @media screen and (min-width: c.$b-medium-large) {
    .two-third-column {
      &__wrap {
        display: grid;
        grid-template-columns: 2fr minmax(19.579rem, 26.875rem);
        gap: 4.125rem;
      }

      section {
        margin-top: 0;
      }
    }
  }
</style>