import http from "@/http"
export default{
    namespaced:true,
    actions:{
        getMusic(context,value){
          http.get(`/lyric?id=${value}`).then((res)=>{
           
              context.commit('LRC_LIST',res.data.lrc.lyric)
          })
        },  
        getSongs(context,value){
          http.get(`/playlist/track/all?id=${value}&limit=60&offset=1`).then((res)=>{
            this.list=res.data.songs
            context.commit('SONGS',res.data.songs)
        })
        },
        getSear(context,value){
          http.get(`/cloudsearch/suggest?keywords=${value}`).then((res)=>{
           
            
            context.commit('SEARLIST',res.data.result.songs )
        })
        }
    },
    mutations:{
      ITEM_ID(state,va){
        state.singer=va
      },
      PLAY(state,va){
        state.play=va
      },
    
      LIST_AUDIO(state,va){
        state.list_id=va
  
      },
      LRC_LIST(state,va){
        state.lrc_list=va
      },
      TIMER(state,va){
        state.timer=va
      },
      SONGS(state,va){
        state.songs=va
       
      },
      PINDEX(state,va){
        state.PIndex=va
      
      },
      DURATION(state,va){
        state.duration=va
      },
      SEARLIST(state,va){
        state.searlist=va
      },
      ALINDEX(state,va){
        state.alindex=va
      }
    
     
    },
    state:{
     singer:{
      id: 35702116,
      name: "哪里都是你",
      pic: 109951162964628420,
      picUrl: "https://p2.music.126.net/lnOnBbP_H-052Hv5ls-QjA==/109951162964628408.jpg",
      pic_str: "109951162964628408"

     },
     play:'',
     list_id:0,
     lrc_list:[],
     timer:0,
     songs:[],
     PIndex:0,
     duration:0,
     searlist:[],
     alindex:0
    }
}