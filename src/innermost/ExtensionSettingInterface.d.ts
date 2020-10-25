export default interface ExtensionSettingInterface {
  data?: Vue;
  title?: string;
  items?: {
    clazz: string;
    name: string;
  }[];
  isClass: boolean;
}
