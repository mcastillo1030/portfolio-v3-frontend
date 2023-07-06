<template>
  <section class="post-listing">
    <div class="container post-listing__container">
      <h2 v-if="route.query.category && postsTitle" class="post-listing__category-title">{{ typeof postsTitle === 'string' ?  postsTitle : postsTitle() }}</h2>
      <CliSpinner v-if="loading" class="post-listing__spinner" />
      <div v-else class="post-listing__wrap">
        <ul class="post-listing__posts" v-if="posts">
          <li class="post-listing__post" v-for="post in posts">
            <div class="post-listing__inner">
              <h3 v-if="route.query" class="post-listing__title gamma">
                <NuxtLink
                  :to="`/rants/${post.slug.current}`"
                  class="post-listing__link"
                  @click="gtm?.trackEvent({action: 'click', event: 'post-listing-link', target: post.title});"
                >{{ post.title }}</NuxtLink>
              </h3>
              <h2 v-else class="post-listing__title gamma">
                <NuxtLink
                  :to="`/rants/${post.slug.current}`"
                  class="post-listing__link"
                  @click="gtm?.trackEvent({action: 'click', event: 'post-listing-link', target: post.title});"
                >{{ post.title }}</NuxtLink>
              </h2>
              <div class="post-listing__meta">
                <p class="post-listing__date">Posted {{ dateFormatter(post.publishedAt) }}</p>
                <div class="post-listing__categories" v-if="post.categories">
                  <p class="post-listing__categories-title zeta">Tags:</p>
                  <ul class="post-listing__tags">
                    <li class="post-listing__tag" v-for="category in post.categories">
                      <NuxtLink
                        :to="`/rants?category=${category.title}`"
                        class="post-listing__tag-link"
                        @click="() => {
                          onTagClick && onTagClick(category.title);
                          gtm?.trackEvent({ action: 'click', event: 'post-listing-tag', value: category.title });
                        }"
                      >{{ category.title }}</NuxtLink>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <div class="post-listing__no-results" v-else>
          <h2 class="post-listing__no-results-title">Nothing to see here...yet</h2>
          <p class="post-listing__no-results-sub">Still working on getting you &#x2728;fresh&#x2728; content.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
  .post-listing {
    margin-top: clamp(4rem, 0.739rem + 13.913vw, 15rem);

    &__posts {
      padding: 0;
      margin: 0;
      list-style: none;
    }

    &__post {
      display: flex;
      gap: clamp(.5rem, 1vw, 1rem);
      margin: 0;

      &::before {
        content: '\FE61';
        display: block;
        margin-top: 0.25rem;
        color: var(--c-accent-2);
        font-size: clamp(1.625rem, 1.339rem + 1.221vw, 2.438rem);
      }

      & + & {
        margin-top: clamp(1.75rem, 1.528rem + 0.949vw, 2.5rem);
      }
    }

    &__title {
      margin: 0 0 1rem;
    }

    &__meta {
      color: var(--c-selection);
    }


    &__categories {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: .25rem 1.25rem;
    }

    &__categories-title {
      width: 100%;
      margin: 0;
      color: var(--c-accent-2);
      font-size: clamp(0.75rem, 0.713rem + 0.158vw, 0.875rem);
    }

    &__tags {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0;
      margin: 0;
      list-style: none;
    }

    &__tag {
      margin: 0;
      font-size: .75rem;
      text-transform: lowercase;
    }

    &__tag-link {
      color: var(--c-accent-2);
      text-decoration-style: dashed;
    }

    @media screen and (min-width: c.$b-small) {
      .post-listing {
        &__categories-title {
          width: auto;
        }
      }
    }
  }
</style>

<script setup lang="ts">
  import scrollTo from '~/utils/smoothScroll.js';

  const gtm = useGtm();
  const route = useRoute();

  onUpdated(() => {
    scrollTo('.post-listing');
  });

  defineProps<{
    posts?: Array<PostLineItem>;
    postsTitle?: string|(() => string);
    onTagClick?: (id: string) => void;
    loading?: boolean;
  }>();
</script>