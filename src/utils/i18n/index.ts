import Vue from 'vue'
import zhCN from './config/zh-CN'
import en from './config/en'
import VueI18n from 'vue-i18n'
import { GlobalConfig } from '@/utils/configs/GlobalConfigManager'
import _ from 'lodash'
Vue.use(VueI18n)

const i18n: VueI18n = new VueI18n({
  locale: GlobalConfig.i18n.locale,
  messages: {
    en,
    'zh-CN': zhCN
  }
})

export class I18nUtil {
  private static i18n = i18n
  public static setLocale(locale: string) {
    I18nUtil.i18n.locale = locale
  }

  public static getI18n() {
    return I18nUtil.i18n
  }

  public static setMessage(locale: string | string[], message: VueI18n.LocaleMessageObject) {
    const addMessage = (locale: string, message: VueI18n.LocaleMessageObject) => {
      let localeMessage = I18nUtil.i18n.getLocaleMessage(locale)
      if (message && typeof message === 'object') {
        localeMessage = _.merge(localeMessage, message)
      }
      I18nUtil.i18n.setLocaleMessage(locale as string, localeMessage)
    }
    if (typeof locale === 'string') {
      addMessage(locale, message)
    } else {
      const messages = I18nUtil.i18n.messages
      for (const m in messages) {
        const value = locale.find(value => {
          return value === m
        })
        if (!value) {
          addMessage(m, message)
        }
      }
    }
  }

  public static languageType = {
    en: 'English',
    'zh-CN': '中文'
  }
}
