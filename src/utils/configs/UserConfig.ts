import path from 'path'
import fs from 'fs'
import _ from 'lodash'
import { GlobalConfig } from './GlobalConfigManager'

export class UserConfigKey {
  public static DisableExtension = 'disable-extension'
}

class UserConfig {
  private static ConfigFilePath = path.join(GlobalConfig.extension.path, 'user.config.json')

  private localConfig: {
    [key: string]: any;
  } = {}

  constructor() {
    if (!fs.existsSync(UserConfig.ConfigFilePath)) {
      fs.writeFileSync(UserConfig.ConfigFilePath, JSON.stringify(this.localConfig, null, 2), 'utf-8')
    }
    const config = fs.readFileSync(UserConfig.ConfigFilePath, 'utf-8')
    if (config) {
      _.merge(this.localConfig, JSON.parse(config))
    }
  }

  public getUserConfig(key: string) {
    return this.localConfig[key]
  }

  public setUserConfig(key: string, value: string) {
    this.localConfig[key] = value
  }

  public writeUserConfig(config: object) {
    _.merge(this.localConfig, config)
    fs.writeFileSync(UserConfig.ConfigFilePath, JSON.stringify(this.localConfig, null, 2), 'utf-8')
  }
}
export default new UserConfig()
