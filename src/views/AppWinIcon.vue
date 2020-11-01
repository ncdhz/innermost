<template>
  <el-container class="app-win-icon-content">
    <el-header class="app-win-icon-content-logo">
      <div class="app-win-icon-content-logo-drag"></div>
      <icon-logo/>
    </el-header>
    <!-- 扩展的图标 -->
    <el-main class="app-win-icon-content-main">
      <component v-show="!extensionIconShow[icon[1]]" @contextmenu.native="activationMenu(icon[1])" v-for="icon in icons" v-bind:key="icon[0]" v-bind:is="icon[0]" ></component>
    </el-main>
    <el-footer :style="appWinIconContentFooterStyle">
      <icon :func="openSetting" icon-class="el-icon-s-operation" />
      <icon :func="openAbout" icon-class="el-icon-info" />
    </el-footer>
  </el-container>
</template>
<script lang="ts">
import Vue from 'vue'
import IconLogo from '@/components/IconLogo.vue'
import Icon from '@/components/Icon.vue'
import { UITools, SettingConfig } from '@/utils'
import { ActionTypes, MutationTypes } from '@/store'
import { ExtensionManager } from '@/plugins'
import { ContextMenu } from '@/renderer'
import { mapGetters } from 'vuex'
export default Vue.extend({
  data(): object {
    return {
      appWinIconContentFooterStyle: {
        height: UITools.addPX(100),
        'margin-bottom': UITools.addPX(20)
      },
      icons: ExtensionManager.getIcons()
    }
  },
  methods: {
    activationMenu(name: string) {
      const menu = ContextMenu.getMenu()
      menu.push(ContextMenu.getDisableExtension(name, this))
      menu.push(ContextMenu.getSeparator())
      menu.push(ContextMenu.getOpenOrCloseIconBar())
      menu.push(ContextMenu.getSeparator())
      menu.push(ContextMenu.getIconMove())
      menu.popup()
    },
    openAbout() {
      this.$store.commit(MutationTypes.ABOUT_SHOW, true)
    },
    openSetting() {
      this.$store.dispatch(ActionTypes.UPDATE_EXTENSION, { name: SettingConfig.SettingName })
    }
  },
  components: {
    IconLogo,
    Icon
  },
  computed: {
    ...mapGetters([
      'extensionIconShow'
    ])
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
