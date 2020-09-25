<template>
  <div class="traffic-lights">
    <div class="traffic-lights-main" v-show="showTrafficLights">
      <span class="traffic-lights-button traffic-lights-green iconfont icon-minimum" @click="minimumWin"></span>
      <span class="traffic-lights-button traffic-lights-yellow iconfont icon-maximize" @click="maximizeWin"></span>
      <span class="traffic-lights-button traffic-lights-red iconfont icon-close" @click="closeWin"></span>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import is from 'electron-is'
import { EventTypes } from '@/utils'
import { ipcRenderer } from 'electron'
export default Vue.extend({
  data() {
    return {
      showTrafficLights: true
    }
  },
  methods: {
    // 最小化窗口
    minimumWin(): void {
      ipcRenderer.send(EventTypes.MIN_WINDOW)
    },
    // 最大化窗口
    maximizeWin(): void {
      ipcRenderer.send(EventTypes.MAX_WINDOW)
    },
    // 关闭窗口
    closeWin(): void {
      ipcRenderer.send(EventTypes.CLOSE_WINDOW)
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
      &:hover > .icon-maximize{
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
