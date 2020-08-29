<template>
  <el-container class="app-win-icon-content">
    <el-header class="app-win-icon-content-logo">
      <icon-logo/>
    </el-header>
    <el-main></el-main>
    <el-footer :style="appWinIconContentFooterStyle">
      <icon icon-class="el-icon-s-operation" />
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
import { ABOUT_SHOW } from '@/store'
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
        this.$store.commit(ABOUT_SHOW, true)
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
