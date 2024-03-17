import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import GoodsView from '@/views/GoodsView.vue'
import EventView from '@/views/EventView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/goods/:id',
      name: 'goods',
      component: GoodsView,
    },
    {
      path: '/event',
      name: 'event',
      component: EventView
    }
  ]
})

export default router
