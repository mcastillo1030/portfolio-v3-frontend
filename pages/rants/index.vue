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
      :loading="paginationLoading"
    />
  </div>
</template>

<script setup lang="ts">
  const { baseUrl } = useAppConfig();
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
  const paginationLoading = ref<boolean>(false);
  const page = ref<number>(1);

  // Vars
  const pageSize = 5;
  const cagegories = [
    { _id: '*', title: 'All' },
  ];
  let totalPages = 1;
  let totalPosts: number;

  const initPage = async () => {
    const query = groq`{
      'page': *[_type == 'page' && slug.current == "${route.name}"][0]{
        title,seoTitle,seoDescription,seoImage,
      },
      'currentPosts': *[_type == 'post' && !(_id in path('drafts.**'))]|order(publishedAt desc)[0...${pageSize}]{
        _id, slug, title, publishedAt, categories[]->{_id, title}
      },
      'totalPosts': count(*[_type == 'post'] && !(_id in path('drafts.**'))),
    }`;

    const { data } = await useSanityQuery<PostsPageResponse>(query, {cat: currentCatId.value});

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
  };

  const updatePagination = async (query: string, reverseOrdering = false) => {
    if (!query) {
      return;
    }

    const {data} = await useSanityQuery<Array<PostLineItem>>(query, {cat: currentCatId.value}, {server: false});

    posts.value = data.value;

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
    const query = groq`{
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

    const { data } = await useSanityQuery<PostsPageResponse>(query, {
      cat: currentCatId.value
    });

    posts.value = data.value.currentPosts;

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

    paginationLoading.value = true;

    const timestamp = dir === 'newer' ?
      posts.value[0].publishedAt :
      posts.value[posts.value.length - 1].publishedAt;
    const id = dir === 'newer' ?
      posts.value[0]._id :
      posts.value[posts.value.length - 1]._id;
    const query = groq`*[
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

    updatePagination(query, dir === 'newer');

    if (dir === 'newer') {
      page.value--;
    } else {
      page.value++;
    }

    paginationLoading.value = false;
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