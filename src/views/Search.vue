<template>
    <div v-if="songs">
        <div class="box">
            <div class="title_sty">
                <van-icon name="arrow-left"  size="1.5rem" color="gray" @click="ph()"/>
         
            <van-search
                v-model="value"
                show-action
                placeholder="请输入搜索关键词"
                @search="onSearch"
                @cancel="onCancel"
            />
        </div>
        <section>
                <div class="search_styl">
                    <div class="title">
                        <div class="lj">
                            <h2>历史</h2>
                            <div class="sp">
                                <span v-for="item in lj" :key="item.id" @click="sea(item)">{{ item }}</span>
                            </div>
                        </div>
                        
                        <van-icon name="delete" size="1.5rem" @click="det()"/>
                    </div>
                </div>
                <div class="titles">
                    <van-icon name="play-circle-o" size="1.5rem"/> 
                    <h2>播放全部</h2><span>(共<span v-text="list.length"></span>首 )</span>
                </div>
                <ul class="list">
                    <li v-for="(item,index) in list " :key="index" @click="bp(index)">
                        <div class="_ind" v-text="index+1"></div>
                        <div class="ri">
                            <div class="left">
                            <h4>{{ item.name }}</h4>
                            <span v-text="item.al.name"></span>
                        </div>
                        <div class="right">
                            <van-icon name="play-circle-o" size="1.5rem"/>
                        </div>
                        </div>
                    </li>
                </ul>
                
         
        </section>
        <footer>
            <div class="footer_audio">
            <div @click="showPopup">
                <div class="title">
                <van-image
                round
                width="2.8rem"
                height="2.8rem"
                :src="this.songs[pindex].al.picUrl"
                class="al_img"
                :class="{al_play:play_start,al_paused:!play_start}"
                />
            <div class="right">
                <h3 v-text="this.songs[pindex].name"></h3>
                <p><span v-text="this.songs[pindex].al.name"></span></p>
            </div>
            </div>
            <div class="audio_sty">
               <audio :src="`https://music.163.com/song/media/outer/url?id=${this.songs[pindex].id}.mp3`"  class="audio_zidy" ref="audio" @timeupdate="timer()"></audio>
            </div>

            </div>
            <div class="right_i">
                <van-icon v-show="!play_start" name="play-circle-o" @click="play" />
                <van-icon v-show="play_start" name="pause-circle-o" @click="play" />
                <van-icon name="bars" style="margin-left: 0.5rem;" />
            </div>
           
          </div>
        </footer>
        </div>
        
    </div>
</template>
<script>
import LoopMusic from '@/components/itemMusci/LoopMusic.vue';
import { Toast } from 'vant';
import http from '@/http';
import { mapState } from 'vuex';
export default {
  data() {
    return {
      value: '',
      
      def:0,
      lj:["陈奕迅","周杰伦","伍佰"],
     
    }
  },
  methods: {
    ph(){
        this.$router.push('/home')
    },
    onSearch(val) {
        this.$store.dispatch('itemMusic/getSear',val)
      this.lj.push(val)
    },
    onCancel() {
      Toast('取消');
    },
  
    det(){
        let det=confirm("确定删除么")
        if(det){
            this.lj=[]
        }
    },
    sea(va){
      
        this.$store.dispatch('itemMusic/getSear',va)
    },
    bp(i){
       this.$store.commit('itemMusic/ALINDEX',i)
        console.log(this.songs[this.pindex])
       console.log(this.songs[this.pindex].id)
    },
   
    play(){
        if(this.$refs.audio.paused ==true){
            this.$refs.audio.play()
            this.$store.commit('itemMusic/PLAY',true)
        }else{
            this.$refs.audio.pause()
            this.$store.commit('itemMusic/PLAY',false)
        }
       },
       
       showPopup() {
        this.show = true;
        
     },
     timer(){
         this.$store.commit('itemMusic/TIMER',this.$refs.audio.currentTime)
     },
     Duration(){
        this.$store.commit('itemMusic/DURATION',this.$refs.audio.duration)
     }


  },
    mounted() {
            // console.log(this.$store.state.itemMusic.PIndex)
            this.$store.dispatch('itemMusic/getSear','陈奕迅')
            console.log(this.songs[this.pindex])
        },
   
    components:{
        LoopMusic
    }, 
    computed:{
        ...mapState({
         
            list:state=>state.itemMusic.searlist,
            alin:state=>state.itemMusic.alindex,
            singer:state=>state.itemMusic.singer,
            play_start:state=>state.itemMusic.play,
            songs:state=>state.itemMusic.searlist,
            pindex:state=>state.itemMusic.alindex,
        })
    },
    watch:{
        singer:{
            handler(newVal,old){
              if(newVal){
                this.$refs.audio.autoplay=true
                this.$store.commit('itemMusic/PLAY',true)
              }else{
                this.$refs.audio.autoplay=false
                this.$store.commit('itemMusic/PLAY',false)
              }
            }
       },
    }
};
</script>
<style lang="less" scoped>
.box{
    width: 100%;
    height: 100%;
    padding: 0 0.5rem;
    .title_sty{
        width: 100%;
        display: flex;
        align-items: center;
        
    }
    .title_sty/deep/.van-search {
        width: 100%;
      
    }
    section{
        .search_styl{
            width: 100%;
            padding: 0 0.5rem;
            .title{
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: flex-end;
                .lj{
                    display: flex;
                    align-items: flex-end;
                    h2{
                        padding-top: 1.5rem;
                        font-size: 1.2rem;
                    }
                    .sp{
                        display: flex;
                        align-items: center;
                        span{
                        display: block;
                        margin-left: 0.5rem;
                        background-color: #888;
                        font-size: 0.5rem;
                        color: white;
                        box-sizing: border-box;
                        padding: 0.5rem;
                        border-radius: 2rem;
                      
                    }
                    }
                }
                
            }
        }
        .titles{
            width: 100%;
            display: flex;
            align-items: center;
            font-size: 0.8rem;
            padding: 2rem 0;
            h2{
                font-size: 1rem;
                padding: 0 0.5rem;
            }
        }
        .list {
            li{
                width: 100%;
                border-bottom: 1px solid rgba(0,0,0,.1);
                display: flex;
               
                
                padding: 0.5rem;
                align-items: center;
                ._ind{
                    font-size: 0.8rem;
                    margin-right: 1rem;
                    font-weight: bold;
                    color: #888;
                }
                .ri{
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .left{
                        h4{
                        font-weight: normal;
                        font-size: 1rem;
                        margin-bottom: 0.5rem;
                    
                        }
                    span{
                            font-size: 0.8rem;
                            color: #888;
                        }
                    }
                }
            }
        }
    }
    .footer_audio{
    width: 100%;
    height: 4.5rem;
    border-top: 1px solid;
    position: fixed;
    bottom: 0;
    background-color: white;
    padding: 0.8rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
   .title{
    display: flex;
    .right{
        width: 10rem;
        margin-left: 0.5rem;
        font-size: 0.8rem;
        

        
        
    }
   }
 
   .right_i{
    font-size: 1.5rem;
   }
   .al_img{
    animation: myal 10s linear infinite;
   }
   .al_play{
    animation-play-state: running;
   }
   .al_paused{
    animation-play-state: paused;
   }

   
}
.van-cell{
    padding: 0;
}
}
</style>