export default interface ExtensionOptionsInterface {
  closeIcon?: boolean;
  closeSetting?: boolean;
  i18n: {
    name: string;
    data: {};
    default?: boolean;
  }[];
}
