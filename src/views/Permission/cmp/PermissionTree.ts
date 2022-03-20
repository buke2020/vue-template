import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { debounce } from 'ts-debounce'

@Component({
  components: {},
  filters: {
    autoPath: (value: string) => {
      if (value && value.length) {
        const list = value.split('.')
        return list[list.length - 1]
      }
      return '--'
    }
  }
})
export default class PermissionTree extends Vue {
  @Prop({ type: Array, default: [] }) tree: any[] // 权限子树列表信息
  debounceLevel1Change = debounce(this.doLevel1Change, 500, { isImmediate: false }) // 防抖（一级菜单勾选）
  debounceLevel2Change = debounce(this.doLevel2Change, 500, { isImmediate: false }) // 防抖（二级菜单勾选）
  debounceLevel3Change = debounce(this.doLevel3Change, 500, { isImmediate: false }) // 防抖（三级菜单勾选）

  treeList: any[] = [] // 树形结构

  @Watch('tree', { immediate: true })
  treeChanged() {
    this.treeList = this.tree
  }

  /**
   * 一级菜单-勾选状态更新
   */
  doLevel1Change(level1Selected: boolean, index1: number, path1: string) {
    // 一级菜单-勾选状态处理
    this.treeList[index1].checked = level1Selected
    this.treeList[index1].indeterminate = false
    if (this.treeList[index1].lowers && this.treeList[index1].lowers.length) {
      // 二级菜单-勾选状态处理
      this.treeList[index1].lowers.forEach((level2: any) => {
        level2.checked = level1Selected
        level2.indeterminate = false
        // 三级菜单-勾选状态处理
        if (level2.lowers && level2.lowers.length) {
          level2.lowers.forEach((level3: any) => {
            level3.checked = level1Selected
          })
        }
      })
    }
    this.$emit('change', path1, level1Selected)
  }

  /**
   * 二级菜单-勾选状态更新
   */
  doLevel2Change(level2Selected: boolean, index1: number, index2: number, path2: string) {
    // 二级菜单-勾选状态处理
    this.treeList[index1].lowers[index2].checked = level2Selected
    this.treeList[index1].lowers[index2].indeterminate = false
    // 三级菜单-勾选状态处理
    if (this.treeList[index1].lowers[index2].lowers && this.treeList[index1].lowers[index2].lowers.length) {
      this.treeList[index1].lowers[index2].lowers.forEach((level3: any) => {
        level3.checked = level2Selected
      })
    }
    // 一级菜单-勾选状态处理
    const level2SumCount: number = this.treeList[index1].lowers.length // 二级菜单个数（总的）
    let level2SelectedCount: number = 0 // 二级菜单个数（已勾选）
    this.treeList[index1].lowers.forEach((level2: any) => {
      level2SelectedCount += level2.checked ? 1 : 0
    })
    this.treeList[index1].checked = level2SelectedCount === level2SumCount
    this.treeList[index1].indeterminate = level2SelectedCount > 0 && level2SelectedCount < level2SumCount
    this.$emit('change', path2, level2Selected)
  }

  /**
   * 三级菜单-勾选状态更新
   */
  doLevel3Change(level3Selected: boolean, path3: string) {
    this.treeList.forEach((level1: any) => {
      if (level1.lowers && level1.lowers.length) {
        let level2SelectedCount: number = 0 // 二级菜单个数（已勾选）
        level1.lowers.forEach((level2: any) => {
          if (level2.lowers && level2.lowers.length) {
            let level3SelectedCount: number = 0 // 三级菜单个数（已勾选）
            level2.lowers.forEach((level3: any) => {
              level3SelectedCount += level3.checked ? 1 : 0
            })
            // 二级菜单-勾选状态处理
            level2.checked = level3SelectedCount === level2.lowers.length
            level2.indeterminate = level3SelectedCount > 0 && level3SelectedCount < level2.lowers.length
            level2SelectedCount += level2.checked ? 1 : 0
          }
        })
        // 一级菜单-勾选状态处理
        level1.checked = level2SelectedCount === level1.lowers.length
        level1.indeterminate = level2SelectedCount > 0 && level2SelectedCount < level1.lowers.length
      }
    })
    this.$emit('change', path3, level3Selected)
  }
}
