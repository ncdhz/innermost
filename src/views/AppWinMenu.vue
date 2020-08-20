<template>
  <el-container id="app-win-menu-box">
    <el-header style="height:30px" id="app-win-menu-title">
      偏好设置
    </el-header>
    <el-main>
      <MenuItem/>
    </el-main>
  </el-container>
</template>
<script lang="ts">
import Vue from 'vue'
import MenuItem from '@/components/MenuItem.vue'
export default Vue.extend({
  components: {
    MenuItem
  }
})
</script>
<style lang="scss">
  #app-win-menu-box{
    color: white;
    #app-win-menu-title {
      font-size: 16px;
    }
  }
</style>
