<template>
  <div class="menu-item" :style="itemStyle.item">
    <i :class="menuIcon"></i>
    <span>{{menuName}}</span>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  computed: {
    itemStyle(): object {
      return this.$store.state.theme.menu
    }
  },
  props: {
    menuIcon: String,
    menuName: String
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
    -webkit-app-region: no-drag;
    i {
      font-size: 20px;
      padding-right: 10px;
    }
    color: var(--color)
  }
  .menu-item:hover {
    background: var(--hover-background);
    color: var(--hover-color);
  }
</style>
