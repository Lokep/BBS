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
    let sql = `SELECT * FROM ${COMMENT_TABLE} WHERE articleID = ${info.articleID}`
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
    let sql = `INSERT INTO ${COMMENT_TABLE}(id,parentID,userID,createAt,content,articleID) VALUES(0,?,?,?,?,?)`
    let params = {
        createAt: new Date().toLocaleString()
    }
    db.query(sql, params, (err, result) => {
        if (err) {
            console.log(err)
            return false
        } else {
            console.log(result)
            jsonResult(res, result)
        }
    })
})

module.exports = router;