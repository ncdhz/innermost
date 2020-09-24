export default interface ExtensionInterface {
  // 扩展名不能和其他扩展名重复
  name?: string;
  // 扩展所在路径
  path?: string;
  innermostIcon?: () => {
    data: string,
    isClass: boolean,
    styles?: string[]
  };
  innermostMainStyles?: () => string | string[]
}
