import Vue from "vue";
import App from "./App.vue";

import SvgIcon from "vue-svgicon";
import router from "./router";
import "@/assets/icons/components";
import store from "./store";
import Fant from "fant-ui";
import "fant-ui/packages/theme-chalk/src/index.scss";
import "@/components/dialog/index";
import "@/assets/iconfont/iconfont.css";
import "@/assets/styles/fant.scss";
process.env.NODE_ENV === "development" && require("./mock/mock");
Vue.use(Fant);
Vue.config.productionTip = false;
Vue.use(SvgIcon, {
  tagName: "svg-icon",
  defaultWidth: "1em",
  defaultHeight: "1em"
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
