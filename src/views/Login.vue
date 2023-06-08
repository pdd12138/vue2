<template>
    <div>
        <section>
            <div class="box">
                <van-icon name="arrow-left"  size="1.5rem" @click="ap" color="white"/>
                <div class="title">
                    <van-icon name="service"  size="3rem" color="white"/>
                </div>
                <form action="" class="frm">
                    <van-form @submit="onSubmit(phone,sms)">
                    <van-cell-group inset>
                      <van-field
                            v-model="phone"
                            required
                            label="手机号"
                            placeholder="请输入手机号"

                        />
                        <van-cell-group inset>
                        <van-field
                            v-model="sms"
                            center
                            clearable
                            label="短信验证码"
                            placeholder="请输入短信验证码"
                        >
                            <template #button>
                            <van-button size="small" type="primary" @click="sms_sub()">发送验证码</van-button>
                            </template>
                        </van-field>
                        </van-cell-group>
                    </van-cell-group>
                        <div style="margin: 16px;">
                        <van-button round block type="primary" native-type="submit">
                        登录
                        </van-button>
                    </div>
                    </van-form>
                </form>
               
                <div class="ic">
                    <van-icon name="wechat" size="2rem"  color="white"/>
                    <van-icon name="wechat" size="2rem"  color="white"/>
                    <van-icon name="wechat" size="2rem"  color="white"/>
                    <van-icon name="wechat" size="2rem"  color="white"/>
                </div>
                <div class="mesage">
                    <van-checkbox v-model="checked" shape="square" checked-color="gray">同意协议</van-checkbox>
                </div>
             
            </div>
        </section>
    </div>
</template>
<script>
import { ref } from 'vue';
import http from '@/http';
import axios from 'axios';
export default{
    data() {
        return {
          phone:"",
          sms:'',
          checked:false
        }
    },
  
     setup() {
        const checked = ref(true);
        return { checked };
    
    
    },
  
    methods:{
        onSubmit(val){
            if(this.checked){
                axios.get(`/api/user/cellphone?phone=${this.phone}&code=${this.sms}`).then((res,)=>{
                
                if(res.data.code==200){
                    this.$store.commit('home/ISTO',true)
                    this.$store.commit('home/USER',res.data)
                    this.$router.push('/Gren')
                   
                }else if(res.data.code!==200){
                    alert(res.data.msg)
                }
            })
        }else{
            let ab=confirm("请勾选同意协议")
            if(ab){
                this.checked=true
            }
        }
           
        },
        sms_sub(){
            axios.get(`/api/user/sent?phone=${this.phone}`).then((res)=>{
                console.log(res.data)
             
            })
        },
        ap(){
            this.$router.go(-1)
        },
        mesage(){
            alert("验证码/手机号错误")
        }
        
    }
}
</script>
<style lang="less" scoped>
   section{
        width: 100%;
        height: 100vh;
        padding: 0.1rem;
        position: relative;
        z-index: 999;
    .box{
        width: 100%;
        height: 100vh;
        background-color: red;
        position: relative;
        .title{
            position: absolute;
            left: 45%;
            top: 30%;
        }
        .frm{
            width: 100%;
            position: absolute;
            padding: 0 0.5rem;
            bottom:30%;
            display: flex;
            flex-direction: column;
            align-items: center;
            .sp1{
                color: red;
            }
            .sp2{
                color: white;
            }
        }
        .ic{
            width: 100%;
            display: flex;
            justify-content: space-around;
            position: absolute;
            bottom: 20%;
        }
        .mesage{
            position: absolute;
            bottom: 10%;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
       
    }
   }
</style>