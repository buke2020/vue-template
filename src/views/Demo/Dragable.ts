import { Component, Vue } from 'vue-property-decorator'
import Sortable from 'sortablejs'

@Component({
  components: {}
})
export default class Dragable extends Vue {
  rowList: any[] = [] // 行数据集合
  rowSortList: any[] = [] // 排序后的行数据集合
  rowTable: any // 行排序table

  columnList: any[] = [] // 列数据集合
  columnSortList: any[] = [] // 排序后的列数据集合
  columnTable: any // 列排序table
  $refs: any

  created() {
    for (let i = 1001; i <= 1024; i++) {
      this.rowList.push({ code: i, name: `数据项${i}` })
      this.columnList.push({ id: i, code: `代码${i}`, name: `数据项${i}` })
    }
    this.rowSortList = [...this.rowList]
    this.columnSortList = [...this.columnList]
  }

  mounted() {
    // this.rowDrop() // 开启行拖拽
    this.columnDrop() // 开启列拖拽
  }

  beforeDestroy() {
    this.rowTable.destroy() // 销毁行排序table
    this.columnTable.destroy() // 销毁列排序table
  }

  /**
   * 行拖拽事件
   */
  rowDrop() {
    const tbody = document.querySelector('.el-table__body-wrapper tbody')
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this
    this.rowTable = Sortable.create(tbody, {
      disabled: false,
      animation: 150, // 拖拽延时
      onEnd(newVal: any, oldVal: any) {
        const curRow = self.rowSortList.splice(newVal.oldIndex, 1)[0]
        self.rowSortList.splice(newVal.newIndex, 0, curRow)
      }
    }) // 创建行排序table
  }

  /**
   * 列拖拽事件
   */
  columnDrop() {
    const tbody = document.getElementById('column')
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this
    self.columnTable = Sortable.create(tbody, {
      animation: 150, // 拖拽延时
      onEnd(val: any) {
        const curColumn = self.columnSortList.splice(val.oldIndex, 1)[0]
        self.columnSortList.splice(val.newIndex, 0, curColumn)
      }
    }) // 创建列排序table
  }
}
