<template>
  <div class="c-main">
    <MarkHero :title="titleRef" />
    <ProjectListing />
    <ListingPagination :total="totalProjectsRef" />
  </div>
</template>

<script setup lang="ts">
  const route = useRoute();
  const currentProjects = useProjectsList();
  const currentProjectId = useCurrentProjectId();
  let titleRef = ref<string>();
  let totalProjectsRef = ref<number>();
  const query = groq`{
    "pageTitle": *[_type == 'page' && slug.current == "${route.name}"][0].title,
    "currentProjects": *[_type == 'project' && !(_id in path("drafts.**"))]|order(_updatedAt desc)[0...4]{
      _id,_updatedAt, slug, title, excerpt, mainImage{
        alt,caption,
        "assetId": asset._ref,
      },
    },
    "totalProjects": count(*[_type == 'project']),
  }`;
  const { data } = await useSanityQuery<{
    pageTitle: string;
    currentProjects: Array<ProjectLineItem>;
    totalProjects: number;
  }>(query);

  if (data.value) {
    titleRef.value = data.value.pageTitle;
    currentProjects.value = data.value.currentProjects;
    totalProjectsRef.value = data.value.totalProjects;
    currentProjectId.value = data.value.currentProjects[data.value.currentProjects.length - 1]._id;
  }
</script>
