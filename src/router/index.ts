import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  // {
  //   path: '/About',
  //   name: 'About',
  //   component: About
  // }
]

const router = new VueRouter({
  routes
})

export default router
