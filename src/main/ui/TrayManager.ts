import { Menu, Tray } from 'electron'
import { I18nUtil, AppGlobalEnv } from '@/utils'
import { UIEventManager } from '@/main/events/UIEventManager'
import path from 'path'
const i18n = I18nUtil.i18n

export class TrayManager {

  tray: Tray | undefined;
  uiEventManager: UIEventManager | undefined

  constructor(){
    this.tray = new Tray(path.join(AppGlobalEnv.PUBLIC_FILE_PATH, 'icons', 'tray.png'))
    this.initTary();
  }

  public setUIEventManager(uiEventManager: UIEventManager) {
    this.uiEventManager = uiEventManager
  }

  public initTary(): void{
    const contextMenu = Menu.buildFromTemplate([
      {
        type: 'separator'
      },
      {
        label: i18n.t('tray.quit') as string,
        role: 'quit'
      }
    ])
    this.tray?.setContextMenu(contextMenu)
  }
}
