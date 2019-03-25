const express = require('express');
const router = express.Router();
const db = require('../../model/mysql.operation');

const TOPICS_TABLE = 'topics';

/* apis with handler '/users' */

// 查询所有话题、按标题查询 接口
router.get("/", async (req, res, next) => {
    let sql = `SELECT * FROM ${TOPICS_TABLE}`, params = [], result;
    let condition = req.query.condition;
    if(condition) {
        sql += " WHERE topicName = ?";
        params = [condition];
        result = await db.query(sql, params);
    } else {
        result = await db.query(sql, params)
    }
    res.send({code: "200", message: "查询成功", result: result})
});

// 更改发布状态 接口
router.post("/issue", async (req, res, next) => {
    let sql = `UPDATE ${TOPICS_TABLE} SET state = ? WHERE id = ?`,
        state = req.body.state,
        id = req.body.id,
        params = [state, id],
        result = await db.query(sql, params);
    if(result) {
        res.send({code: "200", message: "修改成功", result: result})
    } else {
        res.send({code: "404", message: "参数错误，没有相关信息"})
    }
});

// 删除话题  接口
router.get("/del_topic", async (req, res, next) => {
    let sql = `DELETE FROM ${TOPICS_TABLE} WHERE id = ?`,
        id = req.query.id,
        params = [id],
        result = await db.query(sql, params);
    if (result) {
        res.send({code: "200", message: "删除成功", result: result})
    }
});

module.exports = router;