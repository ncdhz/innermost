import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './plugins/element.ts'
import { I18nUtil } from '@/utils'
import ElementLocale from 'element-ui/lib/locale'
ElementLocale.i18n((key: any, value: any) => I18nUtil.i18n.t(key, value))

Vue.config.productionTip = false
new Vue({
  router,
  store,
  i18n: I18nUtil.i18n,
  render: h => h(App)
}).$mount('#app')
