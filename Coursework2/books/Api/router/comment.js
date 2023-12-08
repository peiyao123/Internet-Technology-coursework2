const express = require('express');

const router = express.Router();

//导入用户路由处理函数对应的模块
const commentHandler = require('../routerHandler/commentHandler');

//插入留言
router.post('/insert',commentHandler.insetComment)

//删除留言
router.delete('/delete',commentHandler.delete)

//获取全部留言
router.get('/getAll',commentHandler.getAll)

router.get('/getCount',commentHandler.getCount)

module.exports = router;