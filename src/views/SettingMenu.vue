<template>
  <div>
    <menu-item menu-icon="el-icon-menu" :menu-name="$t('setting.name.basic')"></menu-item>
  </div>
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
