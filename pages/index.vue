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
      :projects="data.projectsFeatured"
    />
    <HomeContact
      :title="data.contactHeading"
      :subtitle="data.contactSubhead"
      :items="data.contactItems"
    />
  </main>
</template>

<script setup lang="ts">
  const { $urlFor } = useNuxtApp();
  const { siteTitle } = useAppConfig();
  const loading = useAppLoading();
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
    projectsHeading,contactHeading,
    contactSubhead, contactItems[]->{
      title, icon, inFooter,
      linkType, url, attachment
    },
    "projectsFeatured": *[_type == 'project'][0..3]{
      mainImage{
        alt,caption,
        "assetId": asset._ref,
      },
      title, slug, excerpt
    },
    seoTitle, seoDescription, seoImage,
  }`;
  const { data, pending } = useSanityQuery<SanityPage>(query, {lazy: true});

  watch(pending, (value) => {
    loading.value = value;
  });

  if (data.value) {
    useSeoMeta({
      title: data.value.seoTitle + ' | ' + siteTitle,
      ogTitle: data.value.seoTitle + ' | ' + siteTitle,
      description: data.value.seoDescription,
      ogDescription: data.value.seoDescription,
      ogImage: $urlFor(data.value.seoImage.asset._ref).size(1200, 628).url(),
      twitterCard: 'summary_large_image',
    });
  }
</script>