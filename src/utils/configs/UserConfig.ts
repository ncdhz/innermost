import { GlobalConfig } from './GlobalConfigManager'
export default class UserConfig {
  public static CurrentExtension = 'current-extension'
  public static ExtensionName = 'extension-name'
  /**
   * 向用户配置中添加配置
   * @param name 配置名
   * @param value 配置值
   * current-extension 表示当前扩展
   */
  public static setUserConfig(name: string, value: any) {
    GlobalConfig.userConfig[name] = value
  }

  /**
   * 通过配置名获取用户配置
   * @param name 配置名
   */
  public static getUserConfig(name: string) {
    return GlobalConfig.userConfig[name]
  }

  public static writeUserConfig() {
    GlobalConfig.writeGlobalConfig({
      userConfig: GlobalConfig.userConfig
    })
  }
}
