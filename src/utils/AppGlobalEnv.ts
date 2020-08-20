import path from 'path'

export class AppGlobalEnv {
  // 用于定义是否是开发环境
  public static IS_DEVELOPMENT: boolean = process.env.NODE_ENV !== 'production';

  public static MAIN_FILE_PATH: string = AppGlobalEnv.IS_DEVELOPMENT ?
    path.join(__dirname, '..', 'public') : __dirname;
}
