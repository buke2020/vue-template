import { Component, Prop, Vue } from "vue-property-decorator";
import { RouteConfig } from "vue-router";
import SiderBarItem from "./SiderBarItem.vue";

@Component({
  name: "SiderBar",
  components: {
    SiderBarItem
  }
})
export default class SiderBar extends Vue {
  @Prop({ default: [] }) menus: RouteConfig[]; // 路由数组

  /**
   * 激活状态的菜单
   */
  get activeMenu() {
    return this.$route.name;
  }
}
