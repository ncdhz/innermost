import Vue from 'vue'
import Icon from '@/components/Icon.vue'
import { ExtensionManager } from './ExtensionManager'
import { MutationTypes } from '@/store'
import InnermostIconEventInterface from '@/innermost/InnermostIconEventInterface'
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
  public extensionIconComponent(name: string, clazz: string | undefined, extensionIconData: any, isClass: boolean) {
    const addIconToComponent = () => {
      Vue.component(`icon-${name}`, {
        template: `<icon :event-array="showExtension" icon-class="${clazz}"></icon>`,
        components: {
          Icon
        },
        computed: {
          showExtension(): Array<InnermostIconEventInterface> {
            const _this = this
            return [
              {
                name: 'click',
                func() {
                  _this.$store.dispatch(MutationTypes.UPDATE_EXTENSION, name)
                }
              }
            ]
          }
        }
      })
    }
    if (isClass) {
      addIconToComponent()
    } else if (extensionIconData) {
      if (typeof clazz === 'string') {
        addIconToComponent()
        this.extensionManager.extensionData(`icon-style-${name}`, extensionIconData, name)
        this.extensionManager.setIcon([`icon-style-${name}`, name])
      } else {
        this.extensionManager.extensionData(`icon-${name}`, extensionIconData, name)
      }
    }
    this.extensionManager.setIcon([`icon-${name}`, name])
  }
}
