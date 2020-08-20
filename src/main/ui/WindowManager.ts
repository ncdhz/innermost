'use strict'
import { TrayManager } from '@/main/ui/TrayManager'
import { MenuManager } from '@/main/ui/MenuManager'
import { app, BrowserWindow } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import { GlobalConfig } from '@/utils'
// import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'

class WindowManager{
  private static windowManager: WindowManager = new WindowManager()
  win: BrowserWindow | undefined | null
  private constructor() {
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
    app.on('ready', async () => {
      new MenuManager()
      new TrayManager()
      this.createWindow()
    })
  }

  private createWindow(){
    const sendWindowBounds = () => {
      if(this.win) {
        const bounds: object = (this.win as BrowserWindow).getContentBounds()
        this.win.webContents.send('app-window-bounds', bounds)
      }
    }

    this.win = new BrowserWindow({
      width: GlobalConfig.appWindow.width,
      height: GlobalConfig.appWindow.height,
      transparent: true,
      titleBarStyle: 'hidden',
      webPreferences: {
        nodeIntegration: (process.env
          .ELECTRON_NODE_INTEGRATION as unknown) as boolean
      }
    })
    this.win.show()
    if (process.env.WEBPACK_DEV_SERVER_URL) {
      // Load the url of the dev server if in development mode
      this.win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string)
      if (!process.env.IS_TEST) this.win.webContents.openDevTools()
    } else {
      createProtocol('app')
      // Load the index.html when not in development
      this.win.loadURL('app://./index.html')
    }
    this.win.on('closed', ()=> {
      this.win = null
    })
    this.win.on('resize', ()=> {
      sendWindowBounds()
    })
  }

}
