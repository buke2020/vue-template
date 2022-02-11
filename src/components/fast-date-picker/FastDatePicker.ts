import { Vue, Prop, Component, Model, ModelSync } from 'vue-property-decorator'
import { parseTime } from '@/utils/Index'

@Component({
  components: {}
})
export default class FastDatePicker extends Vue {
  @ModelSync('value', 'input', { type: Array }) date: any[]
  @Prop({ type: Array, default: () => ['昨日', '今日', '近7日', '近30日', '自定义'] }) fastOpts: string[] // 日期类型选项
  @Prop({ type: Boolean, default: false }) clearable: boolean // 是否清除（默认否）
  @Prop({ type: Number, default: 31 }) rangeValue: number // 日期范围
  @Prop({ type: Number, default: 93 }) allowSpans: number // 日期范围

  opened: boolean = false // 是否展开
  dateType: string = '今日' // 日期类型（默认今日）
  firstDate: any = null
  $refs: any

  pickerOptions = {
    disabledDate: this.disabledDate,
    onPick: this.datePickerOnPick
  }

  // 快捷时间选项["昨日","近7日","近31日","上周","上月","自定义"]
  dateRadioOpts: any = {
    昨日: {
      funC: (dateArr: Date[]): Date[] => {
        dateArr[0].setTime(dateArr[0].getTime() - 3600 * 1000 * 24 * 1)
        dateArr[1].setTime(dateArr[1].getTime() - 3600 * 1000 * 24 * 1)
        return dateArr
      }
    },
    今日: {
      funC: (dateArr: Date[]): Date[] => {
        dateArr[0].setTime(dateArr[0].getTime())
        dateArr[1].setTime(dateArr[1].getTime())
        return dateArr
      }
    },
    近7日: {
      funC: (dateArr: Date[]): Date[] => {
        dateArr[0].setTime(dateArr[0].getTime() - 3600 * 1000 * 24 * 6)
        return dateArr
      }
    },
    近30日: {
      funC: (dateArr: Date[]): Date[] => {
        dateArr[0].setTime(dateArr[0].getTime() - 3600 * 1000 * 24 * 29)
        return dateArr
      }
    },
    本周: {
      funC: (dateArr: Date[]): Date[] => {
        const myDate = new Date(dateArr[0].getTime())
        const day = myDate.getDay()
        const time = myDate.getDate() - day + 1
        dateArr[0].setTime(myDate.setDate(time))
        dateArr[1].setTime(myDate.setDate(time + 6))
        return dateArr
      }
    },
    本月: {
      funC: (dateArr: Date[]): Date[] => {
        const year = dateArr[0].getFullYear()
        const month = dateArr[0].getMonth()
        dateArr[0].setMonth(month)
        dateArr[0].setDate(1)
        dateArr[1].setMonth(month + 1)
        dateArr[1].setDate(0)
        return dateArr
      }
    },
    上周: {
      funC: (dateArr: Date[]): Date[] => {
        const myDate = new Date(dateArr[0].getTime() - 7 * 24 * 3600 * 1000)
        const day = myDate.getDay()
        const time = myDate.getDate() - day + (day === 0 ? -6 : 1)
        dateArr[0].setTime(myDate.setDate(time))
        dateArr[1].setTime(myDate.setDate(time + 6))
        console.log(dateArr)
        return dateArr
      }
    },
    上月: {
      funC: (dateArr: Date[]): Date[] => {
        const year = dateArr[0].getFullYear()
        const month = dateArr[0].getMonth() - 1
        dateArr[0].setMonth(month)
        dateArr[0].setDate(1)
        dateArr[1].setMonth(month)
        dateArr[1].setDate(new Date(year, month + 1, 0).getDate())
        return dateArr
      }
    },
    自定义: {
      funC: (dateArr: Date[]): Date[] => {
        return dateArr
      }
    }
  }

  // 日期类型改变
  doDateTypeChange(val: string) {
    if (val === '自定义') {
      // this.$emit('input', [])
      // this.$emit('change', [])
      return
    }
    const end = new Date()
    const start = new Date()
    const reDateArr = this.dateRadioOpts[val].funC([start, end])
    const dateArr = [parseTime(reDateArr[0], '{y}-{m}-{d}'), parseTime(reDateArr[1], '{y}-{m}-{d}')]
    console.log(dateArr)
    this.$emit('input', dateArr)
    this.$emit('change', dateArr)
    this.$emit('dateTypeChange', this.dateType)
  }
  // 监听日期改变事件
  doDateChange(val: any) {
    // 清空时间选择器禁止项
    this.firstDate = null
    this.$emit('input', val || [])
    this.$emit('change', val || [])
  }
  disabledDate(val: any, val1: any) {
    let disabledDate: boolean = false
    // 允许的时间范围
    if (this.allowSpans) {
      disabledDate = new Date().getTime() - val.getTime() > 3600 * 1000 * 24 * this.allowSpans
    }
    if (disabledDate) return disabledDate
    // 允许档次选择的时间范围
    if (this.firstDate) {
      disabledDate = Math.abs(this.firstDate.getTime() - val.getTime()) > 3600 * 1000 * 24 * this.rangeValue
    }
    return disabledDate
  }
  datePickerOnPick(dateObj: any) {
    if (dateObj.minDate && !dateObj.maxDate) {
      this.firstDate = dateObj.minDate
    }
  }
}
