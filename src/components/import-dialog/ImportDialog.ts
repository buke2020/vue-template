import { Component, Vue } from 'vue-property-decorator'
import ConstantMgr from '@/mgr/ConstantMgr'
import ExcelApi from '@/http/excel/ExcelApi'

@Component({
  components: {}
})
export default class ImportDialog extends Vue {
  title: string = '' // 标题信息
  tempKey: string = '' // 导入模板对应的key值
  importMethod: any // 导入方法

  step: number = 1 // 导入步骤
  result: any = {} // 导入结果
  errorMessage: Nullable<string> = null // 报错信息
  timer: any // 定时器
  onConfirm: () => {}

  beforeDestroy() {
    clearInterval(this.timer)
  }

  /**
   * 下载模板
   */
  onDownloadTemplate() {
    const loading = this.$loading(ConstantMgr.loadingOption)
    ExcelApi.listTemplate(this.tempKey)
      .then((resp) => {
        loading.close()
        const time = new Date().getTime() // 获取当前时间戳
        const url = resp.data.url ? resp.data.url + '&' + time : ''
        window.open(url, '_blank')
      })
      .catch((e) => {
        loading.close()
        this.$message.error(e.message)
      })
  }

  /**
   * 上传文件
   */
  doSelectFile(params: any) {
    if (params.file.size > 1024 * 1024) {
      return this.$message.warning('导入文件过大，请导入1MB以内的文件')
    }
    const loading = this.$loading(ConstantMgr.loadingOption)
    ExcelApi.upload(params)
      .then((resp) => {
        loading.close()
        this.step = 2
        this.import(resp.data)
      })
      .catch((e) => {
        loading.close()
        this.$message.error(e.message)
      })
  }

  /**
   * 导入文件
   */
  import(id: string) {
    const loading = this.$loading(ConstantMgr.loadingOption)
    this.importMethod(id)
      .then((resp: any) => {
        loading.close()
        this.task(resp.data)
      })
      .catch((e: any) => {
        loading.close()
        this.$message.error(e.message)
      })
  }

  /**
   * 开启job
   */
  task(id: string) {
    this.timer = setInterval(() => {
      ExcelApi.query(id)
        .then((resp) => {
          if (resp.data.finished) {
            clearInterval(this.timer)
            if (resp.data.success) {
              this.step = 3
              this.result = resp.data
            } else {
              this.step = 3
              this.errorMessage = resp.data.lastMessage
            }
          }
        })
        .catch((e) => {
          this.step = 1
          this.errorMessage = e.message
        })
    }, 1000)
  }

  /**
   * 下载错误信息模板
   */
  onDownloadError(url: string) {
    window.location.href = url
  }

  /**
   * 取消
   */
  doCancel() {
    this.$emit('hide')
  }

  /**
   * 导入结束
   */
  doFinish() {
    this.$emit('hide')
    this.onConfirm && this.onConfirm()
  }
}
