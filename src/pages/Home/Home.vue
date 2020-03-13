<template>
  <section class="msite">
    <!--首页头部-->
    <HeaderTop :title="ad.name">
      <router-link class="header_search" slot="left" to="/search">
        <i class="iconfont icon-sousuo"></i>
      </router-link>
      <router-link class="header_login" slot="right" :to="userInfo._id?'/userinfo':'/login' ">
        <span class="header_login_text" v-if="!userInfo._id">登录|注册</span>
        <span class="header_login_text" v-else><i class="iconfont icon-person"></i></span>
      </router-link>
    </HeaderTop>
    <!--首页导航-->
    <nav class="msite_nav">
      <div class="swiper-container" v-if="categorys.length">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(categorys,index) in categorysArr" :key="index">
            <a href="javascript:" class="link_to_food" v-for="(category,index) in categorys" :key="index">
              <div class="food_container">
                <img :src="baseImageUrl+category.image_url">
              </div>
              <span>{{category.title}}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
      <!--显示加载中的提示页面-->
      <img src="./images/msite_back.svg" alt="back" v-else>
    </nav>
    <!--首页附近商家-->
    <ShopList></ShopList>
  </section>
</template>

<script>
  import {mapState} from 'vuex'
  import axios from 'axios'
  import Swiper from 'swiper'
  import 'swiper/css/swiper.css'

  import HeaderTop from '../../components/HeaderTop/HeaderTop'
  import ShopList from '../../components/ShopList/ShopList'

  export default {
    data(){
      return{
        baseImageUrl: 'https://fuss10.elemecdn.com'
      }
    },
    mounted () {
      //获取食品分类
      this.$store.dispatch('getCategorys')
      //获取商家列表
      this.$store.dispatch('getShops')
      //自己测试
      this.$store.dispatch('getTeacher')
      /*const url = 'https://www.affectiony.fun/CSTPlatform/teacherAction/getTeachers'
      axios.defaults.headers.post['Content-Type']= 'application/x-www-form-urlencoded;charset=UTF-8'; // 配置请求头
      axios.get(url).then(
        response=>{
          const result =response.data

        }
      ).catch(error=>{

      })*/
    },
    computed:{
      //...mapState(['address','categorys']),  //mapState(['address'])相当于this.$store.state.address
      /*
      * 也可以并且将vuex中的this.$store.state.address映射到this.ad (this -> vue)上面来,在使用的时候直接写ad,
      * 而且当映射的值和state的状态值是相等的时候，可以直接使用,如：categorys
      * */
      ...mapState({ad:'address',categorys:'categorys',userInfo:'userInfo'}),

      /*
      * 根据categorys一维数组生成一个二维数组
      * */
      categorysArr(){
        const {categorys} = this  //解构赋值，等价于const categorys = this.categorys
        let arr = []

        //方法1：
       let len = categorys.length
        let lineNum = len % 8 === 0? len / 8: Math.floor( (len/8) + 1) //计算行数
        for(let i=0; i<lineNum; i++){
          let temp = categorys.slice(i*8,i*8+8)  //slice属于浅拷贝
          /*使用JSON.stringify()可以将对象转成字符串
          使用slice时，不会影响原来的值，实现深拷贝对象数组*/
          arr.push(JSON.parse(JSON.stringify(temp)))
        }

        //方法2：
        /*let minArr = []
        categorys.forEach(c=>{
          if(minArr.length===8){
            minArr = []
          }
          if(minArr.length===0){
            arr.push(minArr)
          }
          minArr.push(c)
        })*/
        return arr
      }
    },
    watch:{
      categorys(value){ //这个函数调用，说明categorys数组中有数据了
        /*setTimeout(()=>{
            //创建一个Swiper对象，来实现轮播
            new Swiper('.swiper-container',{
              loop: true,  //可以循环轮播
              //如果需要分页
              pagination:{
                el: '.swiper-pagination'
              }
            })
        },100)*/
        //希望界面更新就立即创建swiper对象
        this.$nextTick(()=>{  //一旦完成页面更新，立即调用
          //创建一个Swiper对象，来实现轮播
          new Swiper('.swiper-container',{
            loop: true,  //可以循环轮播
            //如果需要分页
            pagination:{
              el: '.swiper-pagination'
            }
          })
        })
      }
    },
    components:{
      HeaderTop,
      ShopList
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .msite  //首页
    width 100%
    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          >span.swiper-pagination-bullet-active
            background #02a774
</style>
