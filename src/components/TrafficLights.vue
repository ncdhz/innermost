<template>
  <div class="traffic-lights">
    <div class="traffic-lights-main" v-show="showTrafficLights">
      <span class="traffic-lights-button traffic-lights-green iconfont icon-minimum"></span>
      <span class="traffic-lights-button traffic-lights-yellow iconfont icon-zuidahua"></span>
      <span class="traffic-lights-button traffic-lights-red iconfont icon-close"></span>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import is from 'electron-is'
export default Vue.extend({
  data() {
    return {
      showTrafficLights: !is.macOS()
    }
  }
})
</script>
<style lang="scss">
  // 红绿灯图标
  @font-face {font-family: "traffic-lights";
    src: url('../assets/trafficLights.ttf?t=1601041653909') format('truetype')
  }
  .traffic-lights {
    height: 100%;
    width: 100%;
    .traffic-lights-main {
      height: 54%;
      width: 58px;
      margin-right: 5px;
      justify-content: space-between;
      display: flex;
      float: right;
      flex-wrap: wrap;
      align-items: center;
      background: red($color: #000000);
      .iconfont {
        font-family: "traffic-lights" !important;
        font-size: 6px;
        line-height: 12px;
        text-align: center;
        font-style: normal;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      &:hover > .icon-close{
        &:before {
          content: "\e616";
        }
      }
      &:hover > .icon-zuidahua{
        &:before {
          content: "\e621";
        }
      }
      &:hover > .icon-minimum{
        &:before {
          content: "\e664";
        }
      }
      .traffic-lights-button {
        display: block;
        height: 12px;
        width: 12px;
        border-radius: 6px;
      }
      .traffic-lights-yellow {
        background: #FFC300;
      }
      .traffic-lights-red {
        background: #FF3437;
      }
      .traffic-lights-green {
        background: #00DA47;
      }
    }
  }
</style>
