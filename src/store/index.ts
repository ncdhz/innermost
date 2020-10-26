import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'
import { Theme, GlobalConfig } from '@/utils'
import { ExtensionManager } from '@/plugins'
import MutationTypes from './MutationTypes'
export { default as MutationTypes } from './MutationTypes'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    about: {
      show: false
    },
    setting: {
      show: false
    },
    extensions: {},
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
      GlobalConfig.setUserConfig('current-extension', '')
      _.forIn(state.extensions, (v, k) => {
        (state.extensions as unknown as {
          [key: string]: boolean;
        })[k] = false
      })
    },
    // 是否打开图标栏
    [MutationTypes.ICON_SHOW](state, show: boolean) {
      state.icon.show = show
    },
    // 添加插件
    [MutationTypes.ADD_EXTENSIONS](state, extensions: object) {
      state.extensions = extensions
    },
    // 更新插件也就是控制插件的打开与关闭
    [MutationTypes.UPDATE_EXTENSION](state, name: string) {
      state.setting.show = false
      GlobalConfig.setUserConfig('current-extension', name)
      _.forIn(state.extensions, (v, k) => {
        (state.extensions as unknown as {
          [key: string]: boolean;
        })[k] = false
      });
      (state.extensions as unknown as {
        [key: string]: boolean;
      })[name] = true
    }
  },
  actions: {
    [MutationTypes.ICON_MENU_SHOW]({ commit }, width: number) {
      const closeIconAndMenu = ExtensionManager.closeIconAndMenu(GlobalConfig.getUserConfig('current-extension'))
      if (width < GlobalConfig.appWindow.limit.one) {
        commit(MutationTypes.ICON_SHOW, false)
      } else {
        commit(MutationTypes.ICON_SHOW, closeIconAndMenu[0] ? false : GlobalConfig.appWindow.icon.show)
      }
      if (width < GlobalConfig.appWindow.limit.two) {
        commit(MutationTypes.MENU_SHOW, false)
      } else {
        commit(MutationTypes.MENU_SHOW, closeIconAndMenu[1] ? false : GlobalConfig.appWindow.content.menu.show)
      }
    },
    [MutationTypes.UPDATE_EXTENSION]({ commit, dispatch }, { name, path }) {
      commit(MutationTypes.UPDATE_EXTENSION, name)
      GlobalConfig.setUserConfig('default-extension', path)
      GlobalConfig.writeUserConfig()
      dispatch(MutationTypes.ICON_MENU_SHOW, GlobalConfig.appWindow.width)
    },
    [MutationTypes.SETTING_SHOW]({ commit, dispatch }, show: boolean) {
      commit(MutationTypes.SETTING_SHOW, show)
      GlobalConfig.setUserConfig('default-extension', '')
      GlobalConfig.writeUserConfig()
      dispatch(MutationTypes.ICON_MENU_SHOW, GlobalConfig.appWindow.width)
    },
    [MutationTypes.ADD_EXTENSIONS]({ commit, dispatch }, extensions) {
      const defaultExtension = GlobalConfig.getUserConfig('default-extension')
      commit(MutationTypes.ADD_EXTENSIONS, extensions)
      let name = ''
      if (!defaultExtension) {
        dispatch(MutationTypes.SETTING_SHOW, true)
      } else {
        _.forEach(extensions, (extension, key) => {
          if (extension) {
            name = key
          }
        })
        dispatch(MutationTypes.UPDATE_EXTENSION, {
          name,
          path: defaultExtension
        })
      }
      dispatch(MutationTypes.ICON_MENU_SHOW, GlobalConfig.appWindow.width)
    }
  },
  modules: {
  }
})
