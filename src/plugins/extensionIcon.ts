import Vue from 'vue'
import Icon from '@/components/Icon.vue'
import { ExtensionManager } from './ExtensionManager'
import { ActionTypes } from '@/store'
import { ExtensionIconInterface } from '@/innermost'
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
  public extensionIconComponent(name: string, { clazz, data, isClass, func }: ExtensionIconInterface, isDisable: boolean) {
    const addIconToComponent = () => {
      Vue.component(`icon-${name}`, {
        template: `<icon :func="showExtension" icon-class="${clazz}"/>`,
        components: {
          Icon
        },
        methods: {
          showExtension() {
            if (func) {
              func(this)
            }
            this.$store.dispatch(ActionTypes.UPDATE_EXTENSION, { name })
          }
        }
      })
    }
    if (isClass) {
      addIconToComponent()
    } else if (data) {
      if (typeof clazz === 'string') {
        addIconToComponent()
        this.extensionManager.extensionData(`icon-style-${name}`, data, name)
        this.extensionManager.setIcon([`icon-style-${name}`, name, isDisable])
      } else {
        this.extensionManager.extensionData(`icon-${name}`, data, name)
      }
    }
    this.extensionManager.setIcon([`icon-${name}`, name, isDisable])
  }
}
