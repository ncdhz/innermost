<template>
  <div id="icon">
    <div  id="icon-box">
      <i :class="iconClass"></i>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
@Component
export default class Icon extends Vue {
  @Prop() private iconClass!: string;
}
</script>
<style lang="scss">
#icon{
  width: 100%;
  height: 50px;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  #icon-box {
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
  #icon-box:hover {
    background:#444444;
    }
}
</style>
