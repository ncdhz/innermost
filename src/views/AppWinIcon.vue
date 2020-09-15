<template>
  <el-container class="app-win-icon-content">
    <el-header class="app-win-icon-content-logo">
      <icon-logo/>
    </el-header>
    <el-main></el-main>
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
import { UITools, IconEventInterface, EventTypes } from '@/utils'
import { MutationTypes } from '@/store'
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
    // 关于心底深处
    aboutInnermost(): Array<IconEventInterface> {
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
    setting(): Array<IconEventInterface> {
      return [
        {
          name: 'click',
          func: () => this.$store.commit(MutationTypes.SETTING_SHOW, true)
        }
      ]
    }
  }
})
</script>

<style lang="scss">
  .app-win-icon-content {
    width: 100%;
    height: 100%;
    .app-win-icon-content-logo {
      width: 100%;
      margin-top: 40px;
    }
  }
</style>
