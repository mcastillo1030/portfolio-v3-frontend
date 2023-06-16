<template>
  <div class="c-main">
    <MarkHero :title="pageTitle" />
    <PostListing
      :posts="posts"
      :on-tag-click="setCategory"
      :posts-title="getTitleWithCategory"
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
  const { baseUrl } = useRuntimeConfig();
  const { $urlFor } = useNuxtApp();
  const { siteTitle } = useAppConfig();
  const route = useRoute();

  // SEO
  const seoTitle = ref<string>();
  const seoDescription = ref<string>();
  const seoImage = ref<SanityAsset>();

  // Reactives
  const pageTitle = ref<string>();
  const posts = ref<Array<PostLineItem>>();
  const currentCatId = ref<string>(route.query.category as string || '*');
  const resultsLoading = ref<boolean>(true);
  const page = ref<number>(1);

  // Vars
  const pageSize = 5;
  const cagegories = [
    { _id: '*', title: 'All' },
  ];
  let totalPages = 1;
  let totalPosts: number;

  // const initPage = async () => {

  // };

  const updatePagination = async (q: string, reverseOrdering = false) => {
    if (!q) {
      return;
    }

    const { data: d, pending: p } = await useSanityQuery<Array<PostLineItem>>(q, {cat: currentCatId.value}, {server: false});

    posts.value = d.value;
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
  };

  const updatePage = async () => {
    const q = groq`{
      'currentPosts': *[
          _type == 'post' &&
          !(_id in path('drafts.**')) &&
          (categories[]._ref match $cat)
      ]|order(publishedAt desc)[0...5]{
          _id, slug, title, publishedAt, categories[]->{_id, title}
      },
      'totalPosts': count(*[
        _type == 'post' &&
        (categories[]._ref match $cat)
        && !(_id in path('drafts.**'))
      ])
    }`;

    const { data: d, pending: p } = await useSanityQuery<PostsPageResponse>(q, {
      cat: currentCatId.value
    });

    posts.value = d.value.currentPosts;
    resultsLoading.value = p.value;

    [...posts.value].forEach(post => {
      post.categories.forEach(cat => {
        if (!cagegories.find(c => c._id === cat._id)) {
          cagegories.push(cat);
        }
      });
    });
  };

  const fetchAndUpdate = async (dir: string) => {
    if (!dir || !posts.value) {
      return;
    }

    // resultsLoading.value = true;

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
      ) &&
      (categories[]._ref match $cat)
    ]|order(publishedAt ${dir === 'newer' ? 'asc' : 'desc'})[0...${pageSize}]{
      _id, slug, title, publishedAt, categories[]->{_id, title}
    }`;

    updatePagination(q, dir === 'newer');

    if (dir === 'newer') {
      page.value--;
    } else {
      page.value++;
    }

    // resultsLoading.value = false;
  };

  const getOlderPosts = (e: MouseEvent) => {
    e.preventDefault();
    fetchAndUpdate('older');
  };

  const getNewerPosts = (e: MouseEvent) => {
    e.preventDefault();
    fetchAndUpdate('newer');
  };

  const setCategory = (id: string) => {
    currentCatId.value = id;
    page.value = 1;
    updatePage();
  };

  const getTitleWithCategory = () => {
    const cat = cagegories.find((c) => c._id === currentCatId.value);
    const title = cat ? `Rants about "${cat.title}"` : 'All Rants';
    return title;
  };

  // Init
  // initPage();
  const query = groq`{
    'page': *[_type == 'page' && slug.current == "${route.name}"][0]{
      title,seoTitle,seoDescription,seoImage,
    },
    'currentPosts': *[_type == 'post' && !(_id in path('drafts.**'))]|order(publishedAt desc)[0...${pageSize}]{
      _id, slug, title, publishedAt, categories[]->{_id, title}
    },
    'totalPosts': count(*[_type == 'post'] && !(_id in path('drafts.**'))),
  }`;

  const { data, pending } = await useSanityQuery<PostsPageResponse>(query, {cat: currentCatId.value});

  resultsLoading.value = pending.value;
  pageTitle.value = data.value.page.title;
  posts.value = data.value.currentPosts
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
</script>