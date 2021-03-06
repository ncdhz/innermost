import { Theme } from '@/utils/theme'
import { AppGlobalEnv } from '@/utils/AppGlobalEnv'
import path from 'path'
export default {
  i18n: {
    locale: 'zh-CN'
  },
  theme: {
    default: Theme.name
  },
  extension: {
    path: path.join(AppGlobalEnv.EXTENSIONS_PATH, '.innermost'),
    package: new Array<string[]>()
  },
  // 主窗口
  appWindow: {
    // 主窗口高宽
    height: 760,
    width: 1024,
    // 主窗口位置
    x: 0,
    y: 0,
    // 主窗口的宽度限制
    limit: {
      one: 800,
      two: 570,
      minHeight: 500,
      minWidth: 500
    },
    // 图标的宽度
    icon: {
      show: true,
      left: true,
      width: 80
    },
    content: {
      menu: {
        show: true,
        left: true,
        width: 200
      },
      header: {
        height: 40
      }
    }
  }
}
