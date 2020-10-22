import { ipcMain } from 'electron'
import { WindowManager } from '../ui/WindowManager'
import { TrayManager } from '../ui/TrayManager'
import { MenuManager } from '../ui/MenuManager'
import { I18nUtil, EventTypes } from '@/utils'

export class UIEventManager {
  trayManager: TrayManager | undefined
  menuManager: MenuManager | undefined
  windowManager: WindowManager | undefined

  constructor(windowManager: WindowManager) {
    this.windowManager = windowManager
    this.trayManager = windowManager.trayManager
    this.menuManager = windowManager.menuManager
    this.trayManager?.setUIEventManager(this)
    this.menuManager?.setUIEventManager(this)
    this.initUIEventManager()
  }

  private initUIEventManager(): void{
    this.changingLanguage()
    this.closeWindow()
    this.maxWindow()
    this.minWindow()
  }


  /**
   * 更换语言
   */
  private changingLanguage(): void {
    ipcMain.on(EventTypes.CHANGING_LANGUAGE, (event, locale) => {
      I18nUtil.setLocale(locale)
      this.menuManager?.initMenu()
      this.trayManager?.initTary()
    })
  }

  /**
   * 打开关于
   */
  public openAbout(): void {
    // 发信息给界面进程让他打开 about 页面
    this.windowManager?.win?.webContents.send(EventTypes.OPEN_ABOUT)
  }

  /**
   * 打开设置
   */
  public openPreferences(): void {
    // 发信息给界面进程让他打开 about 页面
    this.windowManager?.win?.webContents.send(EventTypes.OPEN_PREFERENCES)
  }

  /**
   * 关闭窗口
   */
  private closeWindow(): void {
    ipcMain.on(EventTypes.CLOSE_WINDOW, (event, arg: string) => {
      this.windowManager?.closeWindow()
      if (arg === EventTypes.OPEN_WINDOW) {
        this.windowManager?.createWindow()
      }
    })
  }

  /**
   * 最小化窗口
   */
  private minWindow(): void {
    ipcMain.on(EventTypes.MIN_WINDOW, () => {
      this.windowManager?.minWindow()
    })
  }

  /**
   * 最大化窗口
   */
  private maxWindow(): void {
    ipcMain.on(EventTypes.MAX_WINDOW, () => {
      this.windowManager?.maxWindow()
    })
  }
}
