import { Component, Vue } from 'vue-property-decorator'
import ListView from '@/components/list-view/ListView.vue'
import DetailCard from '@/components/detail-card/DetailCard.vue'

@Component({
  components: { DetailCard, ListView }
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
