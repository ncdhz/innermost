import { ipcRenderer } from 'electron'
import { EventTypes, GlobalConfig } from '@/utils'
import MutationTypes from '@/store/MutationTypes'
import Vue from 'vue'
class UIEventManager {
  vue: Vue | undefined
  constructor(vue: Vue) {
    this.vue = vue
  }

  initUIEventManager(): void {
    this.globalUpdate()
    this.openPreferences()
  }

  /**
   * 用于更新全局配置
   */
  private globalUpdate(): void {
    ipcRenderer.on(EventTypes.UPDATE_CONFIG, (event, config: object) => {
      GlobalConfig.writeGlobalConfig(config)
    })
  }

  /**
   * 用于打开Preferences
   */
  private openPreferences(): void {
    ipcRenderer.on(EventTypes.OPEN_PREFERENCES, () => {
      if (this.vue) {
        this.vue.$store.commit(MutationTypes.SETTING_SHOW, true)
      }
    })
  }
}

export default {
  init(vue: Vue): void {
    const uiEventManager = new UIEventManager(vue)
    uiEventManager.initUIEventManager()
  }
}
