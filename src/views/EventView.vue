<template>
  <main :class="$style.index">
    <h1>이벤트</h1>
    <div :class="$style.line"></div>

    <div :class="$style.stateMenu">
      <span>진행중</span>
      <span>종료</span>
      <span>당첨자 발표</span>
    </div>

    <div :class="$style.list">
      <RouterLink
        :class="$style.eventItem"
        v-for="item in eventList"
        :key="item.router"
        :to="item.router"
      >
        <img :class="$style.image" :src="item.imageLink" />
        {{ item.router }}
      </RouterLink>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue'
import type { Menu } from '@/types/UIType'
import data from '@/assets/json/bannerData.json'

const eventList: Ref<Menu[]> = ref(data.eventBanners)
</script>

<style lang="scss" module>
.index {
  max-width: 1024px;
  margin: 0 auto;

  > .list {
    padding: 17px 32px;
    display: grid;
    grid-template-columns: 500px 500px;

    > .eventItem {
      margin-bottom: 40px;
      display: inline-block;

      > .image {
        width: 470px;
        height: 188px;
        object-fit: cover;
      }
    }
  }
}
</style>
