<template>
  <button
    type="button"
    class="btn menu-toggle"
    @click="toggleMenu"
  >
    <span class="menu-toggle__label sr-only">Toggle menu</span>
    <IconsMenuOpen v-if="menuState === 'closed'" classes="menu-toggle__icon" />
    <IconsMenuClose v-else classes="menu-toggle__icon" />
  </button>
</template>

<style lang="scss">
  .menu-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--c-action);
    cursor: pointer;
    transition: color .2s ease-out;

    &:hover {
      color: var(--c-foreground);
    }

    &__icon {
      width: 2rem;
      height: 2rem;
      pointer-events: none;
    }
  }
</style>

<script lang="ts" setup>
  const menuState = useMenuState();
  const toggleMenu = () => {
    menuState.value = menuState.value === 'closed' ? 'open' : 'closed';
  }
</script>
