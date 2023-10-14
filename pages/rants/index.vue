<template>
  <div class="c-main">
    <MarkHero :title="pageTitle" />
    <PostListing
      :posts="posts"
      :category="currentCat"
      :on-tag-click="setCategory"
      :loading="resultsLoading"
    />
    <ListingPagination
      :paginateNext="getOlderPosts"
      :paginatePrev="getNewerPosts"
      :total-pages="totalPages"
      :current-page="page"
      :loading="resultsLoading"
    />
  </div>
</template>

<script setup lang="ts">
  import type { NuxtApp } from 'nuxt/app';
  import { useAppConfig, useNuxtApp, useRuntimeConfig } from 'nuxt/app';
  import {
    groq,
    useSeoMeta,
    useSanityQuery,
    useRoute,
    ref,
    onMounted,
    onBeforeRouteUpdate
  } from '#imports';

  const { $urlFor } = useNuxtApp() as NuxtApp & ImgHelperPlugin;
  const { siteTitle } = useAppConfig();
  const runtimeConfig = useRuntimeConfig();
  const { baseUrl } = runtimeConfig.public as BaseUrl;
  const route = useRoute();

  // SEO
  const seoTitle = ref<string>();
  const seoDescription = ref<string>();
  const seoImage = ref<SanityAsset>();

  // Reactives
  const pageTitle = ref<string>();
  const posts = ref<Array<PostLineItem>>();
  const currentCat = ref<string>(route.query.category as string || 'All');
  // const currentCatId = ref<string>(route.query.category as string || '*');
  const resultsLoading = ref<boolean>(true);
  const page = ref<number>(1);

  // Vars
  const pageSize = 5;
  const cagegories = [
    { _id: '*', title: 'All' },
  ];
  let totalPages = 1;
  let totalPosts: number;

  const updatePagination = async (q: string, reverseOrdering = false) => {
    if (!q) {
      return;
    }

    resultsLoading.value = true;

    const { data: d, pending: p } = await useSanityQuery<Array<PostLineItem>>(q, {}, {server: false});

    posts.value = d.value as Array<PostLineItem>;
    resultsLoading.value = p.value;

    [...posts.value].forEach(post => {
      if (!post.categories) {
        return;
      }

      post.categories.forEach(cat => {
        if (!cagegories.find(c => c._id === cat._id)) {
          cagegories.push(cat);
        }
      });
    });

    if (reverseOrdering) {
      posts.value = posts.value?.reverse();
    }

    setTimeout(() => {
      resultsLoading.value = false;
    }, 1000);
  };

  const updatePage = async () => {
    resultsLoading.value = true;
    const q = groq`{
      'currentPosts': *[
          _type == 'post' &&
          !(_id in path('drafts.**'))
          ${printCategoryQueryFragment()}
      ]|order(publishedAt desc)[0...5]{
          _id, slug, title, publishedAt, categories[]->{_id, title}
      },
      'totalPosts': count(*[
        _type == 'post'
        && !(_id in path('drafts.**'))
        ${printCategoryQueryFragment()}
      ])
    }`;

    const { data: d } = await useSanityQuery<PostsPageResponse>(q);

    posts.value = d.value.currentPosts as Array<PostLineItem>;

    [...posts.value].forEach(post => {
      if (!post.categories) {
        return;
      }

      post.categories.forEach(cat => {
        if (!cagegories.find(c => c._id === cat._id)) {
          cagegories.push(cat);
        }
      });
    });

    setTimeout(() => {
      resultsLoading.value = false;
    }, 500);
  };

  const fetchAndUpdate = async (dir: string) => {
    if (!dir || !posts.value) {
      return;
    }

    const timestamp = dir === 'newer' ?
      posts.value[0].publishedAt :
      posts.value[posts.value.length - 1].publishedAt;
    const id = dir === 'newer' ?
      posts.value[0]._id :
      posts.value[posts.value.length - 1]._id;
    const q = groq`*[
      _type == 'post' &&
      !(_id in path("drafts.**")) &&
      (
        dateTime(publishedAt) ${dir === 'newer' ? '>' : '<'} dateTime("${timestamp}") ||
        (publishedAt == "${timestamp}" && _id ${dir === 'newer' ? '>' : '<'} "${id}")
      )
      ${printCategoryQueryFragment()}
    ]|order(publishedAt ${dir === 'newer' ? 'asc' : 'desc'})[0...${pageSize}]{
      _id, slug, title, publishedAt, categories[]->{_id, title}
    }`;

    updatePagination(q, dir === 'newer');

    if (dir === 'newer') {
      page.value--;
    } else {
      page.value++;
    }
  };

  const getOlderPosts = (e: MouseEvent) => {
    e.preventDefault();
    fetchAndUpdate('older');
  };

  const getNewerPosts = (e: MouseEvent) => {
    e.preventDefault();
    fetchAndUpdate('newer');
  };

  const printCategoryQueryFragment = () => {
    let fragment = '';

    if ( currentCat.value !== 'All' ) {
      fragment = ` && categories[]->title match "${currentCat.value}"`;
    }

    return fragment;
  };

  const setCategory = (category: string) => {
    if (category === currentCat.value) {
      return;
    }

    currentCat.value = category;
    page.value = 1;
    updatePage();
  };

  const clearCategory = () => {
    if (currentCat.value === 'All') {
      return;
    }

    setCategory('All');
  };

  // Init
  const query = groq`{
    'page': *[_type == 'page' && slug.current == "${route.name}"][0]{
      title,seoTitle,seoDescription,seoImage,
    },
    'currentPosts': *[_type == 'post' && !(_id in path('drafts.**'))${printCategoryQueryFragment()}]|order(publishedAt desc)[0...${pageSize}]{
      _id, slug, title, publishedAt, categories[]->{_id, title}
    },
    'totalPosts': count(*[_type == 'post'] && !(_id in path('drafts.**'))),
  }`;

  const { data, pending } = await useSanityQuery<PostsPageResponse>(query);

  resultsLoading.value = pending.value;
  pageTitle.value = data.value.page.title;
  posts.value = data.value.currentPosts as Array<PostLineItem>;
  totalPosts = data.value.totalPosts;
  totalPages = Math.ceil(totalPosts / pageSize);

  [...posts.value].forEach(post => {
    if (!post.categories) {
      return;
    }

    post.categories.forEach(cat => {
      if (!cagegories.find(c => c._id === cat._id)) {
        cagegories.push(cat);
      }
    });
  });

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

  onMounted(() => {
    setCategory(route.query.category as string || 'All');
  });

  onBeforeRouteUpdate((to) => {
    const { query } = to;

    if (query.category) {
      return;
    }

    clearCategory();
  });
</script>