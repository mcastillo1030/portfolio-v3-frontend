<template>
  <section class="listing-pagination">
    <div class="container listing-pagination__container">
      <ul class="listing-pagination__buttons" v-if="total && items && current">
        <li
          class="listing-pagination__button listing-pagination__button--prev"
          v-if="consumed > 0"
          @click="fetchNewer"
        >
          <Button
            :disabled="loading"
            :pagination="true"
            class="listing-pagination__btn reversed flip"
          >Recent</Button>
        </li>
        <li
          class="listing-pagination__button listing-pagination__button--next"
          v-if="total - (consumed * 4) > items.length"
          @click="fetchOlder"
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
  const loading = ref<boolean>(false);
  const items = useProjectsList();
  const current = useCurrentProjectId();
  const consumed = usePagesConsumed();

  const fetchAndUpdate = async (direction:string) => {
    loading.value = true;
    const timestamp = direction === 'newer' ?
      items.value[0]._updatedAt :
      items.value.filter((item) => item._id === current.value)[0]._updatedAt;
    const query = groq`*[_type == "project" && !(_id in path("drafts.**")) && _updatedAt ${direction === 'newer' ? '>' : '<'} "${timestamp}"] | order(_updatedAt desc) [0...4] {
      _id,_updatedAt, slug, title, excerpt, mainImage{
        alt,caption,"assetId": asset._ref,
      }
    }`;

    const {data} = await useSanityQuery<Array<ProjectLineItem>>(query);

    if (data.value) {
      items.value = data.value;
      current.value = data.value[data.value.length - 1]._id;

      if (direction === 'older') {
        consumed.value++;
      } else {
        consumed.value--;
      }
    }

    loading.value = false;
  };

  const fetchNewer = (e:MouseEvent) => {
    e.preventDefault();
    fetchAndUpdate('newer');
  };

  const fetchOlder = (e:MouseEvent) => {
    e.preventDefault();
    fetchAndUpdate('older');
  };

  defineProps<{
    total?: number;
  }>();
</script>