import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { ipcRenderer } from 'electron'
import { EventTypes, GlobalConfig, I18nUtil } from '@/utils'
import './plugins/element.ts'
import ElementLocale from 'element-ui/lib/locale'
ElementLocale.i18n((key: any, values: any) => I18nUtil.i18n.t(key, values))

Vue.config.productionTip = false
// 用于更新全局配置
ipcRenderer.on(EventTypes.UPDATE_CONFIG, (event, config: object) => {
  GlobalConfig.writeGlobalConfig(config)
})

new Vue({
  router,
  store,
  i18n: I18nUtil.i18n,
  render: h => h(App)
}).$mount('#app')
