/**
* 布局如下图所示
* |-|---|----------------------------|
* | |   |                            |
* | |   |----------------------------|
* | |   |                            |
* | |   |                            |
* | |   |                            |
* | |   |                            |
* | |   |----------------------------|
* | |   |                            |
* |-|---|----------------------------|
*/
<template>
  <div id="app" :style="appWindowHeight">
    <el-container id="app-win">
      <!-- 侧边栏用于图标显示 -->
      <el-aside id="app-win-icon" v-show="appWinIconShow" :style="appWinIconStyle">
        <AppWinIcon/>
      </el-aside>
      <!-- 主要部分 -->
      <el-container id="app-win-content">
        <!-- 侧面菜单部分 -->
        <el-aside id="app-win-content-menu" :style="appWinMenuStyle" v-show="appWinMenuShow">
          <el-container id="app-win-menu-content">
            <el-header :style="appWinContentHeaderStyle"></el-header>
            <AppWinMenu/>
          </el-container>
        </el-aside>

        <el-container>
          <!-- 主要部分头 -->
          <el-header :style="appWinContentHeaderStyle">
          </el-header>
          <!-- 主要部分内容 -->
          <el-main>
          </el-main>
          <!-- 主要部分尾部 -->
          <el-footer>
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { ipcRenderer } from 'electron'
import { GlobalConfig, UITools } from '@/utils'
import AppWinIcon from '@/views/AppWinIcon.vue'
import AppWinMenu from '@/views/AppWinMenu.vue'
export default Vue.extend({
  data() {
    return {
      appWindowHeight: {
        height: UITools.addPX(GlobalConfig.appWindow.height)
      },
      appWinIconStyle: {
        width: UITools.addPX(GlobalConfig.appWindow.icon.width),
        '-webkit-app-region': 'drag'
      },
      appWinMenuStyle: {
        width: UITools.addPX(GlobalConfig.appWindow.content.menu.width)
      },
      appWinIconShow: true,
      appWinMenuShow: true,
      appWinContentHeaderStyle: {
        height: UITools.addPX(GlobalConfig.appWindow.content.header.height),
        '-webkit-app-region': 'drag'
      }
    }
  },
  created() {
    ipcRenderer.on('app-window-bounds', (e, bounds) => {
      this.appWindowHeight.height = UITools.addPX(bounds.height)
      if (bounds.width < 800) {
        this.appWinIconShow = false
      } else {
        this.appWinIconShow = true
      }
      if (bounds.width < 570) {
        this.appWinMenuShow = false
      } else {
        this.appWinMenuShow = true
      }
    })
  },
  components: {
    // 用于左侧每一个插件的图标显示
    AppWinIcon,
    AppWinMenu
  }
})
</script>

<style lang="scss">
  body {
    height: 100%;
    width: 100%;
    padding: 0;
    margin: 0;
  }
  #app{
    height: 100%;
    width: 100%;
    #app-win {
      height: 100%;
      width: 100%;
      #app-win-icon {
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
      }
      #app-win-content {
        height: 100%;
        #app-win-content-menu {
          height: 100%;
          background: #2d2d2d;
          #app-win-menu-content{
            height: 100%;
          }
        }
      }
    }
  }
</style>
