export default interface ExtensionSettingInterface {
  data?: Vue;
  title?: {
    name: string;
    i18n?: boolean;
    parentI18n?: boolean;
  } | string;
  items?: ExtensionSettingItemInterface[];
  isClass: boolean;
}

export interface ExtensionSettingItemInterface {
  clazz: string;
  name: string;
  i18n?: boolean;
  parentI18n?: boolean;
}
