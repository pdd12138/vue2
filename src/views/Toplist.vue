<template>
    <div class="box">
        <ul>
            <li v-for="(item ,index) in list" :key="item.id">
              {{ index }}<img :src="item.coverImgUrl" alt="">
            </li>
        </ul>
    </div>
</template>
<script>
import http from "@/http";
export default{
    data() {
        return {
            list:[],
            // 推荐榜单
            tui:[]
        }   
    },
    mounted(){
        http.get('/video/timeline/recommend?offset=10').then((res)=>{
            console.log(res.data)
            this.list=res.data.list
          
            
        })
    }
}
</script>
<style lang="less" scoped>
.box{
    ul{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        li{
           
            img{
                width: 8rem;
                height: 8rem;
                border-radius: 0.6rem;
            }
        }
    }
}
</style>