<template>
  <main :class="$style.index">
    <img :class="$style.image" :src="goods.imageLink"/>
    <div :class="$style.container">
      <span :class="$style.name">
        {{ goods.name }}
      </span>
      <span :class="$style.price">
        {{ addPriceComma(goods.price) }}원
      </span>
      <span :class="$style.locateAndTime">
        {{ goods.userLocate }}
        &nbsp;|&nbsp;
        {{ calcTimestamp(goods.uploadTime) }}
      </span>
    </div>
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
.index {
  width: 240px;

  vertical-align: top;

  .image {
    width: 240px;
    height: 240px;

    border-radius: 5px;
    
    object-fit: cover;
  }

  .container {
    padding: 8px 16px;

    .name {
      display: block;

      font-size: 16px;
    }

    .price {
      display: block;

      font-size: 18px;
      font-weight: bold;

      margin-top: 12px;
    }

    .locateAndTime {
      display: block;

      font-size: 13px;
      color: #929292;

      margin: 10px 0;
    }
  }
}
</style>