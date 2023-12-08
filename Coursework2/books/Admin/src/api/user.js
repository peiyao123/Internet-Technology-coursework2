import request from './config/http'

//登录
export const loginAccount = params => {
    return request({
        url:'/api/adminerLogin',
        method:'post',
        data:params
    })
}

//获取所有用户
export const getAllUser = params => {
    return request({
        url:'/admin/getAllUser',
        method:'get',
        params
    })
}

//获取用户数量
export const getUserCount = params => {
    return request({
        url:'/admin/getUserCount',
        method:'get',
        params
    })
}

//修改身份
export const updateUserType = params => {
    return request({
        url:'/admin/updateUserType',
        method:'post',
        params
    })
}

//获取用户信息
export const getUserInfo = params => {
    return request({
        url:'/api/getUserinfo',
        method:'get',
        params
    })
}

