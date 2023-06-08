<template>
  <div>
      <Swiper/>
      <Icon/>
      <Wind/>
      <footer>
        <Day/>
      </footer>
  </div>
</template>
<script>
import Icon from '@/components/Home/Icon.vue'
import Swiper from '@/components/Home/Swiper.vue';
import Wind from '@/components/Home/Wind.vue'
import Day from '@/components/Home/Day.vue';
export default{
   
    components:{
      Icon,
      Swiper,
      Wind,
      Day

    }
}
</script>
<style scoped lang="less">



</style>