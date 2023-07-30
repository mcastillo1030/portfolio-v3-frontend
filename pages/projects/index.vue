<template>
  <div class="c-main">
    <MarkHero :title="pageTitle" />
    <ProjectListing
      :projects="projects"
      :loading="resultsLoading"
    />
    <ListingPagination
      :paginateNext="getOlderProjects"
      :paginatePrev="getNewerProjects"
      :total-pages="totalPages"
      :current-page="page"
      :loading="resultsLoading"
    />
  </div>
</template>

<script setup lang="ts">
  const { $urlFor } = useNuxtApp();
  const { siteTitle } = useAppConfig();
  const runtimeConfig = useRuntimeConfig();
  const { baseUrl } = runtimeConfig.public;
  const route = useRoute();

  // SEO
  const seoTitle = ref<string>();
  const seoDescription = ref<string>();
  const seoImage = ref<SanityAsset>();

  // Reactives
  const pageTitle = ref<string>();
  const projects = ref<Array<ProjectLineItem>>();
  const resultsLoading = ref<boolean>(true);
  const page = ref<number>(1);

  // Vars
  const pageSize = 4;
  let totalPages = 1;
  let totalProjects: number;

  // Methods
  const updatePagination = async (q: string, reverseOrdering = false) => {
    if (!q) {
      return;
    }

    resultsLoading.value = true;

    const { data: d, pending: p } = await useSanityQuery<Array<ProjectLineItem>>(q);

    projects.value = d.value;
    resultsLoading.value = p.value;

    if (reverseOrdering)  {
      projects.value = projects.value.reverse();
    }

    setTimeout(() => {
      resultsLoading.value = false;
    }, 500);
  };

  const fetchAndUpdate = async (dir: string) => {
    if (!dir || !projects.value) {
      return;
    }

    // resultsLoading.value = true;
    const timestamp = dir === 'newer' ?
      projects.value[0].publishedAt :
      projects.value[projects.value.length - 1].publishedAt;
    const id = dir === 'newer' ?
      projects.value[0]._id :
      projects.value[projects.value.length - 1]._id;
    const q = groq`*[
      _type == 'project' &&
      !(_id in path("drafts.**")) &&
      (
        dateTime(publishedAt) ${dir === 'newer' ? '>' : '<'} dateTime("${timestamp}") ||
        (
          publishedAt == "${timestamp}" &&
          _id ${dir === 'newer' ? '>' : '<'} "${id}"
        )
      )]|order(publishedAt ${dir === 'newer' ? 'asc' : 'desc'}) [0...${pageSize}]{
      _id,publishedAt, slug, title, link, excerpt, mainImage{
        alt,caption,'assetId': asset._ref,
      }}`;

    updatePagination(q, dir === 'newer');

    if (dir === 'newer') {
      page.value--;
    } else {
      page.value++;
    }

    // resultsLoading.value = false;
  };

  const getOlderProjects = (e: MouseEvent) => {
    e.preventDefault();
    fetchAndUpdate('older');
  };

  const getNewerProjects = (e: MouseEvent) => {
    e.preventDefault();
    fetchAndUpdate('newer');
  };

  // Init
  // initPage();
  const query = groq`{
    'page': *[_type == 'page' && slug.current == "${route.name}"][0]{
      title,seoTitle,seoDescription,seoImage
    },
    'currentProjects': *[
      _type == 'project' &&
      !(_id in path("drafts.**"))
      ]|order(publishedAt desc)[0...${pageSize}]{
      _id,publishedAt,slug,title,link,excerpt,mainImage{
        alt,caption,
        'assetId': asset._ref,
      },
    },
    'totalProjects': count(*[_type == 'project' && !(_id in path("drafts.**"))]),
  }`;
  const { data, pending } = await useSanityQuery<ProjectsPageResponse>(query);

  resultsLoading.value = pending.value;
  pageTitle.value = data.value.page.title;
  projects.value = data.value.currentProjects;
  totalProjects = data.value.totalProjects;
  totalPages = Math.ceil(totalProjects / pageSize);
  seoTitle.value = data.value.page.seoTitle;
  seoDescription.value = data.value.page.seoDescription;
  seoImage.value = data.value.page.seoImage;

  useSeoMeta({
    title: seoTitle.value + ' | ' + siteTitle,
    ogTitle: seoTitle.value + ' | ' + siteTitle,
    twitterTitle: seoTitle.value + ' | ' + siteTitle,
    description: seoDescription.value,
    ogDescription: seoDescription.value,
    twitterDescription: seoDescription.value,
    ogImage: seoImage.value ? $urlFor(seoImage.value.asset._ref).size(1200, 628).url() : baseUrl + '/img/og-image.png',
    twitterImage: seoImage.value ? $urlFor(seoImage.value.asset._ref).size(1200, 628).url() : baseUrl + '/img/og-image.png',
    twitterCard: 'summary_large_image',
    ogUrl: baseUrl + route.path,
  });
</script>
