import { ipcMain } from 'electron'
import { WindowManager } from '../ui/WindowManager'
import { TrayManager } from '../ui/TrayManager'
import { MenuManager } from '../ui/MenuManager'
import { I18nUtil, EventTypes, GlobalConfig } from '@/utils'

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
    this.openOrCloseIconAndMenuBar()
    this.leftOrRightMoveIconAndMenu()
  }

  /**
   * 更换语言
   */
  private changingLanguage(): void {
    ipcMain.on(EventTypes.CHANGING_LANGUAGE, (event, locale) => {
      I18nUtil.setLocale(locale)
      this.refreshMenuAndTary()
    })
  }

  public refreshMenuAndTary() {
    this.menuManager?.initMenu()
    this.trayManager?.initTary()
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

  public closeMenuBar() {
    this.windowManager?.win?.webContents.send(EventTypes.CLOSE_MENU_BAR)
  }

  public closeIconBar() {
    this.windowManager?.win?.webContents.send(EventTypes.CLOSE_ICON_BAR)
  }

  public openMenuBar() {
    this.windowManager?.win?.webContents.send(EventTypes.OPEN_MENU_BAR)
  }

  public openIconBar() {
    this.windowManager?.win?.webContents.send(EventTypes.OPEN_ICON_BAR)
  }

  private openOrCloseIconAndMenuBar() {
    ipcMain.on(EventTypes.OPEN_ICON_BAR, () => {
      GlobalConfig.appWindow.icon.show = true
    })
    ipcMain.on(EventTypes.CLOSE_ICON_BAR, () => {
      GlobalConfig.appWindow.icon.show = false
    })
    ipcMain.on(EventTypes.OPEN_MENU_BAR, () => {
      GlobalConfig.appWindow.content.menu.show = true
    })
    ipcMain.on(EventTypes.CLOSE_MENU_BAR, () => {
      GlobalConfig.appWindow.content.menu.show = false
    })
  }

  public leftMoveIcon() {
    this.windowManager?.win?.webContents.send(EventTypes.MOVE_ICON_LEFT)
  }

  public rightMoveIcon() {
    this.windowManager?.win?.webContents.send(EventTypes.MOVE_ICON_RIGHT)
  }

  public leftMoveMenu() {
    this.windowManager?.win?.webContents.send(EventTypes.MOVE_MENU_LEFT)
  }

  public rightMoveMenu() {
    this.windowManager?.win?.webContents.send(EventTypes.MOVE_MENU_RIGHT)
  }

  private leftOrRightMoveIconAndMenu() {
    ipcMain.on(EventTypes.MOVE_ICON_LEFT, () => {
      GlobalConfig.appWindow.icon.left = true
    })
    ipcMain.on(EventTypes.MOVE_ICON_RIGHT, () => {
      GlobalConfig.appWindow.icon.left = false
    })
    ipcMain.on(EventTypes.MOVE_MENU_LEFT, () => {
      GlobalConfig.appWindow.content.menu.left = true
    })
    ipcMain.on(EventTypes.MOVE_MENU_RIGHT, () => {
      GlobalConfig.appWindow.content.menu.left = false
    })
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
