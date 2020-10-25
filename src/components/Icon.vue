<template>
  <div class="icon" v-if="!eventArray || eventArray.length === 0">
    <div  class="icon-box">
      <i :class="iconClass"></i>
    </div>
  </div>
  <div class="icon" v-else-if="eventArray && eventArray.length === 1">
    <div @[eventArray[0].name]="event(0)" class="icon-box">
      <i :class="iconClass"></i>
    </div>
  </div>
  <div class="icon" v-else-if="eventArray && eventArray.length === 2">
    <div @[eventArray[0].name]="event(0)"
  @[eventArray[1].name]="event(1)" class="icon-box">
      <i :class="iconClass"></i>
    </div>
  </div>
  <div class="icon" v-else-if="eventArray && eventArray.length === 3">
    <div @[eventArray[0].name]="event(0)"
  @[eventArray[1].name]="event(1)" @[eventArray[2].name]="event(2)" class="icon-box">
      <i :class="iconClass"></i>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import InnermostIconEventInterface from '@/innermost/InnermostIconEventInterface'
export default Vue.extend({
  props: {
    iconClass: String,
    eventArray: Array
  },
  methods: {
    event(index: number): void {
      if (typeof this.eventArray[index] === 'object') {
        const eventObj: InnermostIconEventInterface = this.eventArray[index] as InnermostIconEventInterface
        if (typeof eventObj.func === 'function') {
          eventObj.func()
        }
      }
    }
  }
})
</script>
<style lang="scss">
.icon{
  width: 100%;
  height: 50px;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  .icon-box {
    cursor: pointer;
    margin: 0 auto;
    color: rgb(245, 245, 245);
    font-size: 24px;
    line-height: 30px;
    text-align: center;
    height: 30px;
    width: 30px;
    border-radius: 15px;
  }
  .icon-box:hover {
    background:#444444;
  }
}
</style>
