import Vue from 'vue'
import App from './App.vue'

import SvgIcon from 'vue-svgicon'
import router from './router'
import './cmd/Directive'
import '@/assets/icons/components'
import store from './store'
import 'element-ui/packages/theme-chalk/src/index.scss'
import ElementUI from 'element-ui'

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
