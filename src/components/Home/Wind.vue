<template>
    <div class="box">
        <div class="title">
            <div class="left">
                <span>风格推荐</span>
                <h3>每日推荐歌曲一览</h3>
            </div>
            <div class="right">
                <van-button round type="info" size="mini" color="gray">查看更多</van-button>
            </div>
        </div>
        <div class="icon">
            <ul>
                <li v-for="item in list" :key="item.id">
                 <router-link :to="{name:'itemMusci',query:{id:item.id}}" >
                    <div>
                        <img :src="item.picUrl" alt="" srcset="">
                        <div class="title">
                            {{ item.name }}
                        </div>
                    </div>
                 </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import http from '@/http'
export default{
    name:"Wind",
    data() {
        return {
            list:[]
        }
    },
    mounted() {
        
        http.get('/personalized').then((res)=>{
            console.log(res.data.result)
            this.list=res.data.result
        })
    },
    methods:{
       
    }
}
</script>
<style scoped lang="less">
    .box{
        .title{
            display: flex;
            justify-content: space-between;
            align-items:flex-end;
            padding: 0 1rem;
            .left{
                span{
                    font-size: 0.8rem;
                }
                h3{
                 padding-top: 0.2rem;
                font-size:1rem ;
            }
            }
           
        }
        .icon{
            width: 100%;
            ul{
               
                width: 100%;
                display: flex;
                overflow-x: scroll;
                padding-top: 1rem;
                padding-bottom: 2.5rem;
                li{
                    margin: 0 0.3rem;
                    width: 7.5rem;
                    height: 7.5rem;
                    img{
                        width: 7.5rem;
                        height: 7.5rem;
                        display: block;
                        border-radius: 0.7rem;
                    }
                    .title{
                        width: 100%;
                        display: block;
                        text-indent: 0.5rem;
                        padding-top: 0.4rem;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        
                    }
                }
            }
            ul::-webkit-scrollbar { width: 0 !important }
        }
    }
</style>