import { ExtensionManager } from './ExtensionManager'
import { ExtensionBodyInterface } from '@/innermost'
import _ from 'lodash'
export default class ExtensionBody {
  extensionManager: ExtensionManager
  constructor(extensionManager: ExtensionManager) {
    this.extensionManager = extensionManager
  }

  public extensionBodyComponent(name: string, { data, pages, id }: ExtensionBodyInterface, isDefault: boolean, idConfig: {[key: string]: boolean}) {
    const bodyIds: {
      [key: string]: string | boolean;
    }[] = []
    if (data) {
      this.extensionManager.extensionData(`body-${name}`, data, name)
      this.extensionManager.setBody([`body-${name}`, name, id ? id as string : name])
      bodyIds.push({
        name,
        id: id ? id as string : name,
        default: !idConfig.iSdeflate && isDefault ? (idConfig.iSdeflate = true, true) : false
      })
    }
    if (typeof pages === 'object') {
      _.forEach(pages, page => {
        if (page.data) {
          const pageName = `body-${this.extensionManager.getRandomString5()}-${name}`
          this.extensionManager.extensionData(pageName, page.data, name)
          this.extensionManager.setBody([pageName, name, page.id ? page.id as string : name])
          bodyIds.push({
            name,
            id: page.id ? page.id as string : name,
            default: !idConfig.iSdeflate && page.default ? (idConfig.iSdeflate = true, true) : false
          })
        }
      })
    }
    this.extensionManager.setExtensionIds(bodyIds)
  }
}
