export default{
    namespaced:true,
    actions:{},
    mutations:{
        TAB(state,value){
            console.log(state)
            state.active=value
        },
        ISTO(state,value){
            console.log(value)
            state.isto=value
        },
        USER(state,value){
            state.user=value
            console.log(state.user)
        },
        LIKELIST(state,value){
            console.log(value)
            state.Like_list=value
        }
    },
    state:{
        active:'faxian',
        isto:false,
        user:null,
        Like_list:[]
        
    }
}