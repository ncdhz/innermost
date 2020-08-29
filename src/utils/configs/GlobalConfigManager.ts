import path from 'path'
import fs from 'fs'
import _ from 'lodash'
import { AppGlobalEnv } from '../AppGlobalEnv'
import DefaultConfig from './DefaultConfig'

class Config {
  i18n = _.merge({}, DefaultConfig.i18n)
  theme = _.merge({}, DefaultConfig.theme)
  appWindow = _.merge({}, DefaultConfig.appWindow)
  localConfig: any
  private static ConfigFilePath = path.join(AppGlobalEnv.PUBLIC_FILE_PATH, 'config', 'global.config.json')

  constructor() {
    this.localConfig = JSON.parse(fs.readFileSync(Config.ConfigFilePath, 'utf-8'))
    _.merge(this, this.localConfig)
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
