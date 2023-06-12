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
  const slug = route.params.id;
  const query = groq`*[_type == 'post' && slug.current == "${slug}"][0]{
    title,publishedAt,body,categories[]->{_id,title},mainImage{
      alt,caption, "assetId": asset._ref,
    },author->{name,image{alt,caption, "assetId": asset._ref}}
  }`
  const { data } = await useSanityQuery<SanityPost>(query);
</script>