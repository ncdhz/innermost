import { GlobalConfig, I18nUtil, UserConfig, UserConfigKey } from '@/utils'
import electron, { remote } from 'electron'
import { CMenu } from './CMenu'
import UIEventManager from './events/UIEventManager'
const { MenuItem, Menu } = remote
const i18n = I18nUtil.getI18n()
export class ContextMenu {
  // 打开或者关闭图标栏
  public static getOpenOrCloseIconBar() {
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

  // 打开或者关闭菜单栏
  public static getOpenOrCloseMenuBar() {
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

  public static getDisableExtension(name: string) {
    return new MenuItem({
      label: i18n.t('extension.disable') as string,
      click() {
        UserConfig.writeUserConfig({
          [UserConfigKey.DisableExtension]: {
            [name]: true
          }
        })
      }
    })
  }

  public static getMenu(): CMenu {
    const menu = new Menu();
    (menu as CMenu).push = (menuItem: electron.MenuItem) => {
      menu.append(menuItem)
      return menu as CMenu
    }
    return menu as CMenu
  }
}
