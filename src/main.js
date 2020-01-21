/*
* 入口js
* */
import Vue from 'vue'
import App from './App.vue'
import router from './router'

new Vue({
  el: "#app",
  render: h => h(App),
  router  //配置了路由之后，有两个方面的结果：1.多了组件标签如：<router-link>、<router-view>等；2.多两个属性：$route,$router
})
