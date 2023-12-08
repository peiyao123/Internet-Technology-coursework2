const express = require('express')

//创建web服务器
const app = express();

//跨域
const cors = require('cors');
app.use(cors());

//配置解析 application/json 格式数据的内置中间件
app.use(express.json());
//配置解析 application/x-www-from-urlencoded 格式数据的内置中间件
app.use(express.urlencoded({ extended: false }));


//导入配置文件
const config = require('./config/config');
//导入解析token中间件
const expressJWT = require('express-jwt');


//配置
app.use(expressJWT.expressjwt({algorithms:['HS256'],secret: config.jwtSecretKey}).unless({path: [/^\/(?!api$|pic$)/]}));


//在路由之前封装 res.cc 函数，用来处理错误
app.use((req,res,next) => {
    res.cc = function(err, code = 400){
        res.send({
            code,
            message:err instanceof Error ? err.message : err
        })
    }
    next()
})

//对外提供静态资源
app.use('/pic',express.static('./uploads'));


//导入并使用路由模块
const userRouter = require('./router/user');
app.use('/api', userRouter);

//导入文章路由模块
const articleRouter = require('./router/article');
app.use('/article', articleRouter);

//文章显示路由模块
const articleShowRouter = require('./router/articleShow');
app.use('/api',articleShowRouter);

//管理员路由模块
const adminerRouter = require('./router/adminer');
app.use('/admin',adminerRouter);

//评论模块
const commentRouter = require('./router/comment');
app.use('/comment',commentRouter);

// 定义错误级别的中间件
app.use((err,req,res,next) => {
    console.log(err);
    //token验证失败的错误
    if(err.name === 'UnauthorizedError') return res.send({code:400,message:'Identity authentication failure'})

    //未知错误
    res.send({code:400,message:'Unknown error'})
})


//调用app.listen(端口号，启动成功后的回调函数)，启动服务器
app.listen(3000, () => {
    console.log('express server running at http://127.0.0.1:3000');
})
