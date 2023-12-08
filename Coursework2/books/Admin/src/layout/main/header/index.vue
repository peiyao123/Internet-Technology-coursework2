<template>
    <div class="header">
        <div class="name">Read A Book RMS</div>
        <div class="time">{{ date | dateFormat }}</div>
        <div class="user">
            Welcome 
            <span>{{User.userinfo.nickname}}</span>
        </div>
    </div>
</template>

<script>
import { useUser } from '@/stores/useUser'
import  moment  from 'moment'
import { getUserInfo } from '@/api/user'
export default{
    data(){
        return{
            User: useUser(),
            date:new Date()
        }
    },
    methods: {
        
    },
    filters:{
        dateFormat(value){
            return moment().format('YYYY-MM-DD')
        }
    },
    watch:{
        User:{
            handler(newVal,oldVal){
                getUserInfo({username:newVal.userinfo.username}).then(res => {
                    if(res.data.code === 200){
                        this.User.userinfo = res.data.userinfo
                        this.User.isLogin = true
                    }
                })
            },
            immediate: true
        }
    }
}
</script>

<style scoped lang='less'>
.header{
    width: 100%;
    height: 50px;
    padding:0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #3090fe;
    color:#fff;

    .name{
        font-size: 18px;
    }

    .user{
        padding-right: 30px;
    }
}
</style>