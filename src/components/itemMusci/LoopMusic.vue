<template>
    <div v-if="songs"> 
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

      <div class="active">
        <van-popup
        v-model="show"
        position="bottom"
        :style="{height:'100%',width:'100%'}"
        closeable
        close-icon="arrow-left"
        close-icon-position="top-left"
        
        >
        <Lyric :singer="this.songs[pindex]" :time="timer" :start="play" :py_start="play_start" :duration="Duration"/>
       </van-popup>
      </div>
        
    </div>
</template>
<script>

import { mapState } from 'vuex'
import Lyric from '@/components/itemMusci/Lyric.vue'
export default{
    name:"LoopMusic",
    data() {
        return {
            show:false,
            time:0,
            py:[]
            
        }
    },
    props:['searlist','play_songs','al_index'],
    updated(){
            
                this.$store.dispatch('itemMusic/getMusic',this.songs[this.pindex].id)
                this.Duration()
                
          
    },  

    mounted(){
        
    },

  
    computed:{
      ...mapState({
        singer:state=>state.itemMusic.singer,
        play_start:state=>state.itemMusic.play,
        songs:state=>state.itemMusic.songs,
        pindex:state=>state.itemMusic.PIndex,
       
        
      }),
    },
    methods:{
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
    components:{
        Lyric
    },
    watch:{
        // singer:function(){
        //     this.$refs.audio.autoplay=true
        //     if(this.$refs.audio.paused){
        //         this.$store.commit('itemMusic/PLAY',true)
        //     }else{
        //         this.$store.commit('itemMusic/PLAY',false)
        //     }
        // }

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
}
</script>
<style scoped lang="less">
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
@keyframes myal {
        0%{
            transform: rotateZ(0deg);
        }
        100%{
            transform: rotateZ(360deg);
        }

 }

</style>