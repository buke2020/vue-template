import { Component, Vue } from 'vue-property-decorator'
import BasicLayout from '@/layouts/BasicLayoutSingle/BasicLayout.vue'
import QueryCondition from '@/components/query-condition/QueryCondition.vue'
import ExampleApi from '@/http/example/ExampleApi'
import ListModel from '@/model/example/ListModel'

@Component({
  components: { BasicLayout, QueryCondition }
})
export default class BasicList extends Vue {
  $refs: any
  applyDate: string = '' // 申请日期
  orderDataList: ListModel[] = [] // 订单列表
  orderTotal: number = 0 // 单据总数
  loading: boolean = true // 数据是否正在加载

  mounted() {
    this.doSearch()
  }
  /**
   * 搜索按钮点击事件
   */
  doSearch() {
    this.loading = true
    ExampleApi.getList(this.applyDate)
      .then((resp) => {
        this.loading = false
        this.orderDataList = resp.data
        this.orderTotal = resp.total
      })
      .catch((error) => {
        this.loading = false
      })
  }

  /**
   * 表格换页事件
   */
  doListLoad() {
    this.doSearch()
  }

  /**
   * 重置按钮事件
   */
  doReset() {
    this.$alert('这是一段内容', '标题名称', {
      confirmButtonText: '确定',
      callback: (action) => {
        this.$message({
          type: 'info',
          message: `action: ${action}`
        })
        this.applyDate = ''
        this.$refs.orderDataList.reset()
      }
    })
  }

  /**
   * 查看详情点击事件
   * @param row
   */
  doOrderDtl(row: ListModel) {
    this.$router.push('/basicDetail')
  }
}
