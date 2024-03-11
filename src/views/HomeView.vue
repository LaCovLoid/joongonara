<template>
  <main :class="$style.index">
    <div :class="$style.bannerList">


      <div :class="$style.top">
        <img 
          :class="[$style.arrow, $style.arrowLeft]"  
          src="@/assets/image/icon/arrow_left.png" 
          @click="bannerMove(-1)"
        />
        
        <RouterLink 
          :to="getBannerRouterLink(index-2)" 
          :class="$style.bannerRouter"
          v-for="index in 3"
          :key="index"
        >
          <img 
            :class="$style.eventBanner" 
            :src="getBannerSrc(index-2)" 
          />
        </RouterLink>

        <img 
          :class="[$style.arrow, $style.arrowRight]" 
          src="@/assets/image/icon/arrow_right.png" 
          @click="bannerMove(1)" 
        />
      </div>

      <div :class="$style.bottom">
        <div 
          :class="getImageLocateStyle('banner', index - 1)" 
          v-for="index in (banners.length)" 
          :key="index"
          @click="setImageIndex('banner', index - 1)" 
        >
        </div>
      </div>
    </div>


    <span :class="$style.title">당신을 위한 추천상품!</span>

    <div :class="$style.goodsList">
      <RouterLink  
        v-for="index in 4"
        :key="index"
        :to="goodsData.testGoods[index - 1].router"
      >
        <GoodsBig 
          :propData="goodsData.testGoods[index - 1]"
        />
      </RouterLink>
    </div>

    <span :class="$style.title">세븐일레븐 편의점 픽업!</span>
    <div :class="$style.goodsList">
      <RouterLink  
        v-for="item in convenienceGoods"
        :key="item.router"
        :to="item.router"
      >
        <GoodsSmall 
          :propData="item"
        />
      </RouterLink>
    </div>

    <div :class="$style.bottom">
      <div 
        :class="getImageLocateStyle('convenience', index)" 
        v-for="index in lastConveniencePage" 
        :key="index"
        @click="setImageIndex('convenience', index)" 
      >
      </div>
    </div>

    <div :class="$style.application">
      <img :class="$style.backgroundImage" src="@/assets/image/banner/app_joongo.webp"/>
      <img :class="$style.googlePlay" src="@/assets/image/banner/google_play.webp"/>
      <img :class="$style.appStore" src="@/assets/image/banner/app_store.webp"/>
      <img :class="$style.qrCode" src="@/assets/image/QRcode.webp"/>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue';
import type { Menu,Goods } from '@/types/UIType';
import bannerData from '@/assets/josn/bannerData.json';
import goodsData from '@/assets/josn/goodsData.json';
import GoodsBig from '@/components/GoodsBig.vue';
import GoodsSmall from '@/components/GoodsSmall.vue';

const banners:Ref<Menu[]> = ref(bannerData.eventBanners);
let convenienceGoods:Ref<Goods[]> = ref([]);

let nowBannerIndex:Ref<number> = ref(0);
let nowConveniencePage:Ref<number> = ref(1);
let lastConveniencePage:Ref<number> = ref(Math.ceil(goodsData.testGoods.length / 6));

//배너 이미지의 링크와 router링크를 받아옴
const getBannerSrc = (value: number) => {
  let index:number = limitIndex(nowBannerIndex.value + value);
  return banners.value[index].imageLink;
}
const getBannerRouterLink = (value: number) => {
  let index:number = limitIndex(nowBannerIndex.value + value);
  return banners.value[index].router;
}

//class이름을 반환해줌
const getImageLocateStyle = (name: String, index: number) => {
  switch (name) {
    case 'banner':
      if (index == nowBannerIndex.value) return "imageLocate selected";
      break;
    case 'convenience':
    if (index == nowConveniencePage.value) return "imageLocate selected";
      break;
  }
  return "imageLocate";
}

//현재 이미지의 위치
const setImageIndex = (name: String, index: number) => {
  switch (name) {
    case 'banner':
      nowBannerIndex.value = index;
      break;
    case 'convenience':
      nowConveniencePage.value = index;
      setConvenienceGoods();
      break;
  }
}

const setConvenienceGoods = () => {
  convenienceGoods.value = [];
  let lastPageIndex = (nowConveniencePage.value == lastConveniencePage.value) ? goodsData.testGoods.length % 6 :6;
  if (lastPageIndex == 0) lastPageIndex = 6;
  let startIndex = (nowConveniencePage.value - 1) * 6;

  for (let i = startIndex; i < startIndex + lastPageIndex ; i++) {
    convenienceGoods.value.push(goodsData.testGoods[i]);
  }

}

const bannerMove = (moveIndex: number) => nowBannerIndex.value = limitIndex(nowBannerIndex.value + moveIndex);

const limitIndex = (index: number) => {
  if (index == -1) index = banners.value.length - 1;
  if (index == banners.value.length) index = 0;
  return index;
}

const timeIncrease = () => {
  nowBannerIndex.value = limitIndex(nowBannerIndex.value + 1);
}

setInterval(() =>{timeIncrease()}, 5000);
setConvenienceGoods();
</script>

<style lang="scss" module>
.index {
  width: 1024px;
  margin: 0 auto;

  > .bannerList {
    margin: 20px 0 0 0;

    > .top{
      text-align: center;
      position: relative;

      > .arrow {
        width: 30px;

        position: absolute;
        top: 45%;


        border-radius: 15px;
        cursor: pointer;

        &:hover {
          background-color: #d7d7d7;
        }
      }
      > .arrowLeft {
        left: -20px;
      }
      > .arrowRight {
        right: -20px;
      }
      

      > .bannerRouter{
        > .eventBanner {
          width: 315px;
          height: 315px;

          margin: 0 12px;

          border-radius: 5px;
          object-fit: cover;
        }
      }
    }

    > .bottom {
      text-align: center;
      margin-top: 10px;
    }
  }

  > .title {
    display: block;

    font-size: 22px;
    font-weight: bold;
    color: #212121;

    margin-top: 96px;
    margin-bottom: 40px;
  }
  > .goodsList {
    display: flex;
    justify-content: space-between;
  }
  
  > .bottom {
      text-align: center;
      margin-top: 10px;
  }

  > .application {
    height: 272px;
    position: relative;

    margin-top: 100px;
    margin-bottom: 100px;


    > .backgroundImage {
      width: 1024px;
      position: absolute;
    }
    > .googlePlay {
      height: 43px;
      
      position: absolute;
      top: 150px;
      left: 160px;
    }
    > .appStore {
      height: 43px;

      position: absolute;
      top: 150px;
      left: 300px;
    }
    > .qrCode {
      height: 43px;

      position: absolute;
      top: 150px;
      left: 440px;
    }
  }
}
</style>

<style lang="css">
.imageLocate {
  width: 8px;
  height: 8px;

  display: inline-block;
  margin: 4px;

  border-radius: 4px;
  background-color: #c2c2c2;
  cursor: pointer;
}
.selected {
  width: 24px;

  background-color: #000000;
}

</style>