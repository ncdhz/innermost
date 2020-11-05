<template>
  <el-container class="setting-main-box" v-show="vShow">
    <el-header class="setting-main-title" style="height:45px;" :style="settingStyle.title">
      <span v-show="extensionIdShow[settingName][settingId]">{{ $t('setting.basic.name') }}</span>
      <span v-show="extensionIdShow[setting[1]][setting[2]]" v-for="setting in settings" v-bind:key="setting[0]">{{ settingTitle(setting[3]) }}</span>
      <div class="setting-main-title-divider el-divider el-divider--horizontal" :style="settingStyle.divider"></div>
    </el-header>
    <el-main class="setting-main-win">
      <div class="setting-main-content" v-show="extensionIdShow[settingName][settingId]">
        <el-form  size="mini" label="right" :style="settingStyle" label-width="120px">
          <!-- 切换主题 -->
          <el-form-item :label="$t('setting.basic.theme') + ':'">
            <el-select popper-class="setting-select" :popper-append-to-body="false" @change="changeTheme" v-model="themeValue">
              <el-option v-for="item in themeType" :key="item" :value="item" :label="item"></el-option>
            </el-select>
          </el-form-item>
          <!-- 图标栏 -->
          <el-form-item :label="$t('setting.basic.iconBar') + ':'">
            <el-switch v-model="iconShow" />
          </el-form-item>
          <!-- 菜单栏 -->
          <el-form-item :label="$t('setting.basic.menuBar') + ':'">
            <el-switch v-model="menuShow" />
          </el-form-item>
          <!-- 扩展路径 -->
          <el-form-item :label="$t('setting.basic.extensionsPath') + ':'">
            <div  @click="selectExtensionsPath">
              <el-input v-model="extensionsPath">
                <template slot="append"  >
                  <i class="el-icon-folder-opened setting-input-icon" />
                </template>
              </el-input>
            </div>
          </el-form-item>
          <!-- 图标栏转移到右边 -->
          <el-form-item :label="$t('setting.basic.moveIconBarRight') + ':'">
            <el-switch v-model="iconLeft" />
          </el-form-item>
          <!-- 菜单栏转移到右边 -->
          <el-form-item :label="$t('setting.basic.moveMenuBarRight') + ':'">
            <el-switch v-model="menuLeft" />
          </el-form-item>
          <!-- 切换语言 -->
          <el-form-item :label="$t('setting.basic.language') + ':'">
            <el-select popper-class="setting-select" :popper-append-to-body="false" @change="changeLanguage" v-model="languageValue">
              <el-option v-for="(item, key) in languageType" :key="key" :value="key" :label="item"></el-option>
            </el-select>
          </el-form-item>
          <!-- 恢复出厂设置 -->
          <el-form-item label="">
            <el-button @click="defaultSettings" type="danger">{{ $t('setting.basic.defaultSettings') }}</el-button>
          </el-form-item>
        </el-form>
      </div>
      <component v-show="extensionIdShow[setting[1]][setting[2]]" v-for="setting in settings" v-bind:key="setting[0]" v-bind:is="setting[0]" ></component>
    </el-main>
  </el-container>
