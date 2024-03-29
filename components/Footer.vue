<template>
  <footer class="footer">
    <div class="container footer__container">
      <div class="footer__top">
        <IconsFooterWatermark classes="footer__watermark" />
      </div>
      <div class="footer__bottom">
        <nav class="footer__nav" aria-label="Footer Nav">
          <ul v-if="items" class="footer__list">
            <li v-for="item in items" class="footer__item">
              <a
                v-if="item.linkType === 'url'"
                class="footer__link"
                :href="item.url"
              >
                <LazyIconsNavItem :type="item.icon" classes="footer__icon" />
                <span class="footer__link-label tooltip">{{ item.title }}</span>
              </a>
              <LazySanityFile
                v-else
                :asset-id="item.attachment?.asset._ref || 'null'"
                download="marlon-castillo-resume.pdf"
              >
                <template #default="{src}">
                  <a
                    :href="src"
                    class="footer__link"
                  >
                    <IconsNavItem :type="item.icon" classes="footer__icon" />
                    <span class="footer__link-label tooltip">{{ item.title }}</span>
                  </a>
                </template>
              </LazySanityFile>
            </li>
          </ul>
        </nav>
        <p class="footer__copy">&copy;{{ (new Date()).getFullYear() }} Marlon Castillo</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
  import { useSanityQuery, groq } from '#imports';

  const query = groq`*[_type == 'contactLink' && inFooter == true]{
    linkType, title, icon, url, attachment
  }`;
  const { data: items } = useSanityQuery<Array<ContactLink>>(query);
</script>

<style lang="scss">
  .footer {
    margin: clamp(7.25rem, 6.838rem + 2.063vw, 9.313rem) 0 3.5rem;

    &__top {
      position: relative;
      padding-bottom: 2rem;

      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: .125rem;
        background: var(--c-selection);
        border-radius: .125rem;
      }
    }

    &__watermark {
      display: block;
      width: 55%;
      max-width: 9.5rem;
      margin-left: auto;
      opacity: .5;
    }

    &__bottom {
      padding-top: 2rem;
    }

    &__list {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      margin-bottom: 1rem;
      list-style: none;
      column-gap: 1.125rem;
    }

    &__item {
      margin: 0;
    }

    &__link {
      position: relative;
    }

    &__icon {
      max-width: 1.5rem;
      width: 1.5rem;
      max-height: 1.5rem;
      vertical-align: middle;
    }

    &__link-label {
      position: absolute;
      bottom: 100%;
      left: 50%;
      z-index: 2;
      color: var(--c-background);
      opacity: 0;
      background: var(--c-accent-2);
      transform: translate(-50%, -.5rem);
      transition:
        opacity .2s ease-in-out,
        transform .2s ease-in-out;

      &::after {
        content: '';
        position: absolute;
        top: 100%;
        left: 50%;
        width: 0;
        height: 0;
        border: .5rem solid transparent;
        border-top-color: var(--c-accent-2);
        transform: translate(-50%, 0);
      }
    }

    &__link:hover &__link-label {
      opacity: 1;
      transform: translate(-50%, -1rem);
    }

    &__copy {
      margin: 0;
      font-size: .875rem;
      text-align: center;
      text-transform: lowercase;
    }

    @media screen and (min-width: c.$b-large) {
      .footer {
        &__top {
          padding-right: 2.1875rem;
        }

        &__watermark {
          max-width: 12.5rem;
        }

        &__bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-right: 2.1875rem;
          padding-left: 2.1875rem;
        }

        &__list {
          margin-bottom: 0;
        }

        &__copy {
          text-align: left;
        }
      }
    }
  }
</style>