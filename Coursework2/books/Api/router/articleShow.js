const express = require('express');

const router = express.Router();

//导入用户路由处理函数对应的模块
const articleHandler = require('../routerHandler/articleHandler');
const commentHandler = require('../routerHandler/commentHandler')

//获取所有文章
router.get('/all',articleHandler.getAll)

//获取文章数量
router.get('/getArticleCount',articleHandler.getCount)

//获取热门文章
router.get('/hot',articleHandler.getHot)

//获取文章详情
router.get('/getDetial',articleHandler.detial)

//搜索文章
router.get('/search',articleHandler.search)

//增长浏览量
router.post('/addReadCount',articleHandler.addReadcount)

//获取相应文章留言
router.get('/getComment',commentHandler.getArticleComment)

module.exports = router;