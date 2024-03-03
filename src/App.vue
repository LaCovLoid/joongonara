
<template>
  <TopEventComponent />
  <HeaderComponent />
  <RouterView /> <!--그 라우터 주소에 따라 상황에 맞는 view를 출력함-->
  <FooterComponent />
</template>


<script setup lang="ts">
import { RouterView } from 'vue-router';
import TopEventComponent from '@/components/TopEventComponent.vue';
import HeaderComponent from '@/components/HeaderComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
</script>

<style scoped>
</style>