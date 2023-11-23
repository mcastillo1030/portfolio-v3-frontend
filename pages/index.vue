<template>
  <main class="c-main">
    <HomeHero
      :title="data.heroHeading"
      :subtitle="data.heroSubhead"
      :icons="data.heroSkills"
    />
    <HomeIntro
      :title="data.introHeading"
      :image="data.introImage"
      :links="data.introContact"
      :text="data.introText"
    />
    <HomeProjects
      :title="data.projectsHeading"
      :projects="data.projectsFeatured || data.projectsFeaturedDefault"
    />
    <HomeContact
      :title="data.contactHeading"
      :subtitle="data.contactSubhead"
      :items="data.contactItems"
    />
    <HomeLoading :visibilityString="loadingVisibility" />
  </main>
</template>

<script setup lang="ts">
  import { useAppConfig, useRuntimeConfig } from 'nuxt/app';
  import {
    groq,
    useSeoMeta,
    useSanityQuery,
    definePageMeta,
    useLoadingVisibility,
useImage,
  } from '#imports';
  import type { RouteLocationNormalized } from '#vue-router';

  const img = useImage();
  const { siteTitle, ogWidth: width, ogHeight: height } = useAppConfig();
  const config = useRuntimeConfig();
  const { baseUrl } = config.public as BaseUrl;
  const loadingVisibility = useLoadingVisibility();

  const query = groq`*[_type == 'page' && slug.current == 'home'][0]{
    title,template,slug,
    heroHeading,heroSubhead,
    heroSkills,introHeading,
    introImage{
      alt,caption,
      "assetDimensions": asset->metadata.dimensions,
      "assetId": asset._ref,
    },
    introText,
    introContact[]->{
      title,linkType,
      icon,inFooter,
      url,attachment
    },
    projectsHeading,projectsFeatured[]->{
      mainImage{
        alt,caption,
        "assetId": asset._ref,
      },
      title, slug, link, excerpt
    },
    contactHeading,contactSubhead,
    contactItems[]->{
      title, icon, inFooter,
      linkType, url, attachment
    },
    "projectsFeaturedDefault": *[_type == 'project'][0..3]{
      mainImage{
        alt,caption,
        "assetId": asset._ref,
      },
      title, slug, link, excerpt
    },
    seoTitle, seoDescription, seoImage,
  }`;
  const { data } = await useSanityQuery<SanityPage>(query);

  definePageMeta({
    middleware: [
      (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
        if (from.path === to.path) {
          return;
        }

        if ( to.path === '/' ) {
          const loadingVisibility = useLoadingVisibility();
          loadingVisibility.value = 'hidden';
        }

        return;
      }
    ]
  });

  useSeoMeta({
    title: data.value.seoTitle + ' | ' + siteTitle,
    ogTitle: data.value.seoTitle + ' | ' + siteTitle,
    twitterTitle: data.value.seoTitle + ' | ' + siteTitle,
    description: data.value.seoDescription,
    twitterDescription: data.value.seoDescription,
    ogUrl: baseUrl,
    ogDescription: data.value.seoDescription,
    ogImage: img(data.value.seoImage.asset._ref, {width, height}),
    twitterImage: img(data.value.seoImage.asset._ref, {width, height}),
    twitterCard: 'summary_large_image',
  });
</script>