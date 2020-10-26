<template>
  <el-container class="app-win-main-box">
    <el-main class="app-win-main-box-content">
      <setting-main v-show="settingShow"/>
      <component v-show="extensionShow[body[1]]" v-for="body in bodys" v-bind:key="body[0]" v-bind:is="body[0]" ></component>
      <about/>
    </el-main>
  </el-container>
</template>
<script lang="ts">
import Vue from 'vue'
import SettingMain from '@/views/SettingMain.vue'
// 关于页面 弹窗
import About from '@/components/About.vue'
import { ExtensionManager } from '@/plugins'
export default Vue.extend({
  components: {
    SettingMain,
    About
  },
  data() {
    return {
      bodys: ExtensionManager.getBodys()
    }
  },
  computed: {
    settingShow(): boolean {
      return this.$store.state.setting.show
    },
    extensionShow() {
      return this.$store.state.extensions
    }
  }
})
</script>
<style lang="scss" scoped>
  .app-win-main-box {
    height: 100%;
    width: 100%;
    .app-win-main-box-content {
      padding-top: 0;
      padding-bottom: 0;
    }
  }
</style>
