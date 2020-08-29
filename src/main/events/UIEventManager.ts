import { ipcMain } from 'electron'
import { WindowManager } from '../ui/WindowManager'
import { TrayManager } from '../ui/TrayManager'
import { MenuManager } from '../ui/MenuManager'
import events from 'events'
import MainEventTypes from './MainEventTypes'
import { I18nUtil, EventTypes } from '@/utils'
import { strict } from 'assert'

export class UIEventManager {

  trayManager: TrayManager | undefined
  menuManager: MenuManager | undefined
  windowManager: WindowManager | undefined
  static uiEvent: events.EventEmitter = new events.EventEmitter()

  constructor(windowManager: WindowManager) {
    this.windowManager = windowManager
    this.trayManager = windowManager.trayManager
    this.menuManager = windowManager.menuManager
    this.initUIEventManager()

  }

  private initUIEventManager(): void{
    this.changingLanguage()
    this.openAbout()
    this.closeWindow()
  }
  /**
   * 更换语言
   */
  private changingLanguage(): void{
    ipcMain.on(EventTypes.CHANGING_LANGUAGE, (event, locale) => {
      I18nUtil.setLocale(locale)
      this.menuManager?.initMenu()
      this.trayManager?.initTary()
    })
  }
  /**
   * 打开关于
   */
  private openAbout(): void {
    UIEventManager.uiEvent.on(MainEventTypes.OPEN_ABOUT, ()=>{
      // 发信息给界面进程让他打开 about 页面
      this.windowManager?.win?.webContents.send(EventTypes.OPEN_ABOUT)
    })
  }
  /**
   * 关闭窗口
   */
  private closeWindow(): void {
    ipcMain.on(EventTypes.CLOSE_WINDOW, (event, arg: string) => {
      this.windowManager?.close()
      if (arg === EventTypes.OPEN_WINDOW) {
        this.windowManager?.createWindow()
      }
    })
  }
}
