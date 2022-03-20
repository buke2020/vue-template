import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {}
})
export default class Test extends Vue {
  obj: any = { a2: { b: null } }
  arr1: any
  arr2: any
  arr3: any
  arr4: any
  arr5: any

  $refs: any

  mounted() {
    this.obj.a1 = 10
    this.obj.a2.b = 20
    this.arr1 = [0, 10, 20].filter((item) => item * 2)
    this.arr2 = [0, 10, 20].map((item) => item * 2)
    this.arr3 = [0, 10, 20].find((item) => item * 2)
    this.arr4 = [0, 10, 20].some((item) => item * 2)
    this.arr5 = [0, 10, 20].every((item) => item * 2)
  }
}
