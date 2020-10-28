<template>
  <el-container>
    <el-header style="height:30px" class="app-win-menu-title">
      <span v-show="extensionShow[settingName]" :style="menuStyle.title">{{ $t('setting.name') }}</span>
      <span v-show="extensionShow[title[1]]" v-for="title in menuTitles" v-bind:key="typeof title[0] === 'string' ? title[0] : title[0].name" :style="menuStyle.title">{{typeof title[0] === 'string' ? title[0] : title[0].i18n ? title[0].parentI18n ? $t(`${title[0].name}`) : $t(`${title[1]}.${title[0].name}`) : title[0].name}}</span>
    </el-header>
    <el-main>
      <setting-menu v-show="extensionShow[settingName]"/>
      <component v-show="extensionShow[menu[1]]" v-for="menu in menus" v-bind:key="menu[0]" v-bind:is="menu[0]" ></component>
    </el-main>
  </el-container>
</template>
<script lang="ts">
import Vue from 'vue'
import SettingMenu from './SettingMenu.vue'
import { ExtensionManager } from '@/plugins'
import { MutationTypes } from '@/store'
import { SettingConfig } from '@/utils'
export default Vue.extend({
  data() {
    return {
      menuTitles: ExtensionManager.getMenuTitles(),
      settingName: SettingConfig.SettingName
    }
  },
  components: {
    SettingMenu
  },
  computed: {
    menus() {
      const extensionIds = ExtensionManager.getExtensionIds()
      this.$store.commit(MutationTypes.ADD_EXTENSION_IDS, extensionIds)
      return ExtensionManager.getMenus()
    },
    menuStyle(): object {
      return this.$store.state.theme.menu
    },
    extensionShow() {
      return this.$store.state.extensions
    }
  }
})
</script>
<style lang="scss" scoped>
  .app-win-menu-title {
    font-size: 16px;
    line-height: 30px;
  }
</style>
