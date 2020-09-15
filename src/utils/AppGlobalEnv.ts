import path from 'path'
import { app, remote } from 'electron'
export class AppGlobalEnv {
  public static IS_DEVELOPMENT: boolean = process.env.NODE_ENV !== 'production'

  public static IS_MAIN_PROCESS: boolean = app as unknown as boolean

  public static PROJECT_PATH: string = AppGlobalEnv.IS_MAIN_PROCESS
    ? app.getAppPath() : remote.app.getAppPath()

  public static PUBLIC_FILE_PATH: string = AppGlobalEnv.IS_DEVELOPMENT
    ? path.join(AppGlobalEnv.PROJECT_PATH, '..', 'public') : AppGlobalEnv.PROJECT_PATH

  public static EXTENSIONS_PATH = AppGlobalEnv.IS_MAIN_PROCESS
    ? app.getPath('home') : remote.app.getPath('home')
}
