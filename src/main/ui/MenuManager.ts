import { I18nUtil } from '@/utils'
import { Menu, MenuItemConstructorOptions, MenuItem} from 'electron'
import { UIEventManager } from '@/main/events/UIEventManager'
const i18n = I18nUtil.i18n
export class MenuManager {

  uiEventManager: UIEventManager | undefined

  constructor() {
    this.initMenu()
  }

  public setUIEventManager(uiEventManager: UIEventManager) {
    this.uiEventManager = uiEventManager
  }

  public initMenu(): void {
    const _this = this

    const template: (MenuItemConstructorOptions | MenuItem)[] = [
      {
        label: i18n.t('menu.ineermost.name') as string,
        role: 'about',
        submenu: [
          {
            label: i18n.t('menu.ineermost.about') as string,
            click() {
              _this.uiEventManager?.openAbout()
            }
          },
          {
            label: i18n.t('menu.ineermost.preferences') as string,
            click() {
              _this.uiEventManager?.openPreferences()
            }
          }
        ]
      },
      {
        label: i18n.t('menu.edit.name') as string,
        role: 'editMenu',
        submenu: [
          {
            label: i18n.t('menu.edit.undo') as string,
            role: 'undo'
          },
          {
            label: i18n.t('menu.edit.redo') as string,
            role: 'redo'
          },
          {
            type: 'separator'
          },
          {
            label: i18n.t('menu.edit.cut') as string,
            role: 'cut'
          },
          {
            label: i18n.t('menu.edit.copy') as string,
            role: 'copy'
          },
          {
            label: i18n.t('menu.edit.paste') as string,
            role: 'paste'
          },
          {
            label: i18n.t('menu.edit.selectAll') as string,
            role: 'selectAll'
          }
        ]
      },
      {
        label: i18n.t('menu.window.name') as string,
        role: 'windowMenu',
        submenu: [
          {
            label: i18n.t('menu.window.minimize') as string,
            role: 'minimize'
          },
          {
            label: i18n.t('menu.window.close') as string,
            role: 'close'
          },
          {
            label: i18n.t('menu.window.reload') as string,
            role: 'reload'
          },
          {
            label: i18n.t('menu.window.togglefullscreen') as string,
            role: 'togglefullscreen'
          }
        ]
      }
    ]
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
  }
}
