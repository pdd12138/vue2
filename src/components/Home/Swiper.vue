<template>
    <div>
        <div class="banner">
        <van-swipe class="my-swipe" :autoplay="2000" indicator-color="white">
        <van-swipe-item v-for="item in swiperList" :key="item.id">
          <img :src="item.imageUrl" alt="">
        </van-swipe-item>
        </van-swipe>
    </div>
    </div>
</template>
<script>
import http from '@/http'

export default{
    name:"Swiper",
    data() {
        return {
            swiperList:null,
        }
    },
    mounted() {
        http.get('/banner').then((res)=>{
         this.swiperList=res.data.banners
       })
    },
}
</script>
<style scoped lang="less">
  .banner{
    padding-top: 1.5rem;
    .my-swipe .van-swipe-item {
    color: #fff;
    text-align: center;
    padding: 0 0.8rem;
  }
  .my-swipe .van-swipe-item img{
    width: 100%;
    height: 100%;
    border-radius: 0.8rem;
  }
}
</style>