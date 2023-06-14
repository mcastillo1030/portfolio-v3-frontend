<template>
  <div class="c-main">
    <TextHero subtitle="Projects" :title="data.title" />
    <ArticleContent
      :body="data.body"
      :image="data.mainImage"
      :link="data.link"
      :technologies="data.technologies"
    />
  </div>
</template>

<script setup lang="ts">
  const route = useRoute();
  const { siteTitle } = useAppConfig();
  const { $urlFor } = useNuxtApp();

  const slug = route.params.id;
  const query = groq`*[_type == 'project' && slug.current == "${slug}"][0]{
    title,body,link,technologies[]->{title, icon},mainImage{
      alt,caption, "assetId": asset._ref,
    }
  }`
  const { data } = await useSanityQuery<SanityProject>(query);

  useSeoMeta({
    title: data.value.title + ' | ' + siteTitle,
    ogTitle: data.value.title + ' | ' + siteTitle,
    description: data.value.excerpt,
    ogDescription: data.value.excerpt,
    ogImage: data.value.mainImage.assetId ? $urlFor(data.value.mainImage.assetId).size(1200, 628).url() : '/img/og-image.png',
    twitterCard: 'summary_large_image',
  });
</script>