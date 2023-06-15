<template>
  <div class="c-main">
    <TextHero
      subtitle="#AQuickRantAbout"
      :title="data.title"
      :author="data.author"
      :publishedAt="data.publishedAt"
    />
    <ArticleContent
      :image="data.mainImage"
      :body="data.body"
      :categories="data.categories"
    />
  </div>
</template>

<script setup lang="ts">
  const { baseUrl, siteTitle } = useAppConfig();
  const { $urlFor } = useNuxtApp();
  const route = useRoute();

  const slug = route.params.id;
  const query = groq`*[_type == 'post' && slug.current == "${slug}"][0]{
    title,publishedAt,body,excerpt,categories[]->{_id,title},mainImage{
      excerpt,alt,caption, "assetId": asset._ref,
    },author->{name,image{alt,caption, "assetId": asset._ref}}
  }`
  const { data } = await useSanityQuery<SanityPost>(query);

  useSeoMeta({
    title: data.value.title + ' | ' + siteTitle,
    ogTitle: data.value.title + ' | ' + siteTitle,
    twitterTitle: data.value.title + ' | ' + siteTitle,
    description: data.value.excerpt,
    ogDescription: data.value.excerpt,
    twitterDescription: data.value.excerpt,
    ogImage: data.value.mainImage ? $urlFor(data.value.mainImage.assetId).size(1200, 628).url() : baseUrl + '/img/og-image.png',
    twitterImage: data.value.mainImage ? $urlFor(data.value.mainImage.assetId).size(1200, 628).url() : baseUrl + '/img/og-image.png',
    ogUrl: baseUrl + route.path,
    twitterCard: 'summary_large_image',
  });
</script>