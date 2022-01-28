import { RouteConfig } from 'vue-router'

const routes: Array<RouteConfig> = [
  {
    path: '/detail',
    name: 'Detail',
    meta: { title: '详情页', icon: 'iconfont ic-ui-location' },
    redirect: '/basicDetail',
    component: () => import('@/views/Index/Index.vue'),
    children: [
      {
        path: '/basicDetail',
        name: 'basicDetail',
        meta: { title: '基础详情', keepAlive: false },
        component: () => import('@/views/BasicDetail/BasicDetail.vue')
      },
      {
        path: '/complexDetail',
        name: 'complexDetail',
        meta: { title: '复杂详情', keepAlive: false },
        component: () => import('@/views/ComplexDetail/ComplexDetail.vue')
      }
    ]
  }
]

export default routes
