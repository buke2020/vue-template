export default class ArrayUtil {
  static inArray(source: any, target: string | any[]) {
    for (let s = 0; s < target.length; s++) {
      const thisEntry = target[s].toString()
      if (thisEntry === source) {
        return true
      }
    }
    return false
  }

  /**
   * 将source数组中的数据填充到target数组
   * @param source
   * @param target
   */
  static fill(source: any[], target: any[]) {
    if (source && target && Array.isArray(source) && Array.isArray(target)) {
      source.forEach((item) => {
        target.push(item)
      })
    }
  }

  static idList(array: any[], field: string) {
    if (!array || !field || !Array.isArray(array)) {
      return
    }

    const idList: any[] = [],
      params = field.split('.')

    array.forEach((item) => {
      let value
      for (let i = 0; i < params.length; i++) {
        value = item[params[i]]
      }

      idList.push(value)
    })

    return idList
  }

  /**
   *  筛，筛选，过滤。
   *  将数组中（fn=true）的item删除。
   *  注意，该方法直接作用于原数组上。
   */
  static remove(array: any, fn: any, scope: any = []) {
    if (!array || !Array.isArray(array)) {
      return
    }

    for (let i = 0; i < array.length; i++) {
      if (fn.call(scope, array[i], i, array)) {
        array.splice(i--, 1)
      }
    }
  }

  /**
   *  筛，筛选，过滤。
   *  将数组中（fn=false）的item删除。
   *  注意，该方法直接作用于原数组上。
   */
  static sieve(array: any[], fn: { call: (arg0: any, arg1: any, arg2: number, arg3: any[]) => any }, scope: any) {
    if (!array || !Array.isArray(array)) {
      return
    }

    for (let i = 0; i < array.length; i++) {
      if (!fn.call(scope, array[i], i, array)) {
        array.splice(i--, 1)
      }
    }
  }
}
