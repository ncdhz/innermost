import Vue from 'vue'
import App from './App.vue'
import { UIEventManager, InitStateData } from '@/renderer'
import { I18nUtil } from '@/utils'
import { ExtensionManager } from '@/plugins'
import store from './store'
Vue.config.productionTip = false
const vm = new Vue({
  store,
  i18n: I18nUtil.getI18n(),
  render: h => h(App)
}).$mount('#app')
// 用于给插件注入 vue 对象
ExtensionManager.setEVue(vm)
ExtensionManager.generateExtensionComponents()
// 用于初始化扩展需要的数据
InitStateData.initExtensionIcons(vm)
InitStateData.initExtensionIds(vm)
InitStateData.initExtensionStates(vm)
InitStateData.initExtensionThemes(vm)
// 初始化ui事件
UIEventManager.init(vm)
