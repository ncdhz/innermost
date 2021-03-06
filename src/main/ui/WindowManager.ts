import { TrayManager } from './TrayManager'
import { MenuManager } from './MenuManager'
import { UIEventManager } from '@/main/events/UIEventManager'
import { app, BrowserWindow, BrowserWindowConstructorOptions, Rectangle } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import { GlobalConfig, AppGlobalEnv, EventTypes } from '@/utils'
import is from 'electron-is'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
export class WindowManager {
  win: BrowserWindow | undefined | null
  trayManager: TrayManager | undefined
  menuManager: MenuManager | undefined
  uiEventManager: UIEventManager | undefined
  constructor() {
    this.initWindowManager()
  }

  private initWindowManager() {
    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        app.quit()
      }
    })

    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (this.win === null) {
        this.createWindow()
      }
    })
    app.whenReady().then(() => {
      this.menuManager = new MenuManager()
      this.trayManager = new TrayManager()
      this.uiEventManager = new UIEventManager(this)
    })

    app.on('ready', async() => {
      if (AppGlobalEnv.IS_DEVELOPMENT && !process.env.IS_TEST) {
        // Install Vue Devtools
        try {
          await installExtension(VUEJS_DEVTOOLS)
        } catch (e) {
          console.error('Vue Devtools failed to install:', e.toString())
        }
      }
      await this.createWindow()
    })
  }

  /**
   * 关闭窗口
   */
  public closeWindow() {
    this.win?.close()
  }

  /**
   * 最小化窗口
   */
  public minWindow() {
    this.win?.minimize()
  }

  /**
   * 最大化窗口
   */
  public maxWindow() {
    this.win?.maximize()
  }

  /**
   * 创建窗口
   */
  public createWindow() {
    const sendWindowBounds = () => {
      if (this.win) {
        const bounds: Rectangle = (this.win as BrowserWindow).getContentBounds()
        this.win.webContents.send(EventTypes.APP_WINDOW_BOUNDS, bounds)
      }
    }
    const browserWindowOptions: BrowserWindowConstructorOptions = {
      width: GlobalConfig.appWindow.width,
      height: GlobalConfig.appWindow.height,
      minWidth: GlobalConfig.appWindow.limit.minWidth,
      minHeight: GlobalConfig.appWindow.limit.minHeight,
      webPreferences: {
        nodeIntegration: (process.env
          .ELECTRON_NODE_INTEGRATION as unknown) as boolean,
        enableRemoteModule: true
      }
    }
    if (GlobalConfig.appWindow.x !== 0 || GlobalConfig.appWindow.y !== 0) {
      Object.assign(browserWindowOptions, {
        x: GlobalConfig.appWindow.x,
        y: GlobalConfig.appWindow.y
      })
    }
    // 用于判断各种不同的系统用于添加不同的属性
    if (is.macOS()) {
      Object.assign(browserWindowOptions, {
        transparent: true,
        titleBarStyle: 'hidden'
      })
    } else {
      Object.assign(browserWindowOptions, {
        useContentSize: true,
        frame: false,
        resizable: true
      })
    }
    this.win = new BrowserWindow(browserWindowOptions)

    if (process.env.WEBPACK_DEV_SERVER_URL) {
      // Load the url of the dev server if in development mode
      this.win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string)
      if (!process.env.IS_TEST) this.win.webContents.openDevTools()
    } else {
      createProtocol('app')
      // Load the index.html when not in development
      this.win.loadURL('app://./index.html')
    }
    this.win.on('close', () => {
      const bounds: Rectangle = (this.win as BrowserWindow).getContentBounds()
      this.win?.webContents.send(EventTypes.UPDATE_CONFIG, {
        appWindow: {
          height: bounds.height,
          width: bounds.width,
          x: bounds.x,
          y: bounds.y
        }
      })
    })
    this.win.on('closed', () => {
      this.win = null
    })

    this.win.on('resize', () => {
      sendWindowBounds()
    })
  }
}
export default new WindowManager()
