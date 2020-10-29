import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'
import { Theme, GlobalConfig, UserConfig, SettingConfig } from '@/utils'
import { ExtensionManager } from '@/plugins'
import MutationTypes from './MutationTypes'
export { default as MutationTypes } from './MutationTypes'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    about: {
      show: false
    },
    extensions: {
      [SettingConfig.SettingName]: true
    },
    extensionIds: {
      [SettingConfig.SettingName]: {
        [SettingConfig.SettingId]: true
      }
    },
    extensionStates: {},
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
    // 是否打开图标栏
    [MutationTypes.ICON_SHOW](state, show: boolean) {
      state.icon.show = show
    },
    // 添加插件
    [MutationTypes.ADD_EXTENSIONS](state, extensions) {
      _.merge(extensions, state.extensions)
      state.extensions = extensions
    },
    // 更新插件也就是控制插件的打开与关闭
    [MutationTypes.UPDATE_EXTENSION](state, name: string) {
      UserConfig.setUserConfig(UserConfig.CurrentExtension, name)
      for (const extension in state.extensions) {
        state.extensions[extension] = false
      }
      (state.extensions as unknown as {
        [key: string]: boolean;
      })[name] = true
      UserConfig.writeUserConfig()
    },
    // 添加extension menu
    [MutationTypes.ADD_EXTENSION_IDS](state, extensionIds: {[key: string]: {[key: string]: boolean}}) {
      _.merge(extensionIds, state.extensionIds)
      state.extensionIds = extensionIds
    },
    // 更新扩展ID 根据 name 和 id 找到某个扩展中的某个界面并打开
    [MutationTypes.UPDATE_EXTENSION_ID](state, { name, id }) {
      const extensionIds: {
        [key: string]: {
          [key: string]: boolean;
        };
      } = state.extensionIds
      if (!extensionIds[name]) {
        extensionIds[name] = {}
      }
      for (const extensionNameIdKey in extensionIds[name]) {
        extensionIds[name][extensionNameIdKey] = false
      }
      extensionIds[name][id] = true
    },
    // 添加扩展状态
    [MutationTypes.ADD_EXTENSION_STATES](state, states) {
      state.extensionStates = states
    },
    // 更新扩展状态
    [MutationTypes.UPDATE_EXTENSION_STATES](state, { name, path, value }) {
      const extensionStates: any = _.merge({}, state.extensionStates)
      if (extensionStates[name] && typeof extensionStates[name] === 'object') {
        _.set(extensionStates[name], path, value)
        state.extensionStates = extensionStates
      }
    }
  },
  actions: {
    // 控制 icon 栏和 menu 栏打开或者关闭
    [MutationTypes.ICON_MENU_SHOW]({ commit }, width: number) {
      const closeIconAndMenu = ExtensionManager.closeIconAndMenu(UserConfig.getUserConfig(UserConfig.CurrentExtension))
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
    // 更新扩展 也就是打开当前 name 的扩展
    [MutationTypes.UPDATE_EXTENSION]({ commit, dispatch }, name) {
      commit(MutationTypes.UPDATE_EXTENSION, name)
      UserConfig.setUserConfig(UserConfig.CurrentExtension, name)
      dispatch(MutationTypes.ICON_MENU_SHOW, GlobalConfig.appWindow.width)
    },
    // 添加扩展
    [MutationTypes.ADD_EXTENSIONS]({ commit, dispatch }, extensions) {
      commit(MutationTypes.ADD_EXTENSIONS, extensions)
      let currentExtension = UserConfig.getUserConfig(UserConfig.CurrentExtension)
      if (!currentExtension) {
        currentExtension = SettingConfig.SettingName
      }
      dispatch(MutationTypes.UPDATE_EXTENSION, currentExtension)
      dispatch(MutationTypes.ICON_MENU_SHOW, GlobalConfig.appWindow.width)
    },
    // 更新扩展 ID 根据 name 和 id 设置打开哪一个扩展 id （也就是打开那个界面）
    [MutationTypes.UPDATE_EXTENSION_ID]({ commit }, { id, name }) {
      commit(MutationTypes.UPDATE_EXTENSION_ID, { id, name })
    }
  },
  modules: {
  }
})
