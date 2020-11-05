<template>
  <div class="menu-item" :class="{'menu-item-color-deep': extensionIdShow && extensionIdShow[extensionName] && extensionIdShow[extensionName][menuId]}" :style="itemStyle.item" @click="updaeIdToExtension">
    <i :class="menuIcon"></i>
    <span>{{menuName}}</span>
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
    width: calc(100% - 20px);
    font-size: 15px;
    text-align: left;
    border: 0;
    height: 35px;
    padding:0px 10px;
    border-radius: 4px;
    font-size: 15px;
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    cursor: pointer;
    margin-bottom: 5px;
    -webkit-app-region: no-drag;
    i {
      font-size: 20px;
      padding-right: 10px;
    }
    color: var(--color);
    &:hover {
      background: var(--hover-background);
      color: var(--hover-color);
    }
    span {
      width: calc(100% - 40px);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .menu-item-color-deep {
    background: var(--hover-background);
    color: var(--hover-color);
  }
</style>
