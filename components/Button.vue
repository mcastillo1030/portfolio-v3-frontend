<template>
  <a
    v-if="element === 'a'"
    :href="href"
    :target="external ? '_blank' : '_self'"
    :class="`button cursor-pointer ${external ? 'button--external' : ''} ${classes}`"
  >
    <LazyIconsExternalLink v-if="external" classes="button__icon" />
    <slot />
  </a>
  <button
  v-else
    :type="type"
    :class="`button cursor-pointer ${external ? 'button--external' : (pagination ? 'button--pagination' : '')} ${classes}`"
    :disabled="disabled"
  >
    <LazyIconsArrow v-if="pagination" class="button__icon button__icon--arrow" />
    <slot />
  </button>
</template>

<style lang="scss">
  .button {
    --border-color: transparent;
    display: inline-block;
    padding: .75rem 1.6875rem;
    color: var(--c-background);
    background: var(--c-action);
    border: 0;
    border-radius: .5rem;
    text-decoration: none;
    text-transform: lowercase;
    line-height: 1;
    box-shadow: 0 0 0 2px var(--border-color);
    transition:
      color .2s ease-out,
      box-shadow .2s ease-out,
      background-color .2s ease-out;

    &.reversed {
      --border-color: var(--c-action);
      color: var(--c-action);
      background: transparent;
    }

    &.reversed:hover {
      --border-color: var(--c-accent-2);
      color: var(--c-accent-2);
    }

    &--external,
    &--pagination {
      display: inline-flex;
      align-items: center;
      // padding-left: .75rem;
      padding: .6875rem .75rem;
      column-gap: .75rem;
    }

    &--pagination {
      flex-direction: row-reverse;
    }

    &--pagination.flip {
      flex-direction: row;
    }

    &:hover {
      --border-color: var(--c-action);
      color: var(--c-action);
      background: transparent;
    }

    &:focus {
      outline: 0.125rem dashed var(--c-action);
      outline-offset: .25rem;
    }

    &__icon {
      width: 1.125rem;
      height: 1.125rem;
      fill: none;
      stroke: currentColor;
    }

    &.flip &__icon--arrow {
      transform: rotate(180deg);
    }
  }
</style>

<script lang="ts">
  import type { PropType } from 'nuxt/dist/app/compat/capi';

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
    pagination: {
      type: Boolean,
      default: false
    },
  };

  export default {
    name: 'Button',
    props,
  };
</script>