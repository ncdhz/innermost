import { ExtensionManager } from './ExtensionManager'
import ExtensionBodyInterface from '@/innermost/ExtensionBodyInterface'
import _ from 'lodash'
export default class ExtensionBody {
  extensionManager: ExtensionManager
  constructor(extensionManager: ExtensionManager) {
    this.extensionManager = extensionManager
  }

  public extensionBodyComponent(name: string, extensionBodyData: any, id: string | undefined, isDefault: boolean | undefined, extensionBodyPages: ExtensionBodyInterface['pages'], idConfig: {[key: string]: boolean}) {
    const bodyIds: {
      [key: string]: string | boolean;
    }[] = []
    if (extensionBodyData) {
      this.extensionManager.extensionData(`body-${name}`, extensionBodyData, name)
      this.extensionManager.setBody([`body-${name}`, name, id ? id as string : name])
      bodyIds.push({
        name,
        id: id ? id as string : name,
        default: !idConfig.iSdeflate && isDefault ? (idConfig.iSdeflate = true, true) : false
      })
    }
    if (typeof extensionBodyPages === 'object') {
      _.forEach(extensionBodyPages, page => {
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
