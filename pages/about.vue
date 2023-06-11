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
  const route = useRoute();
  const query = groq`*[_type == "page" && slug.current == "${route.name}"][0]{
    title, introHeading, introText,
    miscHeading, miscText,
    educationHeading, educationItems
  }`;
  const { data } = await useSanityQuery<SanityPage>(query);
</script>