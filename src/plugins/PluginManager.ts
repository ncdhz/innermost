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
        const module = remote.require(value)
        if (!module.name) {
          module.name = value
        }
        module.path = value
        this.modules.push(module.default ? module.default : module)
      })
    }
  }
}

export default new PluginManager()
