<template>
    <div>
       <HeaderSide/>
        <!-- 路由出口 -->
        <router-view></router-view>
        <LoopMusic/>
      
    </div>
</template>
<script>
import HeaderSide from '@/components/HeaderSide.vue';
import LoopMusic from '@/components/itemMusci/LoopMusic.vue';
export default{
    name:"Main",
    data() {
        return {
           
        }
    },
    components:{
        HeaderSide,
        LoopMusic
        
    }
}
</script>