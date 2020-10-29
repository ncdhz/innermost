import { ExtensionMenuItemInterface } from './ExtensionMenuInterface'
export interface ExtensionSettingInterface {
  items: ExtensionSettingMenuItemInterface[];
}
export interface ExtensionSettingMenuItemInterface extends ExtensionMenuItemInterface {
  title?: string;
  data: any;
}
