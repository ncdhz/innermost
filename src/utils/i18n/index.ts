import Vue from 'vue'
import zhCN from './config/zh-CN'
import en from './config/en'
import VueI18n from 'vue-i18n'
import { GlobalConfig } from '@/utils/configs/GlobalConfigManager'

Vue.use(VueI18n)

const i18n: VueI18n = new VueI18n({
  locale: GlobalConfig.i18n.locale,
  messages: {
    en,
    'zh-CN': zhCN
  }
})

export class I18nUtil {
  public static i18n = i18n
  public static setLocale(locale: string) {
    I18nUtil.i18n.locale = locale
  }

  public static languageType = {
    en: 'English',
    'zh-CN': '中文'
  }
}
