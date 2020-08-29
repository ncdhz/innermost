import { I18nUtil } from '@/utils'
import { Menu, MenuItemConstructorOptions, MenuItem} from 'electron'
import MainEventTypes from '@/main/events/MainEventTypes'
import { UIEventManager } from '@/main/events/UIEventManager'
const i18n = I18nUtil.i18n
export class MenuManager {

  constructor() {
    this.initMenu()
  }

  public initMenu(): void{
    const template: (MenuItemConstructorOptions | MenuItem)[] = [
      {
        label: i18n.t('menu.ineermost.name') as string,
        submenu: [
          {
            label: i18n.t('menu.ineermost.about') as string,
            click() {
              UIEventManager.uiEvent.emit(MainEventTypes.OPEN_ABOUT)
            }
          }
        ]
      },
      {
        label: i18n.t('menu.window.name') as string,
        submenu: [
          {
            label: i18n.t('menu.ineermost.about') as string,
            click() {
              UIEventManager.uiEvent.emit(MainEventTypes.OPEN_ABOUT)
            }
          }
        ]
      }
    ]
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
  }
}
