import Vue from 'vue'

// vue自定义指令 v-permission
const loadmore = {
  inserted(el, binding, vnode) {
    const { value } = binding
    console.log(el, binding, vnode, value)
    const dom = el.querySelector('.el-select-dropdown .el-select-dropdown__wrap')
    dom.addEventListener('scroll', () => {
      const space = dom.scrollHeight - dom.scrollTop < dom.clientHeight
      console.log(dom.scrollHeight, dom.scrollTop, dom.clientHeight, 10001, binding.value())
    })
    binding.value()
  }
}

Vue.directive('loadmore', loadmore)
