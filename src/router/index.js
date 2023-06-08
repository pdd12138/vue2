import Vue from "vue";
import Router from 'vue-router'
import Main from '@/views/Main.vue'
import Home from "@/views/Home.vue"
import itemMusic from '@/views/itemMusci.vue'
import Search from '@/views/Search.vue'
// import Lyric from '@/views/Lyric.vue'
import Toplist from '@/views/Toplist.vue'
import Login from '@/views/Login.vue'
import Gren from '@/views/Gren.vue'
import store from "@/store";
Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push(location, resolve, reject) {
    if ( resolve || reject ) return originalPush.call(this, location, resolve, reject)
    return originalPush.call(this, location).catch((e)=>{})
}
export default  new Router({
    routes: [
        {
            path:"/",
            redirect:"/Home",
            component:Main,
            children:[
                {
                    path:"/Home",
                    component:Home
                },
            ]   
        },
        {
            path:"/itemMusci",
            name:"itemMusci",
            component:itemMusic
        },
        // {
        //     path:"/lyric",
        //     name:"lyric",
        //     component:Lyric
            
        // }
        {
            path:'/search',
            name:"search",
            component:Search

        },
        {
            path:'/Toplist',
            name:"Toplist",
            component:Toplist
        },
        {
            path:'/Gren',
            name:"Gren",
            component:Gren,
            beforeEnter(to,from,next){
                if(store.state.home.isto){
                  next()
                  
                }else{
                  next('/Login')
                }
            }
        },
        {
            path:"/Login",
            name:"Login",
            component:Login,
            
        }
      
    ]
})