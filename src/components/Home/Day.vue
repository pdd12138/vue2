<template>
    <div>
        <div class="box">
            <div class="title">
                <div class="left">
                    <span>大家都在听</span>
                    <h2>每日音乐一栏</h2>
                </div>
                <div class="right">
                <van-button round type="info" size="mini" color="gray">查看更多</van-button>
                </div>
            </div>
            <div class="day_sty">
            <van-swipe class="my-swipe" indicator-color="white">
                <van-swipe-item v-for="item in arr" :key="item.id">
                    <div v-for="it in  item" :key="it.id" class="swip_sty">
                            <div class="left">
                                <img :src="it.picUrl" alt="">
                            </div>
                            <div class="middle">
                              
                                <h2 v-text="it.name"></h2>
                                <span>-{{ it.song.album.artists[0].name }}</span>
                            </div>
                            <div class="right">
                                <van-icon name="play-circle-o" size="2rem"  color="gray"/>
                            </div>
                      
                    </div>
                </van-swipe-item>
           
            </van-swipe>
            </div>
           
        </div>
    </div>
</template>
<script>
import http from '@/http'
export default{
    name:"Day",
    data(){
        return {
            list:[],
            arr:[]
        }
    },
    mounted(){
        http.get('/personalized/newsong?limit=9').then((res)=>{
            console.log(res.data.result)
            this.list=res.data.result
            this.arr.push([this.list[0],this.list[1],this.list[2]],[this.list[3],this.list[4],this.list[5]],[this.list[6],this.list[7],this.list[8]])
        })
    }
}
</script>
<style lang="less" scoped>
.box{
    width: 100%;
    height: 100%;
   
    margin-bottom: 5rem;
    .title{
        padding: 0 1rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
     .left{
        span{
            font-size: 0.8rem;
        }
        h2{
            font-size: 1rem;
            padding-top: 0.2rem;
        }
     }
    }
    .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
  }
  .my-swipe .van-swipe-item {
   
    font-size: 0.5rem;
    line-height: 5rem;
    text-align: center;
    background-color: white;
   .swip_sty{
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin: 1rem 1rem;
    img{
        width: 6rem;
        height: 6rem;
        display: block;
        border-radius: 0.8rem
    }
    .middle{
        display: flex;
        align-items: center;
        h2{
            width: 5rem;
            color: black;
            font-size: 0.8rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
      
        }
        span{
            color: gray;
            font-size: 0.8rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
   } 
  }
}
</style>