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
    logout(){
      this.isLogin = false
      this.userinfo = {
        id:0,
        username:'',
        nickname:''
      }
    }
  },
  persist: true,
})
