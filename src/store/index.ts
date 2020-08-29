import Vue from 'vue'
import Vuex from 'vuex'
import { Theme, GlobalConfig } from '@/utils'
import { ABOUT_SHOW, UPDATE_THEME } from './mutation-types'
export { ABOUT_SHOW, UPDATE_THEME } from './mutation-types'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    about: {
      show: false
    },
    theme: Theme[GlobalConfig.theme.default]
  },
  mutations: {
    [ABOUT_SHOW](state, show: boolean) {
      state.about.show = show
    },
    [UPDATE_THEME](state, themeName: string) {
      state.theme = Theme[themeName]
    }
  },
  actions: {
  },
  modules: {
  }
})
