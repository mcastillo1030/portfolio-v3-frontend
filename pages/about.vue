<template>
  <div class="c-main">
    <MarkHero :title="data.title" />
    <AboutIntro :title="data.introHeading" :text="data.introText" />
    <TwoThirdColumn>
      <TextCard :title="data.miscHeading" :text="data.miscText" />
      <ListCard :title="data.educationHeading" :items="data.educationItems" />
    </TwoThirdColumn>
  </div>
</template>

<script setup lang="ts">
  const { $urlFor } = useNuxtApp();
  const { siteTitle } = useAppConfig();
  const runtimeConfig = useRuntimeConfig();
  const { baseUrl } = runtimeConfig.public;
  const route = useRoute();
  const query = groq`*[_type == "page" && slug.current == "${route.name}"][0]{
    title, introHeading, introText,
    miscHeading, miscText,
    educationHeading, educationItems,
    seoTitle, seoDescription, seoImage,
  }`;
  const { data } = await useSanityQuery<SanityPage>(query);

  useSeoMeta({
    title: data.value.seoTitle + ' | ' + siteTitle,
    ogTitle: data.value.seoTitle + ' | ' + siteTitle,
    twitterTitle: data.value.seoTitle + ' | ' + siteTitle,
    description: data.value.seoDescription,
    twitterDescription: data.value.seoDescription,
    ogDescription: data.value.seoDescription,
    ogUrl: baseUrl + route.path,
    ogImage: data.value.seoImage ? $urlFor(data.value.seoImage.asset._ref).size(1200, 628).url() : baseUrl + '/img/og-image.png',
    twitterImage: data.value.seoImage ? $urlFor(data.value.seoImage.asset._ref).size(1200, 628).url() : baseUrl + '/img/og-image.png',
    twitterCard: 'summary_large_image',
  });
</script>