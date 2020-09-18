export default interface ExtensionInterface {
  name?: string;
  path?: string;
  icon?: () => {
    data: string,
    isClass: boolean,
    isFile?: boolean
  };
  styles?: () => string | string[]
}
