//导入数据库操作模块
const db = require('../db/index');

//导入bcryptjs包
const bcrypt = require('bcryptjs');

//导入生成token包
const jwt = require('jsonwebtoken');
const config = require('../config/config');


//注册新用户处理函数
exports.regUser = (req,res) => {
    //获取用户提交的用户信息
    const userinfo = req.body.userinfo;

    if(!userinfo.username || !userinfo.password){
        return res.send({code:400,message:'The user name and password cannot be empty'});
    }

    const selectSql = 'select * from user where username=?'
    db.query(selectSql,userinfo.username, (err, results) => {
        if(err) return res.cc(err)
        
        if(results.length>0) return res.cc('Account is occupied, please change another user name!')
        
        // 调用bcrypt.hashSync() 对密码进行加密
        userinfo.password = bcrypt.hashSync(userinfo.password,10)

        //插入新用户sql语句
        const insertSql = 'insert into user set ?'
        db.query(insertSql,{username:userinfo.username, password:userinfo.password, nickname:userinfo.nickname},(err,results) => {
            //判读sql语句是否执行成功
            if(err) return res.cc(err)
            
            //判断影响行数是否为1
            if(results.affectedRows !== 1) return res.cc('Failed to register the user, please try again later')
            
            //注册成功
            res.send({code:200, message:'Success'})
        })
    })
}

//登录处理函数
exports.login = (req,res) => {
    const userinfo = req.body.userinfo

    if(!userinfo.username || !userinfo.password){
        return res.cc('The username or password is invalid')
    }

    const selectSql = 'select * from user where username=?'
    db.query(selectSql, userinfo.username, (err,results)=>{
        if(err) return res.cc(err)

        if(results.length !== 1) return res.cc('Failuread')

        //参数一：用户提交的密码  参数二：数据库中的密码
        const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)
        
        //判断密码是否正确
        if(!compareResult) return res.cc('Login failed because the user name or password is incorrect')

        //在服务器端生成 token 字符串

        //将用户的敏感信息去除 密码和用户头像置空
        const user = { ...results[0], password:'',userpic:''}
        //对用户的信息进行加密 生成token字符串
        const tokenStr = jwt.sign(user,config.jwtSecretKey, {expiresIn: config.expiresIn})
        
        res.send({
            code:200,
            message:'Success',
            token:'Bearer ' + tokenStr
        })
    })
}

//获取用户信息
exports.getUserinfo = (req,res) => {

    const username = req.query.username

    if(username == ''){
        return res.send({
            code:400,
            message:'Failuread'
        })
    }

    const sql = 'select id,username,nickname from user where username = ?'

    db.query(sql,username,(err,results) => {

        if(err) return res.cc(err)

        if(results.length === 1){
            res.send({
                code:200,
                message:'Success',
                userinfo:results[0]
            })
        }else{
            res.send({
                code:400,
                message:'Failuread'
            })
        }
        
    })
}

//管理员登录
exports.adminerLogin = (req,res) => {
    const userinfo = req.body.userinfo

    if(!userinfo.username || !userinfo.password){
        return res.cc('The username or password is invalid')
    }

    const selectSql = 'select * from user where username=? && (type = 2 or type = 1)'
    db.query(selectSql, userinfo.username, (err,results)=>{
        if(err) return res.cc(err)

        if(results.length !== 1) return res.cc('Failuread')

        //参数一：用户提交的密码  参数二：数据库中的密码
        const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)
        
        //判断密码是否正确
        if(!compareResult) return res.cc('Login failed because the user name or password is incorrect')

        //在服务器端生成 token 字符串

        //将用户的敏感信息去除 密码和用户头像置空
        const user = { ...results[0], password:'',userpic:''}
        //对用户的信息进行加密 生成token字符串
        const tokenStr = jwt.sign(user,config.jwtSecretKey, {expiresIn: config.expiresIn})
        
        res.send({
            code:200,
            message:'Success',
            token:'Bearer ' + tokenStr
        })

    })
}
