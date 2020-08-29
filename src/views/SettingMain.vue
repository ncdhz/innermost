<template>
  <el-form size="mini" class="setting-main" label="right" :style="settingStyle.setting" label-width="auto">
    <!-- 切换主题 -->
    <el-form-item :label="$t('setting.theme') + ':'">
      <el-select @change="changeTheme" v-model="themeValue">
        <el-option v-for="item in themeType" :key="item" :value="item" :label="item"></el-option>
      </el-select>
    </el-form-item>
    <!-- 切换语言 -->
    <el-form-item :label="$t('setting.language') + ':'">
      <el-select @change="changeLanguage" v-model="languageValue">
        <el-option v-for="(item, key) in languageType" :key="key" :value="key" :label="item"></el-option>
      </el-select>
    </el-form-item>
    <!-- 恢复出厂设置 -->
    <el-form-item>
      <el-button @click="defaultSettings" type="danger">{{ $t('setting.defaultSettings') }}</el-button>
    </el-form-item>
  </el-form>
</template>
<script lang="ts">
import { I18nUtil, GlobalConfig, EventTypes, Theme, DefaultConfig } from '@/utils'
import { ipcRenderer } from 'electron'
import { UPDATE_THEME } from '@/store'
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      languageType: I18nUtil.languageType,
      languageValue: GlobalConfig.i18n.locale,
      themeType: Theme.themeType,
      themeValue: GlobalConfig.theme.default
    }
  },
  methods: {
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
      this.$store.commit(UPDATE_THEME, data)
      GlobalConfig.writeGlobalConfig({
        theme: {
          default: data
        }
      })
    },
    // 恢复默认设置
    defaultSettings(): void {
      this.$confirm(this.$i18n.t('setting.isDefaultSettings') as string, this.$i18n.t('el.messagebox.title') as string, {
        customClass: 'global-message-box-background'
      }).then(() => {
        GlobalConfig.clearGlobalConfig()
        this.changeLanguage(DefaultConfig.i18n.locale)
        this.languageValue = DefaultConfig.i18n.locale
        this.changeTheme(DefaultConfig.theme.default)
        this.themeValue = DefaultConfig.theme.default
        this.$message({
          message: this.$i18n.t('setting.success') as string,
          type: 'success'
        })
      }).catch(() => {
        this.$message({
          message: this.$i18n.t('setting.cancel') as string,
          type: 'warning'
        })
      })
    }
  },
  computed: {
    settingStyle(): object {
      return this.$store.state.theme.main
    }
  }
})
</script>
<style lang="scss">
  .setting-main {
    .el-form-item__label {
      color: var(--label-inner-color);
    }
    .el-input__inner {
      background: var(--inner-background);
      color: var(--label-inner-color);
    }
  }
</style>
