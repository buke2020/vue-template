import { Component, Vue } from 'vue-property-decorator'
import PageWrapper from '@/components/page-wrapper/PageWrapper.vue'

@Component({
  components: { PageWrapper }
})
export default class VirtualList extends Vue {
  sumItemList: any[] = [] // 数据项列表（总的）
  itemList: any[] = [] // 数据项列表（界面展示）
  virtualValue: string = '' // 选中的数据
  scrollbarDom: any // 滚动条dom
  itemDom: any // 数据项dom
  $refs: any

  created() {
    for (let i = 1001; i < 2000; i++) {
      this.sumItemList.push({ id: i, name: `数据项${i}` })
    }
  }

  mounted() {
    this.init()
  }

  /**
   * 初始化
   */
  init() {
    this.itemList = this.sumItemList.slice(0, 8) // 一开始默认8条数据
    const dom = document.querySelector('.el-select-dropdown .el-select-dropdown__wrap') as any
    const boxDom = document.querySelector('.el-select-dropdown__wrap') as any
    boxDom.style.display = 'flex'
    boxDom.style.flexDirection = 'row'

    this.itemDom = dom.querySelector('.el-select-dropdown__wrap .el-select-dropdown__list')
    this.addScrollDiv(boxDom) // 添加一个滚动div

    boxDom.addEventListener('scroll', () => {
      this.scrollbarDom.style.height = (this.sumItemList.length + 1) * 34 + 'px'
      this.itemDom.style.paddingTop = dom.scrollTop + 'px'
      const start = Math.floor(dom.scrollTop / 34)
      this.itemList = this.sumItemList.slice(start, start + 7)
    })
  }

  /**
   * 添加一个div
   */
  addScrollDiv(dom: any) {
    this.scrollbarDom = document.createElement('div')
    this.scrollbarDom.style.width = 0
    dom.insertBefore(this.scrollbarDom, this.itemDom)
  }

  /**
   * 查询匹配
   */
  filterMethod(val: string = '') {
    if (val) {
      const filterList = this.sumItemList.filter((item) => {
        return item.name.toLowerCase().includes(val.toLowerCase())
      })
      this.itemList = filterList
    } else {
      this.itemList = this.sumItemList
    }
  }
}
