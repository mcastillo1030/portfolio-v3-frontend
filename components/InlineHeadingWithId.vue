<template>
  <h2 :id="`heading-${children[0]._key}`" v-text="children[0].text" v-if="style === 'h2'"></h2>
  <h3 :id="`heading-${children[0]._key}`" v-text="children[0].text" v-else-if="style === 'h3'"></h3>
  <h4 :id="`heading-${children[0]._key}`" v-text="children[0].text" v-else-if="style === 'h4'"></h4>
</template>

<script setup lang="ts">
  import { PortableTextMarkDefinition } from '@portabletext/types';

  defineProps<{
    style: string;
    children: Array<PortableTextMarkDefinition>;
  }>();
</script>