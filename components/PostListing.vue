<template>
  <section class="post-listing">
    <div class="container post-listing__container">
      <header v-if="category && category !== 'All'" class="post-listing__header">
        <h2  class="post-listing__category-title">Rants about "{{ category }}"</h2>
        <LazyNuxtLink to="/rants" class="post-listing__category-btn cursor-pointer cursor-pointer--contrast">
          <IconsMenuClose class="post-listing__clear-icon" />
          <span class="post-listing__clear-text tooltip">Clear</span>
        </LazyNuxtLink>
      </header>
      <div class="post-listing__wrap">
        <CliSpinner class="post-listing__spinner" :class="loading ? 'visible' : ''" />
        <ul class="post-listing__posts" :class="loading ? 'hidden' : ''" v-if="posts">
          <li class="post-listing__post" v-for="post in posts">
            <div class="post-listing__inner">
              <h3 v-if="category" class="post-listing__title gamma">
                <LazyNuxtLink
                  :to="`/rants/${post.slug.current}`"
                  class="post-listing__link"
                  @click="gtm?.trackEvent({action: 'click', event: 'post-listing-link', target: post.title});"
                >{{ post.title }}</LazyNuxtLink>
              </h3>
              <h2 v-else class="post-listing__title gamma">
                <LazyNuxtLink
                  :to="`/rants/${post.slug.current}`"
                  class="post-listing__link"
                  @click="gtm?.trackEvent({action: 'click', event: 'post-listing-link', target: post.title});"
                >{{ post.title }}</LazyNuxtLink>
              </h2>
              <div class="post-listing__meta">
                <p class="post-listing__date">Posted {{ dateFormatter(post.publishedAt) }}</p>
                <div class="post-listing__categories" v-if="post.categories">
                  <p class="post-listing__categories-title zeta">Tags:</p>
                  <ul class="post-listing__tags">
                    <li class="post-listing__tag" v-for="category in post.categories">
                      <NuxtLink
                        :to="`/rants?category=${category.title}`"
                        class="post-listing__tag-link cursor-pointer cursor-pointer--contrast"
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

    &__header {
      display: flex;
      gap: clamp(1.5rem, 2vw, 3rem);
      align-items: flex-start;
      margin: 1.875rem 0 clamp(1.625rem, 1.361rem + 1.127vw, 2.375rem)
    }

    &__category-title {
      margin: 0;
    }

    &__category-btn {
      --hit-area: .5rem;
      flex-shrink: 0;
      position: relative;
      width: 3rem;
      padding: var(--hit-area);
      color: var(--c-accent-2);
      cursor: pointer;
    }

    &__clear-text {
      position: absolute;
      top: 0;
      right: 0;
      z-index: 2;
      background: var(--c-accent-2);
      opacity: 0;
      transform: translate(calc(var(--hit-area) * -.5), -100%);
      transition:
        opacity 0.2s ease-out,
        transform 0.3s ease-out;

      &::before {
        content: "";
        position: absolute;
        bottom: 0;
        right: var(--hit-area);
        width: 0;
        height: 0;
        border-style: solid;
        border-width: .5rem .5rem 0 .5rem;
        border-color: var(--c-accent-2) transparent transparent transparent;
        transform: translate(calc(var(--hit-area) * -.5), .5rem);
      }
    }

    &__category-btn:hover &__clear-text {
      opacity: 1;
      transform: translate(calc(var(--hit-area) * -.5), calc((100% + .5rem) * -1));
    }

    &__wrap {
      position: relative;
    }

    &__spinner {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      visibility: hidden;

      &.visible {
        opacity: 1;
        visibility: visible;
      }
    }

    &__posts {
      padding: 0;
      margin: 0;
      list-style: none;

      &.hidden {
        opacity: 0;
        visibility: hidden;
      }
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
  }

  @media screen and (min-width: c.$b-small) {
    .post-listing {
      &__categories-title {
        width: auto;
      }
    }
  }

  @media screen and (min-width: c.$b-medium) {
    .post-listing {
      &__clear-text {
        left: 50%;
        right: auto;
        transform: translate(-50%, -100%);

        &::before {
          content: "";
          position: absolute;
          bottom: 0;
          left: 50%;
          right: auto;
          transform: translate(-50%, .5rem);
        }
      }

      &__category-btn:hover &__clear-text {
        transform: translate(-50%, calc((100% + .5rem) * -1));
      }
    }
  }
</style>

<script setup lang="ts">
  import { useGtm, dateFormatter } from '#imports';

  const gtm = useGtm();

  defineProps<{
    posts?: Array<PostLineItem>;
    category?: string;
    onTagClick?: (id: string) => void;
    loading?: boolean;
  }>();
</script>