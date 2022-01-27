import { Component, Prop, Vue } from "vue-property-decorator";
import { RouteConfig } from "vue-router";

@Component({
  name: "SiderBarItem"
})
export default class SiderBarItem extends Vue {
  @Prop({}) menu: RouteConfig;

  // 是否有子节点
  get hasChildren() {
    return this.menu.children && this.menu.children.length;
  }
}
