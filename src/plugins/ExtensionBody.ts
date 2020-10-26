import { ExtensionManager } from './ExtensionManager'
export default class ExtensionBody {
  extensionManager: ExtensionManager
  constructor(extensionManager: ExtensionManager) {
    this.extensionManager = extensionManager
  }

  public extensionBodyComponent(name: string, extensionBodyData: any) {
    if (extensionBodyData) {
      this.extensionManager.extensionData(`body-${name}`, extensionBodyData, name)
      this.extensionManager.setBody([`body-${name}`, name])
    }
  }
}
