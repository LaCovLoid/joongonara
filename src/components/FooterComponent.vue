<template>
  <div :class="$style.line"></div>
  <main :class="$style.index">
    <div :class="$style.left">
      <img :class="$style.logo" src="@/assets/image/joongonara.svg" />
      <span
        :class="$style.companyItem"
        v-for="(item,index) in companyItem" 
        :key="index"
      >
        {{ item }}
      </span>
    </div>

    <div :class="$style.right">
      <div :class="$style.list">
        <span :class="$style.subtitle">Social</span>
        <a 
          :class="$style.item" 
          v-for="(item,index) in socialItem" 
          :key="index"
          :href="item.router"
        >
          {{ item.text }}
        </a>
      </div>
      <div :class="$style.list">
        <span :class="$style.subtitle">Information</span>
        <a 
          :class="$style.item" 
          v-for="(item,index) in informationItem" 
          :key="index"
          :href="item.router"
        >
          {{ item.text }}
        </a>
      </div>
      <div :class="$style.list">
        <span :class="$style.subtitle">Contact</span>
        <a 
          :class="$style.item" 
          v-for="(item,index) in contactItem" 
          :key="index"
          :href="item.router"
        >
          {{ item.text }}
        </a>
      </div>
    </div>

    <div :class="$style.bottom">
      <span :class="$style.warning">
        “중고나라” 상점의 판매상품을 제외한 모든 상품들에 대하여, 
        (주)중고나라는 통신판매중개자로서 거래 당사자가 아니며 
        판매 회원과 구매 회원 간의 상품거래 정보 및 거래에 관여하지 않고, 
        어떠한 의무와 책임도 부담하지 않습니다.
      </span>

      <div :class="$style.category">
        <span :class="$style.categoryButton" @click="changeVisibleCategory">
          {{ categoryButtonText }}
        </span>
        <div :class="$style.categoryList" v-if="visibleCategory">
          <RouterLink 
          :class="$style.categoryItem" 
          v-for="(item) in category" 
          :key="item.router"
          :to="item.router"
          >
            {{ item.name }}
          </RouterLink>
        </div>
      </div>
    </div>

    <div :class="$style.line"></div>
    <div :class="$style.end">
      <span :class="$style.copyright">
        Copyright © 2024 (주)중고나라  All Rights Reserved
      </span>
      <span :class="$style.scrollToTop" @click="scrollToTop">
        Scroll to top
      </span>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue';
import type { Menu } from '@/types/UIType';
import data from '@/assets/json/menuData.json';

const category: Ref<{name:string, router:string}[]> = ref(data.category);
const companyItem: Ref<String[]> = ref(data.companyItem);
const contactItem: Ref<Menu[]> = ref(data.contactItem);
const informationItem: Ref<Menu[]> = ref(data.informationItem);
const socialItem: Ref<Menu[]> = ref(data.socialItem);

let visibleCategory: Ref<boolean> = ref(false);
let categoryButtonText: Ref<String> = ref("카테고리 리스트 ▽");

//플렉스히스토리 완성하기
//푸터 완성하기
//상세페이지들 따라하기
//굿즈상세페이지 만들기?? 해야하나

const changeVisibleCategory = () => {
  visibleCategory.value = !visibleCategory.value;
  categoryButtonText.value = visibleCategory.value ? "카테고리 리스트 △" : "카테고리 리스트 ▽";
}
const scrollToTop = () => window.scrollTo(0,0);

</script>

<style lang="scss" module>
.line {
  border-top: 1px solid #cbcbcb;
}
.index {
  width: 960px;
  margin: 50px auto 0 auto;

  font-size: 13px;
  color: #5a5a5a;

  > .left {
    width: 290px;
    display: inline-block;
    margin-right: 30px;
    margin-bottom: 36px;
    
    > .logo {
      width: 200px;
      height: 30px;

      margin-bottom: 28px;
    }

    > .companyItem {
      display: block;

      margin-top: 7px;
    }
  }

  > .right {
    display: inline-block;
    vertical-align: top;

    margin-bottom: 36px;

    > .list {
      display: inline-block;
      vertical-align: top;

      margin-right: 24px;

      > .subtitle {
        font-size: 16px;
        font-weight: bold;
      }

      > .item {
        width: 150px;

        display: block;
        margin-top: 14px;
      }
    }
  }

  > .bottom {
    font-size: 12px;

    > .warning {
      width: 296px;
      height: 286px;

      display: inline-block;
    }

    > .category {
      width: 296px;
      height: 284px;

      display: block;

      float: right;

      > .categoryButton {
        cursor: pointer;
      }

      > .categoryList {
        > .categoryItem {
          width: 74px;
          
          display: inline-block;
          vertical-align: top;

          margin: 5px 0;
        }
      }
    }
  }
  
  > .end {
    font-size: 14px;
    border-bottom: 5px solid #000000;

    > .copyright {
      display: inline-block;
      padding: 15px;
    }

    > .scrollToTop {
      padding: 15px;

      cursor: pointer;
      float: right;
    }
  }
}
</style>