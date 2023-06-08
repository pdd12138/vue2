import Vue from "vue";
import Vuex from 'vuex'
import home from "./home";
import itemMusic from "./itemMusic";
import CreatePersistedstate from 'vuex-persistedstate'
Vue.use(Vuex)
export default new Vuex.Store({
    modules:
     {
        home:home,
        itemMusic:itemMusic
     },
     plugins:[
      CreatePersistedstate({
         storage: window.sessionStorage,
         key:"Music_id",
         paths:['itemMusic','home']

      })
     ]
    
})