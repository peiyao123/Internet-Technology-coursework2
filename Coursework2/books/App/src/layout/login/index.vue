<template>
    <div class="login">
        <div class="title" @click="toHome">Read A Book</div>
        <div class="box">
            <el-tabs v-model="activeTag">
                <el-tab-pane label="Login" name="login">
                    <el-form :model="loginForm" :rules="loginRules" ref="ruleForm" size="small">
                        <el-form-item label="Account" prop="username">
                            <el-input v-model="loginForm.username" suffix-icon="el-icon-user"></el-input>
                        </el-form-item>
                        <el-form-item label="Password" prop="password">
                            <el-input v-model="loginForm.password" type="password" suffix-icon="el-icon-view"></el-input>
                        </el-form-item>
                        
                        <div class="btn">
                            <el-button type="primary" size="small" @click="loginHandler">Log in</el-button>
                        </div>
                        <div class="btn2">
                            <el-button type="text" @click="activeTag = 'register'">No Account?</el-button>
                            <el-button type="text">Forword password</el-button>
                        </div>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="Register" name="register">
                    <el-form :model="registerForm" :rules="registerRules" ref="ruleForm" size="small">
                        <el-form-item label="Account" prop="username">
                            <el-input v-model="registerForm.username"></el-input>
                        </el-form-item>
                        <el-form-item label="Password" prop="password">
                            <el-input v-model="registerForm.password" type="password"></el-input>
                        </el-form-item>
                        <el-form-item label="Nickname" prop="nickname">
                            <el-input v-model="registerForm.nickname"></el-input>
                        </el-form-item>
                        
                        <div class="btn3">
                            <el-button type="primary" size="small" @click="registerHandler">Register</el-button>、
                            <el-button size="small" @click="resetRegForm">Reset</el-button>
                        </div>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import { registerAccount, loginAccount} from '@/api/user'
import { useUser } from '@/stores/userStore'
export default {
    data() {
        return {
            User: useUser(),
            activeTag: 'login',
            loginForm: {
                username: '',
                password: ''
            },
            rememberPsd:false,
            loginRules: {
                username: [
                    { required: true, message: 'Please enter your account', trigger: 'blur' },
                    { min: 5, max: 15, message: 'Make sure it is 5 to 15 characters long', trigger: 'blur' }
                ],
                password:[
                    { required: true, message: 'Please enter your password', trigger: 'blur' },
                    { min: 6, max: 25, message: 'Make sure it is 6 to 25 characters long', trigger: 'blur' }
                ]
            },
            registerForm:{
                username: '',
                password: '',
                nickname: ''
            },
            registerRules:{
                username: [
                    { required: true, message: 'Please enter your account', trigger: 'blur' },
                    { min: 5, max: 15, message: 'Make sure it is 5 to 15 characters long', trigger: 'blur' }
                ],
                password:[
                    { required: true, message: 'Please enter your password', trigger: 'blur' },
                    { min: 6, max: 25, message: 'The length is 6 to 25 characters', trigger: 'blur' }
                ],
                nickname:[
                    { required: true, message: 'Please enter your nickname', trigger: 'blur' },
                    { min: 1, max:20 ,message:'Make sure it is 1 to 20 characters long', trigger: 'blur'}
                ]
            }
        }
    },
    methods: {
        //返回首页
        toHome(){
            this.$router.push({path:'/'})
        },
        //登录
        loginHandler(){
            loginAccount({
                userinfo:{
                    username:this.loginForm.username,
                    password:this.loginForm.password
                }
                
            }).then(res => {
                if(res.data.code === 200){
                    //登录成功 把token存进localStorage
                    localStorage.setItem('token',res.data.token)
                    //消息提示
                    this.$message.success(res.data.message)

                    //登录状态设为true
                    this.User.isLogin = true

                    this.User.userinfo.username = this.loginForm.username

                    //返回登录前的页面
                    this.$router.back()
                }else{
                    this.$message.error('Fail')
                    console.log(res.data.message)
                }
            })
        },
        //注册
        registerHandler(){
            registerAccount({
                userinfo:{
                    username:this.registerForm.username,
                    password:this.registerForm.password,
                    nickname:this.registerForm.nickname
                }
            }).then(res => {
                if(res.data.code === 200){
                    this.$message.success(res.data.message)
                }else{
                    this.$message.error(res.data.message)
                }
            })
        },
        resetRegForm(){
            this.registerForm = {
                username: '',
                password: '',
                nickname: ''
            }
        }
    }
}
</script>

<style scoped lang='less'>
.login {
    width: 100%;
    height: 95vh;
    overflow: hidden;
    background-color: #f5f5f5;

    .title{
        box-sizing: border-box;
        font-size: 25px;
        flex-shrink: 0;
        padding:20px 50px;
        cursor: pointer;
        font-family:'Times New Roman', Times, serif;
    }

    .box {
        box-sizing: border-box;
        width: 450px;
        padding: 30px;
        background-color: #fff;
        border-radius: 10px;
        overflow: hidden;
        margin:100px auto;
        box-shadow: 0 0 2px 3px #f3f3f3;

        .btn{
            width: 100%;
            padding-top: 20px;
            button{
                width: 100%;
            }
        }

        .btn2{
            width: 100%;
            display: flex;
            justify-content: space-between;
        }

        .btn3{
            width: 100%;
            text-align: end;
        }
    }
}
</style>