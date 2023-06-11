<template>
  <div class="highlight-code-block" v-if="code" ref="codeBlock">
    <span v-if="filename" class="highlight-code-block__label">{{ filename }}</span>
    <button type="button" class="highlight-code-block__button" @click="copyToClipboard">
      <span v-if="!copied" class="highlight-code-block__copy-action">
        <IconsCopy class="highlight-code-block__icon highlight-code-block__icon--copy" />
        <span class="highlight-code-block__button-label sr-only">Copy</span>
      </span>
      <span v-else class="highlight-code-block__button-success">
        <IconsCheck class="highlight-code-block__icon highlight-code-block__icon--success" />
        <span class="highlight-code-block__button-label sr-only">Copied</span>
      </span>
    </button>
    <pre class="highlight-code-block__pre">
      <code class="highlight-code-block__code" :class="`language-${language} hljs`" v-html="getHighlightedCode(code, language)" />
    </pre>
  </div>
</template>

<style lang="scss">
  .highlight-code-block {
    position: relative;
    margin: 1rem 0;
    font-size: 1rem;

    &__label {
      position: absolute;
      top: .75rem;
      right: .75rem;
      color: var(--c-accent-3);
      font-size: 0.875rem;
      transition: opacity .2s ease-in-out;
    }

    &:hover &__label {
      opacity: 0;
    }

    &__button {
      position: absolute;
      top: 1rem;
      right: 1rem;
      z-index: 2;
      padding: .5rem .75rem;
      color: var(--c-action);
      opacity: 0;
      background: transparent;
      border: none;
      border-radius: .5rem;
      cursor: pointer;
      transition:
        background-color .2s ease-out,
        opacity 0.2s ease-in-out;

      &:focus,
      &:hover {
        background: var(--c-header-bg);
        outline: none;
      }
    }

    &:hover &__button {
      opacity: 1;
    }

    &__icon {
      &--success {
        color: var(--c-success);
      }
    }

    &__pre {
      display: flex;
      white-space: normal;
      border-radius: .5rem;
      overflow: auto;
    }

    &__code {
      white-space: pre;

      &.hljs {
        padding-top: 2rem;
        tab-size: 2;
      }
    }
  }
</style>

<script setup lang="ts">
  import hljs from 'highlight.js/lib/core';
  // import bash from 'highlight.js/lib/languages/bash';
  import javascript from 'highlight.js/lib/languages/javascript';
  // import xml from 'highlight.js/lib/languages/xml';
  // import json from 'highlight.js/lib/languages/json';
  import 'highlight.js/styles/vs2015.css';

  hljs.registerLanguage('javascript', javascript);

  const copied = ref<Boolean>(false);
  const codeBlock = ref<HTMLElement>();

  const copyToClipboard = (e: MouseEvent) => {
    e.preventDefault();
    const block = codeBlock.value?.querySelector('.highlight-code-block__code');

    if (!block) {
      return;
    }

    const text = block.textContent;
    navigator.clipboard.writeText(text || '');
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  };

  const getHighlightedCode = (code: string, language: string = 'javascript') => {
    return hljs.highlight(code, { language }).value;
  };

  defineProps<{
    code?: string;
    filename?: string;
    language?: string;
  }>();
</script>