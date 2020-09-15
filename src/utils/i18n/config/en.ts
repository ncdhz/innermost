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
    }
  },
  tray: {
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
      isDefaultSettings: 'Do you want to restore the default settings',
      success: 'Success!!',
      cancel: 'Cancel!!'
    },
    error: {
      widthNarrow: 'The window width is too narrow'
    }
  },
  ...enLocale
}
