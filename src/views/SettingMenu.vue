<template>
  <div v-show="vShow">
    <menu-item menu-icon="el-icon-menu" :menu-id="settingId" :extension-name="settingName"  :menu-name="$t('setting.basic.name')"></menu-item>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import MenuItem from '@/components/MenuItem.vue'
import { SettingConfig } from '@/utils'
export default Vue.extend({
  props: {
    vShow: Boolean
  },
  data() {
    return {
      settingName: SettingConfig.SettingName,
      settingId: SettingConfig.SettingId
    }
  },
  components: {
    MenuItem
  }
})
</script>
