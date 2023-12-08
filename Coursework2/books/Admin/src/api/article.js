import request from './config/http'

//获取所有文章
export const getAllArticle = params => {
    return request({
        url:'/article/getAll',
        method:'get',
        params
    })
}

//获取文章数量
export const getArticleCount = params => {
    return request({
        url:'/api/getArticleCount',
        method:'get',
        params
    })
}

//获取文章详情
export const getArticleDetial = params => {
    return request({
        url:'/api/getDetial',
        method:'get',
        params
    })
}

//搜索文章
export const searchArticle = params => {
    return request({
        url:'/api/search',
        method:'get',
        params
    })
}

//获取未审核文章
export const getNoCheckArticle = params => {
    return request({
        url:'/article/nocheck',
        method:'get',
        params
    })
}

//修改文章status
export const updateArticleStatus = params => {
    return request({
        url:'/article/updateStatus',
        method:'post',
        params
    })
}

//获取所有留言
export const getAllComment = params => {
    return request({
        url:'/comment/getAll',
        method:'get',
        params
    })
}

//获取留言数量
export const getCommentTotal = params => {
    return request({
        url:'/comment/getCount',
        method:'get',
        params
    })
}

//删除留言
export const deleteComment = params => {
    return request({
        url:'/comment/delete',
        method:'delete',
        params
    })
}

//删除文章
export const deleteById = params => {
    return request({
        url:'/article/delete',
        method:'delete',
        params
    })
}

//编辑文章
export const edit = params => {
    return request({
        url:'/article/edit',
        method:'post',
        data:params
    })
}