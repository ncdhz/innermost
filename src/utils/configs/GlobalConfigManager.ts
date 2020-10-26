import path from 'path'
import fs from 'fs'
import _ from 'lodash'
import { AppGlobalEnv } from '../AppGlobalEnv'
import DefaultConfig from './DefaultConfig'

class Config {
  i18n = _.merge({}, DefaultConfig.i18n)
  theme = _.merge({}, DefaultConfig.theme)
  appWindow = _.merge({}, DefaultConfig.appWindow)
  extension = _.merge({}, DefaultConfig.extension)
  localConfig = {}
  userConfig: {
    [key: string]: any;
  } = {}

  private static ConfigFilePath = path.join(AppGlobalEnv.PUBLIC_FILE_PATH, 'config', 'global.config.json')

  constructor() {
    const config = fs.readFileSync(Config.ConfigFilePath, 'utf-8')
    if (config) {
      this.localConfig = JSON.parse(config)
      _.merge(this, this.localConfig)
    }
    // 检查扩展文件夹是否存在 不存在就新建
    if (this.extension.path === DefaultConfig.extension.path) {
      if (!fs.existsSync(this.extension.path)) {
        fs.mkdirSync(this.extension.path)
      }
    }
    this.initExtensions()
  }

  // 用于初始化扩展提取所有扩展的路径
  // package [路径,文件夹的名字
  private initExtensions() {
    const PACKAGE_JSON = 'package.json'
    const dirs = fs.readdirSync(this.extension.path)
    dirs.forEach((value) => {
      const dir = path.join(this.extension.path, value)
      if (fs.existsSync(dir) && fs.existsSync(path.join(dir, PACKAGE_JSON))) {
        this.extension.package.push([dir, value])
      }
    })
  }

  /**
   * 向用户配置中添加配置
   * @param name 配置名
   * @param value 配置值
   * current-extension 表示当前扩展
   */
  public setUserConfig(name: string, value: any) {
    this.userConfig[name] = value
  }

  /**
   * 通过配置名获取用户配置
   * @param name 配置名
   */
  public getUserConfig(name: string) {
    return this.userConfig[name]
  }

  public writeUserConfig() {
    const _this = this
    this.writeGlobalConfig({
      userConfig: _this.userConfig
    })
  }

  public writeGlobalConfig(config: object): void {
    _.merge(this.localConfig, config)
    _.merge(this, config)
    fs.writeFileSync(Config.ConfigFilePath, JSON.stringify(this.localConfig, null, 2))
  }

  public clearGlobalConfig(): void {
    fs.writeFileSync(Config.ConfigFilePath, JSON.stringify({}, null, 2))
    _.merge(this, DefaultConfig)
    this.localConfig = {}
  }
}

export const GlobalConfig = new Config()
