import _ from 'lodash'
import ExtensionIcon from './ExtensionIcon'
import { GlobalConfig } from '@/utils'
import ExtensionInterface from '@/innermost/ExtensionInterface'
import cryptoRandomString from 'crypto-random-string'
// 用于管理扩展
export class ExtensionManager {
  private package: string[][] | undefined
  private modules = new Array<ExtensionInterface>()
  private icons = new Array<string[]>()
  private static LOWERCASE_LETTERS = 'abcdefghijklmnopqrstuvwxyz'
  extensionIcon: ExtensionIcon

  constructor() {
    this.package = GlobalConfig.extension.package
    this.initModules()
    this.extensionIcon = new ExtensionIcon(this)
    this.generateExtensionIconComponents()
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
  private getRandomString10() {
    return cryptoRandomString({ length: 10, characters: ExtensionManager.LOWERCASE_LETTERS })
  }

  // 获取icon组件名称
  public getIcons(): string[][] {
    return this.icons
  }

  public setIcon(data: string[]) {
    this.icons.push(data)
  }

  // 用于生产 Icon 组件
  private generateExtensionIconComponents() {
    _.forEach(this.modules, (module: ExtensionInterface) => {
      if (module.innermostIcon && module.innermostBody) {
        const icon = module.innermostIcon()
        icon.name = module.name
        icon.path = module.path
        const name = `${icon.name}-${this.getRandomString10()}`
        this.extensionIcon.getExtensionIconComponent(name, icon.clazz, icon.data, icon.isClass)
      }
    })
  }
}
export default new ExtensionManager()
