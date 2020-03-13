/*
* 直接更新state的多个方法的对象
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
import Vue from 'vue'

export default {
  [RECEIVE_ADDRESS](state, {address}){
    state.address = address
  },
  [RECEIVE_CATEGORYS](state, {categorys}){
    state.categorys = categorys
  },
  [RECEIVE_SHOPS](state, {shops}){
    state.shops = shops
  },
  [RECEIVE_USERINFO](state, {userInfo}){
    state.userInfo = userInfo
  },
  [RESET_USERINFO](state){
    state.userInfo  = {}
  },
  [RECEIVE_INFO](state, {info}){
    state.info = info
  },
  [RECEIVE_GOODS](state, {goods}){
    state.goods = goods
  },
  [RECEIVE_RATINGS](state, {ratings}){
    state.ratings = ratings
  },
  [INCREMENT_FOOD_COUNT](state,{food}){
    if(!food.count){  //第一次增加的时候，food中没有count
      //food.count = 1  //新增属性（没有数据绑定,不会触发更新）
      Vue.set(food,'count',1)  //让新增的属性也有数据绑定
      state.cartFoods.push(food)  //将添加的食物添加到购物车列表中
    }else{   //有count的时候直接自增
      food.count++
    }
  },
  [DECREMENT_FOOD_COUNT](state,{food}){
    if(food.count){ //有值的时候才减
      food.count--
      if(food.count === 0){
        state.cartFoods.splice(state.cartFoods.indexOf(food), 1)  //当购物车列表中没有此食物时，删除它
      }
    }
  },
  [CLEAR_CART](state){
    if(state.cartFoods){
      //由于cartFoods中的food对象被多个对象引用，所以不能直接使用state.cartFoods来清空
      //1.消除food中的count
      state.cartFoods.forEach(food=> food.count=0)
      //2.清除购物车中的所有购物项
      state.cartFoods = []
    }
  }
}
