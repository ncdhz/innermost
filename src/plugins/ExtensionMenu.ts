import Vue from 'vue'
import _ from 'lodash'
import { ExtensionManager } from './ExtensionManager'
import MenuItem from '@/components/MenuItem.vue'
import { ExtensionMenuInterface, ExtensionMenuItemInterface } from '@/innermost'
export default class ExtensionMenu {
  extensionManager: ExtensionManager

  constructor(extensionManager: ExtensionManager) {
    this.extensionManager = extensionManager
  }

  public extensionMenuComponent(name: string, title: ExtensionMenuInterface['title'], items: ExtensionMenuItemInterface[] | undefined, extensionSettingData: any, isClass: boolean, idConfig: {[key: string]: boolean}) {
    if (title && (typeof title === 'string' || typeof title === 'object')) {
      this.extensionManager.setMenuTitle([title, name])
    }
    // 用于存放按钮的 name id
    const butIds: {
      [key: string]: string | boolean;
    }[] = []

    // 添加菜单到组件中
    const addMenuToComponent = (item: ExtensionMenuItemInterface) => {
      const comName = `menu-${this.extensionManager.getRandomString5()}-${name}`
      Vue.component(comName, {
        template: `<menu-item extension-name='${name}' ${item.clazz ? 'menu-icon="' + item.clazz + '"' : ''}  menu-id="${item.id ? item.id : name}" :menu-name="menuName"/>`,
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
      this.extensionManager.setMenu([comName, name])
      butIds.push({
        name,
        id: item.id ? item.id : name,
        default: !idConfig.iSdeflate && item.default ? (idConfig.iSdeflate = true, true) : false
      })
    }
    if (isClass) {
      _.forEach(items, item => {
        addMenuToComponent(item)
      })
    } else if (extensionSettingData) {
      if (typeof items === 'object' && items.length > 0) {
        _.forEach(items, item => {
          addMenuToComponent(item)
        })
        this.extensionManager.extensionData(`menu-style-${name}`, extensionSettingData, name)
        this.extensionManager.setMenu([`menu-style-${name}`, name])
      } else {
        this.extensionManager.extensionData(`menu-${name}`, extensionSettingData, name)
        this.extensionManager.setMenu([`menu-${name}`, name])
      }
    }
    if (butIds.length > 0) {
      this.extensionManager.setExtensionIds(butIds)
    }
  }
}
