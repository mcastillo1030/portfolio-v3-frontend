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
  const route = useRoute();
  const { siteTitle } = useAppConfig();
  const { $urlFor } = useNuxtApp();

  const slug = route.params.id;
  const query = groq`*[_type == 'post' && slug.current == "${slug}"][0]{
    title,publishedAt,body,excerpt,categories[]->{_id,title},mainImage{
      alt,caption, "assetId": asset._ref,
    },author->{name,image{alt,caption, "assetId": asset._ref}}
  }`
  const { data } = await useSanityQuery<SanityPost>(query);

  useSeoMeta({
    title: data.value.title + ' | ' + siteTitle,
    ogTitle: data.value.title + ' | ' + siteTitle,
    description: data.value.excerpt,
    ogDescription: data.value.excerpt,
    ogImage: data.value.mainImage.assetId ? $urlFor(data.value.mainImage.assetId).size(1200, 628).url() : '/img/og-image.png',
    twitterCard: 'summary_large_image',
  });
</script>