import { EnumRoutes } from '@/enums/EnumRoutes'
import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: EnumRoutes.USERS,
    component: () => import(/* webpackChunkName: "Users" */ '../views/Users.vue')
  },
  {
    path: '/users/:id',
    name: EnumRoutes.USER_DETAILS,
    component: () => import(/* webpackChunkName: "User" */ '../views/UsersDetails.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
