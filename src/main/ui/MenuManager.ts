import { I18nUtil } from '@/utils'
import { Menu, MenuItemConstructorOptions, MenuItem,ipcMain} from 'electron'
const i18n = I18nUtil.i18n
export class MenuManager {

  constructor() {
    this.initMenu()
    ipcMain.on('changing-language', (event, arg) => {
      this.setMenu(arg)
    })
  }

  initMenu() {
    const template: (MenuItemConstructorOptions | MenuItem)[] = [
      {
        label: i18n.t('menu.ineermost.name') as string,
        submenu: [
          { label: i18n.t('menu.ineermost.about') as string },
          { type: 'separator' }
        ]
      }
    ]
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
  }

  setMenu(locale: string) {
    i18n.locale = locale
    this.initMenu()
  }
}
