<template>
  <el-container id="app-win-icon-content">
    <el-header id="app-win-icon-content-logo">
      <IconLogo/>
    </el-header>
    <el-main></el-main>
    <el-footer :style="appWinIconContentFooterStyle">
      <Icon iconClass="el-icon-s-operation"/>
      <Icon iconClass="el-icon-info"/>
    </el-footer>
  </el-container>
</template>
<script lang="ts">
import Vue from 'vue'
import IconLogo from '@/components/IconLogo.vue'
import Icon from '@/components/Icon.vue'
import { UITools } from '@/utils'
export default Vue.extend({
  data() {
    return {
      appWinIconContentFooterStyle: {
        height: UITools.addPX(100),
        'margin-bottom': UITools.addPX(20)
      }
    }
  },
  name: 'AppWinIcon',
  components: {
    IconLogo,
    Icon
  }
})
</script>

<style lang="scss">
  #app-win-icon-content {
    width: 100%;
    height: 100%;
    #app-win-icon-content-logo {
      width: 100%;
      margin-top: 40px;
    }
  }
</style>
