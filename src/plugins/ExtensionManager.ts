import _ from 'lodash'
import ExtensionIcon from './ExtensionIcon'
import ExtensionBody from './ExtensionBody'
import ExtensionMenu from './ExtensionMenu'
import ExtensionOptions from './ExtensionOptions'
import { GlobalConfig } from '@/utils'
import ExtensionInterface from '@/innermost/ExtensionInterface'
import ExtensionMenuInterface from '@/innermost/ExtensionMenuInterface'
import cryptoRandomString from 'crypto-random-string'
import Vue from 'vue'
// 用于管理扩展
export class ExtensionManager {
  private package: string[][] | undefined
  private modules = new Array<ExtensionInterface>()
  private icons = new Array<(string | boolean)[]>()
  private bodys = new Array<string[]>()
  private menus = new Array<string[]>()
  private extensionIds: {
    [key: string]: {
      [key: string]: string | boolean;
    };
  } = {}

  private menuTitles = new Array<ExtensionMenuInterface['title'][]>()
  private static LOWERCASE_LETTERS = 'abcdefghijklmnopqrstuvwxyz'
  extensionIcon: ExtensionIcon
  extensionBody: ExtensionBody
  extensionMenu: ExtensionMenu
  extensionOptions: ExtensionOptions

  constructor() {
    this.package = GlobalConfig.extension.package
    this.initModules()
    this.extensionOptions = new ExtensionOptions(this)
    this.extensionIcon = new ExtensionIcon(this)
    this.extensionBody = new ExtensionBody(this)
    this.extensionMenu = new ExtensionMenu(this)
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
  public getIcons(): (string | boolean)[][] {
    return this.icons
  }

  public setIcon(data: (string | boolean)[]) {
    this.icons.push(data)
  }

  public getBodys(): string[][] {
    return this.bodys
  }

  public setBody(data: string[]) {
    this.bodys.push(data)
  }

  public getMenus(): string[][] {
    return this.menus
  }

  public setMenu(data: string[]) {
    this.menus.push(data)
  }

  public getExtensionIds() {
    return this.extensionIds
  }

  public setExtensionIds(data: {
    [key: string]: string | boolean;
  }[]) {
    _.forEach(data, d => {
      if (!this.extensionIds[d.name as string]) {
        this.extensionIds[d.name as string] = {}
      }
      this.extensionIds[d.name as string][d.id as string] = d.default
    })
  }

  public getMenuTitles(): ExtensionMenuInterface['title'][][] {
    return this.menuTitles
  }

  public setMenuTitle(data: ExtensionMenuInterface['title'][]) {
    this.menuTitles.push(data)
  }

  // 根据扩展生成组件
  public extensionData(comName: string, extensionData: any, name: string) {
    Vue.component(comName, {
      template: '<extension-data/>',
      methods: {
        it(path: string, parent: boolean) {
          if (parent) {
            return this.$i18n.t(path)
          }
          return this.$i18n.t(`${name}.${path}`)
        }
      },
      components: {
        extensionData
      }
    })
  }

  public closeIconAndMenu(name: string) {
    if (name) {
      return this.extensionOptions.closeIconAndMenu(name)
    }
    return [false, false]
  }

  // 用于生成扩展组件
  private generateExtensionComponents() {
    _.forEach(this.modules, (module: ExtensionInterface) => {
      const name = `${module.name}-${this.getRandomString10()}`
      // 图标栏组件
      if (module.innermostIcon && module.innermostBody) {
        const icon = module.innermostIcon()
        icon.name = module.name
        icon.path = module.path
        if (icon.isClass ? icon.clazz : icon.data) {
          this.extensionIcon.extensionIconComponent(name, icon.path, icon.clazz, icon.data, icon.isClass)
        }
      }
      const idConfig = {
        iSdeflate: false
      }
      // 菜单组件
      if (module.innermostBody && module.innermostMenu) {
        const menu = module.innermostMenu()
        if (menu.isClass ? menu.items && menu.items.length > 0 : menu.data) {
          this.extensionMenu.extensionMenuComponent(name, menu.title, menu.items, menu.data, menu.isClass, idConfig)
        }
      }
      // 主体组件
      if (module.innermostBody) {
        const body = module.innermostBody()
        if (body.data) {
          this.extensionBody.extensionBodyComponent(name, body.data, body.id, body.default, body.pages, idConfig)
        }
      }
      // 设置选项部分
      if (module.innermostOptions) {
        const options = module.innermostOptions()
        this.extensionOptions.extensionOptions(name, options)
      }
    })
  }
}
export default new ExtensionManager()
