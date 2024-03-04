<template>
  <main :class="$style.index">
    <div :class="$style.imageList">

      <div :class="$style.top">
        <img :class="[$style.arrow, $style.arrowLeft]" src="@/assets/image/icon/arrow_left.png" @click="imageMove(-1)" />
        
        <RouterLink 
          :to="getImageRouterLink(index-2)" 
          :class="$style.imageRouter"
          v-for="index in 3"
          :key="index"
        >
          <img :class="$style.eventImage" :src="getImageSrc(index-2)" />
        </RouterLink>

        <img :class="[$style.arrow, $style.arrowRight]" src="@/assets/image/icon/arrow_right.png" @click="imageMove(1)" />
      </div>

      <div :class="$style.bottom">
        <div :class="getImageLocateStyle(index - 1)" v-for="index in (lastImageIndex + 1)" :key="index">
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue';
import router from '@/router';
import type { Menu } from '@/types/navigation';
import { compileStyle } from 'vue/compiler-sfc';
import data from '@/assets/josn/homeViewData.json';

const images:Ref<Menu[]> = ref(data.eventImages);
let lastImageIndex:Ref<number> = ref(images.value.length - 1);
let nowImageIndex:Ref<number> = ref(0);

  
const getImageSrc = (imageIndex: number) => {
  let index:number = limitIndex(nowImageIndex.value + imageIndex);
  return images.value[index].imageLink;
}
const getImageRouterLink = (imageIndex: number) => {
  let index:number = limitIndex(nowImageIndex.value + imageIndex);
  return images.value[index].router;
}

const getImageLocateStyle = (index: number) => {
  if (index == nowImageIndex.value) return "imageLocate selected";
  return "imageLocate";
}

const imageMove = (moveIndex: number) => {
  nowImageIndex.value = limitIndex(nowImageIndex.value + moveIndex);
}

const limitIndex = (index: number) => {
  if (index == -1) index = lastImageIndex.value;
  if (index == lastImageIndex.value + 1) index = 0;
  return index;
}

const timeIncrease = () => {
  nowImageIndex.value = limitIndex(nowImageIndex.value + 1);
}

setInterval(() =>{timeIncrease()}, 5000);

</script>

<style lang="scss" module>
.index {
  width: 1024px;
  margin: 0 auto;

  > .imageList {
    margin: 20px 0 96px 0;

    > .top{
      text-align: center;
      position: relative;

      > .arrow {
        width: 30px;

        position: absolute;
        top: 45%;


        border-radius: 15px;
        background-color: #d7d7d7;

        &:hover {
          background-color: #adadad;
        }
      }
      > .arrowLeft {
        left: -20px;
      }
      > .arrowRight {
        right: -20px;
      }
      

      > .imageRouter{
        > .eventImage {
          width: 315px;
          height: 315px;

          margin: 0 12px;

          border-radius: 5px;
        }
      }
    }
    > .bottom {
      text-align: center;

      margin-top: 10px;
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
}
.selected {
  width: 24px;

  background-color: #000000;
}

</style>