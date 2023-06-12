<template>
  <div class="c-main">
    <MarkHero :title="pageTitle" />
    <ProjectListing :projects="currentProjects" />
    <ListingPagination
      :items="currentProjects"
      :total="totalProjectsCount"
      :lastId="currentLastProjectId"
      :paginateNext="getOlderProjects"
      :paginatePrev="getNewerProjects"
      :pageSize="4"
    />
  </div>
</template>

<script setup lang="ts">
  const { $urlFor } = useNuxtApp();
  const { siteTitle } = useAppConfig();
  const route = useRoute();
  const isLoading = usePaginationLoading();
  const pagesConsumed = usePagesConsumed();

  const pageTitle = ref<string>();
  const currentProjects = ref<Array<ProjectLineItem>>();
  const currentLastProjectId = ref<string>();
  const totalProjectsCount = ref<number>();
  const query = groq`{
    "page": *[_type == 'page' && slug.current == "${route.name}"][0]{
      title,seoTitle,seoDescription,seoImage
    },
    "currentProjects": *[_type == 'project' && !(_id in path("drafts.**"))]|order(_updatedAt desc)[0...4]{
      _id,_updatedAt, slug, title, excerpt, mainImage{
        alt,caption,
        "assetId": asset._ref,
      },
    },
    "totalProjects": count(*[_type == 'project']),
  }`;
  const { data } = await useSanityQuery<{
    page: {
      title: string;
      seoTitle: string;
      seoDescription: string;
      seoImage: SanityAsset;
    };
    currentProjects: Array<ProjectLineItem>;
    totalProjects: number;
  }>(query);

  if (data.value) {
    pageTitle.value = data.value.page.title;
    currentProjects.value = data.value.currentProjects;
    totalProjectsCount.value = data.value.totalProjects;
    currentLastProjectId.value = data.value.currentProjects[data.value.currentProjects.length - 1]._id;
  }

  const fetchAndUpdateProjects = async (dir: string) => {
    if (!dir || !currentProjects.value || !currentLastProjectId.value) {
      return;
    }

    isLoading.value = true;
    const timestamp = dir === 'newer' ?
      currentProjects.value[0]._updatedAt :
      currentProjects.value.filter((item) => item._id === currentLastProjectId.value)[0]._updatedAt;
    const query = groq`*[_type == "project" && !(_id in path("drafts.**")) && _updatedAt ${dir === 'newer' ? '>' : '<'} "${timestamp}"] | order(_updatedAt desc) [0...4] {
      _id,_updatedAt, slug, title, excerpt, mainImage{
        alt,caption,"assetId": asset._ref,
      }
    }`;

    const {data} = await useSanityQuery<Array<ProjectLineItem>>(query);

    if (data.value) {
      currentProjects.value = data.value;
      currentLastProjectId.value = data.value[data.value.length - 1]._id;

      if (dir === 'older') {
        pagesConsumed.value++;
      } else {
        pagesConsumed.value--;
      }
    }

    isLoading.value = false;
  };

  const getOlderProjects = (e: MouseEvent) => {
    e.preventDefault();
    fetchAndUpdateProjects('older');
  };

  const getNewerProjects = (e: MouseEvent) => {
    e.preventDefault();
    fetchAndUpdateProjects('newer');
  };

  onMounted(() => {
    pagesConsumed.value = 0;
  });

  useSeoMeta({
    title: data.value.page.seoTitle + ' | ' + siteTitle,
    ogTitle: data.value.page.seoTitle + ' | ' + siteTitle,
    description: data.value.page.seoDescription,
    ogDescription: data.value.page.seoDescription,
    ogImage: $urlFor(data.value.page.seoImage.asset._ref).size(1200, 628).url(),
    twitterCard: 'summary_large_image',
  });
</script>
