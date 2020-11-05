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
  theme?: {
    [key: string]: any;
    default: string;
  };
  i18n?: {
    name: string;
    data: {};
    default?: boolean;
  }[];
}
