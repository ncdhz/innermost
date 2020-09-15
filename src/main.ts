import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import UIEventManager from './views/events/UIEventManager'
import { I18nUtil } from '@/utils'
import VueI18n from 'vue-i18n'
import './plugins/element.ts'
import ElementLocale from 'element-ui/lib/locale'
ElementLocale.i18n((key: string, values?: VueI18n.Values) => I18nUtil.i18n.t(key, values))

Vue.config.productionTip = false
// 给界面上事件监听

const vm = new Vue({
  router,
  store,
  i18n: I18nUtil.i18n,
  render: h => h(App)
}).$mount('#app')
UIEventManager.init(vm)
