import _ from 'lodash'
import ExtensionIcon from './ExtensionIcon'
import ExtensionBody from './ExtensionBody'
import ExtensionSetting from './ExtensionSetting'
import { GlobalConfig } from '@/utils'
import ExtensionInterface from '@/innermost/ExtensionInterface'
import cryptoRandomString from 'crypto-random-string'
// 用于管理扩展
export class ExtensionManager {
  private package: string[][] | undefined
  private modules = new Array<ExtensionInterface>()
  private icons = new Array<string[]>()
  private bodys = new Array<string[]>()
  private settings = new Array<string[]>()
  private settingTitles = new Array<string[]>()
  private static LOWERCASE_LETTERS = 'abcdefghijklmnopqrstuvwxyz'
  extensionIcon: ExtensionIcon
  extensionBody: ExtensionBody
  extensionSetting: ExtensionSetting

  constructor() {
    this.package = GlobalConfig.extension.package
    this.initModules()
    this.extensionIcon = new ExtensionIcon(this)
    this.extensionBody = new ExtensionBody(this)
    this.extensionSetting = new ExtensionSetting(this)
    this.generateExtensionComponents()
  }

  // 用于加载本地模块
  private initModules() {
    if (this.package) {
      _.forEach(this.package, (value) => {
        const name = value[1]
        // eslint-disable-next-line @typescript-eslint/camelcase
        const requireFunc = typeof __webpack_require__ === 'function' ? __non_webpack_require__ : require
        let module = requireFunc(value[0])
        module = module.default ? module.default : module
        if (!module.name) {
          module.name = name
        }
        module.path = value[0]
        this.modules.push(module)
      })
    }
  }

  // 获取十位随机小写字母
  public getRandomString10() {
    return cryptoRandomString({ length: 10, characters: ExtensionManager.LOWERCASE_LETTERS })
  }

  // 获取五位随机小写字母
  public getRandomString5() {
    return cryptoRandomString({ length: 5, characters: ExtensionManager.LOWERCASE_LETTERS })
  }

  // 获取icon组件名称
  public getIcons(): string[][] {
    return this.icons
  }

  public setIcon(data: string[]) {
    this.icons.push(data)
  }

  public getBodys(): string[][] {
    return this.bodys
  }

  public setBody(data: string[]) {
    this.bodys.push(data)
  }

  public getSettings(): string[][] {
    return this.settings
  }

  public setSetting(data: string[]) {
    this.settings.push(data)
  }

  public getSettingTitles(): string[][] {
    return this.settingTitles
  }

  public setSettingTitle(data: string[]) {
    this.settingTitles.push(data)
  }

  // 用于生产 Icon 组件
  private generateExtensionComponents() {
    _.forEach(this.modules, (module: ExtensionInterface) => {
      const name = `${module.name}-${this.getRandomString10()}`
      if (module.innermostIcon && module.innermostBody) {
        const icon = module.innermostIcon()
        icon.name = module.name
        icon.path = module.path
        if (icon.isClass ? icon.clazz : icon.data) {
          this.extensionIcon.extensionIconComponent(name, icon.clazz, icon.data, icon.isClass)
        }
      }
      if (module.innermostBody) {
        const body = module.innermostBody()
        if (body.data) {
          this.extensionBody.extensionBodyComponent(name, body.data)
        }
      }
      if (module.innermostBody && module.innermostSetting) {
        const setting = module.innermostSetting()
        if (setting.isClass ? setting.items && setting.items.length > 0 : setting.data) {
          this.extensionSetting.extensionSettingComponent(name, setting.title, setting.items, setting.data, setting.isClass)
        }
      }
    })
  }
}
export default new ExtensionManager()
