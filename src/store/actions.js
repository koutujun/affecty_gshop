/*
* 通过mutation间接更新state的多个方法的对象
* */

import {
  CLEAR_CART,
  DECREMENT_FOOD_COUNT,
  INCREMENT_FOOD_COUNT,
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS, RECEIVE_GOODS,
  RECEIVE_INFO, RECEIVE_RATINGS,
  RECEIVE_SHOPS,
  RECEIVE_USERINFO,
  RESET_USERINFO
} from './mutation-type'
import {
  reqAddress,
  reqFoodCategorys,
  reqLogout,
  reqShopGoods,
  reqShopInfo,
  reqShopRatings,
  reqShops, reqTeacher,
  reqUserInfo
} from '../api'

export default {

  //异步获取地址
  async getAddress({commit,state}){
    //发送异步ajax请求
    const geohash = state.latitude + "," + state.longitude
    const result = await reqAddress(geohash)
    //提交一个mutation
    if(result.code===0) { //如果请求成功，调用mutation更新state
      const address = result.data
      commit(RECEIVE_ADDRESS, {address})
    }
  },

  //异步获取食品列表
  async getCategorys({commit}){
    //发送异步ajax请求
    const result = await reqFoodCategorys()
    //提交一个mutation
    if(result.code===0) { //如果请求成功，调用mutation更新state
      const categorys = result.data
      commit(RECEIVE_CATEGORYS, {categorys})
    }
  },

  //异步获取商家列表
  async getShops({commit,state}){
    //发送异步ajax请求
    const {longitude,latitude} = state
    const result = await reqShops(longitude,latitude)
    //提交一个mutation
    if(result.code===0) { //如果请求成功，调用mutation更新state
      const shops = result.data
      commit(RECEIVE_SHOPS, {shops})
    }
  },

  //保存用户信息
  saveUserInfo({commit},userInfo){
    commit(RECEIVE_USERINFO, {userInfo})
  },

  //获取用户信息
  async getUserInfo({commit}){
    const result = await reqUserInfo()
    if(result.code===0){
      const userInfo = result.data
      commit(RECEIVE_USERINFO,{userInfo})
    }
  },

  //退出登录
  async logOut ({commit}) {
    const result = await reqLogout()
    if(result.code === 0){
      commit(RESET_USERINFO)
    }
  },

  //获取商家信息
  async getShopInfo({commit}){
    const result = await reqShopInfo()
    if(result.code === 0){
      const info = result.data
      commit(RECEIVE_INFO,{info})
    }
  },

  //获取商家评价列表
  async getShopRatings({commit}){
    const result = await reqShopRatings()
    if(result.code === 0){
      const ratings = result.data
      commit(RECEIVE_RATINGS,{ratings})
    }
  },

  //获取商品信息
  async getShopGoods({commit},callback){
    const result = await reqShopGoods()
    if(result.code === 0){
      const goods = result.data
      commit(RECEIVE_GOODS,{goods})
      //数据更新之后，通知组件
      callback && callback()
    }
  },

  //同步更新food中的count值
  updateFoodCount({commit},{isAdd,food}){
    if(isAdd){
      commit(INCREMENT_FOOD_COUNT,{food})
    }else{
      commit(DECREMENT_FOOD_COUNT,{food})
    }
  },

  //清空购物车
  clearCart({commit}){
    commit(CLEAR_CART)
  },

  //自己测试
  async getTeacher({commit}){
    console.log('----getNewCourse')
    const result = await reqTeacher()
  }

}
