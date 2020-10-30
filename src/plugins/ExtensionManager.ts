import _ from 'lodash'
import ExtensionIcon from './ExtensionIcon'
import ExtensionBody from './ExtensionBody'
import ExtensionMenu from './ExtensionMenu'
import ExtensionOptions from './ExtensionOptions'
import ExtensionSetting from './ExtensionSetting'
import { GlobalConfig, UserConfig } from '@/utils'
import { ExtensionMenuInterface, ExtensionInterface, ExtensionMenuItemInterface } from '@/innermost'
import cryptoRandomString from 'crypto-random-string'
import Vue from 'vue'
import MenuItem from '@/components/MenuItem.vue'
import { MutationTypes } from '@/store'
// 用于管理扩展
export class ExtensionManager {
  private package: string[][] | undefined
  private modules = new Array<ExtensionInterface>()
  private icons = new Array<(string | boolean)[]>()
  private bodys = new Array<string[]>()
  private menus = new Array<string[]>()
  private settings = new Array<(string | object)[]>()
  private states: {
    [key: string]: any;
  } = {}

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
  extensionSetting: ExtensionSetting

  constructor() {
    this.package = GlobalConfig.extension.package
    this.initModules()
    this.extensionOptions = new ExtensionOptions(this)
    this.extensionIcon = new ExtensionIcon(this)
    this.extensionBody = new ExtensionBody(this)
    this.extensionMenu = new ExtensionMenu(this)
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

  public getSettings(): (string | object)[][] {
    return this.settings
  }

  public setSetting(data: (string | {})[]) {
    this.settings.push(data)
  }

  public getStates() {
    return this.states
  }

  public setState(data: object) {
    _.merge(this.states, data)
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
        },
        // 用于获取用户配置
        getConfig(path: any) {
          const config = UserConfig.getUserConfig(name)
          if (!path) {
            return config
          }
          if (config) {
            return _.get(config, path)
          }
          return undefined
        },
        // 修改用户配置
        updateConfig(path: any, value: any) {
          const config = UserConfig.getUserConfig(name)
          if (config) {
            _.set(config, path, value)
            UserConfig.setUserConfig(name, config)
          }
        },
        // 保存配置
        saveConfig() {
          UserConfig.writeUserConfig()
        },
        // 获取状态
        getState(path: any) {
          if (!path) {
            return this.$store.state.extensionStates[name]
          }
          return _.get(this.$store.state.extensionStates[name], path)
        },
        // 更新状态
        updateState(path: any, value: any) {
          if (path) {
            this.$store.commit(MutationTypes.UPDATE_EXTENSION_STATES, { name, path, value })
          }
        },
        // 打开扩展
        openExtension() {
          this.$store.dispatch(MutationTypes.UPDATE_EXTENSION, name)
        },
        // 打开对应的id 如：id可能对应了一个界面那就是打开界面
        openId(id: string) {
          this.$store.dispatch(MutationTypes.UPDATE_EXTENSION_ID, { name, id })
        }
      },
      components: {
        extensionData
      }
    })
  }

  // 根据菜单数据生成菜单组件
  public extensionMenuData(menuComName: string, item: ExtensionMenuItemInterface, name: string) {
    const comName = `menu-${this.getRandomString5()}-${menuComName}`
    Vue.component(comName, {
      template: `<menu-item extension-name='${menuComName}' ${item.clazz ? 'menu-icon="' + item.clazz + '"' : ''}  menu-id="${item.id ? item.id : menuComName}" :menu-name="menuName"/>`,
      components: {
        MenuItem
      },
      computed: {
        menuName() {
          if (item.i18n) {
            if (item.parentI18n) {
              return this.$i18n.t(`${item.name}`)
            } else {
              return this.$i18n.t(`${name}.${item.name}`)
            }
          } else {
            return item.name
          }
        }
      }
    })
    this.setMenu([comName, menuComName])
  }

  public closeIconAndMenu(name: string) {
    if (name) {
      return this.extensionOptions.closeIconAndMenu(name)
    }
    return [false, false]
  }

  // 用于生成扩展组件
  private generateExtensionComponents() {
    let extensionName: {
      [key: string]: string;
    } = UserConfig.getUserConfig(UserConfig.ExtensionName)
    if (!extensionName) {
      extensionName = {}
    }
    _.forEach(this.modules, (module: ExtensionInterface) => {
      let name = extensionName[module.path as string]
      if (!name) {
        name = `${module.name}-${this.getRandomString10()}`
        extensionName[module.path as string] = name
      }
      // 图标栏组件
      if (module.innermostIcon && module.innermostBody) {
        const icon = module.innermostIcon()
        icon.name = module.name
        if (icon.isClass ? icon.clazz : icon.data) {
          this.extensionIcon.extensionIconComponent(name, icon)
        }
      }
      const idConfig = {
        iSdeflate: false
      }
      // 菜单组件
      if (module.innermostBody && module.innermostMenu) {
        const menu = module.innermostMenu()
        if (menu.isClass ? menu.items && menu.items.length > 0 : menu.data) {
          this.extensionMenu.extensionMenuComponent(name, menu, idConfig)
        }
      }
      // 主体组件
      if (module.innermostBody) {
        const body = module.innermostBody()
        if (body.data) {
          this.extensionBody.extensionBodyComponent(name, body, body.default as boolean, idConfig)
        }
      }
      // 设置选项部分
      if (module.innermostOptions) {
        const options = module.innermostOptions()
        this.extensionOptions.extensionOptions(name, options)
      }
      // 插入主体设置部分
      // 每一个扩展都可以维护自己的配置文件
      if (module.innermostSetting) {
        const setting = module.innermostSetting()
        this.extensionSetting.extensionSetting(name, setting)
      }
    })
    UserConfig.setUserConfig(UserConfig.ExtensionName, extensionName)
    UserConfig.writeUserConfig()
  }
}
export default new ExtensionManager()
