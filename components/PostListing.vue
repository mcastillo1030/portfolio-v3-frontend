<template>
  <section class="post-listing" v-if="posts">
    <div class="container post-listing__container">
      <!-- <h2 v-if="route.query.category" class="post-listing__category-title">Rants about "{{ getCategoryName(posts[0]) }}"</h2> -->
      <h2 v-if="route.query.category && postsTitle" class="post-listing__category-title">{{ typeof postsTitle === 'string' ?  postsTitle : postsTitle() }}</h2>
      <ul class="post-listing__posts">
        <li class="post-listing__post" v-for="post in posts">
          <div class="post-listing__inner">
            <h3 v-if="route.query" class="post-listing__title gamma">
              <NuxtLink :to="`/rants/${post.slug.current}`" class="post-listing__link">{{ post.title }}</NuxtLink>
            </h3>
            <h2 v-else class="post-listing__title gamma">
              <NuxtLink :to="`/rants/${post.slug.current}`" class="post-listing__link">{{ post.title }}</NuxtLink>
            </h2>
            <div class="post-listing__meta">
              <p class="post-listing__date">Posted {{ dateFormatter(post.publishedAt) }}</p>
              <div class="post-listing__categories">
                <p class="post-listing__categories-title zeta">Tags:</p>
                <ul class="post-listing__tags">
                  <li class="post-listing__tag" v-for="category in post.categories">
                    <NuxtLink
                      :to="`/rants?category=${category._id}`"
                      class="post-listing__tag-link"
                      @click="() => {
                        onTagClick && onTagClick(category._id);
                        scrollToTop();
                      }"
                    >{{ category.title }}</NuxtLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </li>
      </ul>
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
      // font-size: clamp(0.75rem, 0.713rem + 0.158vw, 0.875rem);
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
import scrollToTop from '~/utils/scrollTopHelper';

  const route = useRoute();

  const getCategoryName = (post: PostLineItem) => {
    if (!route.query.category){
      return '""';
    }

    const { title } = post.categories.find(cat => cat._id === route.query.category) || { title: '""' };
    return title;
  }

  defineProps<{
    posts?: Array<PostLineItem>;
    postsTitle?: string|(() => string);
    onTagClick?: (id: string) => void;
  }>();
</script>