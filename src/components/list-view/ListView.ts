import { Component, Inject, Prop, Vue, Watch } from 'vue-property-decorator'
import CommonUtil from '@/utils/CommonUtil'
import ArrayUtil from '@/utils/ArrayUtil'

// 筛选参数
class FilterParam {
  // 查询条件运算,格式为“field:<操作符>”
  property: Nullable<string> = null
  // 查询参数
  value: any
}

// 排序参数
class SortParam {
  // 排序字段
  property: Nullable<string> = null
  // 排序方式，默认倒叙
  direction: Nullable<string> = null
}

// 查询参数
class QueryParam {
  // 开始位置
  start: number = 0
  // 页面大小
  limit: number = 0
  //
  filters: FilterParam[] = []
  //
  sorters: SortParam[] = []
  // 扩展信息
  fetchParts: string[] = []
}

@Component({
  name: 'ListView'
})
export default class ListView extends Vue {
  @Prop({ type: Boolean, default: true }) selectable: boolean // 是否显示勾选框
  @Prop({ type: Boolean, default: true }) pageable: boolean // 是否显示分页
  @Prop({ type: Boolean, default: false }) pageBackTop: boolean // 翻页后，返回顶部
  @Prop({ type: Boolean, default: false }) stripe: boolean // 是否斑马纹
  @Prop({ type: Boolean, default: true }) showHeader: boolean // 是否显示表头
  @Prop({ type: Number, default: 0 }) total: number // 选项总数
  @Prop({ type: Array, default: [] }) data: any[]
  @Prop() emptyText: string
  @Prop() height: number
  @Prop() maxHeight: number | string
  @Prop() defaultSort: any // 默认排序
  @Prop() rowKey: any // 行id 配合reserve-selection使用
  @Prop({ type: Boolean, default: true }) reserveSelection: boolean // 跨页选中
  @Prop({ type: Boolean, default: false }) smallPage: boolean
  @Prop({ type: Boolean, default: false }) loading: boolean
  @Prop({ type: Boolean, default: false }) highlightCurrentRow: boolean
  @Prop({ type: String, default: '暂无数据' }) emptyStr: string // 空数据提示

  @Prop({
    type: Function,
    default: (row: any, index: number) => {
      return true
    }
  })
  checkSelectable: () => boolean // checkbox是否可选
  @Prop({ type: Array, default: () => [] }) selectedList: any[] // 已选择的数据集合
  @Prop({ type: Boolean, default: true }) clearable: boolean // 是否清除已勾选

  @Inject('basicLayout')
  basicLayout: any
  internalPage: number = 1
  internalSelected: any[] = [] // 选中的对象数组
  internalDefaultSort: any = {}
  queryParam: QueryParam = new QueryParam()
  $refs: any

  jumpPageIndex: Nullable<number> = null //输入跳转的页数

  @Watch('selectedList', { immediate: true })
  selectedListChanged() {
    this.internalSelected = CommonUtil.copy(this.selectedList)
    this.refreshRowSelected() // 更新table行的勾选状态
  }

  /**
   * 更新table行的勾选状态
   */
  refreshRowSelected() {
    if (!this.$refs.table) {
      return
    }
    const list = this.internalSelected.map((item) => item.id) // 行id数据集合
    if (list.length) {
      this.data.forEach((row) => {
        if (list.includes(row.id)) {
          this.$refs.table.toggleRowSelection(row, true) // 默认勾选
        } else {
          this.$refs.table.toggleRowSelection(row, false) // 取消勾选
        }
      })
    } else {
      this.$refs.table.clearSelection() // 勾选状态-重置为空
    }
  }

  created() {
    if (this.defaultSort) {
      this.internalDefaultSort = {
        prop: this.defaultSort.property,
        order: this.defaultSort.direction === 'ASC' ? 'ascending' : 'descending'
      }
      this.queryParam.sorters = [this.defaultSort]
    }
    this.queryParam.limit = 10
    this.queryParam.start = (this.internalPage - 1) * this.queryParam.limit!
  }

  doSelectionChange(arr: any) {
    const internalSelected = CommonUtil.copy(this.internalSelected)
    ArrayUtil.remove(internalSelected, (item: any) => this.data.find((i: any) => i.id === item.id)) // 清除当前列表的数据
    ArrayUtil.remove(internalSelected, (item: any) => arr.find((i: any) => i.id === item.id)) // 清除当前列表的数据
    this.internalSelected = [...internalSelected, ...arr]
    this.$emit('selected', this.internalSelected)
  }

  /**
   * 表格排序
   */
  doSortChange({ column, prop, order }: any) {
    order === 'ascending' ? (order = 'asc') : (order = 'desc')
    const sorts = []
    column && prop && order && sorts.push({ property: prop, direction: order })
    this.internalPage = 1
    this.queryParam.start = (this.internalPage - 1) * this.queryParam.limit!
    this.queryParam.sorters = sorts
    this.$emit('load', CommonUtil.copy(this.queryParam))
  }

  /**
   * 取消选中
   */
  clearSelection() {
    this.$refs.table.clearSelection()
    this.internalSelected = []
  }

  /**
   * 取消多级表格的勾选状态
   */
  doToggleSelection(rows: any, selected: boolean = false) {
    if (rows) {
      rows.forEach((row: any) => {
        this.$refs.table.toggleRowSelection(row, selected)
      })
    } else {
      this.$refs.table.clearSelection()
    }
  }

  /**
   * 行点击事件
   */
  doRowClick(row: any, event: any, column: any) {
    this.$emit('RowClick', row, event, column)
  }

  /**
   * 分页回调
   */
  doPageChange(page: number) {
    // this.$refs.table.clearSelection()
    this.internalPage = page
    this.queryParam.start = (this.internalPage - 1) * this.queryParam.limit
    this.$emit('load', CommonUtil.copy(this.queryParam))
    if (this.pageBackTop) {
      this.$nextTick(() => {
        if (this.pageBackTop) {
          this.basicLayout.$refs.main.scrollTop = 0
        }
      })
    }
  }

  jumpPage() {
    try {
      if (this.jumpPageIndex) {
        let page: number = Number(this.jumpPageIndex)
        if (isNaN(page)) {
          page = 1
        }
        const str = this.total / this.queryParam.limit + (this.total % this.queryParam.limit === 0 ? 0 : 1)
        const totalPage = parseInt(str + '')
        if (page <= 1) {
          page = 1
        }
        if (page >= totalPage) {
          page = totalPage
        }
        this.doPageChange(page)
        this.jumpPageIndex = null
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
    }
  }

  /**
   * 每页多少条change
   */
  doSizeChange(pageSize: number) {
    this.queryParam.limit = pageSize
    this.reset()
    this.$emit('change', pageSize) // 添加更改limit值的change事件
  }

  load() {
    this.$emit('load', CommonUtil.copy(this.queryParam))
  }

  search() {
    this.clearable && this.clearSelection() // 解决编辑已勾选数据后，internalSelected不改变的问题
    this.$emit('load', CommonUtil.copy(this.queryParam))
  }

  reset() {
    this.clearable && this.clearSelection() // 解决编辑已勾选数据后，internalSelected不改变的问题
    this.internalPage = 1
    this.queryParam.start = (this.internalPage - 1) * this.queryParam.limit
    this.$emit('load', CommonUtil.copy(this.queryParam))
  }
}
