<template>
  <section class="home-education">
    <div class="container home-education__container">
      <h2 class="home-education__title">{{ title }}</h2>
      <ul class="home-education__list" v-if="credentials">
        <li class="home-education__item" v-for="credential in credentials">
          <IconsEducation :type="credential.kind.value" class="home-education__icon" />
          <span class="home-education__item-content">
            <span class="home-education__item-title">{{ credential.title }}</span>
            <span class="home-education__item-specialty zeta">{{ credential.specialty }}</span>
            <span class="home-education__item-organization">{{ credential.organization }}</span>
          </span>
        </li>
      </ul>
    </div>
  </section>
</template>

<style lang="scss">
  .home-education {
    margin-top: clamp(6.125rem, 5.002rem + 4.79vw, 10.75rem);

    &__title {
      margin-top: 0;
      margin-bottom: 2rem;
    }

    &__list {
      --gap: clamp(2.188rem, 1.748rem + 1.877vw, 4rem);
      padding: 0;
      margin: 0;
      list-style: none;
    }

    &__item {
      display: flex;
      align-items: flex-start;
      margin: 0;
      column-gap: 1.125rem;

      & + & {
        margin-top: var(--gap);
      }
    }

    &__icon {
      flex-shrink: 0;
      color: var(--c-action);
    }

    &__item-content {
      display: flex;
      flex-direction: column;
    }

    &__item-title {
      // margin-bottom: .5rem;
      font-size: clamp(1.438rem, 1.301rem + 0.583vw, 2rem);
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
    .home-education {
      &__list {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        align-items: center;
        column-gap: var(--gap);
      }

      &__item {
        & + & {
          margin-top: 0;
        }
      }
    }
  }

  @media screen and (min-width: c.$b-xlarge) {
    .home-education {
      &__list {
        grid-template-columns: repeat(3, 1fr);
      }
    }
  }
</style>

<script lang="ts" setup>
  defineProps<{
    title: string;
    credentials: Array<EducationCredential>;
  }>()
</script>