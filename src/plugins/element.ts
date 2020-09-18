import Vue from 'vue'
import ElementUI from 'element-ui'
import { I18nUtil } from '@/utils'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI, {
  i18n: (key: any, value: any) => I18nUtil.i18n.t(key, value)
})
