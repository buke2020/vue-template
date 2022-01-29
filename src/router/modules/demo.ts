import { RouteConfig } from 'vue-router'

const routes: Array<RouteConfig> = [
  {
    path: '/virtualList',
    name: 'VirtualList',
    component: () => import('@/views/Demo/VirtualList.vue')
  }
]

export default routes
