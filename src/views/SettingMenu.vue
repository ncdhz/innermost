<template>
  <div v-show="vShow">
    <menu-item :func="openBasic" menu-icon="el-icon-menu" :menu-id="settingId" :extension-name="settingName"  :menu-name="$t('setting.basic.name')"></menu-item>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import MenuItem from '@/components/MenuItem.vue'
import { SettingConfig } from '@/utils'
import { ActionTypes } from '@/store'
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
  methods: {
    openBasic() {
      this.$store.dispatch(ActionTypes.UPDATE_EXTENSION_ID, {
        id: this.settingId,
        name: this.settingName
      })
    }
  },
  components: {
    MenuItem
  }
})
</script>
