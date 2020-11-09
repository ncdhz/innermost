import { ExtensionSettingInterface } from '@/innermost'
import { ExtensionManager } from './ExtensionManager'
import { SettingConfig } from '@/utils'
import _ from 'lodash'
export default class ExtensionSetting {
  extensionManager: ExtensionManager
  constructor(extensionManager: ExtensionManager) {
    this.extensionManager = extensionManager
  }

  extensionSetting(name: string, { items }: ExtensionSettingInterface) {
    if (typeof items === 'object') {
      const settingIds: {
        [key: string]: string | boolean;
      }[] = []
      _.forEach(items, item => {
        item.id = item.id ? item.id + this.extensionManager.getRandomString10() : this.extensionManager.getRandomString10()
        this.extensionManager.extensionMenuData(SettingConfig.SettingName, item, name)
        if (item.data) {
          const dataName = `${SettingConfig.SettingName}-${this.extensionManager.getRandomString10()}`
          this.extensionManager.extensionData(dataName, item.data)
          // 每项意义：1. 组件名字 2. 组件所属分组 3. 组件所属id 4. 组件的 title 或 名字，i18n(是否国际化) {对象}
          this.extensionManager.setSetting([dataName, SettingConfig.SettingName, item.id, {
            title: item.title ? item.title : item.name,
            name: name,
            i18n: !!item.i18n,
            parentI18n: !!item.parentI18n
          }])
        }
        settingIds.push({
          name: SettingConfig.SettingName,
          id: item.id,
          default: false
        })
      })
      this.extensionManager.setExtensionIds(settingIds)
    }
  }
}
