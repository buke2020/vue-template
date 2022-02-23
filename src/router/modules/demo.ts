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
  },
  {
    path: '/dragable',
    name: 'Dragable',
    component: () => import('@/views/Demo/Dragable.vue')
  }
]

export default routes
