import { Component, Vue } from 'vue-property-decorator'
import BasicLayout from '@/layouts/BasicLayoutSingle/BasicLayout.vue'
import SiderBar from './cmp/SiderBar.vue'
import { Action, Getter, State } from 'vuex-class'
import { RouteConfig } from 'vue-router'
import UserInfo from '@/model/login/UserInfo'

@Component({
  components: { BasicLayout, SiderBar }
})
export default class Index extends Vue {
  @Getter('routes') routes: RouteConfig[]
  @State('userInfo') userInfo: UserInfo
  @Action('logout') actionLogout: any

  /**
   * 激活状态的菜单
   */
  get activeMenu() {
    return this.$route.name
  }

  /**
   * 页面路径
   */
  get key() {
    return this.$route.path
  }

  /**
   * 登出事件
   */
  doLogout() {
    this.actionLogout()
    this.$router.push({ path: `/login?redirect=${this.$route.fullPath}` })
  }

  handleOpen(key: string, keyPath: string) {
    console.log(key, keyPath)
  }

  handleClose(key: string, keyPath: string) {
    console.log(key, keyPath)
  }
}
