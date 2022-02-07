import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import ConstantMgr from '@/mgr/ConstantMgr'
import QueryParam from '@/model/common/QueryParam'
import ExampleApi from '@/http/example/ExampleApi'

@Component({
  components: {},
  filters: {
    empty: (value: string) => {
      return value || '--'
    }
  }
})
export default class SkuSelectDialog extends Vue {
  @Prop({ type: Boolean, default: true }) visible: boolean // 显示对话框
  keyword: string = '' // 查询条件-门店关键字
  skuDataList: any[] = [] // 商品列表信息
  total: number = 0 // 商品列表总数
  selectedList: any[] = [] // 选中的商品数据集合
  onConfirm: (list: any[]) => {}
  $refs: any

  mounted() {
    this.$nextTick(() => {
      this.$refs.list.reset()
    })
  }

  /**
   * 搜索栏查询
   */
  doSearch() {
    this.$refs.list.reset()
  }

  /**
   * 查询商品列表
   */
  doListLoad(param: QueryParam) {
    this.keyword && param.filters.push({ property: 'keyword:%=%', value: this.keyword })
    const loading = this.$loading(ConstantMgr.loadingOption)
    ExampleApi.getSkuList('')
      .then((resp) => {
        loading.close()
        this.skuDataList = resp.data || []
        console.log(resp.data)
        this.total = resp.total || 0
        this.$nextTick(() => {
          this.$refs.list.refreshRowSelected() // 更新table的勾选状态
        })
      })
      .catch((e) => {
        loading.close()
        this.$message.error(e.message)
      })
  }

  /**
   * 获取点击的商品行数据
   */
  getSelectedList(data: any[]) {
    this.selectedList = data
  }

  /**
   * 清空
   */
  doClear() {
    this.selectedList = []
  }

  /**
   * 删除
   */
  doRemove(index: number) {
    this.selectedList.splice(index, 1)
  }

  /**
   * 确定
   */
  doConfirm() {
    if (!this.selectedList.length) {
      this.$message.warning('已选择的商品列表为空，请重试')
    } else {
      this.$message.success('已添加成功～')
      this.$emit('hide')
      this.onConfirm && this.onConfirm(this.selectedList)
    }
  }

  /**
   * 模态框取消
   */
  doCancel() {
    this.$emit('hide')
  }
}
