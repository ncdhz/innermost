import { Menu, Tray, globalShortcut } from 'electron'
import { I18nUtil, AppGlobalEnv, GlobalConfig, EventTypes } from '@/utils'
import { UIEventManager } from '@/main/events/UIEventManager'
import path from 'path'
const i18n = I18nUtil.getI18n()
export class TrayManager {
  private tray: Tray | undefined;
  private uiEventManager: UIEventManager | undefined
  private contextMenu: Menu | undefined
  constructor() {
    this.tray = new Tray(path.join(AppGlobalEnv.PUBLIC_FILE_PATH, 'icons', 'tray.png'))
    this.initTary()
    this.acceleratorTray()
    this.tray.addListener('click', () => {
      this.updateIconAndMenu()
    })
  }

  // 更新Tary菜单选项数据
  public updateIconAndMenu() {
    const contextMenu = (this.contextMenu as Menu)
    contextMenu.getMenuItemById(EventTypes.CLOSE_ICON_BAR).visible = GlobalConfig.appWindow.icon.show
    contextMenu.getMenuItemById(EventTypes.CLOSE_MENU_BAR).visible = GlobalConfig.appWindow.content.menu.show
    contextMenu.getMenuItemById(EventTypes.OPEN_ICON_BAR).visible = !GlobalConfig.appWindow.icon.show
    contextMenu.getMenuItemById(EventTypes.OPEN_MENU_BAR).visible = !GlobalConfig.appWindow.content.menu.show
    contextMenu.getMenuItemById(EventTypes.MOVE_ICON_LEFT).visible = !GlobalConfig.appWindow.icon.left
    contextMenu.getMenuItemById(EventTypes.MOVE_MENU_LEFT).visible = !GlobalConfig.appWindow.content.menu.left
    contextMenu.getMenuItemById(EventTypes.MOVE_ICON_RIGHT).visible = GlobalConfig.appWindow.icon.left
    contextMenu.getMenuItemById(EventTypes.MOVE_MENU_RIGHT).visible = GlobalConfig.appWindow.content.menu.left
  }

  // 给 tray 添加全局快捷键
  private acceleratorTray() {
    globalShortcut.register('CommandOrControl+Shift+M', () => {
      if (GlobalConfig.appWindow.content.menu.show) {
        this.uiEventManager?.closeMenuBar()
      } else {
        this.uiEventManager?.openMenuBar()
      }
    })
    globalShortcut.register('CommandOrControl+Shift+I', () => {
      if (GlobalConfig.appWindow.icon.show) {
        this.uiEventManager?.closeIconBar()
      } else {
        this.uiEventManager?.openIconBar()
      }
    })
  }

  public setUIEventManager(uiEventManager: UIEventManager) {
    this.uiEventManager = uiEventManager
  }

  public initTary(): void{
    const _this = this
    const contextMenu = Menu.buildFromTemplate([
      {
        label: i18n.t('tray.closeMenuBar') as string,
        visible: GlobalConfig.appWindow.content.menu.show,
        id: EventTypes.CLOSE_MENU_BAR,
        click() {
          _this.uiEventManager?.closeMenuBar()
        }
      },
      {
        label: i18n.t('tray.closeIconBar') as string,
        visible: GlobalConfig.appWindow.icon.show,
        id: EventTypes.CLOSE_ICON_BAR,
        click() {
          _this.uiEventManager?.closeIconBar()
        }
      },
      {
        label: i18n.t('tray.openMenuBar') as string,
        visible: !GlobalConfig.appWindow.content.menu.show,
        id: EventTypes.OPEN_MENU_BAR,
        click() {
          _this.uiEventManager?.openMenuBar()
        }
      },
      {
        label: i18n.t('tray.openIconBar') as string,
        visible: !GlobalConfig.appWindow.icon.show,
        id: EventTypes.OPEN_ICON_BAR,
        click() {
          _this.uiEventManager?.openIconBar()
        }
      },
      {
        type: 'separator'
      },
      {
        label: i18n.t('tray.moveMenuBarLeft') as string,
        visible: !GlobalConfig.appWindow.content.menu.left,
        id: EventTypes.MOVE_MENU_LEFT,
        click() {
          _this.uiEventManager?.leftMoveMenu()
        }
      },
      {
        label: i18n.t('tray.moveIconBarLeft') as string,
        visible: !GlobalConfig.appWindow.icon.left,
        id: EventTypes.MOVE_ICON_LEFT,
        click() {
          _this.uiEventManager?.leftMoveIcon()
        }
      },
      {
        label: i18n.t('tray.moveMenuBarRight') as string,
        visible: GlobalConfig.appWindow.content.menu.left,
        id: EventTypes.MOVE_MENU_RIGHT,
        click() {
          _this.uiEventManager?.rightMoveMenu()
        }
      },
      {
        label: i18n.t('tray.moveIconBarRight') as string,
        visible: GlobalConfig.appWindow.icon.left,
        id: EventTypes.MOVE_ICON_RIGHT,
        click() {
          _this.uiEventManager?.rightMoveIcon()
        }
      },
      {
        type: 'separator'
      },
      {
        label: i18n.t('tray.preferences') as string,
        click() {
          _this.uiEventManager?.openPreferences()
        }
      },
      {
        type: 'separator'
      },
      {
        label: i18n.t('tray.quit') as string,
        role: 'quit'
      }
    ])
    this.contextMenu = contextMenu
    this.tray?.setContextMenu(contextMenu)
  }
}
