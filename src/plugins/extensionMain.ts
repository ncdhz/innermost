import Vue from 'vue'
Vue.component('extensions-main', {
  props: {
    html: String
  },
  render(createElement) {
    const com = Vue.extend({
      template: this.html
    })
    return createElement(com, {})
  }
})
