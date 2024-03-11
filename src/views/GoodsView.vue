<template>
  <main>
    {{ id }}
  </main>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();
const id = route.params.id;

//~~data.json 을 MenuData.json / GoodsData.json / BannerData.json 으로 분류 

</script>

<style lang="scss" module>
</style>