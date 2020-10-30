import { ExtensionManager } from '@/plugins'
import { MutationTypes } from '@/store'
import { GlobalConfig, I18nUtil, UserConfig, UserConfigKeys, ExtensionConfig } from '@/utils'
import electron, { remote } from 'electron'
import { CMenu } from './CMenu'
import UIEventManager from './events/UIEventManager'
const { MenuItem, Menu } = remote
const i18n = I18nUtil.getI18n()
export class ContextMenu {
  // 打开或者关闭图标栏
  public static getOpenOrCloseIconBar() {
    if (this.closeIconAndMenu()[1]) {
      return undefined
    }
    if (GlobalConfig.appWindow.icon.show) {
      return new MenuItem({
        label: i18n.t('tray.closeIconBar') as string,
        click() {
          UIEventManager.openOrCloseIconBar(false)
        }
      })
    } else {
      return new MenuItem({
        label: i18n.t('tray.openIconBar') as string,
        click() {
          UIEventManager.openOrCloseIconBar(true)
        }
      })
    }
  }

  private static closeIconAndMenu() {
    const name = ExtensionConfig.getExtensionConfig(ExtensionConfig.CurrentExtension)
    return ExtensionManager.closeIconAndMenu(name)
  }

  private static moveIconAndMenu() {
    const name = ExtensionConfig.getExtensionConfig(ExtensionConfig.CurrentExtension)
    return ExtensionManager.moveIconAndMenu(name)
  }

  // 打开或者关闭菜单栏
  public static getOpenOrCloseMenuBar() {
    if (this.closeIconAndMenu()[1]) {
      return undefined
    }
    if (GlobalConfig.appWindow.content.menu.show) {
      return new MenuItem({
        label: i18n.t('tray.closeMenuBar') as string,
        click() {
          UIEventManager.openOrCloseMenuBar(false)
        }
      })
    } else {
      return new MenuItem({
        label: i18n.t('tray.openMenuBar') as string,
        click() {
          UIEventManager.openOrCloseMenuBar(true)
        }
      })
    }
  }

  // 获取分割线
  public static getSeparator() {
    return new MenuItem({
      type: 'separator'
    })
  }

  public static getIconMove(vue: Vue) {
    if (this.moveIconAndMenu()[0]) {
      return undefined
    }
    if (GlobalConfig.appWindow.icon.left) {
      return new MenuItem({
        label: i18n.t('setting.basic.moveIconBarRight') as string,
        click() {
          GlobalConfig.appWindow.icon.left = false
          vue.$store.commit(MutationTypes.UPDATE_ICON_LEFT, false)
        }
      })
    } else {
      return new MenuItem({
        label: i18n.t('setting.basic.moveIconBarLeft') as string,
        click() {
          GlobalConfig.appWindow.icon.left = true
          vue.$store.commit(MutationTypes.UPDATE_ICON_LEFT, true)
        }
      })
    }
  }

  public static getMenuMove(vue: Vue) {
    if (this.moveIconAndMenu()[1]) {
      return undefined
    }
    if (GlobalConfig.appWindow.content.menu.left) {
      return new MenuItem({
        label: i18n.t('setting.basic.moveMenuBarRight') as string,
        click() {
          GlobalConfig.appWindow.content.menu.left = false
          vue.$store.commit(MutationTypes.UPDATE_MENU_LEFT, false)
        }
      })
    } else {
      return new MenuItem({
        label: i18n.t('setting.basic.moveMenuBarLeft') as string,
        click() {
          GlobalConfig.appWindow.content.menu.left = true
          vue.$store.commit(MutationTypes.UPDATE_MENU_LEFT, true)
        }
      })
    }
  }

  public static getDisableExtension(name: string, vue: Vue) {
    return new MenuItem({
      label: i18n.t('extension.disable') as string,
      click() {
        vue.$store.commit(MutationTypes.UPDATE_EXTENSION_ICON, {
          name,
          show: true
        })
        UserConfig.writeUserConfig({
          [UserConfigKeys.DisableExtension]: {
            [name]: true
          }
        })
      }
    })
  }

  public static getMenu(): CMenu {
    const menu = new Menu();
    (menu as CMenu).push = (menuItem: electron.MenuItem | undefined) => {
      if (menuItem) {
        menu.append(menuItem)
      }
      return menu as CMenu
    }
    return menu as CMenu
  }
}
