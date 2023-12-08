const express = require('express');

const router = express.Router();

//导入用户路由处理函数对应的模块
const articleHandler = require('../routerHandler/articleHandler');

//用户写文章
router.post('/write',articleHandler.write)

//获取所有文章
router.get('/getAll',articleHandler.adminerGetAll)

//获取未审核文章
router.get('/nocheck',articleHandler.getNoCheck)

//修改文章状态
router.post('/updateStatus',articleHandler.checkArticle)

//上传图片
router.post('/uploadPic',articleHandler.uploadPic)

//删除文章
router.delete('/delete', articleHandler.deleteById)

//编辑文章
router.post('/edit', articleHandler.edit)

module.exports = router;