import BaseResponse from '@/model/common/BaseResponse'
import JobProgress from '@/model/common/JobProgress'
import ApiClient from '../ApiClient'

export default class ExcelApi {
  /**
   * 获取导入模板
   * 返回值为模板的url地址
   *
   */
  static listTemplate(key: string): Promise<BaseResponse<any>> {
    return ApiClient.server()
      .get(`v1/{tenant}/oss/imptpl/url`, {
        params: {
          key: key
        }
      })
      .then((res) => {
        return res.data
      })
  }

  /**
   * 查询job执行结果
   *
   * @param tenant 租户id
   * @param name 租户id+uuid
   */
  static query(name: string): Promise<BaseResponse<JobProgress>> {
    return ApiClient.server()
      .get(`v1/{tenant}/job/progress`, {
        params: {
          name: name
        }
      })
      .then((res) => {
        return res.data
      })
  }

  /**
   * 上传导入文件
   *
   * @param tenant 租户id
   * @param file excel文件
   */
  static upload(file: any): Promise<BaseResponse<string>> {
    const body = new FormData()
    body.append('file', file.file)
    return ApiClient.server()
      .post(`v1/{tenant}/oss/file/upload`, body)
      .then((res) => {
        return res.data
      })
  }
}
