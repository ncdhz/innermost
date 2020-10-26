import { ExtensionManager } from './ExtensionManager'
import ExtensionOptionsInterface from '@/innermost/ExtensionOptionsInterface'
import _ from 'lodash'
import { I18nUtil } from '@/utils'
export default class ExtensionOptions {
  extensionManager: ExtensionManager

  private iconAndMenu: {
    [key: string]: boolean[];
  } = {}

  constructor(extensionManager: ExtensionManager) {
    this.extensionManager = extensionManager
  }

  public closeIconAndMenu(name: string) {
    const iconAndMenu = this.iconAndMenu[name]
    if (iconAndMenu) {
      return iconAndMenu
    }
    return [false, false]
  }

  public extensionOptions(name: string, options: ExtensionOptionsInterface) {
    // 设置语言国际化
    if (options.i18n && typeof options.i18n === 'object' && options.i18n.length > 0) {
      // 处理没有适配所有语言的扩展，当出现这种情况时会，插入默认语言配置或者第一条
      const allLocale: string[] = []
      const localeMessages = {
        [name]: options.i18n[0].data
      }
      _.forEach(options.i18n, message => {
        const locale = message.name
        allLocale.push(locale)
        const localeMessage = {
          [name]: message.data
        }
        if (message.default) {
          localeMessages[name] = message.data
        }
        I18nUtil.setMessage(locale, localeMessage)
      })
      I18nUtil.setMessage(allLocale, localeMessages)
    }
    this.iconAndMenu[name] = [!!options.closeIcon, !!options.closeMenu]
  }
}
