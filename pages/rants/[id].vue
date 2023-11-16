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
  import { useAppConfig, useRuntimeConfig } from 'nuxt/app';
  import {
    groq,
    useSeoMeta,
    useSanityQuery,
    useRoute,
useImage,
  } from '#imports';

  const { siteTitle, ogWidth: width, ogHeight: height } = useAppConfig();
  const runtimeConfig = useRuntimeConfig();
  const { baseUrl } = runtimeConfig.public;
  const img = useImage();
  const route = useRoute();

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
    twitterTitle: data.value.title + ' | ' + siteTitle,
    description: data.value.excerpt,
    ogDescription: data.value.excerpt,
    twitterDescription: data.value.excerpt,
    ogImage: data.value.mainImage ? img(data.value.mainImage.assetId, {width, height}) : baseUrl + '/img/og-image.png',
    twitterImage: data.value.mainImage ? img(data.value.mainImage.assetId, {width, height}) : baseUrl + '/img/og-image.png',
    ogUrl: baseUrl + route.path,
    twitterCard: 'summary_large_image',
  });
</script>