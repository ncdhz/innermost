import Vue from 'vue'
import ElementUI from 'element-ui'
import { I18nUtil } from '@/utils'
import VueI18n from 'vue-i18n'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI, {
  i18n: (key: VueI18n.Path, value: VueI18n.Values) => I18nUtil.getI18n().t(key, value)
})
