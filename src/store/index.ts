import Vue from 'vue'
import Vuex from 'vuex'
import { Theme, GlobalConfig } from '@/utils'
import MutationTypes from './MutationTypes'
export { default as MutationTypes } from './MutationTypes'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    about: {
      show: false
    },
    setting: {
      show: true
    },
    theme: Theme[GlobalConfig.theme.default],
    menu: {
      show: GlobalConfig.appWindow.content.menu.show
    },
    icon: {
      show: GlobalConfig.appWindow.icon.show
    }
  },
  mutations: {
    // 关于界面
    [MutationTypes.ABOUT_SHOW](state, show: boolean) {
      state.about.show = show
    },
    // 更新主题
    [MutationTypes.UPDATE_THEME](state, themeName: string) {
      state.theme = Theme[themeName]
    },
    // 是否打开菜单
    [MutationTypes.MENU_SHOW](state, show: boolean) {
      state.menu.show = show
    },
    // 是否打开设置
    [MutationTypes.SETTING_SHOW](state, show: boolean) {
      state.setting.show = show
    },
    // 是否打开图标栏
    [MutationTypes.ICON_SHOW](state, show: boolean) {
      state.icon.show = show
    }
  },
  actions: {
  },
  modules: {
  }
})
