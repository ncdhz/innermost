import { Menu, Tray } from 'electron'
import { I18nUtil, AppGlobalEnv } from '@/utils'
import path from 'path'
export class TrayManager {

  tray: Tray | undefined;

  constructor(){
    this.tray = new Tray(path.join(AppGlobalEnv.PUBLIC_FILE_PATH, 'icons', 'icon.png'))
    this.initTary();
  }

  public initTary(): void{
    const contextMenu = Menu.buildFromTemplate([
      { label: 'Item1', type: 'radio' },
      { label: I18nUtil.i18n.t('menu.ineermost.about') as string, type: 'radio' },
      { label: 'Item3', type: 'radio', checked: true },
      { label: 'Item4', type: 'radio' }
    ])
    this.tray?.setContextMenu(contextMenu)
  }
}
