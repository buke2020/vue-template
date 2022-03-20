import ExampleApi from '@/http/example/ExampleApi'
import { Component, Vue } from 'vue-property-decorator'
import PermissionTree from './cmp/PermissionTree.vue'

@Component({
  components: { PermissionTree }
})
export default class PermissionList extends Vue {
  treeList: any[] = [] // 权限列表信息
  defaultProps: any = {
    children: 'lowers',
    label: 'path'
  } // 树形结构
  $refs: any

  /**
   * 获取所有权限树
   */
  getTreeList() {
    ExampleApi.getTree('')
      .then((resp) => {
        this.treeList = resp.data || []
      })
      .catch((error) => {
        this.$message.error(error.msg)
      })
  }

  /**
   * 节点-更新
   */
  doTreeChange() {
    //
  }
}
