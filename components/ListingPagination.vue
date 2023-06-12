<template>
  <section class="listing-pagination">
    <div class="container listing-pagination__container">
      <ul class="listing-pagination__buttons" v-if="total && items && lastId && pageSize">
        <li
          class="listing-pagination__button listing-pagination__button--prev"
          v-if="consumed > 0"
          @click="paginatePrev"
        >
          <Button
            :disabled="loading"
            :pagination="true"
            class="listing-pagination__btn reversed flip"
          >Recent</Button>
        </li>
        <li
          class="listing-pagination__button listing-pagination__button--next"
          v-if="total - (consumed * pageSize) > items.length"
          @click="paginateNext"
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
  const consumed = usePagesConsumed();
  const loading = usePaginationLoading();

  defineProps<{
    total?: number;
    items?: Array<ProjectLineItem|PostLineItem>;
    lastId?: string;
    pageSize?: number;
    paginatePrev: (e: MouseEvent) => void;
    paginateNext: (e: MouseEvent) => void;
  }>();
</script>