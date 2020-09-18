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
      '--inner-background': '#343434',
      '--inner-select-border-color': '#606060',
      '--inner-border-color': '#5F5F5F',
      '--inner-append-background': '#343434',
      '--inner-append-icon-color': '#BDBDBD',
      '--inner-append-hover-icon-color': '#2A97FF',
      '--inner-append-hover-border-color': '#C0C4CD'
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
