<template>
  <button
    type="button"
    class="btn menu-toggle"
    @click="toggleMenu"
  >
    <span class="menu-toggle__label sr-only">Toggle menu</span>
    <icons-menu-open v-if="menuState === 'closed'" classes="menu-toggle__icon" />
    <icons-menu-close v-else classes="menu-toggle__icon" />
  </button>
</template>

<style lang="scss">
  .menu-toggle {
    display: flex;
    align-items: center;
    justify-content: center;

    &__icon {
      width: 2rem;
      height: 2rem;
    }
  }
</style>

<script lang="ts" setup>
  const menuState = useMenuState();
  const toggleMenu = () => {
    menuState.value = menuState.value === 'closed' ? 'open' : 'closed';
  }
</script>
