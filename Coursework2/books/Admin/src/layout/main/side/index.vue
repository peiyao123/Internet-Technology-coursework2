<template>
    <div class="side">
        <ul>
            <li v-for="item in menuList" @click="toPage(item)" :class="{'active':active === item.id}" :key="item.id">{{item.name}}</li>
            <li @click="exitLogin">Log out</li>
        </ul>
    </div>
</template>

<script>
import { useUser } from '@/stores/useUser'
export default{
    data(){
        return{
            active:0,
            User:useUser(),
            menuList:[
                {
                    id:0,
                    name:'Check',
                    path:'/main'
                },
                {
                    id:1,
                    name:'Content',
                    path:'/main/blogs'
                },
                {
                    id:2,
                    name:'User',
                    path:'/main/users'
                },
                {
                    id:3,
                    name:'Comment',
                    path:'/main/comments'
                }
            ]
        }
    },
    methods: {
        toPage(item){
            this.active = item.id
            this.$router.push({path:item.path},()=>{},()=>{})
        },
        exitLogin(){
            this.User.isLogin = false
            this.User.userinfo = {
                id:0,
                username:'',
                nickname:''
            }
            sessionStorage.removeItem('token')

            this.$router.push('/')
        }
    }
}
</script>

<style scoped lang='less'>
.side{
    width: 200px;
    height: calc(100vh - 50px);
    border-right: 1px solid #e8e8e8;
    background-color: #fff;

    ul{
        padding:20px 0px;
        font-size: 16px;
        user-select: none;
        li{
            width: 100%;
            padding:20px 0;
            text-align: center;
            border-top: 1px solid #f3f3f3;
            cursor: pointer;
            transition: 0.3s;
        }
        li:hover{
            color:#3090fe;
        }

        .active{
            color:#3090fe;
        }
    }
    ul :last-child{
        border-bottom: 1px solid #f3f3f3;
    }
}
</style>