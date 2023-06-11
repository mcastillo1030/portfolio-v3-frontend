import CodeBlock from 'vue3-code-block';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(CodeBlock).mount('#app')
})