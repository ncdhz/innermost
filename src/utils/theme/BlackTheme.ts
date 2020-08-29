export default {
  name: 'black-theme',
  window: {
    menu: {
      background: '#2D2D2D'
    },
    main: {
      background: '#343434'
    },
    about: {
      '--about-background': '#343434'
    }
  },
  main: {
    divider: {
      background: '#494949'
    },
    title: {
      color: '#FFFFFF'
    },
    setting: {
      '--label-inner-color': '#ededed',
      '--inner-background': '#343434'
    }
  },
  menu: {
    title: {
      color: '#FFFFFF'
    },
    item: {
      '--color': '#aaaaaa',
      '--hover-background': 'rgba(255, 255, 255, .2)',
      '--hover-color': '#FFFFFF'
    }
  },
  about: {
    header: {
      color: '#EEEEEE'
    },
    body: {
      title: {
        color: '#DCDFE6'
      },
      version: {
        color: '#E4E7ED'
      }
    },
    footer: {
      color: '#EBEEF5'
    }
  },
  global: {
    message: {
      box: {
        '--message-background': '#343434',
        '--message-border': '#606266',
        '--message-container-message': '#E4E7ED',
        '--message-title-color': '#DCDFE6'
      }
    }
  }
}
