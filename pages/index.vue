<script setup lang="ts">
  import HomeHero from '~/components/layout/HomeHero.vue';
  import HomeIntro from '~/components/layout/HomeIntro.vue';
  import HomeProjects from '~/components/layout/HomeProjects.vue';

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
    <HomeIntro
      :id="page.intro_heading.toLocaleLowerCase().replace(/\s/g, '-') + '-section'"
      :title="page.intro_heading"
      :image="page.intro_image"
      :links="page.intro_contact_links"
      :text="page.intro_text"
    />
    <HomeProjects
      :id="page.projects_heading.toLocaleLowerCase().replace(/\s/g, '-') + '-section'"
      :title="page.projects_heading"
      :projects="page.projects_featured_projects"
    />
  </main>
</template>

