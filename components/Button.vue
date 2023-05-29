<script lang="ts">
  type Buttontype = 'button' | 'submit' | 'reset';

  const props = {
    type: {
      type: String as PropType<Buttontype>,
      default: 'button'
    },
    classes: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    element: {
      type: String,
      default: 'button'
    },
    external: {
      type: Boolean,
      default: false
    },
    href: {
      type: String,
      default: ''
    },
  };
  export default {
    name: 'Button',
    props,
  };
</script>

<style lang="scss">
  .button {
    --border-color: transparent;
    display: inline-block;
    padding: .75rem 1rem;
    color: var(--c-background);
    background: var(--c-action);
    border: 0;
    border-radius: .5rem;
    text-decoration: none;
    text-transform: lowercase;
    cursor: pointer;
    box-shadow: 0 0 0 2px var(--border-color);
    transition:
      color .2s ease-out,
      box-shadow .2s ease-out,
      background-color .2s ease-out;

    &--external {
      display: inline-flex;
      align-items: center;
      // padding-left: .75rem;
      padding: .5rem 1rem .5rem .75rem;
      column-gap: .75rem;
    }

    &:hover {
      --border-color: var(--c-action);
      color: var(--c-action);
      background: transparent;
    }

    &__icon {
      width: 1.125rem;
      height: 1.125rem;
      fill: none;
      stroke: currentColor;
    }
  }
</style>

<template>
  <a
    v-if="element === 'a'"
    :href="href"
    :target="external ? '_blank' : '_self'"
    :class="`button ${external ? 'button--external' : ''} ${classes}`"
  >
    <icons-external-link v-if="external" classes="button__icon" />
    <slot />
  </a>
  <button
    v-else
    :type="type"
    :class="`button ${external ? 'button--external' : ''} ${classes}`"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>