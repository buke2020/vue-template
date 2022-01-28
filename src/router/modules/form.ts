import { RouteConfig } from 'vue-router'

const routes: Array<RouteConfig> = [
  {
    path: '/form',
    name: 'Form',
    meta: { title: '表单页', icon: 'iconfont ic-ui-project' },
    redirect: '/basicForm',
    component: () => import('@/views/Index/Index.vue'),
    children: [
      {
        path: '/basicForm',
        name: 'basicForm',
        meta: { title: '基础表单', keepAlive: false },
        component: () => import('@/views/BasicForm/BasicForm.vue')
      },
      {
        path: '/complexForm',
        name: 'complexForm',
        meta: { title: '复杂表单', keepAlive: false },
        component: () => import('@/views/ComplexForm/ComplexForm.vue')
      },
      {
        path: '/stepForm',
        name: 'stepForm',
        meta: { title: '分步表单', keepAlive: false },
        component: () => import('@/views/StepForm/StepForm.vue')
      }
    ]
  }
]

export default routes
