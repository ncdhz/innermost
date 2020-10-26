export default interface ExtensionMenuInterface {
  data?: any;
  title?: {
    name: string;
    i18n?: boolean;
    parentI18n?: boolean;
  } | string;
  items?: ExtensionMenuItemInterface[];
  isClass: boolean;
}

export interface ExtensionMenuItemInterface {
  clazz: string;
  name: string;
  i18n?: boolean;
  parentI18n?: boolean;
}
