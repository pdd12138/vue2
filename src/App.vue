<template>
  <div id="app">
    <router-view></router-view>
   
  </div>
</template>

<script>

import LoopMusic from './components/itemMusci/LoopMusic.vue';
export default {
  name: 'App',
  components:{
    LoopMusic
  }
 
}
</script>

<style>
  *{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    list-style: none;
  }
  body{
    font-size: 0.16rem;
 
  }
</style>
