import Vue from 'vue'
import App from './App.vue'
import store from './store'
import UIEventManager from './views/events/UIEventManager'
import { I18nUtil } from '@/utils'
import '@/plugins'
Vue.config.productionTip = false

const vm = new Vue({
  store,
  i18n: I18nUtil.i18n,
  render: h => h(App)
}).$mount('#app')
UIEventManager.init(vm)
