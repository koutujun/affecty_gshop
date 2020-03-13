<template>
  <div class="star " :class="'star-'+size">
    <span class="star-item " v-for="(sc,index) in starClasses" :class="sc" :key="index"></span>
  </div>
</template>

<script>
  export default {
    props:{
      score:Number, //评分
      size:Number   //尺寸
    },
    computed:{
      starClasses(){
        const {score} = this
        const scs = []
        const onNum = Math.floor(score)  //on全选的个数
        const halfNum = (score-onNum)>=0.5?1:0  //half半选的个数
        const offNum = 5 - onNum -halfNum  //off不选的个数
        for(let i=0; i<onNum; i++){
          scs.push('on')
        }
        if(halfNum===1){
          scs.push('half')
        }
        if(offNum===1){
          scs.push('off')
        }
        return scs
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .star //2x图 3x图
    float left
    font-size 0
    .star-item
      display inline-block
      background-repeat no-repeat
    &.star-48
      .star-item
        width 20px
        height 20px
        margin-right 22px
        background-size 20px 20px
        &:last-child
          margin-right: 0
        &.on
          bg-image('./images/star48_on')
        &.half
          bg-image('./images/star48_half')
        &.off
          bg-image('./images/star48_off')
    &.star-36
      .star-item
        width 15px
        height 15px
        margin-right 6px
        background-size 15px 15px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/star36_on')
        &.half
          bg-image('./images/star36_half')
        &.off
          bg-image('./images/star36_off')
    &.star-24
      .star-item
        width 10px
        height 10px
        margin-right 3px
        background-size 10px 10px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/star24_on')
        &.half
          bg-image('./images/star24_half')
        &.off
          bg-image('./images/star24_off')
</style>
