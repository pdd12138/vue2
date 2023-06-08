<template>
    <div>
        <div class="box">
            <div class="hader">
                <div class="playblt">
                <van-icon name="play-circle-o"  size="23"/>
                <div class="title">
                    <h3>播放全部</h3><span>(共{{ list.length }}首)</span>
                </div>
                </div>
                <div class="rightbtn">
                    <van-button round type="info" color="#FF821E">+ 收藏({{playCount}})</van-button>
                </div>
            </div>
            <div class="box_content">
                <ul>
                    <li v-for="(item,index) in list" :key="index" @click="Music_id(item,index)">
                        <div class="Music">
                           <div class="left">
                                <div class="_index">
                                    <span>{{index+1}}</span>
                                </div>
                                <div class="_Musicname">
                                    <h3>{{ item.name }}</h3>
                                    <p>{{ item.al.name }}</p>
                                </div>
                           </div>
                           <div class="right">
                            <!-- item.id,item.al,item.name -->
                                <van-icon  name="play-circle-o" size="23"/>
                               
                           </div>
                        </div>
                    </li>
                </ul>
            </div>
          
            
        </div>
    </div>
</template>
<script>
import http from '@/http'
import { mapState } from 'vuex'
import LoopMusic from './LoopMusic.vue'
export default{
    name:"Music",
    data() {
        return {
            // list:[]
        }
    },
    components:{
        LoopMusic
    },
    mounted(){
        this.$store.dispatch('itemMusic/getSongs',this.$route.query.id)
       
    },
    props:['playCount'],
    methods:{
        Music_id(i,index){
            this.$store.commit('itemMusic/ITEM_ID',i)
            this.$store.commit('itemMusic/LIST_AUDIO',i)
            this.$store.commit('itemMusic/PINDEX',index)
           
        }
    },
    computed:{
       ...mapState({
        play_end:state=>state.itemMusic.play,
        list:state=>state.itemMusic.songs,
        pindex:state=>state.itemMusic.PIndex
       })
    },
  
    
}
</script>
<style scoped lang="less">
.box{
    width: 100%;
    height: 100%;
    background-color: white;
    border-top-left-radius:1rem ;
    border-top-right-radius:1rem ;
    margin-top: 2rem;
    padding: 0.5rem 0.8rem 0 .8rem;
    
   .hader{
    width: 100%;
    display: flex;
    justify-content: space-between;
   .playblt{
    display: flex;
    align-items: center;
    .title{
        display: flex;
        align-items: flex-end;
        font-size: 1rem;
        h3{
            margin: 0 0.5rem 0 0.8rem;
            font-weight: normal;
        }
        span{
            font-size: 0.5rem;
            color: gray;
        }
    }
   }
   }
   .box_content{
    height: 320px;
    overflow-y: scroll;
    padding: 0 0.6rem;
    ul{
        li{
            margin: 1.5rem 0;
        .Music{
        display: flex;
        align-items: center;
        justify-content: space-between;
        .left{
            display: flex;
            align-items: center;
            font-size: 1rem;
           ._index{
            margin-right: 1rem;
           }
           ._Musicname{
                h3{
                    font-weight: 500;
                }
                p{
                    font-size: 0.01rem;
                }
           }
        }
        
    }
        }
    }
   }
   .box_content::-webkit-scrollbar { width: 0 !important }
}
</style>