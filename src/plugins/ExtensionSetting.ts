import Vue from 'vue'
import _ from 'lodash'
import { ExtensionManager } from './ExtensionManager'
import MenuItem from '@/components/MenuItem.vue'
import ExtensionSettingInterface, { ExtensionSettingItemInterface } from '@/innermost/ExtensionSettingInterface'
export default class ExtensionSetting {
  extensionManager: ExtensionManager

  constructor(extensionManager: ExtensionManager) {
    this.extensionManager = extensionManager
  }

  public extensionSettingComponent(name: string, title: ExtensionSettingInterface['title'], items: ExtensionSettingItemInterface[] | undefined, extensionSettingData: Vue | undefined, isClass: boolean) {
    if (title && (typeof title === 'string' || typeof title === 'object')) {
      this.extensionManager.setSettingTitle([title, name])
    }
    const addSettingToComponent = (item: ExtensionSettingItemInterface) => {
      const comName = `setting-${this.extensionManager.getRandomString5()}-${name}`
      Vue.component(comName, {
        template: `<menu-item ${item.clazz ? 'menu-icon="' + item.clazz + '"' : ''} :menu-name="menuName"/>`,
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
      this.extensionManager.setSetting([comName, name])
    }
    if (isClass) {
      _.forEach(items, item => {
        addSettingToComponent(item)
      })
    } else if (extensionSettingData) {
      if (typeof items === 'object' && items.length > 0) {
        _.forEach(items, item => {
          addSettingToComponent(item)
        })
        Vue.component(`setting-style-${name}`, extensionSettingData)
        this.extensionManager.setSetting([`setting-style-${name}`, name])
      } else {
        Vue.component(`setting-${name}`, extensionSettingData)
        this.extensionManager.setSetting([`setting-${name}`, name])
      }
    }
  }
}
