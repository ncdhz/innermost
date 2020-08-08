import Vue from 'vue'
import zhCN from './config/zh-CN'
import en from './config/en'
import VueI18n from 'vue-i18n'
import ElementLocale from 'element-ui/lib/locale'

Vue.use(VueI18n)

const i18n: VueI18n = new VueI18n({
  locale: localStorage.getItem('locale') || 'en',
  messages: {
    en,
    'zh-CN': zhCN
  }
})
ElementLocale.i18n((key: any, value: any) => i18n.t(key, value))
export default i18n
