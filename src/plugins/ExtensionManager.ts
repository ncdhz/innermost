import _ from 'lodash'
import ExtensionIcon from './ExtensionIcon'
import ExtensionBody from './ExtensionBody'
import ExtensionMenu from './ExtensionMenu'
import ExtensionOptions from './ExtensionOptions'
import ExtensionSetting from './ExtensionSetting'
import { GlobalConfig, ExtensionConfig, UserConfig, UserConfigKeys } from '@/utils'
import { ExtensionMenuInterface, ExtensionInterface, ExtensionMenuItemInterface } from '@/innermost'
import cryptoRandomString from 'crypto-random-string'
import Vue from 'vue'
import MenuItem from '@/components/MenuItem.vue'
import { ActionTypes, MutationTypes } from '@/store'
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

  private themes = {}

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
  evue: Vue | undefined

  constructor() {
    this.package = GlobalConfig.extension.package
    this.initModules()
    this.extensionOptions = new ExtensionOptions(this)
    this.extensionIcon = new ExtensionIcon(this)
    this.extensionBody = new ExtensionBody(this)
    this.extensionMenu = new ExtensionMenu(this)
    this.extensionSetting = new ExtensionSetting(this)
  }

  public setEVue(evue: Vue) {
    this.evue = evue
  }

  // 用于加载本地模块
  private initModules() {
    if (this.package) {
      _.forEach(this.package, (value) => {
        const name = value[1]
        // eslint-disable-next-line @typescript-eslint/camelcase
        const requireFunc = typeof __webpack_require__ === 'function' ? __non_webpack_require__ : require
        try {
          let module = requireFunc(value[0])
          module = module.default ? module.default : module
          if (!module.name) {
            module.name = name
          }
          module.path = value[0]
          this.modules.push(module)
        } catch (e) {
          console.error(e)
        }
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

  public getThemes() {
    return this.themes
  }

  public setTheme(data: object) {
    _.merge(this.themes, data)
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
  public extensionData(comName: string, extensionData: any) {
    Vue.component(comName, {
      template: '<extension-data/>',
      components: {
        extensionData
      }
    })
  }

  // 根据菜单数据生成菜单组件
  public extensionMenuData(menuComName: string, item: ExtensionMenuItemInterface, name: string) {
    const comName = `menu-${this.getRandomString5()}-${menuComName}`
    Vue.component(comName, {
      template: `<menu-item :func="showExtension" extension-name='${menuComName}' ${item.clazz ? 'menu-icon="' + item.clazz + '"' : ''}  menu-id="${item.id ? item.id : menuComName}" :menu-name="menuName"/>`,
      components: {
        MenuItem
      },
      methods: {
        showExtension() {
          if (item.func) {
            item.func(this)
          }
          this.$store.dispatch(ActionTypes.UPDATE_EXTENSION_ID, {
            id: item.id ? item.id : menuComName,
            name: menuComName
          })
        }
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

  public moveIconAndMenu(name: string) {
    if (name) {
      return this.extensionOptions.moveIconAndMenu(name)
    }
    return [false, false]
  }

  public extensionModuleAddFunction(module: ExtensionInterface, name: string) {
    module.it = (path: string, parent?: boolean): string | undefined => {
      if (parent) {
        return this.evue?.$i18n.t(path) as string | undefined
      }
      return this.evue?.$i18n.t(`${name}.${path}`) as string | undefined
    }
    // 用于获取用户配置
    module.getConfig = (path: any) => {
      const config = ExtensionConfig.getExtensionConfig(name)
      if (!path) {
        return config
      }
      if (config) {
        return _.get(config, path)
      }
      return undefined
    }
    // 修改用户配置
    module.updateConfig = (path: any, value: any) => {
      const config = ExtensionConfig.getExtensionConfig(name)
      if (config) {
        _.set(config, path, value)
        ExtensionConfig.setExtensionConfig(name, config)
      }
    }
    // 保存配置
    module.saveConfig = () => {
      ExtensionConfig.writeExtensionConfig()
    }
    // 获取状态
    module.getState = (path: any) => {
      if (!path) {
        return this.evue?.$store.getters.getExtensionStates(name)
      }
      return _.get(this.evue?.$store.getters.getExtensionStates(name), path)
    }
    // 更新状态
    module.updateState = (path: any, value: any) => {
      if (path) {
        this.evue?.$store.commit(MutationTypes.UPDATE_EXTENSION_STATE, { name, path, value })
      }
    }
    // 打开扩展
    module.openExtension = () => {
      this.evue?.$store.dispatch(ActionTypes.UPDATE_EXTENSION, { name })
    }
    // 打开对应的id 如：id可能对应了一个界面那就是打开界面
    module.openId = (id: string) => {
      this.evue?.$store.dispatch(ActionTypes.UPDATE_EXTENSION_ID, { name, id })
    }
    module.getTheme = (parent?: boolean) => {
      if (parent) {
        return this.evue?.$store.getters.getTheme
      }
      return this.evue?.$store.getters.getExtensionTheme(name)
    }
  }

  // 用于生成扩展组件
  public generateExtensionComponents() {
    let extensionName: {
      [key: string]: string;
    } = ExtensionConfig.getExtensionConfig(ExtensionConfig.ExtensionName)
    if (!extensionName) {
      extensionName = {}
    }
    _.forEach(this.modules, (module: ExtensionInterface) => {
      try {
        let name = extensionName[module.path as string]
        if (!name) {
          name = `${module.name}-${this.getRandomString10()}`
          extensionName[module.path as string] = name
        }
        // 给扩展注入方法
        this.extensionModuleAddFunction(module, name)
        // 用于处理插件是否被禁止使用
        const disableExtensions = UserConfig.getUserConfig(UserConfigKeys.DisableExtension)
        let isDisable = false
        if (typeof disableExtensions === 'object') {
          isDisable = !!disableExtensions[name]
        }
        // 初始化扩展
        if (module.innermostInit) {
          module.innermostInit(Vue)
        }
        // 图标栏组件
        if (module.innermostIcon) {
          const icon = module.innermostIcon()
          icon.name = module.name
          if (icon.isClass ? icon.clazz : icon.data) {
            this.extensionIcon.extensionIconComponent(name, icon, isDisable)
          }
        }
        const idConfig = {
          iSdeflate: false
        }
        // 菜单组件
        if (module.innermostMenu) {
          const menu = module.innermostMenu()
          if (menu.isClass ? menu.items && menu.items.length > 0 : menu.data) {
            this.extensionMenu.extensionMenuComponent(name, menu, idConfig)
          }
        }
        // 主体组件
        if (module.innermostBody) {
          const body = module.innermostBody()
          this.extensionBody.extensionBodyComponent(name, body, body.default as boolean, idConfig)
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
      } catch (e) {
        console.error(e)
      }
    })
    ExtensionConfig.setExtensionConfig(ExtensionConfig.ExtensionName, extensionName)
    ExtensionConfig.writeExtensionConfig()
  }
}
export default new ExtensionManager()
