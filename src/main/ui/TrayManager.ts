import { Menu, Tray } from 'electron'
import { APP_GLOBLE_ENV } from '@/utils'
import path from 'path'
export class TrayManager {
  private tray: Tray;

  constructor(){
    this.tray = new Tray(path.join(APP_GLOBLE_ENV.MAIN_FILE_PATH, 'icons', 'icon.png'))
    const contextMenu = Menu.buildFromTemplate([
      { label: 'Item1', type: 'radio' },
      { label: 'Item2', type: 'radio' },
      { label: 'Item3', type: 'radio', checked: true },
      { label: 'Item4', type: 'radio' }
    ])
    this.tray.setContextMenu(contextMenu)
  }
}
