import Vue from 'vue'
import Icon from '@/components/Icon.vue'
Vue.component('extension-icon', {
  props: {
    icon: Object
  },
  render(createElement) {
    const com = Vue.extend({
      template: this.icon.isClass ? '<icon :icon-class="icon.data"></icon>' : this.icon.data,
      props: {
        icon: Object
      },
      components: {
        Icon
      }
    })
    return createElement(com, {
      props: {
        icon: this.icon
      }
    })
  }
})
