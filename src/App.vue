<template>
  <div id="app">
    <!--路由组件-->
    <router-view></router-view>
    <!--底部导航-->
    <FooterGuide v-show="$route.meta.showFooter"></FooterGuide>
  </div>
</template>

<script>
  import FooterGuide from './components/FooterGuide/FooterGuide'
  import {mapActions} from 'vuex'

  export default {
    mounted(){
      //获取地址信息
      this.$store.dispatch('getAddress')
      //获取用户信息（自动登录）
      this.getUserInfo()
    },
    components:{
      FooterGuide
    },
    methods:{
      ...mapActions(['getUserInfo'])
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .app
    width 100%
    height 100%
    background #f5f5f5
</style>
