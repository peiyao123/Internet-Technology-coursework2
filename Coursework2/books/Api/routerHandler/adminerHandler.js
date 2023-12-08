//导入数据库操作模块
const db = require('../db/index');

exports.getAllUser = (req,res) => {

    const limit = Number(req.query.limit)

    const offset = Number(req.query.offset) 

    const sql = 'select id,username,nickname,type from user limit ?,?'

    db.query(sql,[offset,limit],(err,results)=>{
        if(err) return res.cc(err)

        res.send({
            code:200,
            message:'Success',
            users:results
        })
    })   
}


//修改用户身份
exports.updateUserType = (req,res) => {

    if(req.auth.username !== 'admin'){
        return res.cc('无权限')
    }else{
        const userId = req.query.userId

    const type = req.query.type

    const sql = 'update user set type = ? where id = ?'

    db.query(sql,[type,userId],(err,results)=>{
        if(err) return res.cc(err)

        if(results.affectedRows !== 1) return res.cc('Failuread')

            res.send({
                code:200,
                message:'Success'
            })
        })
    }

}

//获取用户数量
exports.getUserCount = (req,res) =>{
    const sql = 'select count(*) as count from user'

    db.query(sql,(err,results)=>{

        if(err) return res.cc(err)

        res.send({
            code:200,
            message:'Success',
            total:results[0].count
        })

    })
}