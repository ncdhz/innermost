<template>
  <el-container class="app-win-main-box">
    <el-header class="app-win-main-title" style="height:45px;" :style="mainStyle.title">
      <span>{{ $t('setting.name.basic') }}</span>
      <div class="app-win-main-title-divider el-divider el-divider--horizontal" :style="mainStyle.divider"></div>
    </el-header>
    <el-main class="app-win-main-win">
      <setting-main/>
      <!-- 关于页面 -->
      <about/>
    </el-main>
  </el-container>
</template>
<script lang="ts">
import Vue from 'vue'
import SettingMain from '@/views/SettingMain.vue'
// 关于页面 弹窗
import About from '@/components/About.vue'
export default Vue.extend({
  components: {
    SettingMain,
    About
  },
  computed: {
    mainStyle(): object {
      return this.$store.state.theme.main
    }
  }
})
</script>
<style lang="scss">
  .app-win-main-box {
    height: 100%;
    width: 100%;
    .app-win-main-title {
      font-size: 17px;
      line-height: 30px;
      .app-win-main-title-divider {
        height: 2px;
        margin-top: 10px;
      }
    }
    .app-win-main-win {
      display: flex;
      justify-content: center;
    }
  }
</style>
