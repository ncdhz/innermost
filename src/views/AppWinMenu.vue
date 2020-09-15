<template>
  <el-container>
    <el-header style="height:30px" class="app-win-menu-title">
      <span v-show="settingShow" :style="menuStyle.title">{{ $t('setting.name') }}</span>
    </el-header>
    <el-main>
      <setting-menu v-show="settingShow"/>
    </el-main>
  </el-container>
</template>
<script lang="ts">
import Vue from 'vue'
import SettingMenu from './SettingMenu.vue'
export default Vue.extend({
  components: {
    SettingMenu
  },
  computed: {
    menuStyle(): object {
      return this.$store.state.theme.menu
    },
    settingShow(): boolean {
      return this.$store.state.setting.show
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
