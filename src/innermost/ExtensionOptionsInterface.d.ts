export interface ExtensionOptionsInterface {
  closeIcon?: boolean;
  closeMenu?: boolean;
  moveIcon?: boolean;
  moveMenu?: boolean;
  config?: {
    [key: string]: any;
  };
  state?: {
    [key: string]: any;
  };
  i18n: {
    name: string;
    data: {};
    default?: boolean;
  }[];
}
