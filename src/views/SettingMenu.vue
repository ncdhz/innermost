<template>
  <div v-show="vShow">
    <menu-item menu-icon="el-icon-menu" :menu-name="$t('setting.basic.name')"></menu-item>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import MenuItem from '@/components/MenuItem.vue'
export default Vue.extend({
  props: {
    vShow: Boolean
  },
  components: {
    MenuItem
  }
})
</script>
