import Vue from 'vue'

// vue自定义指令
const loadmore = {
  inserted(el, binding, vnode) {
    const dom = el.querySelector('.el-select-dropdown .el-select-dropdown__wrap')
    dom.addEventListener('scroll', () => {
      const condition = dom.scrollHeight - dom.scrollTop <= dom.clientHeight
      if (condition) {
        binding.value()
      }
    })
  }
}

Vue.directive('loadmore', loadmore)
