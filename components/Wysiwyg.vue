<template>
  <div class="wysiwyg">
    <SanityContent :blocks="body" :serializers="serializers" />
  </div>
</template>

<script setup lang="ts">
  import type { Serializers } from '@nuxtjs/sanity/dist/runtime/components/sanity-content';
  import type { PortableTextBlock } from '@portabletext/types';

  const serializers:Serializers = {
    types: {
      image: resolveComponent('ImageBlock'),
      code: resolveComponent('HighlightCodeBlock'),
    },
    marks: {
      internalLink: resolveComponent('InternalLink'),
      inlineCode: resolveComponent('InlineCode')
    },
    styles: {
      h2: resolveComponent('InlineHeadingWithId'),
      h3: resolveComponent('InlineHeadingWithId'),
      h4: resolveComponent('InlineHeadingWithId'),
    }
  };

  defineProps<{
    body: Array<PortableTextBlock>;
  }>();
</script>