import request from './config/http'

//注册
export const registerAccount = params => {
    return request({
        url:'/api/regUser',
        method:'post',
        data:params
    })
}

//登录
export const loginAccount = params => {
    return request({
        url:'/api/login',
        method:'post',
        data:params
    })
}

//获取基本信息
export const tokenUserinfo = params => {
    return request({
        url:'/api/getUserinfo',
        method:'get',
        params
    })
}