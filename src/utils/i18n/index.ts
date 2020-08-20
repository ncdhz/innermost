import Vue from 'vue'
import zhCN from './config/zh-CN'
import en from './config/en'
import VueI18n from 'vue-i18n'
import { GlobalConfig } from '@/utils/configs/GlobalConfig'

Vue.use(VueI18n)
const i18n: VueI18n = new VueI18n({
  locale: GlobalConfig.i18n.locale,
  messages: {
    en,
    'zh-CN': zhCN
  }
})

export default i18n
