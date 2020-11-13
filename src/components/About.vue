<template>
  <el-dialog class="app-win-about" :style="aboutStyle.about" :visible.sync="show" :width="dialogWidth">
    <div slot="title" class="about-app-name" :style="aboutStyle.header">
      INNERMOST
    </div>
    <div class="about-app-version-title" :style="aboutStyle.body.title">
      <el-row>
        <el-col :span="12">版本信息</el-col>
      </el-row>
    </div>
    <div class="about-app-version" :style="aboutStyle.body.version">
      <el-row>
        <el-col :span="12">App {{version.app}}</el-col>
        <el-col :span="12">Electron {{version.electron}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="12">Vue {{version.vue}}</el-col>
        <el-col :span="12">Nedb {{version.nedb}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="12">Element-ui {{version['element-ui']}}</el-col>
      </el-row>
    </div>
    <div slot="footer" class="about-service" :style="aboutStyle.footer">
      <el-row type="flex" justify="end">
        <el-col :span="4">开源许可</el-col>
        <el-col :span="4">关于我们</el-col>
        <el-col :span="4">帮助支持</el-col>
        <el-col :span="4">更新日志</el-col>
      </el-row>
    </div>
  </el-dialog>
</template>
<script lang="ts">
import Vue from 'vue'
import { MutationTypes } from '@/store'
import { EventTypes, GlobalConfig } from '@/utils'
import { ipcRenderer, Rectangle } from 'electron'
const { version, dependencies, devDependencies } = require('../../package.json')
export default Vue.extend({
  data() {
    return {
      version: {
        app: version,
        vue: dependencies.vue,
        nedb: dependencies.nedb,
        'element-ui': dependencies['element-ui'],
        electron: devDependencies.electron
      },
      dialogWidth: '50%'
    }
  },
  mounted() {
    this.setDialogWidth(GlobalConfig.appWindow.width)
    ipcRenderer.on(EventTypes.APP_WINDOW_BOUNDS, (event, bound: Rectangle) => {
      this.setDialogWidth(bound.width)
    })
  },
  methods: {
    setDialogWidth(width: number) {
      this.dialogWidth = width < 1000
        ? width > 800
          ? '60%' : width > 600 ? '80%' : '96%' : '50%'
    }
  },
  computed: {
    show: {
      get(): boolean {
        return this.$store.getters.aboutShow
      },
      set(): void {
        this.$store.commit(MutationTypes.ABOUT_SHOW, false)
      }
    },
    aboutStyle(): object {
      return this.$store.getters.aboutStyle
    }
  }
})
</script>
<style lang="scss">
  // .app-win-about {
  //   .el-dialog__header, .el-dialog__body, .el-dialog__footer{
  //     background: var(--about-background);
  //   }
  // }
</style>
<style lang="scss" scoped>
  @font-face {
    font-family: 'alibaba';
    font-display: swap;
    src: url('../assets/alibaba.ttf') format('truetype');
  }
  .app-win-about {
    .about-app-name {
      font-family: 'alibaba' !important;
      font-size: 26px;
    }
    .about-app-version-title {
      font-size: 15px;
      padding-bottom: 10px;
    }
    .about-app-version {
      font-size: 13px;
      line-height: 25px;
    }
    .about-service {
      font-size: 13px;
    }
  }
</style>
