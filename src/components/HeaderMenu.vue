<template>
<div :class="$style.container">
  <main :class="$style.index">
    <div :class="$style.top">

      <div :class="$style.left">
        <img
          :class="$style.logo"
          src="@/assets/image/joongonara.svg"
          @click="logoClicked()"
        />
      </div>

      <div :class="$style.center">
        <div :class="$style.searchBar">
          <img
            :class="$style.searchIcon"
            src="@/assets/image/icon/magnifier.png"
          />
          <input 
            :class="$style.inputBar"
            type="search" 
            placeholder="어떤 상품을 찾으시나요?"
          />
        </div>

        <div
          :class="$style.hotTopic"
          v-if="nowTopics.length"
        >
          <img
            :class="$style.arrow"
            src="@/assets/image/icon/arrow_left.png"
            @click="arrowClicked('left')"
          />
          <img
            :class="$style.arrow"
            src="@/assets/image/icon/arrow_right.png" 
            @click="arrowClicked('right')"
          />
          <span
            :class="$style.topicKeyword"
            v-for="(item,index) in nowTopics" 
            :key="index"
            @click="keywordClicked(item)"
          >
            <span style="font-weight: bold;">
              {{ 5 * (topicPage - 1) + index + 1 }}
            </span>
            .{{ item }}
          </span>
        </div>
      </div>

      <div :class="$style.right">
        <RouterLink
          :class="$style.topMenu"
          v-for="item in topMenus"
          :key="item.text"
          :to="item.router"
        >
          <img 
            :class="$style.topMenuIcon" 
            :src="item.iconLink" 
          />
          <span :class="$style.topMenuText">
            {{ item.text }}
          </span>
        </RouterLink>
      </div>
    </div>

    <div :class="$style.bottom">
      <div :class="$style.category">
        <img 
          :class="$style.categoryIcon"
          src="@/assets/image/icon/hamburger.png" 
        />
        <span :class="$style.categoryText">카테고리</span>
      </div>

      <div :class="$style.bottomMenuList">
        <RouterLink 
          :class="$style.bottomMenu" 
          v-for="item in bottomMenus" 
          :key="item.text"
          :to="item.router"
        > 
          {{ item.text }}
        </RouterLink>
      </div>
    </div>
  </main>
</div>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue';
import router from '@/router';
import type { Menu } from '@/types/type.ts';

const topics:Ref<string[]> = ref([
  "하뉴","리카","레나","케이이치","사토코",
  "미온","시온","히후미","토미타케","사토시",
  "후루데","마에바라","소노자키","히나미자와"
]);

const topMenus:Menu[] = [
  {
    text: "채팅하기",
    iconLink: "src/assets/image/icon/chat.png",
    router: "/chat",
  },
  {
    text: "판매하기",
    iconLink: "src/assets/image/icon/shopping.png",
    router: "/sell",
  },
  {
    text: "마이",
    iconLink: "src/assets/image/icon/person.png",
    router: "/mypage",
  },
];

const bottomMenus:Menu[] = [
  {
    text: "이벤트",
    router: "/event",
  },
  {
    text: "사기조회",
    router: "/sagi",
  },
  {
    text: "시세조회",
    router: "/sise",
  },
  {
    text: "출석체크",
    router: "/dailycheck",
  },
  {
    text: "찜한 상품",
    router: "/favorite",
  },
  {
    text: "내 폰 팔기",
    router: "/sellphone",
  },
];

const nowTopics:Ref<string[]> = ref([]);
const topicPage:Ref<number> = ref(1);
const lastPage:Ref<number> = ref(Math.trunc((topics.value.length - 1) / 5) + 1)

const logoClicked = () => router.push('/');

const keywordClicked = (item:String) => router.push('/search/'+item);

const getTopics = () => {
  nowTopics.value = [];

  let lastTopicLocate = 5 * (topicPage.value - 1) + 4;
  let firstTopicLocate = 5 * (topicPage.value - 1);

  if (topicPage.value == lastPage.value) {
    lastTopicLocate = topics.value.length - 1;
  } 
  for (let i = firstTopicLocate; i < lastTopicLocate + 1; i++) {
    nowTopics.value.push(topics.value[i]);
  }
  console.log(nowTopics.value);
}

const arrowClicked = (key:String) => {
  if (key == 'left') {
    topicPage.value--;
    if (topicPage.value == 0) topicPage.value = lastPage.value;
  } else {
    topicPage.value++;
    if (topicPage.value == lastPage.value + 1) topicPage.value = 1;
  }
  getTopics();
}

getTopics();

</script>

<style lang="scss" module>
.container {
  width: 100%;

  position: fixed;
  top: 60px;
  
  border-bottom: 1px solid #d6d6d6;

  > .index {
    width: 1024px;
    height: 160px;
    max-width: 1024px;

    margin: 0 auto;


    > .top {
      width: 100%;
      height: 96px;

      display: flex;

      > .left {
        margin: auto 0;

        > .logo {
          width: 200px;
          height: 30px;

          cursor: pointer;
        }
      }

      > .center {
        margin: auto 0;

        position: relative;

        > .searchBar {
          width: 460px;
          height: 40px;

          margin-left: 36px;
          margin-right: 28px;

          border-radius: 5px;
          background-color: #f1f1f1;

          > .searchIcon {
            width: 16px;
            height: 16px;

            margin: 12px 20px;
          }

          > .inputBar {
            width: 388px;
            height: 40px;
            
            vertical-align: top;
            
            background-color: transparent;
            border: none;
            outline: none;
          }
        }

        > .hotTopic {
          display: flex;
          font-size: 12px;

          margin-left: 36px;

          position: absolute;
          bottom: -25px;

          > .arrow {
            width: 18px;
            height: 18px;

            margin-right: 6px;

            border: 1px solid #747474;
            opacity: 0.3;
            cursor: pointer;
          }

          > .topicKeyword {
            margin-left: 5px;
            margin-right: 15px;

            cursor: pointer;
          }
        }
      }

      > .right {
        margin: auto 0;

        > .topMenu {
          display: inline-block;

          > .topMenuIcon {
            width: 20px;
            height: 20px;

            margin-right: 4px;
          }

          > .topMenuText {
            font-size: 14px;
            vertical-align: top;

            margin-right: 12px;
          }
        }
      }
    }
    
    > .bottom {
      width: 100%;
      height: 64px;

      display: flex;

      > .category {
        display: inline-block;
        font-size: 14px;

        margin: auto 20px auto 0;
        padding: 10px 14px;

        background-color: #ffacac;
        border-radius: 5px;

        > .categoryIcon {
          width: 20px;
          height: 20px;

          margin: auto 0;
        }

        > .categoryText {
          display: inline-block;
          vertical-align: top;

          margin-top: 2px;
          margin-left: 4px;
        }
      }
      > .bottomMenuList {
        margin: auto 0;

        > .bottomMenu {
          display: inline-block;
          font-size: 16px;

          padding: 12px 16px;

          border-bottom: none;
          transition: border-bottom 3s ease;
        }

        > .bottomMenu:hover {
          border-bottom: 2px solid #000;
        }
      }
    }
  }
}

</style>