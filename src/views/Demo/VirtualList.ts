import { Component, Vue } from 'vue-property-decorator'
import PageWrapper from '@/components/page-wrapper/PageWrapper.vue'

@Component({
  components: { PageWrapper }
})
export default class VirtualList extends Vue {
  sumItemList: any[] = [] // 数据项列表（总的）
  itemList: any[] = [] // 数据项列表（界面展示）
  lazyValue: string = '' // 选中的数据
  rangeNum: number = 8 // 每次下拉加载条数

  $refs: any

  created() {
    for (let i = 1001; i < 2000; i++) {
      this.sumItemList.push({ id: i, name: `数据项${i}` })
    }
  }

  /**
   * 下拉加载（懒加载）
   */
  loadmore(n: number) {
    return () => (this.rangeNum += n)
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

  /**
   * 下拉触发
   */
  visibleChange(flag: boolean) {
    if (flag) {
      this.filterMethod()
    }
  }
}
