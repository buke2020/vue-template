import { Component, Vue } from 'vue-property-decorator'
import PageWrapper from '@/components/page-wrapper/PageWrapper.vue'

@Component({
  components: { PageWrapper }
})
export default class VirtualList extends Vue {
  $refs: any

  sumItemList = [
    { id: 1001, name: '数据项1001' },
    { id: 1002, name: '数据项1002' },
    { id: 1003, name: '数据项1003' },
    { id: 1004, name: '数据项1004' },
    { id: 1005, name: '数据项1005' },
    { id: 1006, name: '数据项1006' },
    { id: 1007, name: '数据项1007' },
    { id: 1008, name: '数据项1008' },
    { id: 1009, name: '数据项1009' },
    { id: 1010, name: '数据项1010' },
    { id: 1011, name: '数据项1011' },
    { id: 1012, name: '数据项1012' },
    { id: 1013, name: '数据项1013' },
    { id: 1014, name: '数据项1014' },
    { id: 1015, name: '数据项1015' },
    { id: 1016, name: '数据项1016' },
    { id: 1017, name: '数据项1017' },
    { id: 1018, name: '数据项1018' },
    { id: 1019, name: '数据项1019' },
    { id: 1020, name: '数据项1020' },
    { id: 1021, name: '数据项1021' },
    { id: 1022, name: '数据项1022' },
    { id: 1023, name: '数据项1023' },
    { id: 1024, name: '数据项1024' },
    { id: 1025, name: '数据项1025' },
    { id: 1026, name: '数据项1026' },
    { id: 1027, name: '数据项1027' },
    { id: 1028, name: '数据项1028' },
    { id: 1029, name: '数据项1029' },
    { id: 1030, name: '数据项1030' },
    { id: 1031, name: '数据项1031' },
    { id: 1032, name: '数据项1032' },
    { id: 1033, name: '数据项1033' },
    { id: 1034, name: '数据项1034' },
    { id: 1035, name: '数据项1035' },
    { id: 1036, name: '数据项1036' },
    { id: 1037, name: '数据项1037' },
    { id: 1038, name: '数据项1038' },
    { id: 1039, name: '数据项1039' },
    { id: 1040, name: '数据项1040' },
    { id: 1041, name: '数据项1041' },
    { id: 1042, name: '数据项1042' },
    { id: 1043, name: '数据项1043' },
    { id: 1044, name: '数据项1044' },
    { id: 1045, name: '数据项1045' },
    { id: 1046, name: '数据项1046' },
    { id: 1047, name: '数据项1047' },
    { id: 1048, name: '数据项1048' },
    { id: 1049, name: '数据项1049' },
    { id: 1050, name: '数据项1050' },
    { id: 1051, name: '数据项1051' },
    { id: 1052, name: '数据项1052' },
    { id: 1053, name: '数据项1053' },
    { id: 1054, name: '数据项1054' },
    { id: 1055, name: '数据项1055' },
    { id: 1056, name: '数据项1056' },
    { id: 1057, name: '数据项1057' },
    { id: 1058, name: '数据项1058' },
    { id: 1059, name: '数据项1059' },
    { id: 1060, name: '数据项1060' },
    { id: 1061, name: '数据项1061' },
    { id: 1062, name: '数据项1062' },
    { id: 1063, name: '数据项1063' },
    { id: 1064, name: '数据项1064' }
  ] // 数据项列表（总的）

  item: string = '' //
  loading: boolean = false // 数据是否正在加载中
  itemList: any[] = []

  /**
   *
   */
  loadmore() {
    this.itemList = this.sumItemList.slice(0, 20)
  }
}
