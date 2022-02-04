import { RouteConfig } from 'vue-router'

const routes: Array<RouteConfig> = [
  {
    path: '/lazyList',
    name: 'LazyList',
    component: () => import('@/views/Demo/LazyList.vue')
  },
  {
    path: '/virtualList',
    name: 'VirtualList',
    component: () => import('@/views/Demo/VirtualList.vue')
  },
  {
    path: '/chart',
    name: 'Chart',
    component: () => import('@/views/Demo/Chart.vue')
  }
]

export default routes
