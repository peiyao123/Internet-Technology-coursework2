import { defineStore } from "pinia"


export const useUser = defineStore("USER", {
  state: () => {
    return {
      isLogin:false,
      userinfo:{
        id:0,
        username:'',
        nickname:''
      }
    }
  },
  getters: {

  },
  actions: {
    
  },
})
