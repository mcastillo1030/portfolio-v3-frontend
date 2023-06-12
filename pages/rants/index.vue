<template>
  <div class="c-main">
    <MarkHero :title="pageTitle" />
    <PostListing
      :posts="currentPosts"
      :onCategoryChange="setActiveCategory"
    />
    <ListingPagination
      :items="currentPosts"
      :total="totalPostsCount"
      :lastId="currentLastPostId"
      :paginateNext="getOlderPosts"
      :paginatePrev="getNewerPosts"
      :pageSize="5"
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
  const currentPosts = ref<Array<PostLineItem>>();
  const currentLastPostId = ref<string>();
  const totalPostsCount = ref<number>();
  const currentCategory = ref<string>(route.query.category as string || '*');
  const query = groq`{
    "page": *[_type == 'page' && slug.current == "${route.name}"][0]{
      title,seoTitle,seoDescription,seoImage,
    },
    "currentPosts": *[_type == 'post' && !(_id in path("drafts.**")) && (categories[]._ref match $cat)]|order(publishedAt desc)[0...5]{
      _id, slug, title, publishedAt, categories[]->{_id, title}
    },
    "totalPosts": count(*[_type == 'post']),
  }`;

  const { data } = await useSanityQuery<{
    page: {
      title: string;
      seoTitle: string;
      seoDescription: string;
      seoImage: SanityAsset;
    };
    currentPosts: Array<PostLineItem>;
    totalPosts: number;
  }>(query, {cat: currentCategory.value});


  if (data.value) {
    pageTitle.value = data.value.page.title;
    currentPosts.value = data.value.currentPosts
    totalPostsCount.value = data.value.totalPosts;
    currentLastPostId.value = data.value.currentPosts[data.value.currentPosts.length - 1]._id;
  }

  const fetchAndUpdatePosts = async (dir: string) => {
    if (!dir || !currentPosts.value || !currentPosts.value) {
      return;
    }

    isLoading.value = true;

    const timestamp = dir === 'newer' ?
      currentPosts.value[0].publishedAt :
      currentPosts.value[currentPosts.value.length - 1].publishedAt;
    const newQuery = groq`*[
      _type == 'post' &&
      !(_id in path("drafts.**")) &&
      publishedAt ${dir === 'newer' ? '>' : '<'} "${timestamp}" && (categories[]._ref match $cat)
    ]|order(publishedAt desc)[0...5]{
      _id, slug, title, publishedAt, categories[]->{_id, title}
    }`;
    const { data: newData } = await useSanityQuery<Array<PostLineItem>>(newQuery, {cat: currentCategory.value});
    // console.log(newQuery);

    if (newData.value) {
      currentPosts.value = newData.value;
      currentLastPostId.value = newData.value[newData.value.length - 1]._id;

      if (dir === 'newer') {
        pagesConsumed.value--;
      } else {
        pagesConsumed.value++;
      }
    }

    isLoading.value = false;
  };

  const getOlderPosts = (e: MouseEvent) => {
    e.preventDefault();
    fetchAndUpdatePosts('older');
  };

  const getNewerPosts = (e: MouseEvent) => {
    e.preventDefault();
    fetchAndUpdatePosts('newer');
  };

  const setActiveCategory = (cat: string) => {
    currentCategory.value = cat;
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