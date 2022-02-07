import Vue from 'vue'
import App from './App.vue'

import SvgIcon from 'vue-svgicon'
import router from './router'
import './cmd/Directive'
import '@/assets/icons/components'
import store from './store'
import 'element-ui/packages/theme-chalk/src/index.scss'
import ElementUI from 'element-ui'
import PageWrapper from './components/page-wrapper/PageWrapper.vue'
import ListView from './components/list-view/ListView.vue'
import DetailCard from '@/components/detail-card/DetailCard.vue'
Vue.component('PageWrapper', PageWrapper)
Vue.component('ListView', ListView)
Vue.component('DetailCard', DetailCard)

import '@/assets/iconfont/iconfont.css'

process.env.NODE_ENV === 'development' && require('./mock/mock')
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.use(SvgIcon, {
  tagName: 'svg-icon',
  defaultWidth: '1em',
  defaultHeight: '1em'
})

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
