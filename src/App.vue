/**
* 布局如下图所示
* |-|---|----------------------------|
* | |   |                            |
* | |   |----------------------------|
* | |   |                            |
* | |   |                            |
* | |   |                            |
* | |   |                            |
* | |   |                            |
* | |   |                            |
* |-|---|----------------------------|
*/
<template>
  <div id="app" :style="appWinHeight">
    <el-container class="app-win">
      <!-- 侧边栏用于图标显示 -->
      <el-aside @contextmenu.native="activationMenu('icon')" class="app-win-icon" v-show="iconShow && iconLeft" :style="appWinIconStyle">
        <app-win-icon/>
      </el-aside>
      <!-- 主要部分 -->
      <el-container class="app-win-content">
        <!-- 侧面菜单部分 -->
        <el-aside @contextmenu.native="activationMenu('menu')" class="app-win-content-menu" :style="[appWinMenuStyle, winStyle.menu]" v-show="menuShow && menuLeft">
          <el-container class="app-win-menu-content">
            <el-header :style="appWinMenuHeaderStyle"></el-header>
            <app-win-menu/>
          </el-container>
          <el-aside class="app-win-content-menu-move">
            <v-touch @panmove="moveMenu" @panend="endMoveMenu" @pancancel="endMoveMenu" class="app-win-content-menu-move">
            </v-touch>
          </el-aside>
        </el-aside>

        <el-container @contextmenu.native="activationMenu('main')" class="app-win-content-main" :style="winStyle.main">
          <!-- 主要部分头 -->
          <el-header :style="appWinContentHeaderStyle">
            <!-- 跨浏览器红路灯 -->
            <traffic-lights/>
          </el-header>
          <!-- 主要部分内容 -->
          <el-main class="app-win-main-content">
            <app-win-main/>
          </el-main>
        </el-container>

        <!-- 菜单在右边的情况 -->
        <el-aside @contextmenu.native="activationMenu('menu')" class="app-win-content-menu" :style="[appWinMenuStyle, winStyle.menu]" v-show="menuShow && !menuLeft">

          <el-aside class="app-win-content-menu-move">
            <v-touch @panmove="moveMenu" @panend="endMoveMenu" @pancancel="endMoveMenu" class="app-win-content-menu-move">
            </v-touch>
          </el-aside>
          <el-container class="app-win-menu-content">
            <el-header :style="appWinMenuHeaderStyle"></el-header>
            <app-win-menu/>
          </el-container>
        </el-aside>

      </el-container>
      <el-aside @contextmenu.native="activationMenu('icon')" class="app-win-icon" v-show="iconShow && !iconLeft" :style="appWinIconStyle">
        <app-win-icon/>
      </el-aside>
    </el-container>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { ipcRenderer, Rectangle } from 'electron'
