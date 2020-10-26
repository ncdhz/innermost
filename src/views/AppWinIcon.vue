<template>
  <el-container class="app-win-icon-content">
    <el-header class="app-win-icon-content-logo">
      <div class="app-win-icon-content-logo-drag"></div>
      <icon-logo/>
    </el-header>
    <!-- 生产图标 -->
    <el-main class="app-win-icon-content-main">
      <component v-for="icon in icons" v-bind:key="icon[0]" v-bind:is="icon[0]" ></component>
    </el-main>
    <el-footer :style="appWinIconContentFooterStyle">
      <icon :event-array="setting" icon-class="el-icon-s-operation" />
      <icon :event-array="aboutInnermost" icon-class="el-icon-info" />
    </el-footer>
  </el-container>
</template>
<script lang="ts">
import Vue from 'vue'
import { ipcRenderer } from 'electron'
import IconLogo from '@/components/IconLogo.vue'
import Icon from '@/components/Icon.vue'
import { UITools, EventTypes } from '@/utils'
import { MutationTypes } from '@/store'
import { ExtensionManager } from '@/plugins'
import InnermostIconEventInterface from '@/innermost/InnermostIconEventInterface'
import _ from 'lodash'

export default Vue.extend({
  data(): object {
    return {
      appWinIconContentFooterStyle: {
        height: UITools.addPX(100),
        'margin-bottom': UITools.addPX(20)
      }
    }
  },
  components: {
    IconLogo,
    Icon
  },
  computed: {
    icons() {
      const icons = ExtensionManager.getIcons()
      const extensions: {
        [key: string]: boolean;
      } = {}
      _.forEach(icons, icon => {
        extensions[icon[1] as string] = icon[2] as boolean
      })
      this.$store.dispatch(MutationTypes.ADD_EXTENSIONS, extensions)
      return icons
    },
    // 关于心底深处
    aboutInnermost(): Array<InnermostIconEventInterface> {
      const openAboutInnermost: () => void = () => {
        this.$store.commit(MutationTypes.ABOUT_SHOW, true)
      }
      ipcRenderer.on(EventTypes.OPEN_ABOUT, () => {
        openAboutInnermost()
      })
      return [
        {
          name: 'click',
          func: () => openAboutInnermost()
        }
      ]
    },
    setting(): Array<InnermostIconEventInterface> {
      return [
        {
          name: 'click',
          func: () => this.$store.dispatch(MutationTypes.SETTING_SHOW, true)
        }
      ]
    }
  }
})
</script>

<style lang="scss" scoped>
  .app-win-icon-content {
    width: 100%;
    height: 100%;
    .app-win-icon-content-logo {
      .app-win-icon-content-logo-drag {
        height: 30px;
        width: 100%;
        -webkit-app-region: drag;
      }
      width: 100%;
      height: 80px !important;
    }
    .app-win-icon-content-main {
      padding: 0px;
      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
</style>
