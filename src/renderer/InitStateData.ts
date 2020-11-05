import { ExtensionManager } from '@/plugins'
import { ActionTypes, MutationTypes } from '@/store'
import _ from 'lodash'
export class InitStateData {
  public static initExtensionIcons(vue: Vue) {
    const icons = ExtensionManager.getIcons()
    const extensions: {
      [key: string]: boolean;
    } = {}

    const extensionIcons: {
      [key: string]: boolean;
    } = {}

    _.forEach(icons, icon => {
      extensions[icon[1] as string] = false
      extensionIcons[icon[1] as string] = icon[2] as boolean
    })
    vue.$store.commit(MutationTypes.ADD_EXTENSION_ICONS, extensionIcons)
    vue.$store.dispatch(ActionTypes.ADD_EXTENSIONS, extensions)
  }

  public static initExtensionIds(vue: Vue) {
    const extensionIds = ExtensionManager.getExtensionIds()
    vue.$store.commit(MutationTypes.ADD_EXTENSION_IDS, extensionIds)
  }

  // 初始化扩展状态
  public static initExtensionStates(vue: Vue) {
    vue.$store.commit(MutationTypes.ADD_EXTENSION_STATES, ExtensionManager.getStates())
  }

  public static initExtensionThemes(vue: Vue) {
    vue.$store.commit(MutationTypes.ADD_EXTENSION_THEMES, ExtensionManager.getThemes())
  }
}
