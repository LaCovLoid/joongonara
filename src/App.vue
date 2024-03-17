<template>
  <TopEvent />
  <HeaderMenu />
  <FlexHistory />
  <RouterView :class="$style.routerView" />
  <FooterComponent />
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'
import { RouterView, useRoute } from 'vue-router'

import TopEvent from '@/components/TopEvent.vue'
import HeaderMenu from '@/components/HeaderMenu.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import FlexHistory from '@/components/FlexHistory.vue'

const route = useRoute()

const checkRoute = computed(() => route.path)

const scrollToTop = () => window.scrollTo(0, 0)

onMounted(() => {
  watch(checkRoute, scrollToTop)
})
</script>

<style lang="scss" module>
.routerView {
  padding-top: 220px;
}
</style>
