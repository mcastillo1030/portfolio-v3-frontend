<template>
  <section class="listing-pagination">
    <div class="container listing-pagination__container">
      <ul class="listing-pagination__buttons">
        <li
          class="listing-pagination__button listing-pagination__button--prev"
          v-if="currentPage > 1"
          @click="(evt) => {
            paginatePrev(evt);
            gtm?.trackEvent({ action: 'click', event: 'listing-pagination', value: route.path, target: currentPage - 1});
          }"
        >
          <Button
            :disabled="loading"
            :pagination="true"
            class="listing-pagination__btn reversed flip"
          >Recent</Button>
        </li>
        <li
          class="listing-pagination__button listing-pagination__button--next"
          v-if="currentPage < totalPages"
          @click="(evt) => {
            paginateNext(evt);
            gtm?.trackEvent({ action: 'click', event: 'listing-pagination', value: route.path, target: currentPage + 1});
          }"
        >
          <Button
            :disabled="loading"
            :pagination="true"
            class="listing-pagination__btn reversed"
          >Older</Button>
        </li>
      </ul>
    </div>
  </section>
</template>

<style lang="scss">
  .listing-pagination {
    margin-top: clamp(4rem, 7.31707317vw, 7.5rem);

    &__buttons {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0;
      margin: 0;
      list-style: none;
      column-gap: 2rem;
    }

    &__button {
      margin: 0;

      &--prev {
        margin-right: auto;
      }

      &--next {
        margin-left: auto;
      }
    }
  }
</style>

<script setup lang="ts">
  const gtm = useGtm();
  const route = useRoute();

  defineProps<{
    loading: boolean;
    totalPages: number;
    currentPage: number;
    paginatePrev: (e: MouseEvent) => void;
    paginateNext: (e: MouseEvent) => void;
  }>();
</script>