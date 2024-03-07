<template>
  <main :class="$style.index">
  </main>
</template>

<script setup lang="ts">
import { piniaStore } from '@/store/index';
const store = piniaStore();


/*
이 컴포넌트엔 최근 본 상품 구현
내용물은 스토어 설정하고 최근 3개까지만 저장 (굿즈 정보, 특히 링크와 사진주소)

GoodsInfo 작성해야함
MiniGoodsInfo 작성해야함
WideGoodsInfo 작성해야함

바탕화면에 있는 ad_joongo 가져오기

푸터 작성

가능하다면 홈뷰에 있는 타이머를 앱으로 가져간다음 스토어에서 시간변경
시간변경에 따른 메뉴컴포와 홈뷰의 랭킹&배너 이동하기

*/
</script>

<style lang="scss" module>
  
</style>