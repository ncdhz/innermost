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
  <div id="app" :style="appWindowHeight">
    <el-container class="app-win">
      <!-- 侧边栏用于图标显示 -->
      <el-aside class="app-win-icon" v-show="appWinIconShow" :style="appWinIconStyle">
        <app-win-icon/>
      </el-aside>
      <!-- 主要部分 -->
      <el-container class="app-win-content">
        <!-- 侧面菜单部分 -->
        <el-aside class="app-win-content-menu" :style="[appWinMenuStyle, winStyle.menu]" v-show="appWinMenuShow">
          <el-container class="app-win-menu-content">
            <el-header :style="appWinMenuHeaderStyle"></el-header>
            <app-win-menu/>
          </el-container>
        </el-aside>

        <el-container class="app-win-content-main" :style="winStyle.main">
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
      </el-container>
    </el-container>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { ipcRenderer, Rectangle } from 'electron'
import { GlobalConfig, UITools, EventTypes } from '@/utils'
import AppWinIcon from '@/views/AppWinIcon.vue'
import AppWinMenu from '@/views/AppWinMenu.vue'
import AppWinMain from '@/views/AppWinMain.vue'
import TrafficLights from '@/components/TrafficLights.vue'
import { MutationTypes } from './store'
import is from 'electron-is'
export default Vue.extend({
  data() {
    return {
      appWindowHeight: {
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
    const appInit = (bounds: Rectangle | {
      width: number;
      height: number;
    }) => {
      // 改变全局配置中的高宽
      GlobalConfig.appWindow.height = bounds.height
      GlobalConfig.appWindow.width = bounds.width
      this.appWindowHeight.height = UITools.addPX(bounds.height)
      if (bounds.width < GlobalConfig.appWindow.limit.one) {
        this.$store.commit(MutationTypes.ICON_SHOW, false)
      } else {
        this.$store.commit(MutationTypes.ICON_SHOW, GlobalConfig.appWindow.icon.show)
      }
      if (bounds.width < GlobalConfig.appWindow.limit.two) {
        this.$store.commit(MutationTypes.MENU_SHOW, false)
      } else {
        this.$store.commit(MutationTypes.MENU_SHOW, GlobalConfig.appWindow.content.menu.show)
      }
    }
    appInit(GlobalConfig.appWindow)
    ipcRenderer.on(EventTypes.APP_WINDOW_BOUNDS, (e, bounds: Rectangle) => {
      appInit(bounds)
    })
  },
  computed: {
    winStyle() {
      const originalStyle = document.body.style.cssText
      document.body.setAttribute('style', originalStyle + UITools.toStyle(this.$store.state.theme.global.message.box))
      return {
        ...this.$store.state.theme.window
      }
    },
    appWinIconShow() {
      return this.$store.state.icon.show
    },
    appWinMenuShow() {
      return this.$store.state.menu.show
    }
  },
  components: {
    // 用于左侧每一个插件的图标显示
    AppWinIcon,
    AppWinMenu,
    AppWinMain,
    TrafficLights
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
  .global-message-box-background {
    background: var(--message-background) !important;
    border: 1px solid var(--message-border) !important;
    .el-message-box__header {
      .el-message-box__title {
        color: var(--message-title-color);
      }
    }
    .el-message-box__content {
      .el-message-box__container {
        .el-message-box__message {
          color: var(--message-container-message)
        }
      }
    }
  }
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
          .app-win-menu-content{
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
