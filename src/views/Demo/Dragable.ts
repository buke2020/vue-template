import { Component, Vue } from 'vue-property-decorator'
import Sortable from 'sortablejs'

@Component({
  components: {}
})
export default class Dragable extends Vue {
  itemList: any[] = [] // 数据项列表
  sortList: any[] = [] // 排序数组
  sortTable: any // 排序table
  $refs: any

  created() {
    for (let i = 1001; i < 1016; i++) {
      this.itemList.push({ code: i, name: `数据项${i}` })
    }
  }

  mounted() {
    this.rowDrop() // 开启拖拽
  }

  beforeDestroy() {
    this.sortTable.destroy() // 销毁排序table
  }

  /**
   * 拖拽事件
   */
  rowDrop() {
    const tbody = document.querySelector('.el-table__body-wrapper tbody')
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this
    self.sortTable = Sortable.create(tbody, {
      disabled: false,
      animation: 150, // 拖拽延时
      onEnd(newVal: any, oldVal: any) {
        const currRow = self.itemList.splice(oldVal, 1)[0]
        self.itemList.splice(newVal, 0, currRow)
        const temp: any = self.sortList.splice(newVal.oldIndex, 1)[0]
        self.sortList.splice(newVal.newIndex, 0, temp)
      }
    }) // 创建排序table
  }
}
