//导入数据库操作模块
const db = require('../db/index');
const multer = require('multer');

//写文章处理函数
exports.write = (req, res) => {
    //获取用户提交的文章信息
    const article = req.body.article
    //写文章的时间
    article.createTime = new Date()

    //不能为空
    if (!article.title || !article.body || !article.author || !article.tag || !article.imageUrl) {
        return res.send({
            code: 400,
            message: 'There are required fields, please check'
        })
    }

    //插入数据库sql
    const sql = 'insert into article set ?'

    db.query(sql, article, (err, results) => {
        if (err) return res.cc(err)

        if (results.affectedRows !== 1) return res.cc('Failuread')

        //保存成功
        res.send({
            code: 200,
            message: 'Saved successfully and released after approval'
        })
    })

}

//获取所有已发布文章列表（不获取文章正文） 分页
exports.getAll = (req, res) => {

    //获取数据条数
    let limit = Number(req.query.limit)
    //偏移量 从第几条开始
    let offset = Number(req.query.offset)

    const sql = 'select id,title,author,articleDesc,createTime,tag,isOriginal,readCount,status,imageUrl from article where status = 2 limit ?,?'

    db.query(sql, [offset, limit], (err, results) => {
        if (err) return res.cc(err)

        res.send({
            code: 200,
            message: 'Success',
            articles: results,
        })

    })
}

//获取所有文章
exports.adminerGetAll = (req, res) => {

    //获取数据条数
    let limit = Number(req.query.limit)
    //偏移量 从第几条开始
    let offset = Number(req.query.offset)

    const sql = 'select id,title,author,body,articleDesc,createTime,tag,isOriginal,readCount,status,imageUrl from article where status = 1 or status = 2 limit ?,?'

    db.query(sql, [offset, limit], (err, results) => {
        if (err) return res.cc(err)

        res.send({
            code: 200,
            message: 'Success',
            articles: results,
        })

    })
}

//获取文章数量
exports.getCount = (req, res) => {
    const sql = 'select count(*) as count from article where status = 1 or status = 2'

    db.query(sql, (err, results) => {

        if (err) return res.cc(err)

        res.send({
            code: 200,
            message: 'Success',
            articleCount: results[0].count,
        })
    })
}

//获取热门文章
exports.getHot = (req, res) => {

    //获取数据条数
    let limit = Number(req.query.limit)
    //偏移量 从第几条开始
    let offset = Number(req.query.offset)

    const sql = 'select id,title,author,articleDesc,createTime,tag,isOriginal,readCount,imageUrl from article where status = 2 order by readCount desc limit ?,?'

    db.query(sql, [offset, limit], (err, results) => {
        if (err) return res.cc(err)

        res.send({
            code: 200,
            message: 'Success',
            articles: results
        })
    })
}

//获取文章详情 通过id
exports.detial = (req, res) => {

    //文章id
    let id = req.query.id

    const sql = 'select * from article where id = ?'

    db.query(sql, id, (err, results) => {

        if (err) return res.cc(err)

        res.send({
            code: 200,
            message: 'Success',
            article: results[0]
        })
    })

}


//搜素文章
exports.search = (req, res) => {
    //关键词
    const keyword = req.query.keyword
    //获取数据条数
    let limit = Number(req.query.limit)
    //偏移量 从第几条开始
    let offset = Number(req.query.offset)

    const sql = `
        select id,title,author,articleDesc,createTime,tag,isOriginal,readCount,imageUrl
        from article 
        where title like CONCAT('%',?,'%')
        or articleDesc like CONCAT('%',?,'%') 
        and status = 2 
        order by readCount desc 
        limit ?,?`

    db.query(sql, [keyword, keyword, offset, limit], (err, results) => {
        if (err) return res.cc(err)

        res.send({
            code: 200,
            message: 'Success',
            articles: results
        })
    })
}

//删除文章
exports.deleteById = (req,res) => {

    const sql = 'delete from article where id = ?'

    db.query(sql, req.query.id, (err,results) =>{
        if (err) return res.cc(err)

        if(results.affectedRows>0){
            return res.send({
                code:200,
                message:'Success'
            })
        }
    })

}

//编辑
exports.edit = (req,res) => {

    const article = {...req.body, createTime:new Date()}
    const sql = 'update article set ? where id = ?'

    db.query(sql, [article,article.id], (err,result) => {
        if (err) return res.cc(err)

        if(result.affectedRows > 0){
            return res.send({
                code: 200,
                message: 'Success',
            })
        }
    })

}

//获取未审核文章
exports.getNoCheck = (req, res) => {

    const sql = 'select * from article where status = 0'

    db.query(sql, (err, results) => {

        if (err) return res.cc(err)

        res.send({
            code: 200,
            message: 'Success',
            articles: results
        })
    })
}

//审核文章
exports.checkArticle = (req, res) => {

    const id = req.query.id

    const status = req.query.status

    const sql = 'update article set status = ? where id = ?'

    db.query(sql, [status, id], (err, results) => {
        if (err) return res.cc(err)

        if (results.affectedRows !== 1) return res.cc('Failuread')

        res.send({
            code: 200,
            message: 'Success'
        })
    })
}

//增长浏览量
exports.addReadcount = (req, res) => {

    //文章id
    const id = req.query.id

    const selectSql = 'select readCount from article where id = ?'

    db.query(selectSql, id, (err, results) => {
        if (err) return console.log(err)

        let count = 0

        count = results[0].readCount + 1

        const sql = 'update article set readCount = ? where id = ?'

        db.query(sql, [count, id], (err, results) => {
            if (err) return res.cc(err)

            if (results.affectedRows !== 1) return res.cc('Failuread')

            res.send({
                code: 200,
                message: 'Success',
                count: count
            })
        })
    })

}


// 配置上传文件目录和文件名
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// 创建multer实例
const upload = multer({ storage: storage });

//上传图片
exports.uploadPic = (req, res) => {
    // single表示只上传一张图片，upload.single('file')中的'file'对应前端上传控件的name属性
    upload.single('file')(req, res, function (err) {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: 'Failuread' });
        }
        // req.file包含上传的文件信息
        // console.log(req.file);
        return res.send({
            code:200,
            message:'Success',
            url:'/pic/' + req.file.filename
        })
    });
}



