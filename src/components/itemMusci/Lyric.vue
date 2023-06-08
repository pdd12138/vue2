<template>
    <div>
        <div class="box">
           <div class="bac_img">
            <img :src="singer.al.picUrl" alt="">
           </div>
         
            <section>
            <div class="title">
            <div class="right">
                <div class="top_text">
                 <p>
                    <marquee behavior="" direction="" scrollamount="3" >
                        <div class="alname" v-text="singer.name"></div>
                    </marquee>
                 </p>
                 <div v-text="singer.al.name"></div>
               
                </div>
                <van-icon name="friends" size="1.5rem" color="#c8c9cc"/>
            </div>
           </div>

           <van-swipe class="my-swipe"  :show-indicators="false">
            <van-swipe-item>
                <div class="move_img">
                <div class="gu">
                    <div class="gu_img" :class="{gu_active:py_start}"></div>
                </div>
                <div class="changpian">
                    <img :src="singer.al.picUrl" alt="" class="al_active" :class="{al_active_play:py_start,al_active_paused:!py_start}">                 
                </div>
            </div>
            </van-swipe-item>
            <van-swipe-item>
                <div class="l" >
                <div class="lc_sty lc" ref="lc_sc">
                    <p v-for="item in lr_" :key="item.id" :class="{p_active:(time*1000>=item.time && time*1000<=item.pre)}">
                        {{ item.lc }}
                    </p>
                </div>
            </div>
            </van-swipe-item>
          
            </van-swipe>
         
           
           </section>
           <footer>
            <div class="footer_style">
                <div class="footer_bdy">
                    <div class="footer_top">
                        <van-icon v-for="item in topIcon" :name="item.name" :size="item.size" color="#c8c9cc" :key="item.id"/>
                       
                    </div>
                    <div class="footer_middle">
                        <van-slider v-model="time" @change="onChange" :max="dura" step="0.05" />
                    </div>
                    <div class="footer_btm footer_top">
                        <van-icon name="replay" size="1.5rem" color="#c8c9cc"/>
                        <van-icon name="arrow-left" size="1.5rem" color="#c8c9cc" @click="prev(-1)" />
                        <van-icon v-show="!py_start" name="play-circle-o" @click="start" size="3rem" color="#c8c9cc"/>
                        <van-icon v-show="py_start" name="pause-circle-o" @click="start" size="3rem" color="#c8c9cc"/>
                        <van-icon name="arrow" size="1.5rem" color="#c8c9cc" @click="prev(1)"/>
                        <van-icon name="bars" size="1.5rem" color="#c8c9cc" />
                    </div>
                </div>
            </div>
           </footer>
         
        
        </div>
    </div>
