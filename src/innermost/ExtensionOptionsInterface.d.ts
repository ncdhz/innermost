export interface ExtensionOptionsInterface {
  closeIcon?: boolean;
  closeMenu?: boolean;
  config?: {
    [key: string]: any;
  };
  i18n: {
    name: string;
    data: {};
    default?: boolean;
  }[];
}
