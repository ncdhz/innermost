import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
export default {
  menu: {
    ineermost: {
      name: '内心深处',
      about: '关于内心深处',
      preferences: '偏好设置'
    },
    edit: {
      name: '编辑',
      undo: '撤销',
      redo: '重做',
      cut: '剪切',
      copy: '复制',
      paste: '粘贴',
      selectAll: '全选'
    },
    window: {
      name: '窗口',
      minimize: '最小化',
      close: '关闭',
      reload: '重新加载',
      togglefullscreen: '全屏'
    },
    help: {
      name: '帮助',
      toggleDevTools: '开发者工具'
    }
  },
  tray: {
    quit: '关闭内心深处'
  },
  setting: {
    name: '偏好设置',
    basic: {
      name: '基础设置',
      language: '语言',
      theme: '主题',
      iconBar: '打开图标栏',
      menuBar: '打开菜单栏',
      extensionsPath: '扩展路径',
      defaultSettings: '恢复默认设置',
      isDefaultSettings: '是否恢复默认设置',
      success: '成功!!',
      cancel: '取消!!'
    },
    error: {
      widthNarrow: '窗口宽度过窄'
    }
  },
  ...zhLocale
}