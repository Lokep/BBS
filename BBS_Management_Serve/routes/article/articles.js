var express = require('express');
var router = express.Router();
const db = require('../../model/mysql.operation');

const ARTICLE_TABLE = 'article';

// 查询所有文章、按条件查询 接口
router.get('/', async (req, res, next) => {
    let condition = req.query.condition,
        sql = `SELECT * FROM ${ARTICLE_TABLE}`,
        params = [],
        result;
    if(condition) {
        sql += " WHERE title LIKE ? OR author LIKE ?";
        params = ["%" + condition + "%", "%" + condition + "%"];
        result = await db.query(sql, params);
    } else {
        result = await db.query(sql, params);
    }
    res.send({code: "200", message: "查询成功", result: result})
});

// 根据用户名查询  接口
router.get('/author_articles', async (req, res, next) => {
    let author = req.query.author,
        sql = `SELECT * FROM ${ARTICLE_TABLE} WHERE author = ?`,
        params = [author],
        result = await db.query(sql, params);
    res.send({code: "200", message: "查询成功", result: result})
});

// 删除文章  接口
router.get("/del_article", async (req, res, next) => {
    let sql = `DELETE FROM ${ARTICLE_TABLE} WHERE id = ?`,
        id = req.query.id,
        params = [id],
        result = await db.query(sql, params);
    if (result) {
        res.send({code: "200", message: "删除成功", result: result})
    }
});

module.exports = router;