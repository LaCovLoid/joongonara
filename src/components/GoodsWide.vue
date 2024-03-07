<template>
  <main>
    {{ goods.name }}
    {{ addPriceComma(goods.price) }}원
    {{ calcTimestamp(goods.uploadTime) }}
  </main>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { addPriceComma,calcTimestamp } from '@/api/goodsAPI';
import type { Goods } from '@/types/UIType';

const propData = defineProps(['propData']);
const goods:Ref<Goods> = ref(propData.propData);



</script>

<style lang="scss" module>
</style>