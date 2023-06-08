<template>
  <div class="box">
    <div class="banner">
    <van-tabbar v-model="active" :fixed="false" active-color="black" @change="tab" class="taber">
      <van-tabbar-item name="home" icon="wap-nav"></van-tabbar-item>
      <van-tabbar-item name="faxian" to="/home" >发现</van-tabbar-item>
      <van-tabbar-item name="my" to="/Gren">我的</van-tabbar-item>
      <van-tabbar-item name="yuncun"  >云村</van-tabbar-item>
      <van-tabbar-item name="video" >视频</van-tabbar-item>
      <van-tabbar-item name="search" icon="search" to="/search"></van-tabbar-item>
    </van-tabbar>
    </div>

  </div>

</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'HeaderSide',
  data() {
    return {
      active:1
    }
  },
  methods:{
    tab(name) {
      this.$store.commit('home/TAB',name)
    },
  },
  computed:{
    ...mapState({
      ac:state=>state.home.active
    })
  },
  mounted(){
    console.log(this.$store.state)
  }
 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.box{
  .banner{
    .taber{
      .van-tabbar-item{
        font-size: 1rem;
      }
    }
  }
}
</style>
