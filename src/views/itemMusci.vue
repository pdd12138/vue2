<template>
    <div v-if="list">
        <div class="bcim" >
            <div class="bcimage">
                <img :src="list.coverImgUrl" alt="">
            </div>
             <div class="bcim_navbar">
                <van-nav-bar  left-text="歌单" left-arrow @click-left="targe">
                <template #right>
                    <div class="right_navbar">
                    <div class="left_icon">
                        <van-icon name="search" size="1.5rem" />
                    </div>
                    <div class="right_ic">
                        <van-icon name="wap-nav" size="1.5rem" />
                    </div>
                    </div>
                </template>
                </van-nav-bar>
             </div>
             <div class="title">
                <div class="left">
                    <img :src="list.coverImgUrl" alt="">
                </div>
                <div class="right">
                 <h3 v-text="list.name"></h3>
                 <div class="title_img">
                   <div class="title_iamge">
                    <van-image
                        round
                        width="2rem"
                        height="2rem"
                        :src='creator.avatarUrl'
                        />
                        <span v-text="creator.nickname"></span>
                   </div>
                    
                 </div>
                 <div class="bootom_text" v-text="list.description"></div>
                </div>
             </div>
             <div class="botoom_icon">
                <ul>
                    <li>
                       <div class="icon_style">
                        <van-icon v-for="item in icon" :key="item.id"  :name="item.icon" :color="item.color" size="30" /> 
                       </div>
                       <div class="icon_text">
                        <span v-text="list.commentCount"></span>
                        <span v-text="list.shareCount"></span>
                        <span v-text="list.subscribedCount"></span>
                        <span v-text="list.trackCount"></span>
                       </div>
                        
                    </li>
                </ul>
             </div>
             
        </div>  
        <Music :playCount="list.playCount"/>
        <LoopMusic />
    
    </div>
</template>
<script>
import http from '@/http'
import Music from '@/components/itemMusci/Music.vue'
import LoopMusic from '@/components/itemMusci/LoopMusic'
import { mapState } from 'vuex'
export default{
    data() {
        return {
            list:null,
            creator:null, 
            icon:[
                {
                   
                    icon:'chat-o',
                    color:"#fff"
                },
                {
                  
                    icon:"share-o",
                    color:"#fff"
                },
                {
                  
                    icon:"down",
                    color:"#fff"
                },
                {
                    
                    icon:"friends-o",
                    color:"#fff"
                }
            ]
            
        }
    },
    mounted(){
        http.get(`/playlist/detail?id=${this.$route.query.id}`).then((res)=>{
            this.list=res.data.playlist
            this.creator=res.data.playlist.creator
        })
     
       
    },
    methods:{
        targe(){
          this.$router.push('home')
        },
    },
    components:{
        Music,
        LoopMusic
    },
    computed:{
        ...mapState({
            play_start:state=>state.itemMusic.play,
           
            pindex:state=>state.itemMusic.PIndex
        })
    }
  
   
}
</script>
<style scoped lang="less">
  .bcim{
    width: 100%;
    height: 100%;
    position: relative;
    .bcimage{
        width: 100%;
        height: 400px;
        position: fixed;
        z-index: -1;
        filter:blur(.3125rem) contrast(.6);
        img{
           width: 100%;
           height: 100%;
         
           
            
        }
    }
   
  }
  .bcim/deep/.van-nav-bar{
    background-color: unset;
    border: unset;
    color: white;
  }
  .van-nav-bar/deep/.van-nav-bar__text {
    color: white;
    font-size: 1rem;
  }
  .van-nav-bar/deep/.van-icon{
    color: white;
    font-size: 1.45rem;
  }
  .bcim_navbar{
    .right_navbar{
        display: flex;
        align-items: center;
        .right_ic{
            margin-left: 1rem;
        }
    }
  }
  .title{
    width: 100%;
    padding: 2rem 2rem 0 2rem;
    display: flex;
    justify-content: space-between;
    .left{
        width: 50%;
    img{
        
        width: 10rem;
        height: 10rem;
    }
}
    .right{
        width: 45%;
    
        h3{
            font-size: 1rem;
            color: white;
        }
        .title_iamge{
            padding-top: 1rem;
            display: flex;
            align-items: center;
            span{
               
                color: white;
                padding-left: 0.5rem;
             
            }
        }
        .bootom_text{
            width: 100%;
            padding-top: 0.8rem;
            line-height: 1.2rem;
            color: white;
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;				//溢出内容隐藏
            text-overflow: ellipsis;		//文本溢出部分用省略号表示
            display: -webkit-box;			//特别显示模式
            -webkit-line-clamp: 3;			//行数
            line-clamp: 3;					
            -webkit-box-orient: vertical;	//盒子中内容竖直排列


            
        }
        
    }
  }
  .botoom_icon{
            ul {
                padding-top: 2rem;
                display: flex;
                justify-content: space-around;
                li{
                   
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    .icon_style{
                        width: 100%;
                        display: flex;
                        justify-content: space-around;
                    }
                   .icon_text{
                    width: 100%;
                    display: flex;
                    justify-content: space-around;
                    padding-top: 0.5rem;
                    
                    span{
                        color: white;
                    }
                   }
                }
            }
        }
  
</style>
