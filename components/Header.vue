<script lang="ts">
  const props = {
    items: {
      type: Object,
      default: {},
    },
  };
  export default {
    name: 'Header',
    props,
  };
</script>

<template>
  <header>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h1>Header</h1>
          <ul>
            <li v-for="item in items.data">
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