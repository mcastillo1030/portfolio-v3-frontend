<template>
  <section class="list-card">
    <div class="container">
      <div class="list-card__wrap">
        <h2 class="list-card__title">{{ title }}</h2>
        <ul class="list-card__list" v-if="items">
          <li class="list-card__item" v-for="item in items">
            <LazyIconsEducation :type="item.type" class="list-card__icon" />
            <span class="list-card__item-content">
              <span class="list-card__item-title">{{ item.title }}</span>
              <span class="list-card__item-specialty zeta">{{ item.specialization }}</span>
              <span class="list-card__item-organization">{{ item.institution }}</span>
            </span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
  .list-card {
    margin-top: 3.375rem;

    &__wrap {
      max-width: 53.375rem;
    }

    &__title {
      color: var(--c-accent-2);
      margin-bottom: 1.125rem;
    }

    &__list {
      padding-left: 1rem;
      margin: 0;
      list-style: none;
    }

    &__item {
      display: flex;
      align-items: flex-start;
      margin: 0;
      column-gap: 1.125rem;

      & + & {
        margin-top: 2.1875rem;
      }
    }

    &__icon {
      flex-shrink: 0;
      width: clamp(1.875rem, 3.17073171vw, 3.25rem);
      color: var(--c-action);
    }

    &__item-content {
      display: flex;
      flex-direction: column;
    }

    &__item-title {
      // margin-bottom: .5rem;
      font-size: 1.125rem;
    }

    &__item-specialty {
      margin: 0 0 .875rem;
      color: var(--c-accent-1);
    }

    &__item-organization {
      color: var(--c-selection);
    }
  }

  @media screen and (min-width: c.$b-medium) {
    .list-card {
      &__wrap {
        padding: 3.125rem 2.5rem 3.125rem 3.125rem;
        background: var(--c-accent-4);
        border-radius: .5rem;
      }
    }
  }

  @media screen and (min-width: c.$b-medium-large) {
    .list-card {
      .container {
        height: 100%;
      }

      &__wrap {
        height: 100%;
        padding: 3.875rem 3rem;
      }

      &__list {
        padding: 0;
      }
    }
  }
</style>

<script setup lang="ts">
  defineProps<{
    title?: string;
    items?: Array<EducationItem>;
  }>();
</script>