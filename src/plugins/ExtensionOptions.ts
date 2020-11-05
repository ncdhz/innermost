import { ExtensionManager } from './ExtensionManager'
import { ExtensionOptionsInterface } from '@/innermost'
import _ from 'lodash'
import { I18nUtil, ExtensionConfig } from '@/utils'
export default class ExtensionOptions {
  extensionManager: ExtensionManager

  private closeIconAndMenuData: {
    [key: string]: boolean[];
  } = {}

  private moveIconAndMenuData: {
    [key: string]: boolean[];
  } = {}

  constructor(extensionManager: ExtensionManager) {
    this.extensionManager = extensionManager
  }

  public closeIconAndMenu(name: string) {
    const iconAndMenu = this.closeIconAndMenuData[name]
    if (iconAndMenu) {
      return iconAndMenu
    }
    return [false, false]
  }

  public moveIconAndMenu(name: string) {
    const iconAndMenu = this.moveIconAndMenuData[name]
    if (iconAndMenu) {
      return iconAndMenu
    }
    return [false, false]
  }

  public extensionOptions(name: string, options: ExtensionOptionsInterface) {
    // 添加扩展配置
    if (typeof options.config === 'object') {
      _.merge(options.config, ExtensionConfig.getExtensionConfig(name))
      ExtensionConfig.setExtensionConfig(name, options.config)
    }
    // 添加扩展状态，添加在其中的状态可以通过 vuex 管理
    if (typeof options.state === 'object') {
      this.extensionManager.setState({
        [name]: options.state
      })
    }
    // 添加主题配置
    if (typeof options.theme === 'object') {
      // 用来处理默认逻辑 当扩展编写者没有写几套样式适应时使用
      if (typeof options.theme.default === 'string') {
        options.theme.default = options.theme[options.theme.default]
      }
      if (typeof options.theme.default !== 'object') {
        for (const t in options.theme) {
          if (t !== 'default') {
            options.theme.default = options.theme[t]
            break
          }
        }
      }
      this.extensionManager.setTheme({
        [name]: options.theme
      })
    }
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
    this.closeIconAndMenuData[name] = [!!options.closeIcon, !!options.closeMenu]
    this.moveIconAndMenuData[name] = [!!options.moveIcon, !!options.moveMenu]
  }
}
