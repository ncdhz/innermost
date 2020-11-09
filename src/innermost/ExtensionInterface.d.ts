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

  innermostInit?: (Vue: any) => void;

  it?: (path: string, parent?: boolean) => string | undefined;

  getConfig?: (path: any) => any;

  updateConfig?: (path: any, value: any) => void;

  saveConfig?: () => void;

  getState?: (path: any) => any;

  updateState?: (path: any, value: any) => void;

  openExtension?: () => void;

  openId?: (id: string) => void;

  getTheme?: (parent?: boolean) => any;
}