</template>
<script lang="ts">
import { I18nUtil, GlobalConfig, EventTypes, Theme, DefaultConfig, SettingConfig } from '@/utils'
import { ipcRenderer, remote } from 'electron'
import { MutationTypes } from '@/store'
import { ExtensionManager } from '@/plugins'
import { UIEventManager } from '@/renderer'
import Vue from 'vue'
import { mapGetters } from 'vuex'
export default Vue.extend({
  props: {
    vShow: Boolean
  },
  data() {
    return {
      languageType: I18nUtil.languageType,
      languageValue: GlobalConfig.i18n.locale,
      themeType: Theme.themeType,
      themeValue: GlobalConfig.theme.default,
      iconValue: GlobalConfig.appWindow.icon.show && GlobalConfig.appWindow.width > DefaultConfig.appWindow.limit.one,
      menuValue: GlobalConfig.appWindow.content.menu.show && GlobalConfig.appWindow.width > DefaultConfig.appWindow.limit.two,
      extensionsPath: GlobalConfig.extension.path,
      // 用于控制是显示自带配置还是用户定义配置
      settingName: SettingConfig.SettingName,
      settingId: SettingConfig.SettingId,
      settings: ExtensionManager.getSettings()
    }
  },
  methods: {
    // 当前设置界面标题
    settingTitle(setting: {
      [key: string]: string | boolean;
    }) {
      if (setting.i18n) {
        if (setting.parentI18n) {
          return this.$i18n.t(setting.title as string)
        }
        return this.$i18n.t(`${setting.name as string}.${setting.title as string}`)
      }
      return setting.title
    },
    // 改变语言
    changeLanguage(data: string): void {
      this.$i18n.locale = data
      ipcRenderer.send(EventTypes.CHANGING_LANGUAGE, data)
      GlobalConfig.writeGlobalConfig({
        i18n: {
          locale: data
        }
      })
    },
    // 改变主题
    changeTheme(data: string): void {
      this.$store.commit(MutationTypes.UPDATE_THEME_NAME, data)
      GlobalConfig.writeGlobalConfig({
        theme: {
          default: data
        }
      })
    },
    // 改变扩展的目录
    selectExtensionsPath() {
      const folder = remote.dialog.showOpenDialogSync({
        title: this.$i18n.t('setting.basic.extensionsPath') as string,
        defaultPath: GlobalConfig.extension.path,
        properties: [
          'openDirectory',
          'showHiddenFiles'
        ]
      })
      if (folder) {
        const extensionPath = folder?.[0]
        if (GlobalConfig.extension.path !== extensionPath) {
          GlobalConfig.writeGlobalConfig({
            extension: {
              path: extensionPath
            }
          })
          this.$data.extensionsPath = extensionPath
          this.$message({
            message: this.$i18n.t('setting.basic.takeEffectAfterRestart') as string,
            type: 'success'
          })
        }
      }
    },
    // 恢复默认设置
    defaultSettings(): void {
      this.$confirm(this.$i18n.t('setting.basic.isDefaultSettings') as string, this.$i18n.t('el.messagebox.title') as string, {
        customClass: 'global-message-box-background'
      }).then(() => {
        GlobalConfig.clearGlobalConfig();
        (this as any).changeLanguage(DefaultConfig.i18n.locale);
        (this as any).languageValue = DefaultConfig.i18n.locale;
        (this as any).changeTheme(DefaultConfig.theme.default);
        (this as any).themeValue = DefaultConfig.theme.default
        this.$message({
          message: this.$i18n.t('setting.basic.success') as string,
          type: 'success'
        })
      }).catch(() => {
        this.$message({
          message: this.$i18n.t('setting.basic.cancel') as string,
          type: 'warning'
        })
      })
    }
  },
  computed: {
    ...mapGetters([
      'extensionIdShow',
      'settingStyle'
    ]),
    iconShow: {
      get(): boolean {
        return this.$store.getters.iconShow
      },
      set(show: boolean): void {
        UIEventManager.openOrCloseIconBar(show)
      }
    },
    menuShow: {
      get(): boolean {
        return this.$store.getters.menuShow
      },
      set(show: boolean): void {
        UIEventManager.openOrCloseMenuBar(show)
      }
    },
    iconLeft: {
      get() {
        return !this.$store.getters.iconLeft
      },
      set(left: boolean): void {
        UIEventManager.leftOrRightMoveIcon(!left)
      }
    },
    menuLeft: {
      get() {
        return !this.$store.getters.menuLeft
      },
      set(left: boolean): void {
        UIEventManager.leftOrRightMoveMenu(!left)
      }
    }
  }
})
</script>
<style lang="scss">
  .el-form-item__label {
    color: var(--label-inner-color);
  }
  .el-input__inner {
    border: 1px solid var(--inner-border-color);
    background: var(--inner-background);
    color: var(--label-inner-color);
    &:hover {
      border-color: var(--inner-append-hover-border-color);
      + .el-input-group__append {
        border-color: var(--inner-append-hover-border-color);
      }
    }
  }
  .el-input-group__append {
    border-color: var(--inner-border-color);
    border-style: solid;
    border-top-width: 1px;
    border-right-width: 1px;
    border-bottom-width: 1px;
    background: var(--inner-append-background);
    &:hover .setting-input-icon {
      color: var(--inner-append-hover-icon-color);
    }
  }
  .el-select-dropdown__list{
    border-radius: 3px;
    background: var(--inner-background);
  }
  .popper__arrow{
    border-right-color: var(--inner-background) !important;
    &::after{
      border-bottom-color: var(--inner-background) !important;
    }
  }
</style>
<style lang="scss" scoped>
  .setting-main-box {
    height: 100%;
    width: 100%;
    .setting-main-title {
      font-size: 17px;
      line-height: 30px;
      .setting-main-title-divider {
        height: 2px;
        margin-top: 10px;
      }
    }
    .setting-main-win {
      display: flex;
      justify-content: center;
      .setting-main-content {
        width: 70%;
        margin: 0px auto;
        height: 100%;
        .setting-input-icon {
          color: var(--inner-append-icon-color);
        }
        .setting-select{
          border-color: var(--inner-select-border-color);
          border-radius: 5px;

        }
      }
    }
  }
</style>
