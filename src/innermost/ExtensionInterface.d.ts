import { ExtensionIconInterface } from './ExtensionIconInterface'
import { ExtensionBodyInterface } from './ExtensionBodyInterface'
import { ExtensionMenuInterface } from './ExtensionMenuInterface'
import { ExtensionOptionsInterface } from './ExtensionOptionsInterface'
import { ExtensionSettingInterface } from './ExtensionSettingInterface'
export interface ExtensionInterface {
  // 扩展名不能和其他扩展名重复
  name?: string;
  // 扩展所在路径
  path?: string;

  innermostIcon?: () => ExtensionIconInterface;

  innermostBody?: () => ExtensionBodyInterface;

  innermostMenu?: () => ExtensionMenuInterface;

  innermostOptions?: () => ExtensionOptionsInterface;

  innermostSetting?: () => ExtensionSettingInterface;
}
