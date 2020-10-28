<template>
  <div class="menu-item" :class="{'menu-item-color-deep': extensionIdShow}" :style="itemStyle.item" @click="updaeIdToExtension">
    <i :class="menuIcon"></i>
    <span>{{menuName}}</span>
  </div>
</template>
<script lang="ts">
import { MutationTypes } from '@/store'
import Vue from 'vue'
export default Vue.extend({
  props: {
    menuIcon: String,
    menuName: String,
    menuId: String,
    extensionName: String
  },
  methods: {
    updaeIdToExtension() {
      if (this.menuId) {
        this.$store.dispatch(MutationTypes.UPDATE_EXTENSION_ID, {
          id: this.menuId,
          name: this.extensionName
        })
      }
    }
  },
  computed: {
    itemStyle(): object {
      return this.$store.state.theme.menu
    },
    extensionIdShow(): boolean {
      if (this.menuId && this.extensionName) {
        return this.$store.state.extensionIds[this.extensionName][this.menuId]
      }
      return false
    }
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
  }
  .menu-item-color-deep {
    background: var(--hover-background);
    color: var(--hover-color);
  }
</style>
