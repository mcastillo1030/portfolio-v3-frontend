<template>
  <section class="home-contact">
    <div class="container home-contact__container">
      <h2 class="home-contact__title">{{ title }}</h2>
      <p class="home-contact__subtitle">{{ subtitle }}</p>
      <div class="home-contact__columns">
        <div class="home-contact__form"></div>
        <IconsContactGraphic class="home-contact__graphic" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  defineProps<{
    title: string;
    subtitle: string;
  }>();
</script>