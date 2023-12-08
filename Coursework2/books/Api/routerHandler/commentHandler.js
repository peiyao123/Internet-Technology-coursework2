const db = require('../db/index');

//获取所有留言
exports.getAll = (req,res) => {

    const limit = Number(req.query.limit)

    const offset = Number(req.query.offset)

    const sql = 'select * from comment limit ?,?'

    db.query(sql,[offset,limit],(err,results)=>{ 

        if(err) return res.cc(err)

        res.send({
            code:200,
            message:'Success',
            comments: results
        })
    })

}

//获取相应文章留言
exports.getArticleComment = (req,res) => {

    const articleId = Number(req.query.articleId)

    const sql = 'select * from comment where articleId = ? order by createTime desc'

    db.query(sql,articleId,(err,results)=>{
        if(err) return res.cc(err)

        res.send({
            code:200,
            message:'Success',
            comments: results
        })
    })
}

//提交留言
exports.insetComment = (req,res) =>{

    const comment = {
        userId:req.body.userId,
        content:req.body.content,
        nickname:req.body.nickname,
        articleId:req.body.articleId,
        createTime:new Date()
    }
    const sql = 'insert into comment set ?'

    db.query(sql,comment,(err,results)=>{
        if(err) return res.cc(err)

        if(results.affectedRows !== 1) return res.cc('Failuread')

        //保存成功
        res.send({
            code:200,
            message:'Success'
        })
    })
}

//删除留言
exports.delete = (req,res) => {

    const id = req.query.id

    const sql = 'delete from comment where id = ?'

    db.query(sql,id,(err,results)=>{
        if(err) return res.cc(err)

        if(results.affectedRows !== 1) return res.cc('Failuread')

        res.send({
            code:200,
            message:'Success'
        })
    })
}

//获取评论数量
exports.getCount = (req,res) => {
    const sql = 'select count(*) as count from comment'

    db.query(sql,(err,results)=>{
        if(err) return res.cc(err)

        res.send({
            code:200,
            message:'Success',
            total:results[0].count
        })
    })
}