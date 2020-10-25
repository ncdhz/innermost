import Vue from 'vue'
import _ from 'lodash'
import { ExtensionManager } from './ExtensionManager'
import MenuItem from '@/components/MenuItem.vue'
import ExtensionSettingInterface from '@/innermost/ExtensionSettingInterface'
export default class ExtensionSetting {
  extensionManager: ExtensionManager
  constructor(extensionManager: ExtensionManager) {
    this.extensionManager = extensionManager
  }

  public extensionSettingComponent(name: string, title: string | undefined, items: ExtensionSettingInterface['items'], extensionSettingData: Vue | undefined, isClass: boolean) {
    if (title) {
      this.extensionManager.setSettingTitle([title, name])
    }
    const addSettingToComponent = (clazz: string, butName: string) => {
      const comName = `setting-${this.extensionManager.getRandomString5()}-${name}`
      Vue.component(comName, {
        template: `<menu-item ${clazz ? 'menu-icon="' + clazz + '"' : ''} menu-name="${butName}"/>`,
        components: {
          MenuItem
        }
      })
      this.extensionManager.setSetting([comName, name])
    }
    if (isClass) {
      _.forEach(items, item => {
        addSettingToComponent(item.clazz, item.name)
      })
    } else if (extensionSettingData) {
      if (typeof items === 'object' && items.length > 0) {
        _.forEach(items, item => {
          addSettingToComponent(item.clazz, item.name)
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
