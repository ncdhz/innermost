import { ipcRenderer } from 'electron'
import { EventTypes, GlobalConfig, SettingConfig } from '@/utils'
import MutationTypes from '@/store/MutationTypes'
import Vue from 'vue'
class UIEventManager {
  vue: Vue | undefined
  init(vue: Vue) {
    this.vue = vue
    this.globalUpdate()
    this.openPreferences()
    this.openOrCloseIconAndMenuBar()
  }

  /**
   * 用于更新全局配置
   */
  private globalUpdate(): void {
    ipcRenderer.on(EventTypes.UPDATE_CONFIG, (event, config: object) => {
      GlobalConfig.writeGlobalConfig(config)
    })
  }

  public openOrCloseIconBar(show: boolean) {
    if (GlobalConfig.appWindow.limit.one > GlobalConfig.appWindow.width) {
      this.vue?.$message({
        message: this.vue?.$i18n.t('setting.error.widthNarrow') as string,
        type: 'error'
      })
    } else {
      GlobalConfig.appWindow.icon.show = show
      GlobalConfig.writeGlobalConfig({
        appWindow: {
          icon: {
            show: show
          }
        }
      })
      this.vue?.$store.commit(MutationTypes.ICON_SHOW, show)
      if (show) {
        ipcRenderer.send(EventTypes.OPEN_ICON_BAR)
      } else {
        ipcRenderer.send(EventTypes.CLOSE_ICON_BAR)
      }
    }
  }

  public openOrCloseMenuBar(show: boolean) {
    if (GlobalConfig.appWindow.limit.two > GlobalConfig.appWindow.width) {
      this.vue?.$message({
        message: this.vue?.$i18n.t('setting.error.widthNarrow') as string,
        type: 'error'
      })
    } else {
      GlobalConfig.appWindow.content.menu.show = show
      GlobalConfig.writeGlobalConfig({
        appWindow: {
          content: {
            menu: {
              show: show
            }
          }
        }
      })
      this.vue?.$store.commit(MutationTypes.MENU_SHOW, show)
      if (show) {
        ipcRenderer.send(EventTypes.OPEN_MENU_BAR)
      } else {
        ipcRenderer.send(EventTypes.CLOSE_MENU_BAR)
      }
    }
  }

  private openOrCloseIconAndMenuBar() {
    ipcRenderer.on(EventTypes.OPEN_ICON_BAR, () => {
      this.openOrCloseIconBar(true)
    })
    ipcRenderer.on(EventTypes.CLOSE_ICON_BAR, () => {
      this.openOrCloseIconBar(false)
    })
    ipcRenderer.on(EventTypes.OPEN_MENU_BAR, () => {
      this.openOrCloseMenuBar(true)
    })
    ipcRenderer.on(EventTypes.CLOSE_MENU_BAR, () => {
      this.openOrCloseMenuBar(false)
    })
  }

  /**
   * 用于打开Preferences
   */
  private openPreferences(): void {
    ipcRenderer.on(EventTypes.OPEN_PREFERENCES, () => {
      if (this.vue) {
        this.vue.$store.dispatch(MutationTypes.UPDATE_EXTENSION, { name: SettingConfig.SettingName })
      }
    })
  }
}

export default new UIEventManager()
