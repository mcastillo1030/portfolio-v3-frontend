<template>
  <div class="contrast-toggle" :class="toggleOpen ? 'open' : ''" ref="toggle">
    <button
      type="button"
      class="btn contrast-toggle__trigger"
      @click="toggleOpen = !toggleOpen"
    >
      <span class="contrast-toggle__trigger-label sr-only">Toggle light mode</span>
      <IconsMoon class="contrast-toggle__trigger-icon" v-if="colorMode === 'dark'" />
      <IconsSun class="contrast-toggle__trigger-icon" v-else-if="colorMode === 'light'" />
      <IconsComputerMonitor class="contrast-toggle__trigger-icon" v-else />
    </button>
    <ul class="contrast-toggle__options">
      <li class="contrast-toggle__option">
        <button
          type="button"
          class="contrast-toggle__option-btn contrast-toggle__option-btn--dark"
          :class="colorMode === 'dark' ? 'active' : ''"
          @click="setColorMode('dark')"
        >
        <span class="contrast-toggle__option-label">Dark</span>
        <IconsMoon class="contrast-toggle__option-icon" />
      </button>
      </li>
      <li class="contrast-toggle__option">
        <button
          type="button"
          class="contrast-toggle__option-btn contrast-toggle__option-btn--light"
          :class="colorMode === 'light' ? 'active' : ''"
          @click="setColorMode('light')"
        >
          <span class="contrast-toggle__option-label">Light</span>
          <IconsSun class="contrast-toggle__option-icon" />
        </button>
      </li>
      <li class="contrast-toggle__option">
        <button
          type="button"
          class="contrast-toggle__option-btn contrast-toggle__option-btn--auto"
          :class="colorMode === 'system' ? 'active' : ''"
          @click="setColorMode('system')"
        >
          <span class="contrast-toggle__option-label">System</span>
          <IconsComputerMonitor class="contrast-toggle__option-icon" />
        </button>
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
  .contrast-toggle {
    --button-width: 2rem;
    --vertical-gap: .5rem;
    --hz-offset: .3125rem;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      top: calc((var(--vertical-gap) / 2) * -1);
      left: calc(var(--hz-offset) * -1);
      width: calc(100% + var(--hz-offset) * 2);
      height: calc(100% + (var(--vertical-gap) / 2));
      opacity: 0;
      background-color: var(--c-menu-bg);
      border-radius: .5rem .5rem 0 0;
      transform: translateY(-1rem);
      transition:
        opacity .2s ease-out,
        transform .3s ease-out;
    }

    &::after {
      content: '';
      position: absolute;
      top: 100%;
      left: calc(var(--hz-offset) * -1);
      width: calc(100% + var(--hz-offset) * 2);
      height: var(--vertical-gap);
      opacity: 0;
      background-color: var(--c-menu-bg);
      transform: translateY(-1rem);
      transition:
        opacity .2s ease-out,
        transform .3s ease-out;
    }

    &.open::before,
    &.open::after {
      opacity: 1;
      transform: translateY(0);
    }

    &__trigger {
      position: relative;
      z-index: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--c-action);
      cursor: pointer;
      transition: color .2s ease-out;

      &:hover {
        color: var(--c-foreground);
      }
    }

    &__options {
      position: absolute;
      top: calc(100% + var(--vertical-gap));
      right: calc(var(--hz-offset) * -1);
      width: max-content;
      padding: 0;
      margin: 0;
      background: var(--c-menu-bg);
      opacity: 0;
      visibility: hidden;
      border-radius: .5rem 0 .5rem .5rem;
      list-style: none;
      transform: translateY(-1rem);
      transition:
        opacity .2s ease-out,
        visibility .2s ease-out,
        transform .3s ease-out;
    }

    &.open &__options {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }

    &__option {
      margin: 0;
    }

    &__option-btn {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      width: 100%;
      padding: .75rem .5rem .75rem 2rem;
      color: var(--c-action);
      background: none;
      border: none;
      cursor: pointer;
      appearance: none;
      transition: color .2s ease-out;

      &.active {
        color: var(--c-foreground);
      }

      &:hover {
        color: var(--c-foreground);
      }
    }

    &__option-label {
      margin-right: 1rem;
      text-transform: lowercase;
    }
  }
</style>

<script lang="ts" setup>
  const colorMode = useColorMode();
  const toggleOpen = ref<boolean>(false);


  const setColorMode = (mode:string) => {
    colorMode.value =  mode;
    localStorage.setItem('color-mode', colorMode.value);
  }
</script>