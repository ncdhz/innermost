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
   * @param data 对象 不能有嵌套属性，不能有方法 或者是字符串 这样value必须有值
   * @param value 当 data 为字符串时此参数必须有值 @return data:value;
   */
  public static toStyle(data: object| string, value?: string): string {
    let style = ''
    if (typeof data === 'string') {
      style += (data + ':' + value + ';')
    } else {
      for (const key in data as object) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          const value = _.get(data, key)
          if (typeof value === 'function' || typeof value === 'object' || typeof value === 'symbol') {
            continue
          }
          style += (key + ':' + value + ';')
        }
      }
    }
    return style
  }
}

export class EventTypes {
  public static CHANGING_LANGUAGE = 'CHANGING_LANGUAGE'
  public static UPDATE_CONFIG = 'UPDATE_CONFIG'
  public static OPEN_ABOUT = 'OPEN_ABOUT'
  public static APP_WINDOW_BOUNDS = 'APP_WINDOW_BOUNDS'
  public static CLOSE_WINDOW = 'CLOSE_WINDOW'
  public static OPEN_WINDOW = 'OPEN_WINDOW'
  public static OPEN_PREFERENCES = 'OPEN_PREFERENCES'
  public static MIN_WINDOW = 'MIN_WINDOW'
  public static MAX_WINDOW = 'MAX_WINDOW'
  public static OPEN_ICON_BAR = 'OPEN_ICON_BAR'
  public static CLOSE_ICON_BAR = 'CLOSE_ICON_BAR'
  public static OPEN_MENU_BAR = 'OPEN_MENU_BAR'
  public static CLOSE_MENU_BAR = 'CLOSE_MENU_BAR'
  public static MOVE_MENU_LEFT = 'MOVE_MENU_LEFT'
  public static MOVE_MENU_RIGHT = 'MOVE_MENU_RIGHT'
  public static MOVE_ICON_LEFT = 'MOVE_ICON_LEFT'
  public static MOVE_ICON_RIGHT = 'MOVE_ICON_RIGHT'
}
