<template>
  <div class="menu-item" :class="{'menu-item-focus': extensionIdShow && extensionIdShow[extensionName] && extensionIdShow[extensionName][menuId]}" :style="itemStyle" @click="updaeIdToExtension">
    <span><i :class="menuIcon"></i>{{menuName}}</span>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
export default Vue.extend({
  props: {
    menuIcon: String,
    menuName: String,
    menuId: String,
    extensionName: String,
    func: Function
  },
  methods: {
    updaeIdToExtension() {
      if (this.func) {
        this.func()
      }
    }
  },
  computed: {
    ...mapGetters([
      'itemStyle',
      'extensionIdShow'
    ])
  }
})
</script>
<style lang="scss" scoped>
  .menu-item {
    font-size: 15px;
    border-radius: 4px;
    line-height: 40px;
    padding: 0 20px;
    margin: 0;
    margin-bottom: 4px;
    cursor: pointer;
    outline: none;
    -webkit-app-region: no-drag;
    i {
      margin-right: 8px;
    }
    color: var(--color);
    &:hover {
      background: var(--hover-background);
      color: var(--hover-color);
    }
    span {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .menu-item-focus {
    background: var(--hover-background);
    color: var(--hover-color);
  }
</style>
