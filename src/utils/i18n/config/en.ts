import enLocale from 'element-ui/lib/locale/lang/en'

export default {
  menu: {
    ineermost: {
      name: 'Ineermost',
      about: 'About Ineermost',
      preferences: 'Preferences'
    },
    edit: {
      name: 'Edit',
      undo: 'Undo',
      redo: 'edo',
      cut: 'Cut',
      copy: 'Copy',
      paste: 'Paste',
      selectAll: 'SelectAll'
    },
    window: {
      name: 'Window',
      minimize: 'Minimize',
      close: 'Close',
      reload: 'Reload',
      togglefullscreen: 'Togglefullscreen'
    },
    help: {
      name: 'Help',
      toggleDevTools: 'Toggle Developer Tools'
    }
  },
  tray: {
    closeMenuBar: 'Close menu bar',
    closeIconBar: 'Close icon bar',
    openMenuBar: 'Open menu bar',
    openIconBar: 'Open icon bar',
    preferences: 'Preferences',
    quit: 'Quit Ineermost'
  },
  setting: {
    name: 'Preferences',
    basic: {
      name: 'Basic',
      language: 'Language',
      theme: 'Theme',
      iconBar: 'Open icon bar',
      menuBar: 'Open menu bar',
      extensionsPath: 'xtensions path',
      defaultSettings: 'Restore default settings',
      takeEffectAfterRestart: 'Take effect after restart',
      moveIconBarLeft: 'Move icon bar left',
      moveIconBarRight: 'Move icon bar right',
      moveMenuBarLeft: 'Move menu bar left',
      moveMenuBarRight: 'Move menu bar right',
      isDefaultSettings: 'Do you want to restore the default settings',
      success: 'Success!!',
      cancel: 'Cancel!!'
    },
    error: {
      widthNarrow: 'The window width is too narrow'
    }
  },
  extension: {
    disable: 'Disable this extension'
  },
  ...enLocale
}
