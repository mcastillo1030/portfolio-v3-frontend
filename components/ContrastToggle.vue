<template>
  <div class="contrast-toggle" :class="toggleOpen ? 'open' : ''" ref="toggleComp">
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
    --button-size: 2rem;
    --dialog-gap: .75rem;
    --dialog-align: .5rem;
    position: relative;

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

      &:focus {
        outline: .125rem dashed var(--c-action);
        outline-offset: .125rem;
      }
    }

    &__options {
      position: absolute;
      top: calc(100% + var(--dialog-gap));
      right: calc(var(--dialog-align) * -1);
      z-index: 1;
      width: max-content;
      padding: 0;
      margin: 0;
      background: var(--c-menu-bg);
      opacity: 0;
      visibility: hidden;
      border-radius: .5rem;
      list-style: none;
      transform: translateY(-1rem);
      filter: drop-shadow(0 0 .0625rem var(--c-action));
      transition:
        opacity .2s ease-out,
        visibility .2s ease-out,
        transform .3s ease-out;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        right: calc(var(--dialog-align) + (var(--button-size) / 2));
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 0 .5rem .5rem .5rem;
        border-color: transparent transparent var(--c-menu-bg) transparent;
        transform: translate(50%, -.5rem);
      }
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

      &:focus {
        outline: .125rem solid var(--c-accent-2);
        outline-offset: .125rem;
      }
    }

    &__option-label {
      margin-right: 1rem;
      text-transform: lowercase;
    }
  }

  @media screen and (min-width: c.$b-large) {
    .contrast-toggle {
      &__options {
        top: unset;
        bottom: calc(var(--dialog-align) * -1);
        left: calc(100% + var(--dialog-gap));
        transform: translateX(-1rem);

        &::before {
          top: unset;
          bottom: calc(var(--dialog-align) + (var(--button-size) / 2));
          left: 0;
          border-width: .5rem .5rem .5rem 0;
          border-color: transparent var(--c-menu-bg) transparent transparent;
          transform: translate(-.5rem, 50%);
        }
      }

      &.open &__options {
        transform: translateX(0);
      }

      &__option-btn {
        flex-flow: row-reverse;
        padding: .75rem 1.5rem .75rem 1rem;
      }

      &__option-label {
        margin-right: 0;
        margin-left: 1rem;
      }
    }
  }
</style>

<script lang="ts" setup>
  const colorMode = useColorMode();
  const toggleComp = ref<HTMLElement>();
  const toggleOpen = ref<boolean>(false);


  const setColorMode = (mode:string) => {
    colorMode.value =  mode;
    toggleOpen.value = false;
  }

  onMounted(() => {
    document.addEventListener('click', (evt) => {
      const { target } = evt;

      if (toggleComp.value?.contains(target as Node)) {
        return;
      }

      toggleOpen.value = false;
    });

    document.addEventListener('focusin', (evt) => {
      const { target } = evt;

      if (!toggleComp.value?.contains(target as Node) && toggleOpen.value) {
        toggleOpen.value = false;
      }
    });

    document.addEventListener('keyup', (evt) => {
      if (evt.key === 'Escape') {
        toggleOpen.value = false;
      }
    });
  });
</script>