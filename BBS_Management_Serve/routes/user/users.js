const express = require('express');
const router = express.Router();
const db = require('../../model/mysql.operation');

const USERINFO_TABLE = 'userinfo';

/* apis with handler '/users' */

// 查询所有用户、按条件查询 接口
router.get("/", async (req, res, next) => {
    let sql = `SELECT * FROM ${USERINFO_TABLE}`, params = [], result;
    let condition = req.query.condition;
    if(condition) {
        sql += " WHERE phone LIKE ? OR email LIKE ? OR userName LIKE ?";
        params = ["%" + condition + "%", "%" + condition + "%", "%" + condition + "%"];
        result = await db.query(sql, params);
    } else {
        result = await db.query(sql, params)
    }
    res.send({code: "200", message: "查询成功", result: result})
});

// 冻结、解冻接口
router.post("/frozen", async (req, res, next) => {
    let sql = `UPDATE ${USERINFO_TABLE} set state= ? where _id = ?`,
        state = req.body.state,
        _id = req.body._id,
        params = [state, _id];
    let result = await db.query(sql, params);
    res.send({code: "200", message: "查询成功", result: result})
});

// 删除用户 接口
router.get("/logoff", async (req, res, next) => {
    let sql = `DELETE FROM ${USERINFO_TABLE} WHERE _id = ?`,
        _id = req.query._id,
        params = [_id],
        result = await db.query(sql, params);
    if(result) {
        res.send({code: "200", message: "删除成功", result: result})
    }
});

module.exports = router;