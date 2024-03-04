
<template>
  <TopEvent />
  <HeaderMenu />
  <RouterView :class="$style.routerView" /> <!--그 라우터 주소에 따라 상황에 맞는 view를 출력함-->
  <FooterText />
</template>


<script setup lang="ts">
import { RouterView } from 'vue-router';
import TopEvent from '@/components/TopEvent.vue';
import HeaderMenu from '@/components/HeaderMenu.vue';
import FooterText from '@/components/FooterText.vue';
</script>

<style lang="scss" module>
.routerView {
  padding-top: 220px;
}
</style>