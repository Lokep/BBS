var express = require('express');
var router = express.Router();
const db = require('../../model/mysql.operation')
const jsonResult = require('../../model/jsonResult')

const ARTICLE_TABLE = 'article'

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.post('/articleList', (req, res, next) => {
    let sql = `select * from ${ARTICLE_TABLE} `
    db.query(sql, '', (err, result) => {
        if (err) {
            console.log(err)
            return false
        } else {
            jsonResult(res, result)
        }
    })
})
module.exports = router;