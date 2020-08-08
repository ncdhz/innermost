<template>
  <div id="app">
    <router-link to="/">Go to Foo</router-link>
    <router-link to="/about">Go to Bar</router-link>
    <div>
      <p>
        If Element is successfully added to this project, you'll see an
        <code>{{$t('page', {page: 1})}}</code>
        below
      </p>
      <el-button>{{$t('name')}}</el-button>
      <el-select v-model="value" @change="changeLangType">
        <el-option value="en" label="English"></el-option>
        <el-option value="zh-CN" label="中文"></el-option>
      </el-select>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: localStorage.getItem("locale") || "en"
    }
  },
  name: "app",
  components: {},
  methods: {
    changeLangType(type) {
      localStorage.setItem("locale", type)
      this.$i18n.locale = type
    }
  }
}
</script>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
