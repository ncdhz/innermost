<template>
  <el-container>
    <el-header style="height:30px" class="app-win-menu-title">
      <span v-show="settingShow" :style="menuStyle.title">{{ $t('setting.name') }}</span>
      <span v-show="extensionShow[title[1]]" v-for="title in settingTitles" v-bind:key="typeof title[0] === 'string' ? title[0] : title[0].name" :style="menuStyle.title">{{typeof title[0] === 'string' ? title[0] : title[0].i18n ? title[0].parentI18n ? $t(`${title[0].name}`) : $t(`${title[1]}.${title[0].name}`) : title[0].name}}</span>
    </el-header>
    <el-main>
      <setting-menu v-show="settingShow"/>
      <component v-show="extensionShow[setting[1]]" v-for="setting in settings" v-bind:key="setting[0]" v-bind:is="setting[0]" ></component>
    </el-main>
  </el-container>
</template>
<script lang="ts">
import Vue from 'vue'
import SettingMenu from './SettingMenu.vue'
import { ExtensionManager } from '@/plugins'
export default Vue.extend({
  data() {
    return {
      settings: ExtensionManager.getSettings(),
      settingTitles: ExtensionManager.getSettingTitles()
    }
  },
  components: {
    SettingMenu
  },
  computed: {
    menuStyle(): object {
      return this.$store.state.theme.menu
    },
    settingShow(): boolean {
      return this.$store.state.setting.show
    },
    extensionShow() {
      return this.$store.state.extensions
    }
  }
})
</script>
<style lang="scss">
  .app-win-menu-title {
    font-size: 16px;
    line-height: 30px;
  }
</style>
