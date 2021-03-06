import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'
import { Theme, GlobalConfig, ExtensionConfig, SettingConfig } from '@/utils'
import { ExtensionManager } from '@/plugins'
import MutationTypes from './MutationTypes'
import ActionTypes from './ActionTypes'
export { default as MutationTypes } from './MutationTypes'
export { default as ActionTypes } from './ActionTypes'
Vue.use(Vuex)
export default new Vuex.Store({
  getters: {
    extensionShow(state) {
      return state.extensions
    },
    extensionIdShow(state) {
      return state.extensionIds
    },
    extensionIconShow(state) {
      return state.extensionIcons
    },
    getTheme(state) {
      return Theme[state.themeName]
    },
    getElementTheme(state, getters) {
      return getters.getTheme.elementTheme
    },
    menuShow(state) {
      return state.menu.show
    },
    iconShow(state) {
      return state.icon.show
    },
    iconLeft(state) {
      return state.icon.left
    },
    menuLeft(state) {
      return state.menu.left
    },
    winStyle(state, getters) {
      return getters.getTheme.window
    },
    aboutShow(state) {
      return state.about.show
    },
    itemStyle(state, getters) {
      return getters.getTheme.menu.item
    },
    getExtensionStates(state) {
      return (name: string) => {
        return (state.extensionStates as any)[name]
      }
    },
    getExtensionTheme(state) {
      return (name: string) => {
        const theme = (state.extensionThemes as any)[name]
        if (typeof theme === 'object') {
          if (theme[state.themeName]) {
            return theme[state.themeName]
          }
          if (theme.default) {
            return theme.default
          }
        }
        return {}
      }
    }
  },
  state: {
    about: {
      show: false
    },
    extensionIcons: {},
    extensions: {
      [SettingConfig.SettingName]: true
    },
    extensionIds: {
      [SettingConfig.SettingName]: {
        [SettingConfig.SettingId]: true
      }
    },
    extensionStates: {},
    extensionThemes: {},
    themeName: GlobalConfig.theme.default,
    menu: {
      left: GlobalConfig.appWindow.content.menu.left,
      show: GlobalConfig.appWindow.content.menu.show
    },
    icon: {
      left: GlobalConfig.appWindow.icon.left,
      show: GlobalConfig.appWindow.icon.show
    }
  },
  mutations: {
    // 关于界面
    [MutationTypes.ABOUT_SHOW](state, show: boolean) {
      state.about.show = show
    },
    // 更新主题
    [MutationTypes.UPDATE_THEME_NAME](state, themeName: string) {
      state.themeName = themeName
    },
    // 是否打开菜单
    [MutationTypes.MENU_SHOW](state, show: boolean) {
      state.menu.show = show
    },
    // 是否打开图标栏
    [MutationTypes.ICON_SHOW](state, show: boolean) {
      state.icon.show = show
    },
    [MutationTypes.UPDATE_ICON_LEFT](state, left: boolean) {
      state.icon.left = left
    },
    [MutationTypes.UPDATE_MENU_LEFT](state, left: boolean) {
      state.menu.left = left
    },
    // 添加插件
    [MutationTypes.ADD_EXTENSIONS](state, extensions) {
      _.merge(extensions, state.extensions)
      state.extensions = extensions
    },
    // 更新插件也就是控制插件的打开与关闭
    [MutationTypes.UPDATE_EXTENSION](state, { name, show = true }) {
      ExtensionConfig.setExtensionConfig(ExtensionConfig.CurrentExtension, name)
      for (const extension in state.extensions) {
        state.extensions[extension] = false
      }
      (state.extensions as unknown as {
        [key: string]: boolean;
      })[name] = show
      ExtensionConfig.writeExtensionConfig()
    },
    // 添加extension menu
    [MutationTypes.ADD_EXTENSION_IDS](state, extensionIds: {[key: string]: {[key: string]: boolean}}) {
      _.merge(extensionIds, state.extensionIds)
      state.extensionIds = extensionIds
    },
    // 更新扩展ID 根据 name 和 id 找到某个扩展中的某个界面并打开
    [MutationTypes.UPDATE_EXTENSION_ID](state, { name, id, show = true }) {
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
      extensionIds[name][id] = show
    },
    // 添加扩展状态
    [MutationTypes.ADD_EXTENSION_STATES](state, states) {
      state.extensionStates = states
    },
    // 更新扩展状态
    [MutationTypes.UPDATE_EXTENSION_STATE](state, { name, path, value }) {
      const extensionStates: any = _.merge({}, state.extensionStates)
      if (extensionStates[name] && typeof extensionStates[name] === 'object') {
        _.set(extensionStates[name], path, value)
        state.extensionStates = extensionStates
      }
    },
    [MutationTypes.ADD_EXTENSION_THEMES](state, themes) {
      state.extensionThemes = themes
    },
    // 添加插件图标
    [MutationTypes.ADD_EXTENSION_ICONS](state, extensionIcons) {
      state.extensionIcons = extensionIcons
    },
    // 修改插件图标
    [MutationTypes.UPDATE_EXTENSION_ICON](state, { name, show }) {
      (state.extensionIcons as any)[name] = show
    }
  },
  actions: {
    // 控制 icon 栏和 menu 栏打开或者关闭
    [ActionTypes.ICON_MENU_SHOW]({ commit }, width: number) {
      const closeIconAndMenu = ExtensionManager.closeIconAndMenu(ExtensionConfig.getExtensionConfig(ExtensionConfig.CurrentExtension))
      if ((width - GlobalConfig.appWindow.icon.width - GlobalConfig.appWindow.content.menu.width) <= 300) {
        commit(MutationTypes.ICON_SHOW, false)
      }
      if ((width - GlobalConfig.appWindow.content.menu.width) <= 300) {
        commit(MutationTypes.MENU_SHOW, false)
        return
      }
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
    [ActionTypes.UPDATE_EXTENSION]({ commit, dispatch }, { name, show = true }) {
      commit(MutationTypes.UPDATE_EXTENSION, { name, show })
      if (show) {
        ExtensionConfig.setExtensionConfig(ExtensionConfig.CurrentExtension, name)
        const moveIconAndMenu = ExtensionManager.moveIconAndMenu(ExtensionConfig.getExtensionConfig(ExtensionConfig.CurrentExtension))
        commit(MutationTypes.UPDATE_MENU_LEFT, moveIconAndMenu[1] ? false : GlobalConfig.appWindow.content.menu.left)
        commit(MutationTypes.UPDATE_ICON_LEFT, moveIconAndMenu[0] ? false : GlobalConfig.appWindow.icon.left)
      }
      dispatch(ActionTypes.ICON_MENU_SHOW, GlobalConfig.appWindow.width)
    },
    // 添加扩展
    [ActionTypes.ADD_EXTENSIONS]({ commit, dispatch }, extensions) {
      commit(MutationTypes.ADD_EXTENSIONS, extensions)
      let currentExtension = ExtensionConfig.getExtensionConfig(ExtensionConfig.CurrentExtension)
      if (!currentExtension) {
        currentExtension = SettingConfig.SettingName
      }
      dispatch(ActionTypes.UPDATE_EXTENSION, { name: currentExtension })
      dispatch(ActionTypes.ICON_MENU_SHOW, GlobalConfig.appWindow.width)
    },
    // 更新扩展 ID 根据 name 和 id 设置打开哪一个扩展 id （也就是打开那个界面）
    [ActionTypes.UPDATE_EXTENSION_ID]({ commit }, { id, name, show = true }) {
      commit(MutationTypes.UPDATE_EXTENSION_ID, { id, name, show })
    }
  },
  modules: {
  }
})