import { GlobalConfig, UITools, EventTypes } from '@/utils'
import { ContextMenu } from '@/renderer'
import AppWinIcon from '@/views/AppWinIcon.vue'
import AppWinMenu from '@/views/AppWinMenu.vue'
import AppWinMain from '@/views/AppWinMain.vue'
import TrafficLights from '@/components/TrafficLights.vue'
import { MutationTypes } from './store'
import is from 'electron-is'
export default Vue.extend({
  methods: {
    // 用于处理菜单栏伸缩
    moveMenu(e: any) {
      const x = e.deltaX
      if (this.$store.getters.menuLeft) {
        if (GlobalConfig.appWindow.content.menu.width + x > (GlobalConfig.appWindow.width - 300 - (this.$store.getters.iconShow ? GlobalConfig.appWindow.icon.width : 0)) || GlobalConfig.appWindow.content.menu.width + x < 170) {
          return
        }
        this.appWinMenuStyle.width = UITools.addPX(GlobalConfig.appWindow.content.menu.width + x)
      } else {
        if (GlobalConfig.appWindow.content.menu.width - x > (GlobalConfig.appWindow.width - 300 - (this.$store.getters.iconShow ? GlobalConfig.appWindow.icon.width : 0)) || GlobalConfig.appWindow.content.menu.width - x < 170) {
          return
        }
        this.appWinMenuStyle.width = UITools.addPX(GlobalConfig.appWindow.content.menu.width - x)
      }
    },
    // 用于结束菜单栏伸缩
    endMoveMenu(e: any) {
      const x = e.deltaX
      if (this.$store.getters.menuLeft) {
        if (GlobalConfig.appWindow.content.menu.width + x > (GlobalConfig.appWindow.width - 300 - (this.$store.getters.iconShow ? GlobalConfig.appWindow.icon.width : 0))) {
          GlobalConfig.appWindow.content.menu.width = (GlobalConfig.appWindow.width - 300 - (this.$store.getters.iconShow ? GlobalConfig.appWindow.icon.width : 0))
        } else if (GlobalConfig.appWindow.content.menu.width + x < 170) {
          GlobalConfig.appWindow.content.menu.width = 170
        } else {
          GlobalConfig.appWindow.content.menu.width += x
        }
      } else {
        if (GlobalConfig.appWindow.content.menu.width - x > (GlobalConfig.appWindow.width - 300 - (this.$store.getters.iconShow ? GlobalConfig.appWindow.icon.width : 0))) {
          GlobalConfig.appWindow.content.menu.width = (GlobalConfig.appWindow.width - 300 - (this.$store.getters.iconShow ? GlobalConfig.appWindow.icon.width : 0))
        } else if (GlobalConfig.appWindow.content.menu.width - x < 170) {
          GlobalConfig.appWindow.content.menu.width = 170
        } else {
          GlobalConfig.appWindow.content.menu.width -= x
        }
      }
      // 用于写入配置
      GlobalConfig.writeGlobalConfig({
        appWindow: {
          content: {
            menu: {
              width: GlobalConfig.appWindow.content.menu.width
            }
          }
        }
      })
    },
    activationMenu(name: string) {
      const menu = ContextMenu.getMenu()
      if (name === 'main' || name === 'icon') {
        menu.push(ContextMenu.getOpenOrCloseIconBar()).push(ContextMenu.getIconMove())
      }
      menu.push(ContextMenu.getSeparator())
      if (name === 'main' || name === 'menu') {
        menu.push(ContextMenu.getOpenOrCloseMenuBar()).push(ContextMenu.getMenuMove())
      }
      menu.popup()
    }
  },
  computed: {
    iconLeft() {
      return this.$store.getters.iconLeft
    },
    iconShow() {
      return this.$store.getters.iconShow
    },
    menuShow() {
      return this.$store.getters.menuShow
    },
    menuLeft() {
      return this.$store.getters.menuLeft
    },
    winStyle() {
      const originalStyle = document.body.style.cssText
      document.body.setAttribute('style', originalStyle + UITools.toStyle(this.$store.getters.globalStyle('message.box')))
      return { ...this.$store.getters.winStyle }
    }
  },
  data() {
    return {
      appWinHeight: {
        height: UITools.addPX(GlobalConfig.appWindow.height)
      },
      appWinIconStyle: {
        width: UITools.addPX(GlobalConfig.appWindow.icon.width),
        '-webkit-app-region': is.macOS() ? 'drag' : 'no-drag'
      },
      appWinMenuStyle: {
        width: UITools.addPX(GlobalConfig.appWindow.content.menu.width)
      },
      appWinMenuHeaderStyle: {
        height: UITools.addPX(GlobalConfig.appWindow.content.header.height),
        '-webkit-app-region': 'drag'
      },
      appWinContentHeaderStyle: {
        height: UITools.addPX(GlobalConfig.appWindow.content.header.height),
        '-webkit-app-region': is.macOS() ? 'drag' : 'no-drag',
        margin: 0,
        padding: 0
      }
    }
  },
  created() {
    document.body.className = this.$store.getters.getElementTheme
    const appInit = (bounds: Rectangle | {[key: string]: number}) => {
      // 改变全局配置中的高宽
      GlobalConfig.appWindow.height = bounds.height
      GlobalConfig.appWindow.width = bounds.width
      this.appWinHeight.height = UITools.addPX(bounds.height)
      this.$store.dispatch(MutationTypes.ICON_MENU_SHOW, bounds.width)
    }
    appInit(GlobalConfig.appWindow)
    ipcRenderer.on(EventTypes.APP_WINDOW_BOUNDS, (e, bounds: Rectangle) => {
      appInit(bounds)
    })
  },
  components: {
    // 用于左侧每一个插件的图标显示
    AppWinMenu,
    AppWinMain,
    TrafficLights,
    AppWinIcon
  }
})
</script>
<style lang="scss">
  body {
    height: 100%;
    width: 100%;
    padding: 0;
    margin: 0;
    border: 0;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  // .global-message-box-background {
  //   background: var(--message-background) !important;
  //   border: 1px solid var(--message-border) !important;
  //   .el-message-box__header {
  //     .el-message-box__title {
  //       color: var(--message-title-color);
  //     }
  //   }
  //   .el-message-box__content {
  //     .el-message-box__container {
  //       .el-message-box__message {
  //         color: var(--message-container-message)
  //       }
  //     }
  //   }
  // }
</style>
<style lang="scss" scoped>
  #app{
    height: 100%;
    width: 100%;
    .app-win {
      height: 100%;
      width: 100%;
      .app-win-icon {
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
      }
      .app-win-content {
        height: 100%;
        .app-win-content-menu {
          height: 100%;
          .app-win-content-menu-move {
            height: 100%;
            width: 3px !important;
            float: left;
            cursor: col-resize;
          }
          .app-win-menu-content {
            float: left;
            width: calc(100% - 3px) !important;
            height: 100%;
          }
        }
        .app-win-content-main {
          .app-win-main-content {
            padding: 0;
          }
        }
      }
    }
  }
</style>
