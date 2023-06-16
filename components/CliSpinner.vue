<template>
  <div class="cli-spinner__wrap gamma">
    <span class="cli-spinner__bar">-</span>
    <span class="cli-spinner__bar">\</span>
    <span class="cli-spinner__bar">|</span>
    <span class="cli-spinner__bar">/</span>
  </div>
</template>

<style lang="scss">
  .cli-spinner {
    &__wrap {
      display: grid;
      grid-template-columns: 1ch;
      grid-template-rows: 1ch;
      align-items: center;
      justify-content: center;
      color: var(--c-accent-2);
    }

    &__bar {
      grid-row: 1;
      grid-column: 1;
      animation: spin 1s steps(1) infinite;
      animation-delay: 0s;

      &:nth-child(2) {
        animation-delay: 0.25s;
      }

      &:nth-child(3) {
        animation-delay: .5s;
      }

      &:nth-child(4) {
        animation-delay: .75s;
      }
    }

    @keyframes spin {
      0% {
        opacity: 1;
      }
      25% {
        opacity: 0;
      }
      100% {
        opacity: 0;
      }
    }
  }
</style>