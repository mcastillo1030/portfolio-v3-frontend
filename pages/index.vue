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
  </main>
</template>

<script setup lang="ts">
  import type { NuxtApp } from 'nuxt/app';
  import { useAppConfig, useNuxtApp, useRuntimeConfig } from 'nuxt/app';
  import { groq, useSeoMeta, useSanityQuery } from '#imports';

  const { $urlFor } = useNuxtApp() as NuxtApp & ImgHelperPlugin;
  const { siteTitle } = useAppConfig();
  const config = useRuntimeConfig();
  const { baseUrl } = config.public as BaseUrl;

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

  useSeoMeta({
    title: data.value.seoTitle + ' | ' + siteTitle,
    ogTitle: data.value.seoTitle + ' | ' + siteTitle,
    twitterTitle: data.value.seoTitle + ' | ' + siteTitle,
    description: data.value.seoDescription,
    twitterDescription: data.value.seoDescription,
    ogUrl: baseUrl,
    ogDescription: data.value.seoDescription,
    ogImage: $urlFor(data.value.seoImage.asset._ref).size(1200, 628).url(),
    twitterImage: $urlFor(data.value.seoImage.asset._ref).size(1200, 628).url(),
    twitterCard: 'summary_large_image',
  });
</script>