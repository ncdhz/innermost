import Vue from 'vue'
import { ExtensionManager } from './ExtensionManager'
export default class ExtensionBody {
  extensionManager: ExtensionManager
  constructor(extensionManager: ExtensionManager) {
    this.extensionManager = extensionManager
  }

  public extensionBodyComponent(name: string, extensionBodyData: Vue) {
    if (extensionBodyData) {
      Vue.component(`body-${name}`, extensionBodyData)
      this.extensionManager.setBody([`body-${name}`, name])
    }
  }
}
