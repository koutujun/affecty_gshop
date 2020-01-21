/*
* 路由器对象模块
* */

import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/Home/Home.vue'
import Order from '../pages/Order/Order.vue'
import Person from '../pages/Person/Person.vue'
import Search from '../pages/Search/Search.vue'
import Login from '../pages/Login/Login'

//声明使用VueRouter插件
Vue.use(VueRouter)

export default new VueRouter({
  //所有路由
  routes:[
    {
      path:'/home',
      component: Home,
      meta: {
        showFooter: true
      }
    },
    {
      path:'/search',
      component: Search,
      meta: {
        showFooter: true
      }
    },
    {
      path:'/order',
      component: Order,
      meta: {
        showFooter: true
      }
    },
    {
      path:'/person',
      component: Person,
      meta: {
        showFooter: true
      }
    },
    {
      path:'/',  //默认显示Home
      redirect:'/home'
    },
    {
      path:'/login',
      component: Login,
      meta: {
        showFooter: false
      }
    }
  ]
})