</template>
<script>
import { Toast } from 'vant'
import { mapState } from 'vuex'
export default{
    name:"Lyric",
    data() {
        return {
            ishow:false,
            timer:0,
            topIcon:[
                {
                    name:"like-o",
                    size:'1.5rem',
                    color:"white"
                },
                {
                    name:"down",
                    size:'1.5rem',
                    color:"white"
                },
                {
                    name:'star-o',
                    size:'1.5rem',
                    color:"white"
                },
                {
                    name:'chat-o',
                    size:'1.5rem',
                    color:"white"
                },
                {
                    name:'bars',
                    size:'1.5rem',
                    color:"white"
                }
            ]
        }
    },
    props:['singer','start','py_start','duration'],
    methods:{
        onChange(va){
            Toast('当前播放时长'+va)
        },
        prev(i){
           let index=i+this.Pindex
           if(index<0){
            index=0
           }else if(index==this.songs.length){
            index==songs.length-1
           }
        // console.log(index)
           this.$store.commit('itemMusic/PINDEX',index)
      
        },
      
        
        
       
    },
   
   
    computed:{
        ...mapState({
            lrc:state=>state.itemMusic.lrc_list,
            time:state=>state.itemMusic.timer,
            Pindex:state=>state.itemMusic.PIndex,
            songs:state=>state.itemMusic.songs,
            dura:state=>state.itemMusic.duration
        }),
        lr_(){
            let arr
            if(this.lrc){
                arr=this.lrc.split(/[(\r\n)\r\n]+/).map((item,i)=>{
                    let min=item.slice(1,3);
                    let sec=item.slice(4,6)
                    let mill=item.slice(7,10)
                    let lc=item.slice(11,item.length)
                    let time=parseInt(min)*60*1000+parseInt(sec)*1000+parseInt(mill)  
                    return {min,sec,mill,lc,time}
                })
                arr.forEach((item,i)=>{
                    if(i===arr.length-1 || isNaN(arr[i+1].time)){
                        item.pre=0
                    }else{
                        item.pre=arr[i+1].time
                    }
                })
            }
           
            return arr

        }
      
        
    },
    watch:{
        time:function(){
           let p_sc=document.querySelector('.p_active')
           if(p_sc){
            if(p_sc.offsetTop>300){
                this.$refs.lc_sc.scrollTop=p_sc.offsetTop-300 
            }
           }
            
        }
    }
    
   
}
</script>
<style scoped lang="less">
    .box{
        width: 100%;
        height: 100%;
       
       .bac_img{
        overflow: hidden;
        width: 100%;
        height: 100%;
        position: fixed;
        z-index: -1;
        filter:blur(.3125rem) contrast(.5);
        img{
         width: 100%;
         height: 100%;
        }
        
       }
      section{
        width: 100%;
        height: 100%;
        padding: 0.5rem 1rem 0 1rem ;
        .title{
        width: 100%;
        display: flex;
        align-items: center;
       
        .right{
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-left: 2rem;
            .top_text{
                margin-left: 0.8rem;
                font-size: 0.9rem;
            }
        }
       }
       .move_img{
        padding-top:38%;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        .gu{
            width: 100%;
            height: 100%;
            .gu_img{
                position: absolute;
                top: 5%;
                right: 28%;
                width: 6rem;
                height: 10rem;
                background-image: url('@/assets/needle-ab.png');
                background-size:100%;
                transform: rotate(-20deg);
                transition: all .8s;
            }
            .gu_active{
                position: absolute;
                top: 5%;
                right: 28%;
                width: 6rem;
                height: 10rem;
                background-image: url('@/assets/needle-ab.png');
                background-size:100%;
                transform: rotate(15deg);
            }
        }
        .changpian{
            background-image: url('@/assets/border.png');
            width: 14rem;
            height: 14rem;
            background-size: 14rem;
            display: flex;
            justify-content: center;
            align-items: center;
            .al_active{
                width: 8.8rem;
                height: 8.8rem;
                border-radius: 100%;
                display: block;
                animation: myal 10s linear infinite;
            }
            .al_active_play{
                animation-play-state: running;
            }
            .al_active_paused{
                animation-play-state: paused;
            }
        }
       
       }
       .lc{
          width: 100%;
          height: 70vh;
          padding-top: 2rem;
          overflow-y: scroll;
        p{
            width: 100%;
            text-align:center;
            line-height: 3.5rem;
            color: #c8c9cc;
            font-size: 1rem;
        }
        .p_active{
            font-size: 1.5rem;
            color: white;
            font-weight: 800;
        }
       }
       .lc::-webkit-scrollbar { height: 0 !important }
      }
     footer{
        width: 100%;
        position: fixed;
        bottom: 0;
        .footer_style{
        width: 100%;
        height: 100%;
        .footer_top{
            display: flex;
            justify-content: space-around;
            align-items: center;
        }
        .footer_middle{
            padding: 0 0.5rem;
            margin: 2rem 0;
        }
        .footer_middle/deep/.van-slider__button{
            width: 1rem;
            height: 1rem;
        }
       
      }
     }
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