import _ from 'lodash'
import { ExtensionManager } from './ExtensionManager'
import { ExtensionMenuInterface } from '@/innermost'
export default class ExtensionMenu {
  extensionManager: ExtensionManager

  constructor(extensionManager: ExtensionManager) {
    this.extensionManager = extensionManager
  }

  public extensionMenuComponent(name: string, { title, isClass, items, data }: ExtensionMenuInterface, idConfig: {[key: string]: boolean}) {
    if (title && (typeof title === 'string' || typeof title === 'object')) {
      this.extensionManager.setMenuTitle([title, name])
    }
    // 用于存放按钮的 name id
    const butIds: {
      [key: string]: string | boolean;
    }[] = []
    if (isClass) {
      _.forEach(items, item => {
        this.extensionManager.extensionMenuData(name, item, name)
        butIds.push({
          name,
          id: item.id ? item.id : name,
          default: !idConfig.iSdeflate && item.default ? (idConfig.iSdeflate = true, true) : false
        })
      })
    } else {
      this.extensionManager.extensionData(`menu-${name}`, data)
      this.extensionManager.setMenu([`menu-${name}`, name])
    }
    if (butIds.length > 0) {
      this.extensionManager.setExtensionIds(butIds)
    }
  }
}
