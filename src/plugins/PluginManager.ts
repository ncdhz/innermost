import { remote } from 'electron'
import _ from 'lodash'
import path from 'path'
import fs from 'fs'
import { GlobalConfig } from '@/utils'
import ExtensionInterface from '@/innermost/ExtensionInterface'
export interface ExtensionIcon {
  data?: string;
  isClass?: boolean;
  name: string;
  isFile?: boolean;
}
class PluginManager {
  package: string[] | undefined
  modules = new Array<ExtensionInterface>()

  constructor() {
    this.package = GlobalConfig.extension.package
    this.initModules()
  }

  // 用于加载本地模块
  private initModules() {
    if (this.package) {
      _.forEach(this.package, (value) => {
        const module = remote.require(value) as ExtensionInterface
        if (!module.name) {
          module.name = value
        }
        module.path = value
        this.modules.push(module)
      })
    }
  }

  // 用于返回 style 数组
  getStyles(): string[] {
    const addDataToStyles = (path: string, e: string, array: string[]) => {
      const data = this.readInnermost(path as string, e) as string
      this.addDataToArray<string>(array, data)
    }
    const styles: string[] = []
    _.forEach<ExtensionInterface>(this.modules, (value: ExtensionInterface) => {
      if (value.styles) {
        const style = value.styles()
        if (typeof style === 'string') {
          addDataToStyles(value.path as string, style, styles)
        }
        if (typeof style === 'object') {
          style.forEach(e => {
            addDataToStyles(value.path as string, e, styles)
          })
        }
      }
    })
    return styles
  }

  // 用于向
  private addDataToArray<T>(array: T[], ...data: T[]) {
    data.forEach(d => {
      if (d) array.push(d)
    })
  }

  // 获取图标信息
  getIcons(): ExtensionIcon[] {
    const icons = new Array<ExtensionIcon>()
    _.forEach<ExtensionInterface>(this.modules, (value: ExtensionInterface) => {
      const icon: ExtensionIcon = {
        name: value.name as string
      }
      if (value?.icon) {
        const iconImg = value?.icon()
        icon.isClass = iconImg.isClass
        // 当数据使用文件的形式存在读取文件中的数据
        if (iconImg.isFile) {
          icon.data = this.readInnermost(value.path as string, iconImg.data as string)
        } else {
          icon.data = iconImg.data
        }
        if (icon.data) {
          icons.push(icon)
        }
      }
    })
    return icons
  }

  // 读取innermost后缀的文件
  private readInnermost(folderPath: string, fileName: string): string | undefined {
    const INNERMOST = '.innermost'
    if (!fileName.endsWith(INNERMOST)) {
      fileName += INNERMOST
    }
    const filePath = path.join(folderPath, fileName)
    if (fs.existsSync(filePath)) {
      return fs.readFileSync(filePath, 'utf-8')
    }
    return undefined
  }
}

export default new PluginManager()
