import { RouteConfig } from 'vue-router'

const routes: Array<RouteConfig> = [
  {
    path: '/list',
    name: 'List',
    redirect: '/basicList',
    meta: {
      title: '列表页',
      icon: 'iconfont ic-ui-merge'
    },
    component: () => import('@/views/Index/Index.vue'),
    children: [
      {
        path: '/basicList',
        name: 'basicList',
        meta: { title: '基础列表', keepAlive: true },
        component: () => import('@/views/BasicList/BasicList.vue')
      },
      {
        path: '/skuList',
        name: 'skuList',
        meta: { title: '商品列表', keepAlive: false },
        component: () => import('@/views/SkuList/SkuList.vue')
      },
      {
        path: '/orderList',
        name: 'orderList',
        meta: { title: '订单列表', keepAlive: false },
        component: () => import('@/views/OrderList/OrderList.vue')
      }
    ]
  }
]

export default routes
