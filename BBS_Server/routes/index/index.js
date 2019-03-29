var express = require('express');
var router = express.Router();
const db = require('../../model/mysql.operation')
const jsonResult = require('../../model/jsonResult')

const ARTICLE_TABLE = 'article'
const ARTICLEIMG = 'articleimg'
const COMMENT_TABLE = 'comment'

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.post('/articleList', (req, res, next) => {
    // let sql = `select * from ${ARTICLE_TABLE} `
    let sql = `select a.*,ai.imgName,ai.path from ${ARTICLE_TABLE} as a 
    LEFT JOIN 
    (SELECT aid,path,name AS imgName from ${ARTICLEIMG}) as ai on a.articleID = ai.aid`
    db.query(sql, '', (err, result) => {
        if (err) {
            console.log(err)
            return false
        } else {
            jsonResult(res, result)
        }
    })
})

router.post('/getCommentList', (req, res, next) => {
    let info = req.body
    console.log(info)
    let sql = `SELECT c1.*,u1.userName as username,u2.userName as parentname from comment c1
    left JOIN (SELECT id, parentID,userID from comment) c2 on c1.parentID=c2.id
    left join userinfo u1 on c1.userID=u1.userID
    left join userinfo u2 on c2.userID=u2.userID
    where c1.articleID=${info.articleID}`
    console.log(info)
    db.query(sql, '', (err, result) => {
        if (err) {
            console.log(err)
            return false
        } else {
            console.log(result)
            jsonResult(res, result)
        }
    })
})

router.post('/sendComent', (req, res, next) => {
    /*
     * info = > userID,parentID,createAt,content,articleID
     */
    let info = req.body
    console.log(info)
    let sql = `INSERT INTO ${COMMENT_TABLE}(parentID,userID,createAt,content,articleID) VALUES(?,?,?,?,?)`
    let params = [
        info.parentID,
        info.userID,
        new Date().toLocaleString(),
        info.content,
        info.articleID
    ]
    console.log(info)
    db.query(sql, params, (err, result) => {
        if (err) {
            console.log(err)
            return false
        } else {
            // console.log(result)
            jsonResult(res, result)
        }
    })
})

router.post('/articleCollect', (req, res, next) => {

})

module.exports = router;