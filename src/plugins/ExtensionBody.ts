import Vue from 'vue'
export default class ExtensionBody {
  public getExtensionIconComponent(extensionBodyData: Vue) {
    if (extensionBodyData) {
      Vue.component(name, extensionBodyData)
    }
  }
}
