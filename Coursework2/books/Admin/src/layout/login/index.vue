<template>
    <div class="login">
        <div class="header">Read A Book RMS</div>
        <div class="box">
            <el-form :model="loginForm" :rules="loginRules" ref="ruleForm" size="small">
                <el-form-item label="Account" prop="username">
                    <el-input v-model="loginForm.username" suffix-icon="el-icon-user"></el-input>
                </el-form-item>
                <el-form-item label="Password" prop="password">
                    <el-input v-model="loginForm.password" type="password" suffix-icon="el-icon-view"></el-input>
                </el-form-item>
                <div class="btn">
                    <el-button type="primary" size="small" @click="submitLogin">Log in</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
import { loginAccount } from '@/api/user'
import { useUser } from '@/stores/useUser'
export default{
    data(){
        return{
            loginForm: {
                username: '',
                password: ''
            },
            rememberPsd:false,
            loginRules: {
                username: [
                    { required: true, message: 'Please enter your account', trigger: 'blur' },
                    { min: 5, max: 10, message: "Make sure it's 5 to 10 characters long", trigger: 'blur' }
                ],
                password:[
                    { required: true, message: 'Please enter your password', trigger: 'blur' },
                    { min: 6, max: 20, message: "Make sure it's 6 to 20 characters long", trigger: 'blur' }
                ]
            },
            User:useUser()
        }
    },
    methods:{
        submitLogin(){
            loginAccount({userinfo:this.loginForm}).then(res => {
                if(res.data.code === 200){
                    //登录成功 把token存进localStorage
                    sessionStorage.setItem('token',res.data.token)

                    //登录状态设为true
                    this.User.isLogin = true

                    this.User.userinfo.username = this.loginForm.username

                    this.$message.success(res.data.message)
                    this.$router.push({path:'/main'})

                }else{
                    this.$message.error('Login failure')
                    // console.log(res.data.message)
                }
            })
        }
    }
}
</script>

<style scoped lang='less'>
.login{
    width: 100%;
    height: 100vh;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    

    .header{
        width: 100%;
        height: 80px;
        line-height: 80px;
        font-size: 20px;
        text-align: center;
        position: fixed;
        top:0;
        color:#444;
        background-image: linear-gradient(#e3f2ff,#fff);
    }

    .box{
        margin-top: -50px;
        width: 400px;
        padding:40px;
        border: 1px solid #ccc;
        border-radius: 5px;
        
        .btn{
            width: 100%;
            margin-top: 30px;
            button{
                width: 100%;
            }
        }
    }
}
</style>