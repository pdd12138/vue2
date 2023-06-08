<template>
    <div>
        <div class="ic">
        <div class="icstyle">
          <ul>
            <li v-for="item in icon" :key="item.id" @click="phb(item.id)">
              <van-icon :name='item.iconUrl' />
              <div class="title" >
                {{ item.name }}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>
<script>
import http from '@/http'
export default{
    name:"Icon",
    data() {
        return {
            icon:[]
        }
    },
    mounted() {
        http.get('/homepage/dragon/ball').then((res)=>{
        console.log(res.data.data)
        this.icon=res.data.data
       })
       
    },
   methods:{
    phb(i){
      if(i==-3){
        this.$router.push('/toplist')
      }
    }
   }
}
</script>
<style scoped lang="less">
.ic{
    height: 100%;
    .icstyle{
      width: 100%;
      ul{
        width: 100%;
        display: flex;
        flex-wrap: nowrap;
        overflow-x: scroll;
        height: 100%;
        padding: 2rem 0;
        white-space: nowrap;
    
        /* 隐藏滚动条 */
 
        li{
          width: 3.5rem;
          height: 3.5rem;
          margin: 0 0.4rem;
          list-style: none;
          background-color: red;
          border-radius: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          img{
            width: 3.5rem;
            height: 3.5rem;
            display: block;
          }
          .title{
            padding-top: 0.2rem;
            color: black;
          }
        }
      }
      ul::-webkit-scrollbar { width: 0 !important }
    }

  
   }
</style>