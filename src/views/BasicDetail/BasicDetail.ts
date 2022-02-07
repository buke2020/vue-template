import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {}
})
export default class BasicDetail extends Vue {
  /**
   * 后退
   */
  doBack() {
    this.$router.go(-1)
  }

  /**
   * 去编辑
   */
  doEdit() {
    this.$router.push('/basicForm')
  }
}
