<template>
  <div class="c-main">
    <MarkHero :title="pageTitle" />
    <ProjectListing
      :projects="projects"
    />
    <ListingPagination
      :paginateNext="getOlderProjects"
      :paginatePrev="getNewerProjects"
      :total-pages="totalPages"
      :current-page="page"
      :loading="paginationLoading"
    />
  </div>
</template>

<script setup lang="ts">
  const { $urlFor } = useNuxtApp();
  const { siteTitle } = useAppConfig();
  const route = useRoute();

  // Reactives
  const pageTitle = ref<string>();
  const projects = ref<Array<ProjectLineItem>>();
  const paginationLoading = ref<boolean>(false);
  const page = ref<number>(1);

  // Vars
  const pageSize = 4;
  let totalPages = 1;
  let totalProjects: number;
  const query = groq`{
    "page": *[_type == 'page' && slug.current == "${route.name}"][0]{
      title,seoTitle,seoDescription,seoImage
    },
    "currentProjects": *[
      _type == 'project' &&
      !(_id in path("drafts.**"))
      ]|order(_updatedAt desc)[0...${pageSize}]{
      _id,_updatedAt, slug, title, link, excerpt, mainImage{
        alt,caption,
        "assetId": asset._ref,
      },
    },
    "totalProjects": count(*[_type == 'project']),
  }`;
  const { data } = await useSanityQuery<ProjectsPageResponse>(query);

  // Methods
  const initPage = (
    data: Ref<ProjectsPageResponse|Array<ProjectLineItem>>,
    reverse: boolean = false
  ) => {
    if (!data.value) {
      return;
    }

    if ('page' in data.value) {
      pageTitle.value = data.value.page.title;
      projects.value = data.value.currentProjects;
      totalProjects = data.value.totalProjects;
      totalPages = Math.ceil(totalProjects / pageSize);
    } else {
      projects.value = data.value;
    }

    if (reverse) {
      projects.value = projects.value.reverse();
    }
  };

  const fetchAndUpdateProjects = async (dir: string) => {
    if (!dir || !projects.value) {
      return;
    }

    paginationLoading.value = true;
    const timestamp = dir === 'newer' ?
      projects.value[0]._updatedAt :
      projects.value[projects.value.length - 1]._updatedAt;
    const id = dir === 'newer' ?
      projects.value[0]._id :
      projects.value[projects.value.length - 1]._id;
    const query = groq`*[
      _type == "project" &&
      !(_id in path("drafts.**")) &&
      (
        _updatedAt ${dir === 'newer' ? '>' : '<'} "${timestamp}" ||
        (
          _updatedAt == "${timestamp}" &&
          _id ${dir === 'newer' ? '>' : '<'} "${id}"
        )
      )]|order(_updatedAt desc) [0...${pageSize}]{
      _id,_updatedAt, slug, title, link, excerpt, mainImage{
        alt,caption,"assetId": asset._ref,
      }}`;

    const {data} = await useSanityQuery<Array<ProjectLineItem>>(query);

    initPage(data, dir === 'newer');

    if (dir === 'older') {
      page.value++;
    } else {
      page.value--;
    }

    paginationLoading.value = false;
  };

  const getOlderProjects = (e: MouseEvent) => {
    e.preventDefault();
    fetchAndUpdateProjects('older');
  };

  const getNewerProjects = (e: MouseEvent) => {
    e.preventDefault();
    fetchAndUpdateProjects('newer');
  };

  // Init
  initPage(data);
  useSeoMeta({
    title: data.value.page.seoTitle + ' | ' + siteTitle,
    ogTitle: data.value.page.seoTitle + ' | ' + siteTitle,
    description: data.value.page.seoDescription,
    ogDescription: data.value.page.seoDescription,
    ogImage: $urlFor(data.value.page.seoImage.asset._ref).size(1200, 628).url(),
    twitterCard: 'summary_large_image',
  });
</script>
