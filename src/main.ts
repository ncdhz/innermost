import Vue from 'vue'
import App from './App.vue'
import UIEventManager from './views/events/UIEventManager'
import { I18nUtil } from '@/utils'
import '@/plugins'
import store from './store'
Vue.config.productionTip = false

const vm = new Vue({
  store,
  i18n: I18nUtil.getI18n(),
  render: h => h(App)
}).$mount('#app')
UIEventManager.init(vm)
