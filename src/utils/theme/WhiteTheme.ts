export default {
  name: 'white-theme',
  window: {
    menu: {
      background: '#F4F5F7'
    },
    main: {
      background: '#FFFFFF'
    },
    about: {
      '--about-background': '#FFFFFF'
    }
  },
  main: {
    divider: {
      background: '#E5E5E5'
    },
    title: {
      color: '#414244'
    },
    setting: {
      '--label-inner-color': '#6C6E71',
      '--inner-background': '#FFFFFF'
    }
  },
  menu: {
    title: {
      color: '#414244'
    },
    item: {
      '--color': '#4D515B',
      '--hover-background': '#EAECF0',
      '--hover-color': '#753FFC'
    }
  },
  about: {
    header: {
      color: '#303133'
    },
    body: {
      title: {
        color: '#606266'
      },
      version: {
        color: '#909399'
      }
    },
    footer: {
      color: '#6C6E71'
    }
  },
  global: {
    message: {
      box: {
        '--message-background': '#FFFFFF',
        '--message-border': '#FFFFFF',
        '--message-container-message': '#606266',
        '--message-title-color': '#303133'
      }
    }
  }
}
