<script setup lang="js">
  // const items = ref([]);
  const { baseApiUrl, apiEndpoints } = useAppConfig();
  const navEndpoint = `${baseApiUrl}${apiEndpoints.mainNav}`;
  const { data: items } = await useAsyncData( 'nav', () => $fetch( navEndpoint ) );
</script>

<template>
  <header>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <OutlineTitle text="Header" />
          <ul>
            <li v-for="item in items">
              <!-- <a
                :href="item.page.url"
                :download="item.page.attachment ? item.page.title : null"
              >{{ item.page.title }}</a> -->
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>