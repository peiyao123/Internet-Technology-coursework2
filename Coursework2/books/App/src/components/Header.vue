<template>
    <div class="header">
        <div class="logo">
            Read A Book
        </div>
        <div class="center">
            <ul>
                <li v-for="item in menuList" :class="{'activeLi': item.id === activeLi}" :key="item.id" @click="changePage(item)"> 
                    <div v-html="item.icon"></div>
                    <span>{{ item.name }}</span>
                </li>
            </ul>
            <div class="search">
                <svg t="1674148446617" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6999" width="20" height="20"><path d="M797.525333 752.266667c62.069333-72.736 97.28-165.002667 97.28-262.186667C894.816 266.528 713.621333 85.333333 490.08 85.333333 266.538667 85.333333 85.333333 266.538667 85.333333 490.069333 85.333333 713.610667 266.538667 894.826667 490.069333 894.826667a404.693333 404.693333 0 0 0 118.208-17.546667 32 32 0 0 0-18.666666-61.216 340.693333 340.693333 0 0 1-99.541334 14.762667C301.888 830.816 149.333333 678.261333 149.333333 490.069333 149.333333 301.888 301.888 149.333333 490.069333 149.333333 678.261333 149.333333 830.826667 301.888 830.826667 490.069333c0 89.28-35.381333 173.696-97.141334 237.322667a36.992 36.992 0 0 0 0.384 51.925333l149.973334 149.973334a32 32 0 0 0 45.258666-45.248L797.525333 752.266667z" fill="#444444" p-id="7000"></path></svg>
                <input type="text" v-model="keyword" @keyup.enter="searchHandler" placeholder="Please input">
            </div>
            
        </div>
        <div class="right">
            <div class="login">
                <el-dropdown v-if="User.isLogin" @command="handleCommand">
                    
                    <div class="username">
                        <svg t="1674150822019" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9679" width="22" height="22"><path d="M634.342 589.022c105.11 41.118 185.376 133.808 207.609 249.08 2.965 15.374-7.095 30.241-22.469 33.206-15.374 2.965-30.24-7.094-33.205-22.468-25.155-130.425-139.813-226.122-274.22-226.122-134.407 0-249.067 95.7-274.22 226.125-2.965 15.374-17.831 25.434-33.205 22.47-15.374-2.966-25.434-17.832-22.469-33.206 22.23-115.275 102.498-207.967 207.61-249.085-76.52-42.89-128.237-124.79-128.237-218.77 0-138.402 112.16-250.602 250.522-250.602 138.36 0 250.52 112.2 250.52 250.602 0 93.98-51.716 175.88-128.236 218.77z m71.537-218.77c0-107.092-86.78-193.902-193.821-193.902-107.043 0-193.822 86.81-193.822 193.902 0 107.09 86.779 193.9 193.822 193.9 107.042 0 193.82-86.81 193.82-193.9z" fill="#555555" p-id="9680"></path></svg>
                        <span>{{ User.userinfo.nickname }}</span>
                    </div>
                    
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="logout">Log out</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                
                <div v-if="!User.isLogin" @click="toLoginPage">
                    Log in
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useUser } from '@/stores/userStore'
import { tokenUserinfo } from '@/api/user'
export default{
    data(){
        return{
            activeLi:0,
            menuList:[
                {
                    id:0,
                    name:'Home',
                    path:'/',
                    icon:'<svg t="1674143818519" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2616" width="24" height="24"><path d="M512 85.333333c235.637333 0 426.666667 191.029333 426.666667 426.666667S747.637333 938.666667 512 938.666667 85.333333 747.637333 85.333333 512 276.362667 85.333333 512 85.333333z m0 64c-200.298667 0-362.666667 162.368-362.666667 362.666667s162.368 362.666667 362.666667 362.666667 362.666667-162.368 362.666667-362.666667-162.368-362.666667-362.666667-362.666667z m149.162667 158.901334a42.666667 42.666667 0 0 1 54.602666 54.602666L637.642667 579.84a96 96 0 0 1-57.813334 57.802667l-216.992 78.122666a42.666667 42.666667 0 0 1-54.602666-54.602666l78.122666-217.002667a96 96 0 0 1 57.813334-57.802667z m-20.970667 75.573333l-174.346667 62.762667a32 32 0 0 0-19.274666 19.274666l-62.762667 174.346667 174.346667-62.762667a32 32 0 0 0 19.274666-19.274666l62.762667-174.346667z" fill="#666" p-id="2617"></path></svg>'
                },
                {
                    id:1,
                    name:'Books',
                    path:'/books',
                    icon:'<svg t="1674144459717" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4634" width="20" height="20"><path d="M855.04 21.504H471.04c-214.016 0-388.096 174.08-388.096 388.096v504.32c0 50.176 40.96 91.136 91.136 91.136h384c214.016 0 388.096-174.08 388.096-388.096V112.128c0-50.176-40.96-90.624-91.136-90.624z m29.696 594.944c0 180.224-146.432 326.656-326.656 326.656H174.08c-16.384 0-29.696-13.312-29.696-29.696V409.088c0-180.224 146.432-326.656 326.656-326.656h384c16.384 0 29.696 13.312 29.696 29.696v504.32z" fill="#444444" p-id="4635"></path><path d="M314.88 415.744h144.896c16.896 0 30.72-13.824 30.72-30.72s-13.824-30.72-30.72-30.72H314.88c-16.896 0-30.72 13.824-30.72 30.72s13.824 30.72 30.72 30.72zM659.456 610.304H314.88c-16.896 0-30.72 13.824-30.72 30.72s13.824 30.72 30.72 30.72h344.576c16.896 0 30.72-13.824 30.72-30.72s-13.824-30.72-30.72-30.72z" fill="#666" p-id="4636"></path></svg>'
                },
                {
                    id:2,
                    name:'Write',
                    path:'/write',
                    icon:'<svg t="1674149744579" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8576" width="22" height="22"><path d="M872.064 847.104H205.312c-14.08 0-25.6-11.52-25.6-25.6s11.52-25.6 25.6-25.6h666.752c14.08 0 25.6 11.52 25.6 25.6s-11.52 25.6-25.6 25.6zM352.64 693.632c-1.28 0-2.432-0.128-3.712-0.256L220.288 674.56c-11.264-1.664-19.968-10.368-21.632-21.632l-18.816-128.512c-1.152-8.064 1.536-16.128 7.168-21.76L576.512 113.28c9.984-9.984 26.24-9.984 36.224 0l147.328 147.328a25.3824 25.3824 0 0 1 0 36.096L370.688 686.08a25.6 25.6 0 0 1-18.048 7.552z m-105.984-66.944l97.024 14.208 362.112-362.112-111.104-111.104-362.24 361.984 14.208 97.024z" fill="#777" p-id="8577"></path></svg>'
                },
                {
                    id:3,
                    name:'About',
                    path:'/about',
                    icon:'<svg t="1674144708548" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5975" width="24" height="24"><path d="M512.002 63.84C264.88 63.84 63.84 264.88 63.84 512.002c0 247.143 201.04 448.157 448.162 448.157 247.13 0 448.157-201.026 448.157-448.157C960.16 264.88 759.133 63.84 512.002 63.84z m0 843.592c-218.047 0-395.435-177.388-395.435-395.429 0-218.047 177.388-395.435 395.435-395.435 218.042 0 395.43 177.4 395.43 395.435 0 218.041-177.388 395.43-395.43 395.43z m0-474.516c-14.553 0-26.358 11.805-26.358 26.353v303.167c0 14.578 11.805 26.358 26.358 26.358 14.547 0 26.37-11.78 26.37-26.358V459.269c0-14.548-11.822-26.353-26.37-26.353z m-52.733-131.818c0-29.115 23.614-52.73 52.733-52.73 29.127 0 52.728 23.615 52.728 52.73 0 29.118-23.6 52.728-52.728 52.728-29.12 0-52.733-23.597-52.733-52.728z m0 0" p-id="5976" fill="#666"></path></svg>'
                }
            ],
            User: useUser(),
            keyword:''
        }
    },
    mounted(){
        this.menuLight()
    },
    methods:{
        //菜单栏高亮切换
        menuLight(){
            this.activeLi = -1
            //匹配当前路径在菜单的高亮
            this.menuList.forEach(item => {
                if(item.path == this.$route.path){
                    this.activeLi = item.id
                }
            })
        },
        //切换页面
        changePage(item){
            if(!this.User.isLogin && item.id === 2){
                this.$message.error('请先登录')
                return
            }
            this.$router.push({path:item.path}, ()=>{}, ()=>{})
        },
        //跳转登录页
        toLoginPage(){
            this.$router.push({path:'/login'})
        },
        //搜索
        searchHandler(){
            this.lastKeyword = this.keyword
            this.$router.push({path:'/search',query:{keyword:this.keyword}}, ()=>{}, ()=>{})
        },
        handleCommand(command){
            if(command === 'logout'){
                this.User.logout()
            }
        }
    },
    watch:{
        User:{
            handler(newVal, oldVal) {
                if(newVal.isLogin){
                    tokenUserinfo({username:this.User.userinfo.username}).then(res => {
                        this.User.userinfo = res.data.userinfo 
                    })
                }
            },
            immediate: true
        },
        '$route.path':function(){
            this.menuLight()
        }
    }
}
</script>

