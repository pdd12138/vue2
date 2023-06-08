<template>
    <div v-if="this.userob">
       <div class="box">
            <img :src="userob.profile.backgroundUrl" alt="" class="box_bcm">
            <section>
            <div class="title">
                <van-icon name="arrow-left"  size="1.5rem" @click="add" color="white"/>
                <div class="right">
                    <van-icon name="search" size="1.5rem" @click="sea" color="white"/>
                    <van-icon name="share" size="1.5rem" @click="isfo" color="white"/>
                </div>
            </div>
            <div class="user">
                <div class="userim">
                    <div class="userimage">
                        <van-image
                        round
                        width="4rem"
                        height="4rem"
                        :src="userob.profile.avatarUrl"
                        />
                    </div>
                    <h2 v-text="userob.profile.nickname"></h2>
                
                </div>
                <div class="userinfo">
                    <ul>
                        <li v-for="item in ic" :key="item.id">
                            <van-icon :name="item.name" :color="item.color" size="2rem"/>
                            <span v-text="item.it"></span>
                        </li>
                    </ul>
                    <ul>
                        <li v-for="item in ic2" :key="item.id">
                            <van-icon :name="item.name" :color="item.color" size="2rem"/>
                            <span v-text="item.it"></span>
                        </li>
                    </ul>
                </div>
                <div class="likemy">
                    <ul>
                        <li v-for="item in Likelist" :key="item.id">
                            <div class="bdy">
                                <div class="left" @click="ad(item)">
                                    <img :src="item.coverImgUrl" alt="">
                                    <div class="right">
                                        <h3 v-text="item.name"></h3>
                                        <span>{{ item.trackCount }}首</span>
                                    </div>
                                </div>
                                <div class="right">
                                   <div class="right_bdy">
                                    <van-icon name="like-o" />
                                    心动模式
                                   </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
       </div>
    </div>
</template>
<script>
import axios from 'axios'
import { mapState } from 'vuex'
export default{
    data() {
        return {
            ic:[
                {
                    name:"play-circle-o",
                    color:'red',
                    it:'最近播放'
                   
                },
                {
                    name:"setting-o",
                    color:'red',
                    it:'本地下载'
                },
                {
                    name:"back-top",
                    color:'red',
                    it:'云盘'
                },
                {
                        name:"cart-circle-o",
                        color:'red',
                        it:'已购'
                },
            
            ],
            ic2:[
               
                    {
                        name:"friends",
                        color:'red',
                        it:'我的好友'
                    },
                    {
                        name:"star",
                        color:'red',
                        it:'收藏和赞'
                    },
                    {
                        name:"volume",
                        color:'red',
                        it:'我的播客'
                    },
                    {
                        name:"add-square",
                        color:'red',
                        it:'乐谜团'
                    }
            ],
           
        }
    },
    methods:{
        add(){
            this.$router.go(-1)
        },
        isfo(){
            let ab=confirm("确定退出么")
            if(ab){
                this.$store.commit('home/ISTO',false)
                this.$router.push('/home')
            }
            
            
        },
        sea(){
            this.$router.push('/search')
        },
        ad(i){
            console.log(i.id)
            this.$router.push(`/itemMusci?id=${i.id}`)
        }
    },
    mounted(){
        console.log(this.$store.state.home.user)
        axios.get(`/api/user/playlist?uid=${this.userob.profile.userId}`).then((res)=>{
            console.log(res.data)
            this.$store.commit('home/LIKELIST',res.data.playlist)
        })
    },
    computed:{
        ...mapState({
            userob:state=>state.home.user,
            Likelist:state=>state.home.Like_list
        })
    }
}
</script>
<style scoped lang="less">
    .box{
        width: 100%;
        height: 100%;
        position: relative;
        .box_bcm{
            width: 100%;
            height: 40vh;
            position: absolute;
            z-index: -1;
            filter:blur(.3125rem) contrast(.9);
        }
        section{
            width: 100%;
            height: 100%;
            padding: 0.5rem;
            position: relative;
            
            .title{
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
             }
            .user{
                width: 100%;
                margin-top: 10rem;
                .userim{
                    width: 100%;
                    
                    background-color: rgb(227, 227, 227);
                    border-radius: 0.5rem;
                    opacity: .9;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    position: relative;
                    padding: 2rem;
                    margin-bottom: 2rem;
                    .userimage{
                        position: absolute;
                        top: -25%;
                       
                    }
                    h2{
                        padding-top: 2.2rem;
                        color: gray;
                        font-size: 1rem;
                    }
                  
                }
                .userinfo{
                        width: 100%;
                        padding: 1rem 0.8rem 0 0.8rem;
                        background-color: rgb(227, 227, 227);
                        border-radius: 0.5rem;
                        opacity: .9;
                        margin-bottom: 1rem;
                        ul{
                            width: 100%;
                            display: flex;
                            justify-content: space-around;
                            flex-wrap: wrap;
                            padding-bottom: 1.5rem;
                            li{
                                display: flex;
                                flex-direction: column;
                                align-items: center;
                                span{
                                    color: rgb(44, 43, 43);
                                }
                            }
                        }
                }
                .likemy{
                    width: 100%;
                    background-color: rgb(227, 227, 227);
                    border-radius: 0.5rem;
                    opacity: .9;
                    margin-bottom: 10rem;
                    ul{
                        li{
                            padding: 1rem;
                           .bdy{
                            width: 100%;
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            .left{
                                display: flex;
                                align-items: center;
                                img{
                                    width: 4rem;
                                    height: 4rem;
                                    border-radius: 0.5rem;
                                    margin-right: 0.8rem;
                                }
                                h3{
                                    font-size: 0.9rem;
                                }
                            }
                            .right{
                                .right_bdy{
                                    border: 1px solid gray;
                                    padding: 0.2rem;
                                    border-radius: 1rem;
                                }
                            }
                           }
                        }
                    }
                }
            }
        }
    }
</style>