import { APP_GLOBLE_ENV } from '@/utils'
import path from 'path'
import NeDB from 'nedb'
export class AppConfigDB{

  public static db = new NeDB(
    {
      filename: path.join(APP_GLOBLE_ENV.MAIN_FILE_PATH, 'db', 'config.db'),
      autoload: true
    }
  )

  private constructor() { }

}
