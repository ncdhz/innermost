import { GlobalConfig } from './GlobalConfigManager'
export default class ExtensionConfig {
  public static CurrentExtension = 'current-extension'
  public static ExtensionName = 'extension-name'
  /**
   * 向用户配置中添加配置
   * @param name 配置名
   * @param value 配置值
   * current-extension 表示当前扩展
   */
  public static setExtensionConfig(name: string, value: any) {
    GlobalConfig.extensionConfig[name] = value
  }

  /**
   * 通过配置名获取用户配置
   * @param name 配置名
   */
  public static getExtensionConfig(name: string) {
    return GlobalConfig.extensionConfig[name]
  }

  public static writeExtensionConfig() {
    GlobalConfig.writeGlobalConfig({
      extensionConfig: GlobalConfig.extensionConfig
    })
  }
}
