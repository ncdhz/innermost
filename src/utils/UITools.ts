import _ from 'lodash'
export class UITools {
  public static addPX(data: string|number): string {
    return data + 'px'
  }

  /**
   * {
   *  color: xx
   * }
   *
   * to
   *
   * color:xx;
   * @param data 对象 不能有嵌套属性，不能有方法
   */
  public static toStyle(data: object): string {
    let style = ''
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const value = _.get(data, key)
        if (typeof value === 'function' || typeof value === 'object' || typeof value === 'symbol') {
          continue
        }
        style += (key + ':' + value + ';')
      }
    }
    return style
  }
}
// 左侧图标栏事件接口
export interface IconEventInterface {
  name: string;
  func: () => void;
}

export class EventTypes {
  public static CHANGING_LANGUAGE = 'CHANGING_LANGUAGE'
  public static UPDATE_CONFIG = 'UPDATE_CONFIG'
  public static OPEN_ABOUT = 'OPEN_ABOUT'
  public static APP_WINDOW_BOUNDS = 'APP_WINDOW_BOUNDS'
  public static CLOSE_WINDOW = 'CLOSE_WINDOW'
  public static OPEN_WINDOW = 'OPEN_WINDOW'
  public static OPEN_PREFERENCES = 'OPEN_PREFERENCES'
}
