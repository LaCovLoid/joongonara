<template>
  <div :class="$style.left">
    <div :class="$style.categoryList">
      <RouterLink 
        :class="$style.category" 
        v-for="(item,index) in category" 
        :key="index"
        :to="item.router"
        @mouseenter="setItemList(item.item)"
      >
        <span>{{ item.name }}</span>
      </RouterLink>
    </div>
  </div>
  
  <div :class="$style.right" v-if="itemList.length">
    <RouterLink
      :class="$style.categoryItem"
      v-for="item in itemList"
      :key="item.router"
      :to="item.router"
    >
      {{ item.name }}
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue';
import extendMenuItem from '@/assets/json/menuData.json';

const category: any = extendMenuItem.category;
let itemList: Ref<{name:string, router: string}[]> = ref([]);

const setItemList = (value: {name:string, router: string}[]) => {
  itemList.value = value;
} 

</script>

<style lang="scss" module>
.left {
  width: 250px;
  height: 400px;

  position: fixed;
  top: 210px;
  left: calc(50% - 512px);
  
  background-color: #ffffff;
  border: 1px solid #000000;
  z-index: 4;
  overflow:scroll;
  overflow-x: hidden;


  > .categoryList {
    & :hover {
      background-color: #565656;
    }

    > .category {

      display: block;

      padding: 10px;
    }
  }
}

.right {
  width: 300px;
  height: 400px;

  position: fixed;
  top: 210px;
  left: calc(50% - 262px);
  
  background-color: #ffffff;
  border: 1px solid #000000;
  z-index: 4;
  overflow:scroll;
  overflow-x: hidden;

  > .categoryItem {
    display: block;

    padding: 10px;
  }
}
</style>