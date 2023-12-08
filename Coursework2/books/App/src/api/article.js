import request from './config/http'

//写文章
export const publishArticle = params => {
    return request({
        url:'/article/write',
        method:'post',
        data:params
    })
}

//获取所有文章
export const getAllArticle = params => {
    return request({
        url:'/api/all',
        method:'get',
        params
    })
}

//获取热门文章
export const getHotArticle = params => {
    return request({
        url:'/api/hot',
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

//增长浏览量
export const addReadCount = params => {
    return request({
        url:'/api/addReadCount',
        method:'post',
        params
    })
}

//获取相应文章的留言
export const getComment = params => {
    return request({
        url:'/api/getComment',
        method:'get',
        params
    })
}

//插入留言
export const insertComment = params => {
    return request({
        url:'/comment/insert',
        method:'post',
        data:params
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