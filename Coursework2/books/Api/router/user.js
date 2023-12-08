const express = require('express');

const router = express.Router();

//导入用户路由处理函数对应的模块
const userHandler = require('../routerHandler/userHandler');

//注册新用户
router.post('/regUser', userHandler.regUser)

//登录
router.post('/login', userHandler.login)

//获取用户信息
router.get('/getUserinfo' , userHandler.getUserinfo)

//管理员登录
router.post('/adminerLogin', userHandler.adminerLogin)

module.exports = router;