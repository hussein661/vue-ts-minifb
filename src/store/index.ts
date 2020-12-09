import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user:{},
    val: false,
    myPosts:[{id:'1'}] as any
  },
  mutations: {
    setUser(state:any,user){
      console.log({state:user})
      state.user = user
    },
    setMyPosts(state,posts){
      state.myPosts = posts
    },
    appendMyPosts(state,newPost:string) {
      state.myPosts.unshift({
        id:(new Date()).getTime(),
        name:'Hussein',
        body:newPost,
        title:'Hussein',
        userId:1
      })
    }
  },
  actions: {},
  modules: {}
});
