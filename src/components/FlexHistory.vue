<template>
  <main :class="$style.index">
    <div :class="$style.title">최근본상품</div>
    <div :class="$style.history" v-if="goodsList.length">
      <div 
        :class="$style.goods" 
        v-for="(item,index) in goodsList" 
        :key="item"
      >
        <span 
          @click="removeHistory(index)" 
          :class="$style.closeButton"
        >
          X
        </span>

        <RouterLink :to="'/goods/' + item">
          {{ item }}
        </RouterLink>

      </div>
    </div>

    <div :class="$style.nothing" v-else>
      최근 본 상품이 없습니다.
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref,type Ref,computed,watch } from 'vue';
import { piniaStore } from '@/store/index';
import { useRoute } from 'vue-router';

const store = piniaStore();
const route = useRoute();

let history: string[] = store.getHistory;
let goodsList: Ref<string[]> = ref([]);


const checkRoute = computed(() => route.path);
const refreshHistory = () => {
  goodsList.value = [];
  history = store.getHistory;

  let id = String(route.params.id);
  if (id != 'undefined' && id != null) goodsList.value.push(id);

  for (let i = history.length - 1; i >= 0; i--) {
    if (history[i] != "" && history[i] != id) {
      goodsList.value.push(history[i]);
    }
  }

  if (goodsList.value.length == 4) goodsList.value.pop();
}

watch(checkRoute, refreshHistory);

const removeHistory = (value: number) => {
  goodsList.value.splice(value, 1);
  store.removeHistory(goodsList.value.length - value);
}

</script>

<style lang="scss" module>

.index {
  width: 98px;
  height: 300px;

  font-size: 12px;

  padding: 8px;

  background-color: #ffffff;
  border: 1px solid #000000;

  position: fixed;
  top: 250px;
  left: calc(50% + 530px);

  > .title {
    text-align: center;
  }

  > .history {
    > .goods {
      width: 80px;
      height: 80px;

      text-align: center;

      display: block;
      margin-top: 10px;

      position: relative;
      border: 1px solid #000000;

      > .closeButton {
        padding: 1px 5px;
        
        border: 1px solid #000000;

        position: absolute;
        top: 5px;
        right: 10px;
      }
    }
  }

  > .nothing {
    font-size: 10px;
    text-align: center;

    margin-top: 50px
  }
}
</style>