<style scoped lang='less'>
.header{
    width: 100%;
    height: 60px;
    display: flex;
    justify-content:space-between;
    padding:0 40px;
    border-bottom:1px solid #e1e1e1;
    background-color: #fff;
    margin-bottom: 15px;
    font-family:'Times New Roman', Times, serif;

    &>div{
        height: 100%;
        display: flex;
        align-items: center;
        
    }

    .logo{
        width: 10%;
        font-size: 20px;
        flex-shrink: 0;
        overflow: hidden;
        flex-wrap: nowrap;
        text-overflow: ellipsis;
    }

    .center{
        width: 960px;
        display: flex;
        justify-content: space-between;
        ul{
            display: flex;
            flex-shrink: 0;
            user-select: none;
            li{
                height:40px;
                display: flex;
                align-items: center;
                padding:0 15px;
                color:#666;
                cursor: pointer;
                div{
                    display: flex;
                    align-items: center;
                }
                span{
                    line-height: 40px;
                    margin-left: 5px;
                }
            }

            .activeLi{
                color:#666;
                font-weight: bold;
            }
        }

        .search{
            display: flex;
            align-items: center;
            border:1px solid #e1e1e1;
            padding:5px 5px;
            border-radius: 5px;
            margin-right: 15px;

            input{
                margin-left: 10px;
                width: 150px;
                border:none;
                font-size: 14px;
                color:#666;
            }   
            
        }
    }

    .right{
        width: 10%;
        color:#666;
        .login{
            cursor: pointer;
            display: flex;
            align-items: center;

            .username{
                display: flex;
                align-items: center;

                span{
                    margin-left: 5px;
                }
            }
        }
    }
}
</style>