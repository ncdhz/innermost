import Vue from 'vue'
import Icon from '@/components/Icon.vue'
import { ExtensionManager } from './ExtensionManager'
export default class ExtensionIcon {
  private extensionManager: ExtensionManager
  constructor(extensionManager: ExtensionManager) {
    this.extensionManager = extensionManager
  }

  /**
   * 用于生产icon组件
   * @param name 组件名子
   * @param extensionIconData 组件数据
   * @param isClass html 中的 class
   */
  public getExtensionIconComponent(name: string, clazz: string | undefined, extensionIconData: Vue | undefined, isClass: boolean) {
    const addIconToComponent = () => {
      Vue.component(`icon-${name}`, {
        template: `<icon icon-class="${clazz}"></icon>`,
        components: {
          Icon
        }
      })
    }
    if (isClass) {
      addIconToComponent()
    } else {
      if (typeof clazz === 'string') {
        addIconToComponent()
        Vue.component(`icon-style-${name}`, extensionIconData as Vue)
        this.extensionManager.setIcon([`icon-style-${name}`, name])
      } else {
        Vue.component(`icon-${name}`, extensionIconData as Vue)
      }
    }
    this.extensionManager.setIcon([`icon-${name}`, name])
  }
}
