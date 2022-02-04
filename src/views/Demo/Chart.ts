import { Component, Vue } from 'vue-property-decorator'
import * as echarts from 'echarts'

@Component({
  components: {}
})
export default class Chart extends Vue {
  $refs: any

  mounted() {
    this.init()
  }

  /**
   * 图表初始化
   */
  init() {
    const chartDom = this.$refs.chart
    const myChart = echarts.init(chartDom)
    const option = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
          smooth: true
        }
      ]
    }

    option && myChart.setOption(option)
  }
}
