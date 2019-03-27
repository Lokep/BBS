const express = require('express');
const router = express.Router();
const db = require('../../model/mysql.operation');

const EXPLORE_TABLE = 'explore';

/* apis with handler '/users' */

//新增活动  接口
router.post('/', async (req, res, next) => {
    let message = req.body;
    // message = JSON.parse(message)
    let sql = `INSERT INTO ${EXPLORE_TABLE}(id, title,time,city,cityCode,imgSrc, link, type) VALUES(?,?,?,?,?,?,?,?) `;
    let params = [0, message.title, message.time, message.city, message.cityCode, message.imgSrc, message.link, message.type]
    let  result = await db.query(sql, params);
    if(result) {
        res.send({code: "200", message: "新增活动成功", result: result})
    } else {
        res.send({code: "405", message: "添加失败"})
    }
});

// 查询所有活动、按名称查询  接口
router.get("/", async (req, res, next) => {
    let sql = `SELECT * FROM ${EXPLORE_TABLE}`, params = [], result;
    let condition = req.query.condition;
    console.log(condition)
    if(condition) {
        sql += " WHERE title LIKE ?";
        params = ["%" + condition + "%"];
    }
    result = await db.query(sql, params);
    if(result.length !== 0) {
        res.send({code: "200", message: "查询成功", result: result})
    } else {
        res.send({code: "404", message: "未查询到相关信息"})
    }
});

// 删除活动  接口
router.get("/del_activity", async (req, res, next) => {
    let sql = `DELETE FROM ${EXPLORE_TABLE} WHERE id = ?`,
        id = req.query.id,
        params = [id],
        result = await db.query(sql, params);
    if (result) {
        res.send({code: "200", message: "删除成功", result: result})
    }
});


module.exports = router;