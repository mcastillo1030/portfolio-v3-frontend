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
  const { baseUrl } = useRuntimeConfig();
  const { siteTitle } = useAppConfig();
  const route = useRoute();

  // SEO
  const seoTitle = ref<string>();
  const seoDescription = ref<string>();
  const seoImage = ref<SanityAsset>();

  // Reactives
  const pageTitle = ref<string>();
  const projects = ref<Array<ProjectLineItem>>();
  const paginationLoading = ref<boolean>(false);
  const page = ref<number>(1);

  // Vars
  const pageSize = 4;
  let totalPages = 1;
  let totalProjects: number;

  // Methods
  const initPage = async () => {
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
    const { data } = await useSanityQuery<ProjectsPageResponse>(query);

    pageTitle.value = data.value.page.title;
    projects.value = data.value.currentProjects;
    totalProjects = data.value.totalProjects;
    totalPages = Math.ceil(totalProjects / pageSize);
    seoTitle.value = data.value.page.seoTitle;
    seoDescription.value = data.value.page.seoDescription;
    seoImage.value = data.value.page.seoImage;

    // console.log(seoTitle.value, seoDescription.value, seoImage.value);
  };

  const updatePagination = async (query: string, reverseOrdering = false) => {
    if (!query) {
      return;
    }
    const { data } = await useSanityQuery<Array<ProjectLineItem>>(query);

    projects.value = data.value;

    if (reverseOrdering)  {
      projects.value = projects.value.reverse();
    }
  };

  const fetchAndUpdate = async (dir: string) => {
    if (!dir || !projects.value) {
      return;
    }

    paginationLoading.value = true;
    const timestamp = dir === 'newer' ?
      projects.value[0].publishedAt :
      projects.value[projects.value.length - 1].publishedAt;
    const id = dir === 'newer' ?
      projects.value[0]._id :
      projects.value[projects.value.length - 1]._id;
    const query = groq`*[
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

    updatePagination(query, dir === 'newer');

    if (dir === 'newer') {
      page.value--;
    } else {
      page.value++;
    }

    paginationLoading.value = false;
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
  initPage();
  useSeoMeta({
    title: computed(() => seoTitle.value + ' | ' + siteTitle),
    ogTitle: computed(() => seoTitle.value + ' | ' + siteTitle),
    twitterTitle: computed(() => seoTitle.value + ' | ' + siteTitle),
    description: computed(() => seoDescription.value),
    ogDescription: computed(() => seoDescription.value),
    twitterDescription: computed(() => seoDescription.value),
    ogImage: computed(() => seoImage.value ? $urlFor(seoImage.value.asset._ref).size(1200, 628).url() : baseUrl + '/img/og-image.png'),
    twitterImage: computed(() => seoImage.value ? $urlFor(seoImage.value.asset._ref).size(1200, 628).url() : baseUrl + '/img/og-image.png'),
    twitterCard: 'summary_large_image',
    ogUrl: baseUrl + route.path,
  });
</script>
