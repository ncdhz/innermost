<template>
  <div id="menu-item">
    <i class="el-icon-menu"></i>
    <span>基础设置</span>
  </div>
</template>
<style lang="scss">
  #menu-item {
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
    i {
      font-size: 20px;
      padding-right: 10px;
    }
    color: #aaaaaa;
  }
  #menu-item:hover{
    background: #444444;
    color: white;
  }
</style>
