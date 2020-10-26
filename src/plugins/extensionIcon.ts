import Vue from 'vue'
import Icon from '@/components/Icon.vue'
import { ExtensionManager } from './ExtensionManager'
import { MutationTypes } from '@/store'
import InnermostIconEventInterface from '@/innermost/InnermostIconEventInterface'
import { GlobalConfig } from '@/utils'
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
  public extensionIconComponent(name: string, path: string | undefined, clazz: string | undefined, extensionIconData: any, isClass: boolean) {
    const defaultExtension = GlobalConfig.getUserConfig('default-extension') === path
    const addIconToComponent = () => {
      Vue.component(`icon-${name}`, {
        template: `<icon :event-array="showExtension" icon-class="${clazz}"></icon>`,
        components: {
          Icon
        },
        computed: {
          showExtension(): Array<InnermostIconEventInterface> {
            const openExtension = () => {
              this.$store.dispatch(MutationTypes.UPDATE_EXTENSION, { name, path })
            }
            return [
              {
                name: 'click',
                func: () => openExtension()
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
        this.extensionManager.setIcon([`icon-style-${name}`, name, defaultExtension])
      } else {
        this.extensionManager.extensionData(`icon-${name}`, extensionIconData, name)
      }
    }
    this.extensionManager.setIcon([`icon-${name}`, name, defaultExtension])
  }
}
