<script setup>
  const { baseApiUrl, apiEndpoints } = useAppConfig();
  const navEndpoint = `${baseApiUrl}${apiEndpoints.mainNav}`;
  const { data: items } = await useFetch( navEndpoint );
</script>

<template>
	<Header :items="items" />
  <div>
    <KitchenSink />
  </div>
</template>
