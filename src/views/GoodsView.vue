<template>
  <main :class="$style.index" v-if="goods">
    <div :class="$style.container">

      <img :class="$style.mainImage" :src="goods.imageLink">

      {{ id }}

      <div :class="$style.information">
        <span :class="[$style.infoText,$style.category]">
          {{ goods.category }}
        </span>
        <span :class="[$style.infoText,$style.name]">
          {{ goods.name }}
        </span>
        <span :class="[$style.infoText,$style.price]">
          {{ addPriceComma(goods.price) }}원
        </span>
        <span :class="[$style.infoText,$style.uploadTime]">
          {{ calcTimestamp(goods.uploadTime) }}
        </span>

        <div :class="$style.box">
          <div :class="$style.boxItem">
            <span :class="$style.top">제품상태</span>
            <span :class="$style.bottom">새상품</span>
          </div>

          <div :class="$style.line" ></div>

          <div :class="$style.boxItem">
            <span :class="$style.top">거래방식</span>
            <span :class="$style.bottom">직거래</span>
          </div>

          <div :class="$style.line" ></div>
          
          <div :class="$style.boxItem">
            <span :class="$style.top">배송비</span>
            <span :class="$style.bottom">별도</span>
          </div>

          <div :class="$style.line" ></div>

          <div :class="$style.boxItem">
            <span :class="$style.top">안전거래</span>
            <span :class="$style.bottom">미사용</span>
          </div>
        </div>
        
        <div :class="$style.cardLeft">
          <li>결제혜택</li>
        </div>
        <div :class="$style.cardRight">
          <span :class="$style.cardText">KB국민카드 결제 시 즉시할인</span>
          <span :class="$style.cardText">하나카드 결제 시 즉시할인</span>
          <span :class="$style.cardText">중고나라 페이 첫 결제 혜택</span>
          <span :class="$style.cardText">CU알뜰택배 택배비 500원</span>
        </div>
        <div></div>
        <div :class="$style.cardLeft">
          <li>무이자혜택</li>
        </div>
        <div :class="$style.cardRight">
          <span :class="$style.cardText">1만원 이상 무이자 할부</span>
        </div>
        
        <div :class="$style.buttons">
          <img :class="$style.heart" src="@/assets/image/icon/heart_empty.png" />
          <span :class="$style.chatButton">채팅하기</span>
          <span :class="$style.dealButton">안전거래</span>
        </div>
      </div>

    </div>
  </main>

  <main v-else>
    <span>물건의 정보를 읽어오지 못하였습니다. </span>
  </main>
</template>

<script setup lang="ts">
import { ref, type Ref, onMounted, computed, watch } from 'vue';
import { useRoute } from 'vue-router';

import { addPriceComma, calcTimestamp } from '@/api/goodsAPI';
import { type Goods } from '@/types/UIType';
import data from '@/assets/josn/goodsData.json';
import { piniaStore } from '@/store';

const goods: Ref<Goods> = ref(data.testGoods[1]);
const store = piniaStore();
const route = useRoute();

let id: Ref<number> = ref(isNaN(Number(route.params.id)) ? -1 : Number(route.params.id));

onMounted(()=>{
  refresh();
});

const checkRoute = computed(() => route.path);
const refresh = () => {
  id.value = isNaN(Number(route.params.id)) ? -1 : Number(route.params.id);
  store.addHistory(String(id.value));
  console.log("test id = " + id.value);
}

watch(checkRoute, refresh);

</script>

<style lang="scss" module>
.index {
  width: 100%;
  
  > .container {
    width: 1024px;
    margin: 072px auto 52px auto;

    display: flex;
    justify-content: space-between;

    > .mainImage {
      width: 476px;
      height: 476px;
      
      border-radius: 15px;
      object-fit: cover;
    }

    > .information {
      width: 476px;
      vertical-align: top;
      padding: 5px;

      > .infoText {
        display: block;
      }

      > .category {
        font-size: 14px;
      }

      > .name {
        font-size: 24px;
        font-weight: bold;
      }

      > .price {
        font-size: 32px;
        font-weight: bold;
      }

      > .uploadTime {
        font-size: 12px;
        color: #9e9e9e;

        margin: 10px 0;
      }


      > .box {
        border: 1px solid #d4d4d4;
        display: flex;
        justify-content: space-around;

        span {
          display: block;
        }

        > .line {
          width: 1px;
          height: 25px;

          border: 1px solid #d4d4d4;

          margin-top: 30px;
        }

        > .boxItem {
          width: 25%;

          text-align: center;
          padding: 24px 0;

          > .top {
            font-size: 12px;
            color: #8b8b8b;
          }
          > .bottom {
            font-size: 14px;
            font-weight: bold;

            margin-top: 10px;
          }
        }
      }


      > .cardLeft {
        width: 25%;

        font-size: 12px;
        vertical-align: top;

        display: inline-block;
        margin-top: 20px;
      }

      > .cardRight {
        display: inline-block;
        margin-top: 20px;

        > .cardText {
          font-size: 12px;
          display: block;
        }
      }

      > .buttons {
        margin-top: 40px;

        .heart {
          width: 24px;
          height: 24px;

          vertical-align: middle;
          margin-right: 15px;
        }

        .chatButton {
          padding: 12px 65px;

          border: 1px solid #000000;
          border-radius: 5px;

          margin-right: 15px;
        }
        .dealButton {
          color: #ffffff;
          padding: 12px 65px;

          background-color: #000000;
          border-radius: 5px;
        }
      }
    }
  }
}
</style>