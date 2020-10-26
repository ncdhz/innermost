import ExtensionIconInterface from './ExtensionIconInterface'
import ExtensionBodyInterface from './ExtensionBodyInterface'
import ExtensionSettingInterface from './ExtensionSettingInterface'
import ExtensionOptionsInterface from './ExtensionOptionsInterface'
export default interface ExtensionInterface {
  // 扩展名不能和其他扩展名重复
  name?: string;
  // 扩展所在路径
  path?: string;

  innermostIcon?: () => ExtensionIconInterface;

  innermostBody?: () => ExtensionBodyInterface;

  innermostSetting?: () => ExtensionSettingInterface;

  innermostOptions?: () => ExtensionOptionsInterface;
}
