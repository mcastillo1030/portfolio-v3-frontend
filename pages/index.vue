<script setup lang="ts">
  import HomeHero from '~/components/layout/HomeHero.vue';
  const { baseApiUrl, apiEndpoints } = useAppConfig();
  const homeEndpoint = `${baseApiUrl}${apiEndpoints.pages}/home`;
  const { data: resp } = await useFetch<PaginatedResponse>( homeEndpoint );
  let page: HomePage;

  if ( resp.value !== null ) {
    page = resp.value.data[0] as HomePage;
  }
</script>

<template>
  <main class="c-main">
    <HomeHero
      :title="page.hero_heading"
      :subtitle="page.hero_subhead"
      :icons="page.hero_skill_icons"
    />
  </main>
</template>

