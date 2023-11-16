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
  import { useAppConfig, useRuntimeConfig } from 'nuxt/app';
  import {
    groq,
    useSeoMeta,
    useSanityQuery,
    useRoute,
useImage,
  } from '#imports';

  const route = useRoute();
  const { siteTitle, ogWidth: width, ogHeight: height } = useAppConfig();
  const runtimeConfig = useRuntimeConfig();
  const { baseUrl } = runtimeConfig.public as BaseUrl;
  const img = useImage();

  const slug = route.params.id;
  const query = groq`*[_type == 'project' && slug.current == "${slug}"][0]{
    title,body,link,excerpt,technologies[]->{title, icon},mainImage{
      excerptalt,caption, "assetId": asset._ref,
    }
  }`
  const { data } = await useSanityQuery<SanityProject>(query);

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